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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMva2V2aW4vRG9jdW1lbnRzL1Byb2pldHMvTEJDL2xiYy1kb2NpbmRleC9zcmMvYnJlYWRjcnVtYnMtaXRlbS5qcyIsIi9Vc2Vycy9rZXZpbi9Eb2N1bWVudHMvUHJvamV0cy9MQkMvbGJjLWRvY2luZGV4L3NyYy9icmVhZGNydW1icy5qcyIsIi9Vc2Vycy9rZXZpbi9Eb2N1bWVudHMvUHJvamV0cy9MQkMvbGJjLWRvY2luZGV4L3NyYy9kb2MtYm94LmpzIiwiL1VzZXJzL2tldmluL0RvY3VtZW50cy9Qcm9qZXRzL0xCQy9sYmMtZG9jaW5kZXgvc3JjL2RvYy1saXN0LmpzIiwiL1VzZXJzL2tldmluL0RvY3VtZW50cy9Qcm9qZXRzL0xCQy9sYmMtZG9jaW5kZXgvc3JjL2RvYy1zcXVhcmUuanMiLCIvVXNlcnMva2V2aW4vRG9jdW1lbnRzL1Byb2pldHMvTEJDL2xiYy1kb2NpbmRleC9zcmMvZG9jLXZlcnNpb24uanMiLCIvVXNlcnMva2V2aW4vRG9jdW1lbnRzL1Byb2pldHMvTEJDL2xiYy1kb2NpbmRleC9zcmMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7QUFFQSxHQUFHOztBQUVILElBQUkscUNBQXFDLCtCQUFBO0lBQ3JDLE1BQU0sRUFBRSxXQUFXO1FBQ2Y7WUFDSSxvQkFBQSxNQUFLLEVBQUEsSUFBQyxFQUFBLG9CQUFBLEdBQUUsRUFBQSxDQUFBLENBQUMsSUFBQSxFQUFJLENBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFNLENBQUEsRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQVUsQ0FBTyxDQUFBO1VBQy9EO0tBQ0w7QUFDTCxDQUFDLENBQUM7O0FBRUYsTUFBTSxDQUFDLE9BQU8sR0FBRyxlQUFlOzs7QUNaaEM7O0dBRUc7QUFDSCxJQUFJLGVBQWUsR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQzs7QUFFcEQs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RUFBQSxDQUFBLENBQUMsSUFBQSxFQUFJLENBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFLLENBQUEsRUFBQSxRQUFVLENBQUE7WUFDakMsQ0FBQTtTQUNUO0FBQ1QsS0FBSzs7QUFFTCxDQUFDLENBQUMsQ0FBQzs7QUFFSCxNQUFNLENBQUMsT0FBTyxHQUFHLFVBQVU7OztBQ25CM0I7O0FBRUEsSUFBSTs7QUFFSixJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7O0FBRWxDLFFBQVEsQ0FBQyxNQUFNO0lBQ1gsb0JBQUEsS0FBSSxFQUFBLENBQUEsQ0FBQyxTQUFBLEVBQVMsQ0FBQyxNQUFPLENBQUEsRUFBQTtRQUNsQixvQkFBQSxJQUFHLEVBQUEsSUFBQyxFQUFBLGNBQWlCLENBQUEsRUFBQTtRQUNyQixvQkFBQyxNQUFNLEVBQUEsQ0FBQSxDQUFDLFlBQUEsRUFBWSxDQUFFLEtBQU0sQ0FBRSxDQUFBO0lBQzVCLENBQUE7SUFDTixRQUFRLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQztDQUNuQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKipcbiAqIENyZWF0ZWQgYnkga2V2aW4gb24gMDcvMDMvMTYuXG4gKi9cblxudmFyIEJyZWFkY3J1bWJzSXRlbSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHNwYW4+PGEgaHJlZj17dGhpcy5wcm9wcy5ocmVmfT57dGhpcy5wcm9wcy5sYWJlbH08L2E+PC9zcGFuPlxuICAgICAgICApO1xuICAgIH1cbn0pXG5cbm1vZHVsZS5leHBvcnRzID0gQnJlYWRjcnVtYnNJdGVtOyIsIi8qKlxuICogQ3JlYXRlZCBieSBrZXZpbiBvbiAwNy8wMy8xNi5cbiAqL1xudmFyIEJyZWFkY3J1bWJzSXRlbSA9IHJlcXVpcmUoJy4vYnJlYWRjcnVtYnMtaXRlbScpO1xuXG52YXIgQnJlYWRjcnVtYnMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpe1xuICAgICAgICByZXR1cm4ge3BhdGg6ICcvJywgaXRlbXM6IFtdfVxuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgYnJlYWRJdGVtcyA9IHRoaXMuc3RhdGUuaXRlbXMubWFwKGZ1bmN0aW9uKGIpe1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8QnJlYWRjcnVtYnNJdGVtIGxhYmVsPXtiLmZpcnN0TGV0dGVyfSBocmVmPXtiLmhyZWZ9IGtleT17Yi5pZH0+PC9CcmVhZGNydW1ic0l0ZW0+XG4gICAgICAgICAgICApXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJicmVhZGNydW1ic1wiPlxuICAgICAgICAgICAgICAgIDxzcGFuPlBhdGg6IHt0aGlzLnN0YXRlLnBhdGh9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDx1bD5cbiAgICAgICAgICAgICAgICAgICAge2JyZWFkSXRlbXN9XG4gICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQnJlYWRjcnVtYnM7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGtldmluIG9uIDA3LzAzLzE2LiBcbiAqL1xuXG52YXIgQnJlYWRjcnVtYnMgPSByZXF1aXJlKCcuL2JyZWFkY3J1bWJzJylcbnZhciBEb2NMaXN0ID0gcmVxdWlyZSgnLi9kb2MtbGlzdCcpO1xuXG52YXIgRG9jQm94ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIHBhdGg6ICcvJyxcbiAgICBiYXNlVXJsOiBcImh0dHA6Ly9cIit3aW5kb3cubG9jYXRpb24uaG9zdG5hbWUrXCI6XCIrd2luZG93LmxvY2F0aW9uLnBvcnQrXCIvdGVzdFwiLFxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKXtcbiAgICAgICByZXR1cm4ge2RhdGE6IHt9fVxuICAgIH0gLFxuICAgIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpe1xuICAgICAgICBoYXNoID0gd2luZG93LmxvY2F0aW9uLmhhc2guc3Vic3RyKDEpO1xuICAgICAgICB0aGlzLnBhdGggPSBoYXNoO1xuICAgICAgICBzZXRJbnRlcnZhbCh0aGlzLmxvYWRGb2xkZXJzKHRoaXMucGF0aCksIHRoaXMucHJvcHMucG9sbEludGVydmFsKTtcbiAgICAgICAgJCh3aW5kb3cpLm9uKCdoYXNoY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHN1YmZvbGRlciA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoLnN1YnN0cigxKTtcbiAgICAgICAgICAgIGNvbnRleHQucGF0aCA9IHN1YmZvbGRlcjtcbiAgICAgICAgICAgIGNvbnRleHQubG9hZEZvbGRlcnMoc3ViZm9sZGVyKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnRleHQgPSB0aGlzO1xuICAgIH0sXG4gICAgc2FuaXRpemVQYXRoOiBmdW5jdGlvbihzdWJmb2xkZXIpe1xuICAgICAgICB2YXIgcmV0ID0gc3ViZm9sZGVyLnJlcGxhY2UoL1xcLy9nLCAnJyk7XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfSxcbiAgICByZWN1cnNlOiBmdW5jdGlvbihkYXRhLCBwYXRoKXtcbiAgICAgICAgaWYgKCFwYXRoIHx8IHBhdGggPT0gJy8nKXtcbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICB9XG4gICAgICAgIHBhcnQgPSBwYXRoLm1hdGNoKC9cXC8/KFthLXpBLVpcXC0wLTldKykoLiopLylcbiAgICAgICAgcGF0aCA9IHRoaXMuc2FuaXRpemVQYXRoKHBhcnRbMV0pO1xuICAgICAgICBpZiAocGF0aCAmJiBkYXRhLmhhc093blByb3BlcnR5KHBhdGgpKXtcbiAgICAgICAgICAgIGlmIChkYXRhW3BhdGhdLmhhc093blByb3BlcnR5KCdjaGlsZHJlbicpKXtcbiAgICAgICAgICAgICAgICBkYXRhID0gdGhpcy5yZWN1cnNlKGRhdGFbcGF0aF0uY2hpbGRyZW4sIHBhcnRbMl0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZGF0YVtwYXRoXS5oYXNPd25Qcm9wZXJ0eSgndmVyc2lvbnMnKSkge1xuICAgICAgICAgICAgICAgIGRhdGEgPSBkYXRhW3BhdGhdLnZlcnNpb25zO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgbWFzdGVyOlxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6IGNvbnRleHQuYmFzZVVybCtcIi9cIitwYXRoK1wiL21hc3RlclwiXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH0sXG4gICAgbG9hZEZvbGRlcnM6IGZ1bmN0aW9uKHN1YmZvbGRlcikge1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBcIi9saXN0Lmpzb25cIixcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgICBjYWNoZTogZmFsc2UsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgZGF0YSA9IGNvbnRleHQucmVjdXJzZShkYXRhLCBjb250ZXh0LnBhdGgpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2RhdGE6IGRhdGF9KTtcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSxcbiAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbih4aHIsIHN0YXR1cywgZXJyKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcih0aGlzLnByb3BzLnVybCwgc3RhdHVzLCBlcnIudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICB9LmJpbmQodGhpcylcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkb2MtYm94XCI+XG4gICAgICAgICAgICAgICAgPGgxPkRvYyBGb2xkZXJzPC9oMT5cbiAgICAgICAgICAgICAgICA8QnJlYWRjcnVtYnMgLz5cbiAgICAgICAgICAgICAgICA8RG9jTGlzdCBkYXRhPXt0aGlzLnN0YXRlLmRhdGF9IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERvY0JveDsiLCIvKipcbiAqIENyZWF0ZWQgYnkga2V2aW4gb24gMDcvMDMvMTYuXG4gKi9cblxudmFyIERvY1NxdWFyZSA9IHJlcXVpcmUoJy4vZG9jLXNxdWFyZScpO1xudmFyIERvY1ZlcnNpb24gPSByZXF1aXJlKCcuL2RvYy12ZXJzaW9uJyk7XG5cbnZhciBEb2NMaXN0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICgkLmlzRW1wdHlPYmplY3QodGhpcy5wcm9wcy5kYXRhKSl7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxzcGFuPkknbSBFbXB0eSAtXy08L3NwYW4+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyIGRvY05vZGVzID0gW11cbiAgICAgICAgICAgICQuZWFjaCh0aGlzLnByb3BzLmRhdGEsIGZ1bmN0aW9uKGlkeCwgZG9jcyl7XG4gICAgICAgICAgICAgICAgaWYgKCEkLmlzRW1wdHlPYmplY3QoZG9jcykpe1xuICAgICAgICAgICAgICAgICAgICBpZiAoZG9jcy5oYXNPd25Qcm9wZXJ0eSgndXJsJykpe1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZG9jcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb2NOb2Rlcy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxEb2NWZXJzaW9uIHZlcnNpb249e2lkeH0gbmFtZT17ZG9jcy5uYW1lfSBjb2xvcj17ZG9jcy5jb2xvcn0gdXJsPXtkb2NzLnVybH0gIGtleT17aWR4fT48L0RvY1ZlcnNpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb2NOb2Rlcy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxEb2NTcXVhcmUgZmlyc3RMZXR0ZXI9e2RvY3MuZmlyc3RMZXR0ZXJ9IGNvbG9yPXtkb2NzLmNvbG9yfSBmdWxsTmFtZT17ZG9jcy5mdWxsTmFtZX0ga2V5PXtkb2NzLmtleX0+PC9Eb2NTcXVhcmU+XG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZG9jLWxpc3RcIiBkYXRhPXt0aGlzLnByb3BzLmRhdGF9PlxuICAgICAgICAgICAgICAgICAgIHtkb2NOb2Rlc31cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBEb2NMaXN0OyIsIi8qKlxuICogQ3JlYXRlZCBieSBrZXZpbiBvbiAwNy8wMy8xNi5cbiAqL1xuXG52YXIgRG9jU3F1YXJlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIGhhbmRsZUNsaWNrOiBmdW5jdGlvbihwYXRoKXtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSB3aW5kb3cubG9jYXRpb24uaGFzaCArIHBhdGggK1wiL1wiO1xuXG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgYm91bmRDbGljayA9IHRoaXMuaGFuZGxlQ2xpY2suYmluZCh0aGlzLCB0aGlzLnByb3BzLmZ1bGxOYW1lKTtcbiAgICAgICAgdmFyIGRpdlN0eWxlID0ge1xuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiB0aGlzLnByb3BzLmNvbG9yXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZG9jLXNxdWFyZVwiIHN0eWxlPXtkaXZTdHlsZX0gb25DbGljaz17Ym91bmRDbGlja30+XG4gICAgICAgICAgICAgICAgPGgyPnt0aGlzLnByb3BzLmZpcnN0TGV0dGVyfTwvaDI+XG4gICAgICAgICAgICAgICAgPHNwYW4+e3RoaXMucHJvcHMuZnVsbE5hbWV9PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9LFxuXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBEb2NTcXVhcmU7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGtldmluIG9uIDA3LzAzLzE2LlxuICovXG5cbnZhciBEb2NWZXJzaW9uID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgXHR2YXIgZGl2U3R5bGUgPSB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IHRoaXMucHJvcHMuY29sb3JcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkb2Mtc3F1YXJlIGRvYy12ZXJzaW9uXCIgc3R5bGU9e2RpdlN0eWxlfSA+XG4gICAgICAgICAgICAgICAgPGgzPnt0aGlzLnByb3BzLm5hbWV9PC9oMz5cbiAgICAgICAgICAgICAgICA8YSBocmVmPXt0aGlzLnByb3BzLnVybH0+YnJvd3NlPC9hPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9LFxuXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBEb2NWZXJzaW9uOyIsIi8qKlxuICogQ3JlYXRlZCBieSBrZXZpbiBvbiAwNy8wMy8xNi5cbiAgKi9cblxudmFyIERvY0JveCA9IHJlcXVpcmUoJy4vZG9jLWJveCcpO1xuXG5SZWFjdERPTS5yZW5kZXIoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJtYWluXCI+XG4gICAgICAgIDxoMT5MQkMgVGVjaCBkb2M8L2gxPlxuICAgICAgICA8RG9jQm94IHBvbGxJbnRlcnZhbD17MjAwMDB9Lz5cbiAgICA8L2Rpdj4sXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2luZGV4Jylcbik7Il19
