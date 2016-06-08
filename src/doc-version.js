/**
 * Created by kevin on 07/03/16.
 */

var DocVersion = React.createClass({
    render: function() {
        return (
            <div className="doc-square doc-version">
                <h3>{this.props.name}</h3>
                <a href={this.props.url}>browse</a>
            </div>
        )
    },

});

module.exports = DocVersion;