/**
 * Created by kevin on 07/03/16.
 */
var BreadcrumbsItem = require('./breadcrumbs-item');

var Breadcrumbs = React.createClass({
    getInitialState: function(){
        return {path: '/', items: []}
    },
    render: function(){
        var breadItems = this.state.items.map(function(b){
            return (
                <BreadcrumbsItem label={b.firstLetter} href={b.href} key={b.id}></BreadcrumbsItem>
            )
        });
        return (
            <div className="breadcrumbs">
                <span>Path: {this.state.path}</span>
                <ul>
                    {breadItems}
                </ul>
            </div>
        )
    }
});

module.exports = Breadcrumbs;