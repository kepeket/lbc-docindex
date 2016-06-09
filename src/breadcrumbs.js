/**
 * Created by kevin on 07/03/16.
 */
var BreadcrumbsItem = require('./breadcrumbs-item');

var Breadcrumbs = React.createClass({
    items: [],
    getInitialState: function(){
        return {path: '/', items: []}
    },
    recurse: function(path, lvl){
        var matches = path.match(/(.*\/)?([a-zA-Z0-9\-]+)/);
        if (matches !== null){
            href = '#'+matches[0];
            if (typeof(matches[1]) != "undefined"){
                this.recurse(matches[1], lvl+1)
            }
            href = '#'+matches[0];
            label = matches[2].replace(/\//g, '')
            console.log(lvl, lvl==0)
            this.items.push({
                               id: matches[0],
                               href: href,
                               label: label,
                               current: lvl==0
                            });
        }
    },
    render: function(){
        this.items = [];
        this.recurse(this.props.path, 0)
        var breadItems = this.items.map(function(b){
            if (b.label != '/'){
                return (
                    <BreadcrumbsItem item={b} key={b.id}></BreadcrumbsItem>
                )
            }
        });
        return (
            <div className="breadcrumbs">
                <ul>
                    <li><span className="bread-label home"><a href="/#/"><i className="fa fa-home" aria-hidden="true"></i>Hoomie!</a></span></li>
                    {breadItems}
                </ul>
            </div>
        )
    }
});

module.exports = Breadcrumbs;