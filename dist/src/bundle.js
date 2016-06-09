(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/kevin/Documents/Projets/LBC/lbc-docindex/src/breadcrumbs-item.js":[function(require,module,exports){
/**
 * Created by kevin on 07/03/16.
 */

var BreadcrumbsItem = React.createClass({displayName: "BreadcrumbsItem",
    render: function() {
        return (
            React.createElement("span", null, React.createElement("a", {href: this.props.href}, this.props.label))
        );
    }
})

module.exports = BreadcrumbsItem;

},{}],"/Users/kevin/Documents/Projets/LBC/lbc-docindex/src/breadcrumbs.js":[function(require,module,exports){
/**
 * Created by kevin on 07/03/16.
 */
var BreadcrumbsItem = require('./breadcrumbs-item');

var Breadcrumbs = React.createClass({displayName: "Breadcrumbs",
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
                React.createElement(BreadcrumbsItem, {label: b.label, href: b.href, key: b.id})
            )
        });
        return (
            React.createElement("div", {className: "breadcrumbs"}, 
                React.createElement("span", null, "Path: ", this.state.path), 
                React.createElement("ul", null, 
                    breadItems
                )
            )
        )
    }
});

module.exports = Breadcrumbs;

},{"./breadcrumbs-item":"/Users/kevin/Documents/Projets/LBC/lbc-docindex/src/breadcrumbs-item.js"}],"/Users/kevin/Documents/Projets/LBC/lbc-docindex/src/doc-box.js":[function(require,module,exports){
/**
 * Created by kevin on 07/03/16. 
 */

var Breadcrumbs = require('./breadcrumbs')
var DocList = require('./doc-list');

var DocBox = React.createClass({displayName: "DocBox",
    path: '/',
    baseUrl: "http://"+window.location.hostname+":"+window.location.port+"/test",
    getInitialState: function(){
       return {data: {}, path: '/'}
    } ,
    componentDidMount: function(){
        hash = window.location.hash.substr(1);
        this.path = hash;
        setInterval(this.loadFolders(this.path), this.props.pollInterval);
        $(window).on('hashchange', function(){
            subfolder = window.location.hash.substr(1);
            context.setState(function(previousState, currentProps) {
                previousState['path'] = subfolder;
              return previousState;
            })
            context.path = subfolder;
            context.loadFolders(subfolder);
        });
        context = this;
    },
    sanitizePath: function(subfolder){
        var ret = subfolder.replace(/\//g, '');
        return ret;
    },
    recurse: function(data, path){
        if (!path || path == '/'){
            return data;
        }
        part = path.match(/\/?([a-zA-Z\-0-9]+)(.*)/)
        path = this.sanitizePath(part[1]);
        if (path && data.hasOwnProperty(path)){
            if (data[path].hasOwnProperty('children')){
                data = this.recurse(data[path].children, part[2]);
            }
            else if (data[path].hasOwnProperty('versions')) {
                data = data[path].versions;
            }
            else {
                data = {
                    master:
                    {
                        url: context.baseUrl+"/"+path+"/master"
                    }
                };
            }
        }
        return data;
    },
    loadFolders: function(subfolder) {
        $.ajax({
            url: "/list.json",
            dataType: 'json',
            cache: false,
            success: function(data) {
                data = context.recurse(data, context.path);
                this.setState({data: data, path: context.path});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: function() {
        return (
            React.createElement("div", {className: "doc-box"}, 
                React.createElement(Breadcrumbs, {path: this.state.path}), 
                React.createElement(DocList, {data: this.state.data})
            )
        )
    }
});

module.exports = DocBox;

},{"./breadcrumbs":"/Users/kevin/Documents/Projets/LBC/lbc-docindex/src/breadcrumbs.js","./doc-list":"/Users/kevin/Documents/Projets/LBC/lbc-docindex/src/doc-list.js"}],"/Users/kevin/Documents/Projets/LBC/lbc-docindex/src/doc-list.js":[function(require,module,exports){
/**
 * Created by kevin on 07/03/16.
 */

var DocSquare = require('./doc-square');
var DocVersion = require('./doc-version');

var DocList = React.createClass({displayName: "DocList",
    render: function() {
        if ($.isEmptyObject(this.props.data)){
            return (
                React.createElement("span", null, "I'm Empty -_-")
            );
        }
        else {
            var docNodes = []
            $.each(this.props.data, function(idx, docs){
                if (!$.isEmptyObject(docs)){
                    if (docs.hasOwnProperty('url')){
                        console.log(docs);
                        docNodes.push(
                            React.createElement(DocVersion, {version: idx, name: docs.name, color: docs.color, url: docs.url, key: idx})
                        )
                    }
                    else {
                        docNodes.push(
                            React.createElement(DocSquare, {firstLetter: docs.firstLetter, color: docs.color, fullName: docs.fullName, key: docs.key})
                        )
                    }

                }

            });
            return (
                React.createElement("div", {className: "doc-list", data: this.props.data}, 
                   docNodes
                )
            );
        }
    }
});

module.exports = DocList;

},{"./doc-square":"/Users/kevin/Documents/Projets/LBC/lbc-docindex/src/doc-square.js","./doc-version":"/Users/kevin/Documents/Projets/LBC/lbc-docindex/src/doc-version.js"}],"/Users/kevin/Documents/Projets/LBC/lbc-docindex/src/doc-square.js":[function(require,module,exports){
/**
 * Created by kevin on 07/03/16.
 */

var DocSquare = React.createClass({displayName: "DocSquare",
    handleClick: function(path){
        window.location.hash = window.location.hash + path +"/";

    },
    render: function() {
        var boundClick = this.handleClick.bind(this, this.props.fullName);
        var divStyle = {
            backgroundColor: this.props.color
        }
        return (
            React.createElement("div", {className: "doc-square", style: divStyle, onClick: boundClick}, 
                React.createElement("h2", null, this.props.firstLetter), 
                React.createElement("span", null, this.props.fullName)
            )
        )
    },

});

module.exports = DocSquare;

},{}],"/Users/kevin/Documents/Projets/LBC/lbc-docindex/src/doc-version.js":[function(require,module,exports){
/**
 * Created by kevin on 07/03/16.
 */

var DocVersion = React.createClass({displayName: "DocVersion",
    render: function() {
    	var divStyle = {
            backgroundColor: this.props.color
        }
        return (
            React.createElement("div", {className: "doc-square doc-version", style: divStyle}, 
                React.createElement("h3", null, this.props.name), 
                React.createElement("a", {href: this.props.url}, "browse")
            )
        )
    },

});

module.exports = DocVersion;

},{}],"/Users/kevin/Documents/Projets/LBC/lbc-docindex/src/index.js":[function(require,module,exports){
/**
 * Created by kevin on 07/03/16.
  */

var DocBox = require('./doc-box');

ReactDOM.render(
    React.createElement("div", {className: "main"}, 
        React.createElement("h1", null, "LBC Tech doc"), 
        React.createElement(DocBox, {pollInterval: 20000})
    ),
    document.getElementById('index')
);

},{"./doc-box":"/Users/kevin/Documents/Projets/LBC/lbc-docindex/src/doc-box.js"}]},{},["/Users/kevin/Documents/Projets/LBC/lbc-docindex/src/index.js"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMva2V2aW4vRG9jdW1lbnRzL1Byb2pldHMvTEJDL2xiYy1kb2NpbmRleC9zcmMvYnJlYWRjcnVtYnMtaXRlbS5qcyIsIi9Vc2Vycy9rZXZpbi9Eb2N1bWVudHMvUHJvamV0cy9MQkMvbGJjLWRvY2luZGV4L3NyYy9icmVhZGNydW1icy5qcyIsIi9Vc2Vycy9rZXZpbi9Eb2N1bWVudHMvUHJvamV0cy9MQkMvbGJjLWRvY2luZGV4L3NyYy9kb2MtYm94LmpzIiwiL1VzZXJzL2tldmluL0RvY3VtZW50cy9Qcm9qZXRzL0xCQy9sYmMtZG9jaW5kZXgvc3JjL2RvYy1saXN0LmpzIiwiL1VzZXJzL2tldmluL0RvY3VtZW50cy9Qcm9qZXRzL0xCQy9sYmMtZG9jaW5kZXgvc3JjL2RvYy1zcXVhcmUuanMiLCIvVXNlcnMva2V2aW4vRG9jdW1lbnRzL1Byb2pldHMvTEJDL2xiYy1kb2NpbmRleC9zcmMvZG9jLXZlcnNpb24uanMiLCIvVXNlcnMva2V2aW4vRG9jdW1lbnRzL1Byb2pldHMvTEJDL2xiYy1kb2NpbmRleC9zcmMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7QUFFQSxHQUFHOztBQUVILElBQUkscUNBQXFDLCtCQUFBO0lBQ3JDLE1BQU0sRUFBRSxXQUFXO1FBQ2Y7WUFDSSxvQkFBQSxNQUFLLEVBQUEsSUFBQyxFQUFBLG9CQUFBLEdBQUUsRUFBQSxDQUFBLENBQUMsSUFBQSxFQUFJLENBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFNLENBQUEsRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQVUsQ0FBTyxDQUFBO1VBQy9EO0tBQ0w7QUFDTCxDQUFDLENBQUM7O0FBRUYsTUFBTSxDQUFDLE9BQU8sR0FBRyxlQUFlOzs7QUNaaEM7O0dBRUc7QUFDSCxJQUFJLGVBQWUsR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQzs7QUFFcEQsSUFBSSxpQ0FBaUMsMkJBQUE7SUFDakMsZUFBZSxFQUFFLFVBQVU7UUFDdkIsT0FBTyxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQztLQUNoQztJQUNELE9BQU8sRUFBRSxTQUFTLElBQUksQ0FBQztRQUNuQixPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBQy9DLElBQUksT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDbkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM1QjtRQUNELElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQzsrQkFDQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQzsrQkFDaEIsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7aUNBQ2Y7Z0NBQ0QsQ0FBQztLQUM1QjtJQUNELGlCQUFpQixFQUFFLFVBQVU7UUFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1FBQ2xDLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztLQUM5QjtJQUNELE1BQU0sRUFBRSxVQUFVO1FBQ2QsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzdDO2dCQUNJLG9CQUFDLGVBQWUsRUFBQSxDQUFBLENBQUMsS0FBQSxFQUFLLENBQUUsQ0FBQyxDQUFDLEtBQUssRUFBQyxDQUFDLElBQUEsRUFBSSxDQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxHQUFBLEVBQUcsQ0FBRSxDQUFDLENBQUMsRUFBSSxDQUFrQixDQUFBO2FBQy9FO1NBQ0osQ0FBQyxDQUFDO1FBQ0g7WUFDSSxvQkFBQSxLQUFJLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFDLGFBQWMsQ0FBQSxFQUFBO2dCQUN6QixvQkFBQSxNQUFLLEVBQUEsSUFBQyxFQUFBLFFBQUEsRUFBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQVksQ0FBQSxFQUFBO2dCQUNwQyxvQkFBQSxJQUFHLEVBQUEsSUFBQyxFQUFBO29CQUNDLFVBQVc7Z0JBQ1gsQ0FBQTtZQUNILENBQUE7U0FDVDtLQUNKO0FBQ0wsQ0FBQyxDQUFDLENBQUM7O0FBRUgsTUFBTSxDQUFDLE9BQU8sR0FBRyxXQUFXOzs7QUMxQzVCOztBQUVBLEdBQUc7O0FBRUgsSUFBSSxXQUFXLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQztBQUMxQyxJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7O0FBRXBDLElBQUksNEJBQTRCLHNCQUFBO0lBQzVCLElBQUksRUFBRSxHQUFHO0lBQ1QsT0FBTyxFQUFFLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTztJQUM1RSxlQUFlLEVBQUUsVUFBVTtPQUN4QixPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDO0tBQzlCO0lBQ0QsaUJBQWlCLEVBQUUsVUFBVTtRQUN6QixJQUFJLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ2xFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLFVBQVU7WUFDakMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzQyxPQUFPLENBQUMsUUFBUSxDQUFDLFNBQVMsYUFBYSxFQUFFLFlBQVksRUFBRTtnQkFDbkQsYUFBYSxDQUFDLE1BQU0sQ0FBQyxHQUFHLFNBQVMsQ0FBQztjQUNwQyxPQUFPLGFBQWEsQ0FBQzthQUN0QixDQUFDO1lBQ0YsT0FBTyxDQUFDLElBQUksR0FBRyxTQUFTLENBQUM7WUFDekIsT0FBTyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUNsQyxDQUFDLENBQUM7UUFDSCxPQUFPLEdBQUcsSUFBSSxDQUFDO0tBQ2xCO0lBQ0QsWUFBWSxFQUFFLFNBQVMsU0FBUyxDQUFDO1FBQzdCLElBQUksR0FBRyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZDLE9BQU8sR0FBRyxDQUFDO0tBQ2Q7SUFDRCxPQUFPLEVBQUUsU0FBUyxJQUFJLEVBQUUsSUFBSSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxJQUFJLEdBQUcsQ0FBQztZQUNyQixPQUFPLElBQUksQ0FBQztTQUNmO1FBQ0QsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMseUJBQXlCLENBQUM7UUFDNUMsSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEMsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNsQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ3RDLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDckQ7aUJBQ0ksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxFQUFFO2dCQUM1QyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQzthQUM5QjtpQkFDSTtnQkFDRCxJQUFJLEdBQUc7b0JBQ0gsTUFBTTtvQkFDTjt3QkFDSSxHQUFHLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVM7cUJBQzFDO2lCQUNKLENBQUM7YUFDTDtTQUNKO1FBQ0QsT0FBTyxJQUFJLENBQUM7S0FDZjtJQUNELFdBQVcsRUFBRSxTQUFTLFNBQVMsRUFBRTtRQUM3QixDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ0gsR0FBRyxFQUFFLFlBQVk7WUFDakIsUUFBUSxFQUFFLE1BQU07WUFDaEIsS0FBSyxFQUFFLEtBQUs7WUFDWixPQUFPLEVBQUUsU0FBUyxJQUFJLEVBQUU7Z0JBQ3BCLElBQUksR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzNDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzthQUNuRCxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDWixLQUFLLEVBQUUsU0FBUyxHQUFHLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRTtnQkFDOUIsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7YUFDekQsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1NBQ2YsQ0FBQyxDQUFDO0tBQ047SUFDRCxNQUFNLEVBQUUsV0FBVztRQUNmO1lBQ0ksb0JBQUEsS0FBSSxFQUFBLENBQUEsQ0FBQyxTQUFBLEVBQVMsQ0FBQyxTQUFVLENBQUEsRUFBQTtnQkFDckIsb0JBQUMsV0FBVyxFQUFBLENBQUEsQ0FBQyxJQUFBLEVBQUksQ0FBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUssQ0FBRSxDQUFBLEVBQUE7Z0JBQ3JDLG9CQUFDLE9BQU8sRUFBQSxDQUFBLENBQUMsSUFBQSxFQUFJLENBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFLLENBQUEsQ0FBRyxDQUFBO1lBQ2hDLENBQUE7U0FDVDtLQUNKO0FBQ0wsQ0FBQyxDQUFDLENBQUM7O0FBRUgsTUFBTSxDQUFDLE9BQU8sR0FBRyxNQUFNOzs7QUNoRnZCOztBQUVBLEdBQUc7O0FBRUgsSUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQ3hDLElBQUksVUFBVSxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQzs7QUFFMUMsSUFBSSw2QkFBNkIsdUJBQUE7SUFDN0IsTUFBTSxFQUFFLFdBQVc7UUFDZixJQUFJLENBQUMsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNqQztnQkFDSSxvQkFBQSxNQUFLLEVBQUEsSUFBQyxFQUFBLGVBQW9CLENBQUE7Y0FDNUI7U0FDTDthQUNJO1lBQ0QsSUFBSSxRQUFRLEdBQUcsRUFBRTtZQUNqQixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsR0FBRyxFQUFFLElBQUksQ0FBQztnQkFDdkMsSUFBSSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3ZCLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDbEIsUUFBUSxDQUFDLElBQUk7NEJBQ1Qsb0JBQUMsVUFBVSxFQUFBLENBQUEsQ0FBQyxPQUFBLEVBQU8sQ0FBRSxHQUFHLEVBQUMsQ0FBQyxJQUFBLEVBQUksQ0FBRSxJQUFJLENBQUMsSUFBSSxFQUFDLENBQUMsS0FBQSxFQUFLLENBQUUsSUFBSSxDQUFDLEtBQUssRUFBQyxDQUFDLEdBQUEsRUFBRyxDQUFFLElBQUksQ0FBQyxHQUFHLEVBQUMsRUFBRSxHQUFBLEVBQUcsQ0FBRSxHQUFLLENBQWEsQ0FBQTt5QkFDeEc7cUJBQ0o7eUJBQ0k7d0JBQ0QsUUFBUSxDQUFDLElBQUk7NEJBQ1Qsb0JBQUMsU0FBUyxFQUFBLENBQUEsQ0FBQyxXQUFBLEVBQVcsQ0FBRSxJQUFJLENBQUMsV0FBVyxFQUFDLENBQUMsS0FBQSxFQUFLLENBQUUsSUFBSSxDQUFDLEtBQUssRUFBQyxDQUFDLFFBQUEsRUFBUSxDQUFFLElBQUksQ0FBQyxRQUFRLEVBQUMsQ0FBQyxHQUFBLEVBQUcsQ0FBRSxJQUFJLENBQUMsR0FBSyxDQUFZLENBQUE7eUJBQ3BIO0FBQ3pCLHFCQUFxQjs7QUFFckIsaUJBQWlCOzthQUVKLENBQUMsQ0FBQztZQUNIO2dCQUNJLG9CQUFBLEtBQUksRUFBQSxDQUFBLENBQUMsU0FBQSxFQUFTLENBQUMsVUFBQSxFQUFVLENBQUMsSUFBQSxFQUFJLENBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFNLENBQUEsRUFBQTttQkFDN0MsUUFBUztnQkFDUCxDQUFBO2NBQ1I7U0FDTDtLQUNKO0FBQ0wsQ0FBQyxDQUFDLENBQUM7O0FBRUgsTUFBTSxDQUFDLE9BQU8sR0FBRyxPQUFPOzs7QUMxQ3hCOztBQUVBLEdBQUc7O0FBRUgsSUFBSSwrQkFBK0IseUJBQUE7SUFDL0IsV0FBVyxFQUFFLFNBQVMsSUFBSSxDQUFDO0FBQy9CLFFBQVEsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxFQUFFLEdBQUcsQ0FBQzs7S0FFM0Q7SUFDRCxNQUFNLEVBQUUsV0FBVztRQUNmLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2xFLElBQUksUUFBUSxHQUFHO1lBQ1gsZUFBZSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSztTQUNwQztRQUNEO1lBQ0ksb0JBQUEsS0FBSSxFQUFBLENBQUEsQ0FBQyxTQUFBLEVBQVMsQ0FBQyxZQUFBLEVBQVksQ0FBQyxLQUFBLEVBQUssQ0FBRSxRQUFRLEVBQUMsQ0FBQyxPQUFBLEVBQU8sQ0FBRSxVQUFZLENBQUEsRUFBQTtnQkFDOUQsb0JBQUEsSUFBRyxFQUFBLElBQUMsRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQWlCLENBQUEsRUFBQTtnQkFDakMsb0JBQUEsTUFBSyxFQUFBLElBQUMsRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQWdCLENBQUE7WUFDaEMsQ0FBQTtTQUNUO0FBQ1QsS0FBSzs7QUFFTCxDQUFDLENBQUMsQ0FBQzs7QUFFSCxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVM7OztBQ3hCMUI7O0FBRUEsR0FBRzs7QUFFSCxJQUFJLGdDQUFnQywwQkFBQTtJQUNoQyxNQUFNLEVBQUUsV0FBVztLQUNsQixJQUFJLFFBQVEsR0FBRztZQUNSLGVBQWUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUs7U0FDcEM7UUFDRDtZQUNJLG9CQUFBLEtBQUksRUFBQSxDQUFBLENBQUMsU0FBQSxFQUFTLENBQUMsd0JBQUEsRUFBd0IsQ0FBQyxLQUFBLEVBQUssQ0FBRSxRQUFTLENBQUUsQ0FBQSxFQUFBO2dCQUN0RCxvQkFBQSxJQUFHLEVBQUEsSUFBQyxFQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBVSxDQUFBLEVBQUE7Z0JBQzFCLG9CQUFBLEdBQUUsRUFBQSxDQUFBLENBQUMsSUFBQSxFQUFJLENBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFLLENBQUEsRUFBQSxRQUFVLENBQUE7WUFDakMsQ0FBQTtTQUNUO0FBQ1QsS0FBSzs7QUFFTCxDQUFDLENBQUMsQ0FBQzs7QUFFSCxNQUFNLENBQUMsT0FBTyxHQUFHLFVBQVU7OztBQ25CM0I7O0FBRUEsSUFBSTs7QUFFSixJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7O0FBRWxDLFFBQVEsQ0FBQyxNQUFNO0lBQ1gsb0JBQUEsS0FBSSxFQUFBLENBQUEsQ0FBQyxTQUFBLEVBQVMsQ0FBQyxNQUFPLENBQUEsRUFBQTtRQUNsQixvQkFBQSxJQUFHLEVBQUEsSUFBQyxFQUFBLGNBQWlCLENBQUEsRUFBQTtRQUNyQixvQkFBQyxNQUFNLEVBQUEsQ0FBQSxDQUFDLFlBQUEsRUFBWSxDQUFFLEtBQU0sQ0FBRSxDQUFBO0lBQzVCLENBQUE7SUFDTixRQUFRLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQztDQUNuQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKipcbiAqIENyZWF0ZWQgYnkga2V2aW4gb24gMDcvMDMvMTYuXG4gKi9cblxudmFyIEJyZWFkY3J1bWJzSXRlbSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHNwYW4+PGEgaHJlZj17dGhpcy5wcm9wcy5ocmVmfT57dGhpcy5wcm9wcy5sYWJlbH08L2E+PC9zcGFuPlxuICAgICAgICApO1xuICAgIH1cbn0pXG5cbm1vZHVsZS5leHBvcnRzID0gQnJlYWRjcnVtYnNJdGVtOyIsIi8qKlxuICogQ3JlYXRlZCBieSBrZXZpbiBvbiAwNy8wMy8xNi5cbiAqL1xudmFyIEJyZWFkY3J1bWJzSXRlbSA9IHJlcXVpcmUoJy4vYnJlYWRjcnVtYnMtaXRlbScpO1xuXG52YXIgQnJlYWRjcnVtYnMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpe1xuICAgICAgICByZXR1cm4ge3BhdGg6ICcvJywgaXRlbXM6IFtdfVxuICAgIH0sXG4gICAgcmVjdXJzZTogZnVuY3Rpb24ocGF0aCl7XG4gICAgICAgIG1hdGNoZXMgPSBwYXRoLm1hdGNoKC8oLiopXFwvKFthLXpBLVowLTlcXC1dKykvKTtcbiAgICAgICAgaWYgKG1hdGNoZXMubGVuZ3RoID4gMil7XG4gICAgICAgICAgICB0aGlzLnJlY3Vyc2UobWF0Y2hlc1syXSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdGF0ZS5pdGVtcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBocmVmOiBtYXRjaGVzWzFdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBtYXRjaGVzWzBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgIH0sXG4gICAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCl7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMucHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUucGF0aCA9IHRoaXMucHJvcHMucGF0aDtcbiAgICAgICAgYmFzZVBhdGggPSB0aGlzLnByb3BzLnBhdGg7XG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciBicmVhZEl0ZW1zID0gdGhpcy5zdGF0ZS5pdGVtcy5tYXAoZnVuY3Rpb24oYil7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxCcmVhZGNydW1ic0l0ZW0gbGFiZWw9e2IubGFiZWx9IGhyZWY9e2IuaHJlZn0ga2V5PXtiLmlkfT48L0JyZWFkY3J1bWJzSXRlbT5cbiAgICAgICAgICAgIClcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJyZWFkY3J1bWJzXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4+UGF0aDoge3RoaXMuc3RhdGUucGF0aH08L3NwYW4+XG4gICAgICAgICAgICAgICAgPHVsPlxuICAgICAgICAgICAgICAgICAgICB7YnJlYWRJdGVtc31cbiAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBCcmVhZGNydW1iczsiLCIvKipcbiAqIENyZWF0ZWQgYnkga2V2aW4gb24gMDcvMDMvMTYuIFxuICovXG5cbnZhciBCcmVhZGNydW1icyA9IHJlcXVpcmUoJy4vYnJlYWRjcnVtYnMnKVxudmFyIERvY0xpc3QgPSByZXF1aXJlKCcuL2RvYy1saXN0Jyk7XG5cbnZhciBEb2NCb3ggPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgcGF0aDogJy8nLFxuICAgIGJhc2VVcmw6IFwiaHR0cDovL1wiK3dpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZStcIjpcIit3aW5kb3cubG9jYXRpb24ucG9ydCtcIi90ZXN0XCIsXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpe1xuICAgICAgIHJldHVybiB7ZGF0YToge30sIHBhdGg6ICcvJ31cbiAgICB9ICxcbiAgICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKXtcbiAgICAgICAgaGFzaCA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoLnN1YnN0cigxKTtcbiAgICAgICAgdGhpcy5wYXRoID0gaGFzaDtcbiAgICAgICAgc2V0SW50ZXJ2YWwodGhpcy5sb2FkRm9sZGVycyh0aGlzLnBhdGgpLCB0aGlzLnByb3BzLnBvbGxJbnRlcnZhbCk7XG4gICAgICAgICQod2luZG93KS5vbignaGFzaGNoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBzdWJmb2xkZXIgPSB3aW5kb3cubG9jYXRpb24uaGFzaC5zdWJzdHIoMSk7XG4gICAgICAgICAgICBjb250ZXh0LnNldFN0YXRlKGZ1bmN0aW9uKHByZXZpb3VzU3RhdGUsIGN1cnJlbnRQcm9wcykge1xuICAgICAgICAgICAgICAgIHByZXZpb3VzU3RhdGVbJ3BhdGgnXSA9IHN1YmZvbGRlcjtcbiAgICAgICAgICAgICAgcmV0dXJuIHByZXZpb3VzU3RhdGU7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgY29udGV4dC5wYXRoID0gc3ViZm9sZGVyO1xuICAgICAgICAgICAgY29udGV4dC5sb2FkRm9sZGVycyhzdWJmb2xkZXIpO1xuICAgICAgICB9KTtcbiAgICAgICAgY29udGV4dCA9IHRoaXM7XG4gICAgfSxcbiAgICBzYW5pdGl6ZVBhdGg6IGZ1bmN0aW9uKHN1YmZvbGRlcil7XG4gICAgICAgIHZhciByZXQgPSBzdWJmb2xkZXIucmVwbGFjZSgvXFwvL2csICcnKTtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9LFxuICAgIHJlY3Vyc2U6IGZ1bmN0aW9uKGRhdGEsIHBhdGgpe1xuICAgICAgICBpZiAoIXBhdGggfHwgcGF0aCA9PSAnLycpe1xuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgIH1cbiAgICAgICAgcGFydCA9IHBhdGgubWF0Y2goL1xcLz8oW2EtekEtWlxcLTAtOV0rKSguKikvKVxuICAgICAgICBwYXRoID0gdGhpcy5zYW5pdGl6ZVBhdGgocGFydFsxXSk7XG4gICAgICAgIGlmIChwYXRoICYmIGRhdGEuaGFzT3duUHJvcGVydHkocGF0aCkpe1xuICAgICAgICAgICAgaWYgKGRhdGFbcGF0aF0uaGFzT3duUHJvcGVydHkoJ2NoaWxkcmVuJykpe1xuICAgICAgICAgICAgICAgIGRhdGEgPSB0aGlzLnJlY3Vyc2UoZGF0YVtwYXRoXS5jaGlsZHJlbiwgcGFydFsyXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChkYXRhW3BhdGhdLmhhc093blByb3BlcnR5KCd2ZXJzaW9ucycpKSB7XG4gICAgICAgICAgICAgICAgZGF0YSA9IGRhdGFbcGF0aF0udmVyc2lvbnM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBkYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICBtYXN0ZXI6XG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogY29udGV4dC5iYXNlVXJsK1wiL1wiK3BhdGgrXCIvbWFzdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfSxcbiAgICBsb2FkRm9sZGVyczogZnVuY3Rpb24oc3ViZm9sZGVyKSB7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IFwiL2xpc3QuanNvblwiLFxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBkYXRhID0gY29udGV4dC5yZWN1cnNlKGRhdGEsIGNvbnRleHQucGF0aCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZGF0YTogZGF0YSwgcGF0aDogY29udGV4dC5wYXRofSk7XG4gICAgICAgICAgICB9LmJpbmQodGhpcyksXG4gICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24oeGhyLCBzdGF0dXMsIGVycikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IodGhpcy5wcm9wcy51cmwsIHN0YXR1cywgZXJyLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgfS5iaW5kKHRoaXMpXG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZG9jLWJveFwiPlxuICAgICAgICAgICAgICAgIDxCcmVhZGNydW1icyBwYXRoPXt0aGlzLnN0YXRlLnBhdGh9Lz5cbiAgICAgICAgICAgICAgICA8RG9jTGlzdCBkYXRhPXt0aGlzLnN0YXRlLmRhdGF9IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERvY0JveDsiLCIvKipcbiAqIENyZWF0ZWQgYnkga2V2aW4gb24gMDcvMDMvMTYuXG4gKi9cblxudmFyIERvY1NxdWFyZSA9IHJlcXVpcmUoJy4vZG9jLXNxdWFyZScpO1xudmFyIERvY1ZlcnNpb24gPSByZXF1aXJlKCcuL2RvYy12ZXJzaW9uJyk7XG5cbnZhciBEb2NMaXN0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICgkLmlzRW1wdHlPYmplY3QodGhpcy5wcm9wcy5kYXRhKSl7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxzcGFuPkknbSBFbXB0eSAtXy08L3NwYW4+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyIGRvY05vZGVzID0gW11cbiAgICAgICAgICAgICQuZWFjaCh0aGlzLnByb3BzLmRhdGEsIGZ1bmN0aW9uKGlkeCwgZG9jcyl7XG4gICAgICAgICAgICAgICAgaWYgKCEkLmlzRW1wdHlPYmplY3QoZG9jcykpe1xuICAgICAgICAgICAgICAgICAgICBpZiAoZG9jcy5oYXNPd25Qcm9wZXJ0eSgndXJsJykpe1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZG9jcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb2NOb2Rlcy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxEb2NWZXJzaW9uIHZlcnNpb249e2lkeH0gbmFtZT17ZG9jcy5uYW1lfSBjb2xvcj17ZG9jcy5jb2xvcn0gdXJsPXtkb2NzLnVybH0gIGtleT17aWR4fT48L0RvY1ZlcnNpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb2NOb2Rlcy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxEb2NTcXVhcmUgZmlyc3RMZXR0ZXI9e2RvY3MuZmlyc3RMZXR0ZXJ9IGNvbG9yPXtkb2NzLmNvbG9yfSBmdWxsTmFtZT17ZG9jcy5mdWxsTmFtZX0ga2V5PXtkb2NzLmtleX0+PC9Eb2NTcXVhcmU+XG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZG9jLWxpc3RcIiBkYXRhPXt0aGlzLnByb3BzLmRhdGF9PlxuICAgICAgICAgICAgICAgICAgIHtkb2NOb2Rlc31cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBEb2NMaXN0OyIsIi8qKlxuICogQ3JlYXRlZCBieSBrZXZpbiBvbiAwNy8wMy8xNi5cbiAqL1xuXG52YXIgRG9jU3F1YXJlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIGhhbmRsZUNsaWNrOiBmdW5jdGlvbihwYXRoKXtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSB3aW5kb3cubG9jYXRpb24uaGFzaCArIHBhdGggK1wiL1wiO1xuXG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgYm91bmRDbGljayA9IHRoaXMuaGFuZGxlQ2xpY2suYmluZCh0aGlzLCB0aGlzLnByb3BzLmZ1bGxOYW1lKTtcbiAgICAgICAgdmFyIGRpdlN0eWxlID0ge1xuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiB0aGlzLnByb3BzLmNvbG9yXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZG9jLXNxdWFyZVwiIHN0eWxlPXtkaXZTdHlsZX0gb25DbGljaz17Ym91bmRDbGlja30+XG4gICAgICAgICAgICAgICAgPGgyPnt0aGlzLnByb3BzLmZpcnN0TGV0dGVyfTwvaDI+XG4gICAgICAgICAgICAgICAgPHNwYW4+e3RoaXMucHJvcHMuZnVsbE5hbWV9PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9LFxuXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBEb2NTcXVhcmU7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGtldmluIG9uIDA3LzAzLzE2LlxuICovXG5cbnZhciBEb2NWZXJzaW9uID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgXHR2YXIgZGl2U3R5bGUgPSB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IHRoaXMucHJvcHMuY29sb3JcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkb2Mtc3F1YXJlIGRvYy12ZXJzaW9uXCIgc3R5bGU9e2RpdlN0eWxlfSA+XG4gICAgICAgICAgICAgICAgPGgzPnt0aGlzLnByb3BzLm5hbWV9PC9oMz5cbiAgICAgICAgICAgICAgICA8YSBocmVmPXt0aGlzLnByb3BzLnVybH0+YnJvd3NlPC9hPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9LFxuXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBEb2NWZXJzaW9uOyIsIi8qKlxuICogQ3JlYXRlZCBieSBrZXZpbiBvbiAwNy8wMy8xNi5cbiAgKi9cblxudmFyIERvY0JveCA9IHJlcXVpcmUoJy4vZG9jLWJveCcpO1xuXG5SZWFjdERPTS5yZW5kZXIoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJtYWluXCI+XG4gICAgICAgIDxoMT5MQkMgVGVjaCBkb2M8L2gxPlxuICAgICAgICA8RG9jQm94IHBvbGxJbnRlcnZhbD17MjAwMDB9Lz5cbiAgICA8L2Rpdj4sXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2luZGV4Jylcbik7Il19
