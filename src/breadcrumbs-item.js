/**
 * Created by kevin on 07/03/16.
 */

var BreadcrumbsItem = React.createClass({
    render: function() {
        return (
            <span><a href={this.props.href}>{this.props.label}</a></span>
        );
    }
})

module.exports = BreadcrumbsItem;