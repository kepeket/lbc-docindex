/**
 * Created by kevin on 07/03/16.
 */
var BreadcrumbsItem = require('./breadcrumbs-item');

var Breadcrumbs = React.createClass({
    getInitialState: function(){
        return {path: '/', items: []}
    },
    recurse: function(path){
        matches = path.match(/(.*)\/([a-zA-Z0-9\-]+)/);
        if (matches.length > 2){
            this.recurse(matches[2]);
        }
        this.state.items.push({
                               href: matches[1],
                               label: matches[0]
                                }
                               );
    },
    componentDidMount: function(){
        console.log(this.props)
        this.state.path = this.props.path;
        basePath = this.props.path;
    },
    render: function(){
        var breadItems = this.state.items.map(function(b){
            return (
                <BreadcrumbsItem label={b.label} href={b.href} key={b.id}></BreadcrumbsItem>
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