/**
 * Created by kevin on 07/03/16.
 */

var DocSquare = require('./doc-square');
var DocVersion = require('./doc-version');

var DocList = React.createClass({
    render: function() {
        if ($.isEmptyObject(this.props.data)){
            return (
                <span>I'm Empty -_-</span>
            );
        }
        else {
            var docNodes = []
            /** ugly check **/
            test = Object.keys(this.props.data)[0];
            if (this.props.data[test].hasOwnProperty('url')){
                keys = Object.keys(this.props.data).sort().reverse();
            }
            else {
                keys = Object.keys(this.props.data).sort();                
            }
            var context = this;
            $.each(keys, function(_, idx){
                if (!$.isEmptyObject(context.props.data[idx])){
                    docs = context.props.data[idx];
                    if (docs.hasOwnProperty('url')){
                        if (idx == 'master'){
                            docNodes.unshift(
                                <DocVersion version={idx} name={docs.name} color={docs.color} url={docs.url}  key={idx}></DocVersion>
                            )
                        }
                        else {
                            docNodes.push(
                                <DocVersion version={idx} name={docs.name} color={docs.color} url={docs.url}  key={idx}></DocVersion>
                            )
                        }
                    }
                    else {
                        docNodes.push(
                            <DocSquare firstLetter={docs.firstLetter} color={docs.color} fullName={docs.fullName} key={docs.key}></DocSquare>
                        )
                    }

                }

            });
            return (
                <div className="doc-list" data={this.props.data}>
                   {docNodes}
                </div>
            );
        }
    }
});

module.exports = DocList;