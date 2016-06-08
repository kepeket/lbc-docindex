(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/home/kevin/LBC/docui/src/breadcrumbs-item.js":[function(require,module,exports){
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

},{}],"/home/kevin/LBC/docui/src/breadcrumbs.js":[function(require,module,exports){
/**
 * Created by kevin on 07/03/16.
 */
var BreadcrumbsItem = require('./breadcrumbs-item');

var Breadcrumbs = React.createClass({displayName: "Breadcrumbs",
    getInitialState: function(){
        return {path: '/', items: []}
    },
    render: function(){
        var breadItems = this.state.items.map(function(b){
            return (
                React.createElement(BreadcrumbsItem, {label: b.firstLetter, href: b.href, key: b.id})
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

},{"./breadcrumbs-item":"/home/kevin/LBC/docui/src/breadcrumbs-item.js"}],"/home/kevin/LBC/docui/src/doc-box.js":[function(require,module,exports){
/**
 * Created by kevin on 07/03/16. 
 */

var Breadcrumbs = require('./breadcrumbs')
var DocList = require('./doc-list');

var DocBox = React.createClass({displayName: "DocBox",
    path: '/',
    baseUrl: "http://"+window.location.hostname+":"+window.location.port+"/test",
    getInitialState: function(){
       return {data: {}}
    } ,
    componentDidMount: function(){
        hash = window.location.hash.substr(1);
        this.path = hash;
        setInterval(this.loadFolders(this.path), this.props.pollInterval);
        $(window).on('hashchange', function(){
            subfolder = window.location.hash.substr(1);
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
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: function() {
        return (
            React.createElement("div", {className: "doc-box"}, 
                React.createElement("h1", null, "Doc Folders"), 
                React.createElement(Breadcrumbs, null), 
                React.createElement(DocList, {data: this.state.data})
            )
        )
    }
});

module.exports = DocBox;

},{"./breadcrumbs":"/home/kevin/LBC/docui/src/breadcrumbs.js","./doc-list":"/home/kevin/LBC/docui/src/doc-list.js"}],"/home/kevin/LBC/docui/src/doc-list.js":[function(require,module,exports){
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
                        docNodes.push(
                            React.createElement(DocVersion, {version: idx, name: docs.name, color: "green", url: docs.url, key: idx})
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

},{"./doc-square":"/home/kevin/LBC/docui/src/doc-square.js","./doc-version":"/home/kevin/LBC/docui/src/doc-version.js"}],"/home/kevin/LBC/docui/src/doc-square.js":[function(require,module,exports){
/**
 * Created by kevin on 07/03/16.
 */

var DocSquare = React.createClass({displayName: "DocSquare",
    handleClick: function(path){
        window.location.hash = window.location.hash + path +"/";

    },
    render: function() {
        var boundClick = this.handleClick.bind(this, this.props.fullName);
        return (
            React.createElement("div", {className: this.props.color + " doc-square", onClick: boundClick}, 
                React.createElement("h2", null, this.props.firstLetter), 
                React.createElement("span", null, this.props.fullName)
            )
        )
    },

});

module.exports = DocSquare;

},{}],"/home/kevin/LBC/docui/src/doc-version.js":[function(require,module,exports){
/**
 * Created by kevin on 07/03/16.
 */

var DocVersion = React.createClass({displayName: "DocVersion",
    render: function() {
        return (
            React.createElement("div", {className: "doc-square doc-version"}, 
                React.createElement("h3", null, this.props.name), 
                React.createElement("a", {href: this.props.url}, "browse")
            )
        )
    },

});

module.exports = DocVersion;

},{}],"/home/kevin/LBC/docui/src/index.js":[function(require,module,exports){
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

},{"./doc-box":"/home/kevin/LBC/docui/src/doc-box.js"}]},{},["/home/kevin/LBC/docui/src/index.js"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Vzci9saWIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9ob21lL2tldmluL0xCQy9kb2N1aS9zcmMvYnJlYWRjcnVtYnMtaXRlbS5qcyIsIi9ob21lL2tldmluL0xCQy9kb2N1aS9zcmMvYnJlYWRjcnVtYnMuanMiLCIvaG9tZS9rZXZpbi9MQkMvZG9jdWkvc3JjL2RvYy1ib3guanMiLCIvaG9tZS9rZXZpbi9MQkMvZG9jdWkvc3JjL2RvYy1saXN0LmpzIiwiL2hvbWUva2V2aW4vTEJDL2RvY3VpL3NyYy9kb2Mtc3F1YXJlLmpzIiwiL2hvbWUva2V2aW4vTEJDL2RvY3VpL3NyYy9kb2MtdmVyc2lvbi5qcyIsIi9ob21lL2tldmluL0xCQy9kb2N1aS9zcmMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7QUFFQSxHQUFHOztBQUVILElBQUkscUNBQXFDLCtCQUFBO0lBQ3JDLE1BQU0sRUFBRSxXQUFXO1FBQ2Y7WUFDSSxvQkFBQSxNQUFLLEVBQUEsSUFBQyxFQUFBLG9CQUFBLEdBQUUsRUFBQSxDQUFBLENBQUMsSUFBQSxFQUFJLENBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFNLENBQUEsRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQVUsQ0FBTyxDQUFBO1VBQy9EO0tBQ0w7QUFDTCxDQUFDLENBQUM7O0FBRUYsTUFBTSxDQUFDLE9BQU8sR0FBRyxlQUFlOzs7QUNaaEM7O0dBRUc7QUFDSCxJQUFJLGVBQWUsR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQzs7QUFFcEQsSUFBSSxpQ0FBaUMsMkJBQUE7SUFDakMsZUFBZSxFQUFFLFVBQVU7UUFDdkIsT0FBTyxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQztLQUNoQztJQUNELE1BQU0sRUFBRSxVQUFVO1FBQ2QsSUFBSSxVQUFVLEdB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QUFDLE1BQU0sRUFBQSxDQUFBLENBQUMsWUFBQSxFQUFZLENBQUUsS0FBTSxDQUFFLENBQUE7SUFDNUIsQ0FBQTtJQUNOLFFBQVEsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDO0NBQ25DIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKlxuICogQ3JlYXRlZCBieSBrZXZpbiBvbiAwNy8wMy8xNi5cbiAqL1xuXG52YXIgQnJlYWRjcnVtYnNJdGVtID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8c3Bhbj48YSBocmVmPXt0aGlzLnByb3BzLmhyZWZ9Pnt0aGlzLnByb3BzLmxhYmVsfTwvYT48L3NwYW4+XG4gICAgICAgICk7XG4gICAgfVxufSlcblxubW9kdWxlLmV4cG9ydHMgPSBCcmVhZGNydW1ic0l0ZW07IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGtldmluIG9uIDA3LzAzLzE2LlxuICovXG52YXIgQnJlYWRjcnVtYnNJdGVtID0gcmVxdWlyZSgnLi9icmVhZGNydW1icy1pdGVtJyk7XG5cbnZhciBCcmVhZGNydW1icyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHJldHVybiB7cGF0aDogJy8nLCBpdGVtczogW119XG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciBicmVhZEl0ZW1zID0gdGhpcy5zdGF0ZS5pdGVtcy5tYXAoZnVuY3Rpb24oYil7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxCcmVhZGNydW1ic0l0ZW0gbGFiZWw9e2IuZmlyc3RMZXR0ZXJ9IGhyZWY9e2IuaHJlZn0ga2V5PXtiLmlkfT48L0JyZWFkY3J1bWJzSXRlbT5cbiAgICAgICAgICAgIClcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJyZWFkY3J1bWJzXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4+UGF0aDoge3RoaXMuc3RhdGUucGF0aH08L3NwYW4+XG4gICAgICAgICAgICAgICAgPHVsPlxuICAgICAgICAgICAgICAgICAgICB7YnJlYWRJdGVtc31cbiAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBCcmVhZGNydW1iczsiLCIvKipcbiAqIENyZWF0ZWQgYnkga2V2aW4gb24gMDcvMDMvMTYuIFxuICovXG5cbnZhciBCcmVhZGNydW1icyA9IHJlcXVpcmUoJy4vYnJlYWRjcnVtYnMnKVxudmFyIERvY0xpc3QgPSByZXF1aXJlKCcuL2RvYy1saXN0Jyk7XG5cbnZhciBEb2NCb3ggPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgcGF0aDogJy8nLFxuICAgIGJhc2VVcmw6IFwiaHR0cDovL1wiK3dpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZStcIjpcIit3aW5kb3cubG9jYXRpb24ucG9ydCtcIi90ZXN0XCIsXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpe1xuICAgICAgIHJldHVybiB7ZGF0YToge319XG4gICAgfSAsXG4gICAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCl7XG4gICAgICAgIGhhc2ggPSB3aW5kb3cubG9jYXRpb24uaGFzaC5zdWJzdHIoMSk7XG4gICAgICAgIHRoaXMucGF0aCA9IGhhc2g7XG4gICAgICAgIHNldEludGVydmFsKHRoaXMubG9hZEZvbGRlcnModGhpcy5wYXRoKSwgdGhpcy5wcm9wcy5wb2xsSW50ZXJ2YWwpO1xuICAgICAgICAkKHdpbmRvdykub24oJ2hhc2hjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgc3ViZm9sZGVyID0gd2luZG93LmxvY2F0aW9uLmhhc2guc3Vic3RyKDEpO1xuICAgICAgICAgICAgY29udGV4dC5wYXRoID0gc3ViZm9sZGVyO1xuICAgICAgICAgICAgY29udGV4dC5sb2FkRm9sZGVycyhzdWJmb2xkZXIpO1xuICAgICAgICB9KTtcbiAgICAgICAgY29udGV4dCA9IHRoaXM7XG4gICAgfSxcbiAgICBzYW5pdGl6ZVBhdGg6IGZ1bmN0aW9uKHN1YmZvbGRlcil7XG4gICAgICAgIHZhciByZXQgPSBzdWJmb2xkZXIucmVwbGFjZSgvXFwvL2csICcnKTtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9LFxuICAgIHJlY3Vyc2U6IGZ1bmN0aW9uKGRhdGEsIHBhdGgpe1xuICAgICAgICBpZiAoIXBhdGggfHwgcGF0aCA9PSAnLycpe1xuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgIH1cbiAgICAgICAgcGFydCA9IHBhdGgubWF0Y2goL1xcLz8oW2EtekEtWlxcLTAtOV0rKSguKikvKVxuICAgICAgICBwYXRoID0gdGhpcy5zYW5pdGl6ZVBhdGgocGFydFsxXSk7XG4gICAgICAgIGlmIChwYXRoICYmIGRhdGEuaGFzT3duUHJvcGVydHkocGF0aCkpe1xuICAgICAgICAgICAgaWYgKGRhdGFbcGF0aF0uaGFzT3duUHJvcGVydHkoJ2NoaWxkcmVuJykpe1xuICAgICAgICAgICAgICAgIGRhdGEgPSB0aGlzLnJlY3Vyc2UoZGF0YVtwYXRoXS5jaGlsZHJlbiwgcGFydFsyXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChkYXRhW3BhdGhdLmhhc093blByb3BlcnR5KCd2ZXJzaW9ucycpKSB7XG4gICAgICAgICAgICAgICAgZGF0YSA9IGRhdGFbcGF0aF0udmVyc2lvbnM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBkYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICBtYXN0ZXI6XG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogY29udGV4dC5iYXNlVXJsK1wiL1wiK3BhdGgrXCIvbWFzdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfSxcbiAgICBsb2FkRm9sZGVyczogZnVuY3Rpb24oc3ViZm9sZGVyKSB7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IFwiL2xpc3QuanNvblwiLFxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBkYXRhID0gY29udGV4dC5yZWN1cnNlKGRhdGEsIGNvbnRleHQucGF0aCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZGF0YTogZGF0YX0pO1xuICAgICAgICAgICAgfS5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKHhociwgc3RhdHVzLCBlcnIpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKHRoaXMucHJvcHMudXJsLCBzdGF0dXMsIGVyci50b1N0cmluZygpKTtcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKVxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRvYy1ib3hcIj5cbiAgICAgICAgICAgICAgICA8aDE+RG9jIEZvbGRlcnM8L2gxPlxuICAgICAgICAgICAgICAgIDxCcmVhZGNydW1icyAvPlxuICAgICAgICAgICAgICAgIDxEb2NMaXN0IGRhdGE9e3RoaXMuc3RhdGUuZGF0YX0gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRG9jQm94OyIsIi8qKlxuICogQ3JlYXRlZCBieSBrZXZpbiBvbiAwNy8wMy8xNi5cbiAqL1xuXG52YXIgRG9jU3F1YXJlID0gcmVxdWlyZSgnLi9kb2Mtc3F1YXJlJyk7XG52YXIgRG9jVmVyc2lvbiA9IHJlcXVpcmUoJy4vZG9jLXZlcnNpb24nKTtcblxudmFyIERvY0xpc3QgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCQuaXNFbXB0eU9iamVjdCh0aGlzLnByb3BzLmRhdGEpKXtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPHNwYW4+SSdtIEVtcHR5IC1fLTwvc3Bhbj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgZG9jTm9kZXMgPSBbXVxuICAgICAgICAgICAgJC5lYWNoKHRoaXMucHJvcHMuZGF0YSwgZnVuY3Rpb24oaWR4LCBkb2NzKXtcbiAgICAgICAgICAgICAgICBpZiAoISQuaXNFbXB0eU9iamVjdChkb2NzKSl7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkb2NzLmhhc093blByb3BlcnR5KCd1cmwnKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb2NOb2Rlcy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxEb2NWZXJzaW9uIHZlcnNpb249e2lkeH0gbmFtZT17ZG9jcy5uYW1lfSBjb2xvcj1cImdyZWVuXCIgdXJsPXtkb2NzLnVybH0gIGtleT17aWR4fT48L0RvY1ZlcnNpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb2NOb2Rlcy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxEb2NTcXVhcmUgZmlyc3RMZXR0ZXI9e2RvY3MuZmlyc3RMZXR0ZXJ9IGNvbG9yPXtkb2NzLmNvbG9yfSBmdWxsTmFtZT17ZG9jcy5mdWxsTmFtZX0ga2V5PXtkb2NzLmtleX0+PC9Eb2NTcXVhcmU+XG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZG9jLWxpc3RcIiBkYXRhPXt0aGlzLnByb3BzLmRhdGF9PlxuICAgICAgICAgICAgICAgICAgIHtkb2NOb2Rlc31cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBEb2NMaXN0OyIsIi8qKlxuICogQ3JlYXRlZCBieSBrZXZpbiBvbiAwNy8wMy8xNi5cbiAqL1xuXG52YXIgRG9jU3F1YXJlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIGhhbmRsZUNsaWNrOiBmdW5jdGlvbihwYXRoKXtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSB3aW5kb3cubG9jYXRpb24uaGFzaCArIHBhdGggK1wiL1wiO1xuXG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgYm91bmRDbGljayA9IHRoaXMuaGFuZGxlQ2xpY2suYmluZCh0aGlzLCB0aGlzLnByb3BzLmZ1bGxOYW1lKTtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXt0aGlzLnByb3BzLmNvbG9yICsgXCIgZG9jLXNxdWFyZVwifSBvbkNsaWNrPXtib3VuZENsaWNrfT5cbiAgICAgICAgICAgICAgICA8aDI+e3RoaXMucHJvcHMuZmlyc3RMZXR0ZXJ9PC9oMj5cbiAgICAgICAgICAgICAgICA8c3Bhbj57dGhpcy5wcm9wcy5mdWxsTmFtZX08L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH0sXG5cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERvY1NxdWFyZTsiLCIvKipcbiAqIENyZWF0ZWQgYnkga2V2aW4gb24gMDcvMDMvMTYuXG4gKi9cblxudmFyIERvY1ZlcnNpb24gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZG9jLXNxdWFyZSBkb2MtdmVyc2lvblwiPlxuICAgICAgICAgICAgICAgIDxoMz57dGhpcy5wcm9wcy5uYW1lfTwvaDM+XG4gICAgICAgICAgICAgICAgPGEgaHJlZj17dGhpcy5wcm9wcy51cmx9PmJyb3dzZTwvYT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfSxcblxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRG9jVmVyc2lvbjsiLCIvKipcbiAqIENyZWF0ZWQgYnkga2V2aW4gb24gMDcvMDMvMTYuXG4gICovXG5cbnZhciBEb2NCb3ggPSByZXF1aXJlKCcuL2RvYy1ib3gnKTtcblxuUmVhY3RET00ucmVuZGVyKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwibWFpblwiPlxuICAgICAgICA8aDE+TEJDIFRlY2ggZG9jPC9oMT5cbiAgICAgICAgPERvY0JveCBwb2xsSW50ZXJ2YWw9ezIwMDAwfS8+XG4gICAgPC9kaXY+LFxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbmRleCcpXG4pOyJdfQ==
