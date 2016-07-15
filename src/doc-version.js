/**
 * Created by kevin on 07/03/16.
 */

var DocVersion = React.createClass({
    render: function() {
    	var divStyle = {
            backgroundColor: this.props.color
        }
        var additionalClass = '';
        if (this.props.version != 'master'){
            additionalClass = 'tag';
        }
        return (
            <div className={"doc-square doc-version " + additionalClass} style={divStyle} >
                <h3>{this.props.name}</h3>
                <a href={this.props.url}>browse</a>
            </div>
        )
    },

});

module.exports = DocVersion;