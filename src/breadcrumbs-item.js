/**
 * Created by kevin on 07/03/16.
 */

var BreadcrumbsItem = React.createClass({
    render: function() {
    	console.log(this.props.item)
    	if (this.props.item.current != true){
	        return (
	            <li><span className="bread-label"><a href={this.props.item.href}>{this.props.item.label}</a></span></li>
	        );
    	}
    	else {
	        return (
	            <li><span className="bread-label current">{this.props.item.label}</span></li>
	        );    		
    	}
    }
})

module.exports = BreadcrumbsItem;