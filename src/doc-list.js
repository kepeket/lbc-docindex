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
            $.each(this.props.data, function(idx, docs){
                if (!$.isEmptyObject(docs)){
                    if (docs.hasOwnProperty('url')){
                        console.log(docs);
                        docNodes.push(
                            <DocVersion version={idx} name={docs.name} color={docs.color} url={docs.url}  key={idx}></DocVersion>
                        )
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