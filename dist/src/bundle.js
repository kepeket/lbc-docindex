(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/home/kevin/LBC/docui/node_modules/slugify/lib/slugify.js":[function(require,module,exports){

//https://github.com/django/django/blob/master/django/contrib/admin/static/admin/js/urlify.js
var charMap = {
  // latin
  'À': 'A', 'Á': 'A', 'Â': 'A', 'Ã': 'A', 'Ä': 'A', 'Å': 'A', 'Æ': 'AE',
  'Ç': 'C', 'È': 'E', 'É': 'E', 'Ê': 'E', 'Ë': 'E', 'Ì': 'I', 'Í': 'I',
  'Î': 'I', 'Ï': 'I', 'Ð': 'D', 'Ñ': 'N', 'Ò': 'O', 'Ó': 'O', 'Ô': 'O',
  'Õ': 'O', 'Ö': 'O', 'Ő': 'O', 'Ø': 'O', 'Ù': 'U', 'Ú': 'U', 'Û': 'U',
  'Ü': 'U', 'Ű': 'U', 'Ý': 'Y', 'Þ': 'TH', 'ß': 'ss', 'à':'a', 'á':'a',
  'â': 'a', 'ã': 'a', 'ä': 'a', 'å': 'a', 'æ': 'ae', 'ç': 'c', 'è': 'e',
  'é': 'e', 'ê': 'e', 'ë': 'e', 'ì': 'i', 'í': 'i', 'î': 'i', 'ï': 'i',
  'ð': 'd', 'ñ': 'n', 'ò': 'o', 'ó': 'o', 'ô': 'o', 'õ': 'o', 'ö': 'o',
  'ő': 'o', 'ø': 'o', 'ù': 'u', 'ú': 'u', 'û': 'u', 'ü': 'u', 'ű': 'u',
  'ý': 'y', 'þ': 'th', 'ÿ': 'y', 'ẞ': 'SS',
  // greek
  'α':'a', 'β':'b', 'γ':'g', 'δ':'d', 'ε':'e', 'ζ':'z', 'η':'h', 'θ':'8',
  'ι':'i', 'κ':'k', 'λ':'l', 'μ':'m', 'ν':'n', 'ξ':'3', 'ο':'o', 'π':'p',
  'ρ':'r', 'σ':'s', 'τ':'t', 'υ':'y', 'φ':'f', 'χ':'x', 'ψ':'ps', 'ω':'w',
  'ά':'a', 'έ':'e', 'ί':'i', 'ό':'o', 'ύ':'y', 'ή':'h', 'ώ':'w', 'ς':'s',
  'ϊ':'i', 'ΰ':'y', 'ϋ':'y', 'ΐ':'i',
  'Α':'A', 'Β':'B', 'Γ':'G', 'Δ':'D', 'Ε':'E', 'Ζ':'Z', 'Η':'H', 'Θ':'8',
  'Ι':'I', 'Κ':'K', 'Λ':'L', 'Μ':'M', 'Ν':'N', 'Ξ':'3', 'Ο':'O', 'Π':'P',
  'Ρ':'R', 'Σ':'S', 'Τ':'T', 'Υ':'Y', 'Φ':'F', 'Χ':'X', 'Ψ':'PS', 'Ω':'W',
  'Ά':'A', 'Έ':'E', 'Ί':'I', 'Ό':'O', 'Ύ':'Y', 'Ή':'H', 'Ώ':'W', 'Ϊ':'I',
  'Ϋ':'Y',
  //turkish
  'ş':'s', 'Ş':'S', 'ı':'i', 'İ':'I', 'ç':'c', 'Ç':'C', 'ü':'u', 'Ü':'U',
  'ö':'o', 'Ö':'O', 'ğ':'g', 'Ğ':'G',
  // russian
  'а':'a', 'б':'b', 'в':'v', 'г':'g', 'д':'d', 'е':'e', 'ё':'yo', 'ж':'zh',
  'з':'z', 'и':'i', 'й':'j', 'к':'k', 'л':'l', 'м':'m', 'н':'n', 'о':'o',
  'п':'p', 'р':'r', 'с':'s', 'т':'t', 'у':'u', 'ф':'f', 'х':'h', 'ц':'c',
  'ч':'ch', 'ш':'sh', 'щ':'sh', 'ъ':'u', 'ы':'y', 'ь':'', 'э':'e', 'ю':'yu',
  'я':'ya',
  'А':'A', 'Б':'B', 'В':'V', 'Г':'G', 'Д':'D', 'Е':'E', 'Ё':'Yo', 'Ж':'Zh',
  'З':'Z', 'И':'I', 'Й':'J', 'К':'K', 'Л':'L', 'М':'M', 'Н':'N', 'О':'O',
  'П':'P', 'Р':'R', 'С':'S', 'Т':'T', 'У':'U', 'Ф':'F', 'Х':'H', 'Ц':'C',
  'Ч':'Ch', 'Ш':'Sh', 'Щ':'Sh', 'Ъ':'U', 'Ы':'Y', 'Ь':'', 'Э':'E', 'Ю':'Yu',
  'Я':'Ya',
  // ukranian
  'Є':'Ye', 'І':'I', 'Ї':'Yi', 'Ґ':'G', 'є':'ye', 'і':'i', 'ї':'yi', 'ґ':'g',
  // czech
  'č':'c', 'ď':'d', 'ě':'e', 'ň': 'n', 'ř':'r', 'š':'s', 'ť':'t', 'ů':'u',
  'ž':'z', 'Č':'C', 'Ď':'D', 'Ě':'E', 'Ň': 'N', 'Ř':'R', 'Š':'S', 'Ť':'T',
  'Ů':'U', 'Ž':'Z',
  // polish
  'ą':'a', 'ć':'c', 'ę':'e', 'ł':'l', 'ń':'n', 'ó':'o', 'ś':'s', 'ź':'z',
  'ż':'z', 'Ą':'A', 'Ć':'C', 'Ę':'e', 'Ł':'L', 'Ń':'N', 'Ś':'S',
  'Ź':'Z', 'Ż':'Z',
  // latvian
  'ā':'a', 'č':'c', 'ē':'e', 'ģ':'g', 'ī':'i', 'ķ':'k', 'ļ':'l', 'ņ':'n',
  'š':'s', 'ū':'u', 'ž':'z', 'Ā':'A', 'Č':'C', 'Ē':'E', 'Ģ':'G', 'Ī':'i',
  'Ķ':'k', 'Ļ':'L', 'Ņ':'N', 'Š':'S', 'Ū':'u', 'Ž':'Z',
  // currency
  '€': 'euro', '₢': 'cruzeiro', '₣': 'french franc', '£': 'pound',
  '₤': 'lira', '₥': 'mill', '₦': 'naira', '₧': 'peseta', '₨': 'rupee',
  '₩': 'won', '₪': 'new shequel', '₫': 'dong', '₭': 'kip', '₮': 'tugrik',
  '₯': 'drachma', '₰': 'penny', '₱': 'peso', '₲': 'guarani', '₳': 'austral',
  '₴': 'hryvnia', '₵': 'cedi', '¢': 'cent', '¥': 'yen', '元': 'yuan',
  '円': 'yen', '﷼': 'rial', '₠': 'ecu', '¤': 'currency', '฿': 'baht',
  "$": 'dollar',
  // symbols
  '©':'(c)', 'œ': 'oe', 'Œ': 'OE', '∑': 'sum', '®': '(r)', '†': '+',
  '“': '"', '”': '"', '‘': "'", '’': "'", '∂': 'd', 'ƒ': 'f', '™': 'tm',
  '℠': 'sm', '…': '...', '˚': 'o', 'º': 'o', 'ª': 'a', '•': '*',
  '∆': 'delta', '∞': 'infinity', '♥': 'love', '&': 'and', '|': 'or',
  '<': 'less', '>': 'greater'
};

exports = module.exports = function (string, replacement) {
  replacement = replacement || '-';
  var result = '';
  for (var i=0; i < string.length; i++) {
    var ch = string[i];
    if (charMap[ch]) {
      ch = charMap[ch];
    }
    ch = ch.replace(/[^\w\s$\*\_\+~\.\(\)\'\"\!\-:@]/g, ''); // allowed
    result += ch;
  }
  result = result.replace(/^\s+|\s+$/g, ''); // trim leading/trailing spaces
  result = result.replace(/[-\s]+/g, replacement); // convert spaces
  result.replace("#{replacement}$", ''); // remove trailing separator
  return result;
}

},{}],"/home/kevin/LBC/docui/src/breadcrumbs-item.js":[function(require,module,exports){
/**
 * Created by kevin on 07/03/16.
 */

var BreadcrumbsItem = React.createClass({displayName: "BreadcrumbsItem",
    render: function() {
    	console.log(this.props.item)
    	if (this.props.item.current != true){
	        return (
	            React.createElement("li", null, React.createElement("span", {className: "bread-label"}, React.createElement("a", {href: this.props.item.href}, this.props.item.label)))
	        );
    	}
    	else {
	        return (
	            React.createElement("li", null, React.createElement("span", {className: "bread-label current"}, this.props.item.label))
	        );    		
    	}
    }
})

module.exports = BreadcrumbsItem;

},{}],"/home/kevin/LBC/docui/src/breadcrumbs.js":[function(require,module,exports){
/**
 * Created by kevin on 07/03/16.
 */
var BreadcrumbsItem = require('./breadcrumbs-item');

var Breadcrumbs = React.createClass({displayName: "Breadcrumbs",
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
                    React.createElement(BreadcrumbsItem, {item: b, key: b.id})
                )
            }
        });
        return (
            React.createElement("div", {className: "breadcrumbs"}, 
                React.createElement("ul", null, 
                    React.createElement("li", null, React.createElement("span", {className: "bread-label home"}, React.createElement("a", {href: "/#/"}, React.createElement("i", {className: "fa fa-home", "aria-hidden": "true"}), "Hoomie!"))), 
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

var slugify = require('slugify');

var Breadcrumbs = require('./breadcrumbs');
var DocList = require('./doc-list');

var DocBox = React.createClass({displayName: "DocBox",
    path: '/',
    baseUrl: "http://"+window.location.hostname+":"+window.location.port+"/test",
    getInitialState: function(){
       return {data: {}, path: '/'}
    },
    componentDidMount: function(){
        hash = window.location.hash.substr(1);
        this.path = hash;
        setInterval(this.loadFolders(this.path), this.props.pollInterval);
        $(window).on('hashchange', function(){
            subfolder = window.location.hash.substr(1);
            context.path = subfolder;
            context.loadFolders();
        });
        context = this;
    },
    sanitizePath: function(subfolder){
        var ret = subfolder.replace(/\//g, '');
        return slugify(ret.toLowerCase());
    },
    recurse: function(data, path){
        if (!path || path == '/'){
            return data;
        }
        part = path.match(/\/?([a-zA-Z\-0-9]+)(.*)/)
        path = this.sanitizePath(part[1]);
        console.log(path);
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
    loadFolders: function() {
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

},{"./breadcrumbs":"/home/kevin/LBC/docui/src/breadcrumbs.js","./doc-list":"/home/kevin/LBC/docui/src/doc-list.js","slugify":"/home/kevin/LBC/docui/node_modules/slugify/lib/slugify.js"}],"/home/kevin/LBC/docui/src/doc-list.js":[function(require,module,exports){
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
            /** ugly check **/
            test = Object.keys(this.props.data)[0];
            if (this.props.data[test].hasOwnProperty('url')){
                keys = Object.keys(this.props.data).sort().reverse();
            }
            else {
                keys = Object.keys(this.props.data).sort();                
            }
            var context = this;
            $.each(keys, function(_, idx){
                if (!$.isEmptyObject(context.props.data[idx])){
                    docs = context.props.data[idx];
                    if (docs.hasOwnProperty('url')){
                        if (idx == 'master'){
                            docNodes.unshift(
                                React.createElement(DocVersion, {version: idx, name: docs.name, color: docs.color, url: docs.url, key: idx})
                            )
                        }
                        else {
                            docNodes.push(
                                React.createElement(DocVersion, {version: idx, name: docs.name, color: docs.color, url: docs.url, key: idx})
                            )
                        }
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

},{}],"/home/kevin/LBC/docui/src/doc-version.js":[function(require,module,exports){
/**
 * Created by kevin on 07/03/16.
 */

var DocVersion = React.createClass({displayName: "DocVersion",
    render: function() {
    	var divStyle = {
            backgroundColor: this.props.color
        }
        var additionalClass = '';
        if (this.props.version != 'master'){
            additionalClass = 'tag';
        }
        return (
            React.createElement("div", {className: "doc-square doc-version " + additionalClass, style: divStyle}, 
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

$(document).ready(function(){
	$('#index').on('click', '.doc-version a', function(e){
		e.preventDefault();
		newSrc = $(e.target).attr('href');
		$(e.target).closest('.doc-version').siblings().removeClass('active');
		$(e.target).closest('.doc-version').addClass('active');
		oldSrc = $('#docframe')[0].contentWindow.location.href;
		$('#frame iframe').attr('src', $(e.target).attr('href'));
		$('#frame iframe').on('load', function(e){
			$('#index, #frame').addClass('open');
			iframebody = e.target.contentWindow.document.body;
			$('#frame').height(($(iframebody).find('.rst-content').height()+100)+'px');
			$('#new-window').attr('href', e.target.contentWindow.location.href);
		});
	});

	$('#close-panel').click(function(){
		$('.doc-version').removeClass('active');
		$('#index, #frame').removeClass('open');
	});
})

},{"./doc-box":"/home/kevin/LBC/docui/src/doc-box.js"}]},{},["/home/kevin/LBC/docui/src/index.js"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvc2x1Z2lmeS9saWIvc2x1Z2lmeS5qcyIsIi9ob21lL2tldmluL0xCQy9kb2N1aS9zcmMvYnJlYWRjcnVtYnMtaXRlbS5qcyIsIi9ob21lL2tldmluL0xCQy9kb2N1aS9zcmMvYnJlYWRjcnVtYnMuanMiLCIvaG9tZS9rZXZpbi9MQkMvZG9jdWkvc3JjL2RvYy1ib3guanMiLCIvaG9tZS9rZXZpbi9MQkMvZG9jdWkvc3JjL2RvYy1saXN0LmpzIiwiL2hvbWUva2V2aW4vTEJDL2RvY3VpL3NyYy9kb2Mtc3F1YXJlLmpzIiwiL2hvbWUva2V2aW4vTEJDL2RvY3VpL3NyYy9kb2MtdmVyc2lvbi5qcyIsIi9ob21lL2tldmluL0xCQy9kb2N1aS9zcmMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JGQTs7QUFFQSxHQUFHOztBQUVILElBQUkscUNBQXFDLCtCQUFBO0lBQ3JDLE1BQU0sRUFBRSxXQUFXO0tBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7S0FDNUIsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDO1NBQ2hDO2FBQ0ksb0JBQUEsSUFBRyxFQUFBLElBQUMsRUFBQSxvQkFBQSxNQUFLLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFDLGFBQWMsQ0FBQSxFQUFBLG9CQUFBLEdBQUUsRUFBQSxDQUFBLENBQUMsSUFBQSxFQUFJLENBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBTSxDQUFBLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBVSxDQUFPLENBQUssQ0FBQTtXQUMxRztNQUNMO1VBQ0k7U0FDRDthQUNJLG9CQUFBLElBQUcsRUFBQSxJQUFDLEVBQUEsb0JBQUEsTUFBSyxFQUFBLENBQUEsQ0FBQyxTQUFBLEVBQVMsQ0FBQyxxQkFBc0IsQ0FBQSxFQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQWEsQ0FBSyxDQUFBO1dBQy9FO01BQ0w7S0FDRDtBQUNMLENBQUMsQ0FBQzs7QUFFRixNQUFNLENBQUMsT0FBTyxHQUFHLGVBQWU7OztBQ3BCaEM7O0dBRUc7QUFDSCxJQUFJLGVBQWUsR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQzs7QUFFcEQsSUFBSSxpQ0FBaUMsMkJBQUE7SUFDakMsS0FBSyxFQUFFLEVBQUU7SUFDVCxlQUFlLEVBQUUsVUFBVTtRQUN2QixPQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDO0tBQ2hDO0lBQ0QsT0FBTyxFQUFFLFNBQVMsSUFBSSxFQUFFLEdBQUcsQ0FBQztRQUN4QixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7UUFDcEQsSUFBSSxPQUFPLEtBQUssSUFBSSxDQUFDO1lBQ2pCLElBQUksR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLElBQUksT0FBTyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxXQUFXLENBQUM7Z0JBQ2xDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDbEM7WUFDRCxJQUFJLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0QixLQUFLLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDO1lBQ3JDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7WUFDeEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7K0JBQ0csRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7K0JBQ2QsSUFBSSxFQUFFLElBQUk7K0JBQ1YsS0FBSyxFQUFFLEtBQUs7K0JBQ1osT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDOzZCQUNqQixDQUFDLENBQUM7U0FDdEI7S0FDSjtJQUNELE1BQU0sRUFBRSxVQUFVO1FBQ2QsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFDaEMsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDdkMsSUFBSSxDQUFDLENBQUMsS0FBSyxJQUFJLEdBQUcsQ0FBQztnQkFDZjtvQkFDSSxvQkFBQyxlQUFlLEVBQUEsQ0FBQSxDQUFDLElBQUEsRUFBSSxDQUFFLENBQUMsRUFBQyxDQUFDLEdBQUEsRUFBRyxDQUFFLENBQUMsQ0FBQyxFQUFJLENBQWtCLENBQUE7aUJBQzFEO2FBQ0o7U0FDSixDQUFDLENBQUM7UUFDSDtZQUNJLG9CQUFBLEtBQUksRUFBQSxDQUFBLENBQUMsU0FBQSxFQUFTLENBQUMsYUFBYyxDQUFBLEVBQUE7Z0JBQ3pCLG9CQUFBLElBQUcsRUFBQSxJQUFDLEVBQUE7b0JBQ0Esb0JBQUEsSUFBRyxFQUFBLElBQUMsRUFBQSxvQkFBQSxNQUFLLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFDLGtCQUFtQixDQUFBLEVBQUEsb0JBQUEsR0FBRSxFQUFBLENBQUEsQ0FBQyxJQUFBLEVBQUksQ0FBQyxLQUFNLENBQUEsRUFBQSxvQkFBQSxHQUFFLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFDLFlBQUEsRUFBWSxDQUFDLGFBQUEsRUFBVyxDQUFDLE1BQU8sQ0FBSSxDQUFBLEVBQUEsU0FBVyxDQUFPLENBQUssQ0FBQSxFQUFBO29CQUM1SCxVQUFXO2dCQUNYLENBQUE7WUFDSCxDQUFBO1NBQ1Q7S0FDSjtBQUNMLENBQUMsQ0FBQyxDQUFDOztBQUVILE1BQU0sQ0FBQyxPQUFPLEdBQUcsV0FBVzs7O0FDakQ1Qjs7QUFFQSxHQUFHOztBQUVILElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQzs7QUFFakMsSUFBSSxXQUFXLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQzNDLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQzs7QUFFcEMsSUFBSSw0QkFBNEIsc0JBQUE7SUFDNUIsSUFBSSxFQUFFLEdBQUc7SUFDVCxPQUFPLEVBQUUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPO0lBQzVFLGVBQWUsRUFBRSxVQUFVO09BQ3hCLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxHQUFHLENBQUM7S0FDOUI7SUFDRCxpQkFBaUIsRUFBRSxVQUFVO1FBQ3pCLElBQUksR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDbEUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsVUFBVTtZQUNqQyxTQUFTLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDO1lBQ3pCLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUN6QixDQUFDLENBQUM7UUFDSCxPQUFPLEdBQUcsSUFBSSxDQUFDO0tBQ2xCO0lBQ0QsWUFBWSxFQUFFLFNBQVMsU0FBUyxDQUFDO1FBQzdCLElBQUksR0FBRyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZDLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO0tBQ3JDO0lBQ0QsT0FBTyxFQUFFLFNBQVMsSUFBSSxFQUFFLElBQUksQ0FBQztRQUN6QixJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxHQUFHLENBQUM7WUFDckIsT0FBTyxJQUFJLENBQUM7U0FDZjtRQUNELElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLHlCQUF5QixDQUFDO1FBQzVDLElBQUksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEIsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNsQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ3RDLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDckQ7aUJBQ0ksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxFQUFFO2dCQUM1QyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQzthQUM5QjtpQkFDSTtnQkFDRCxJQUFJLEdBQUc7b0JBQ0gsTUFBTTtvQkFDTjt3QkFDSSxHQUFHLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVM7cUJBQzFDO2lCQUNKLENBQUM7YUFDTDtTQUNKO1FBQ0QsT0FBTyxJQUFJLENBQUM7S0FDZjtJQUNELFdBQVcsRUFBRSxXQUFXO1FBQ3BCLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDSCxHQUFHLEVBQUUsWUFBWTtZQUNqQixRQUFRLEVBQUUsTUFBTTtZQUNoQixLQUFLLEVBQUUsS0FBSztZQUNaLE9BQU8sRUFBRSxTQUFTLElBQUksRUFBRTtnQkFDcEIsSUFBSSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDM0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2FBQ25ELENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNaLEtBQUssRUFBRSxTQUFTLEdBQUcsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFO2dCQUM5QixPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQzthQUN6RCxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7U0FDZixDQUFDLENBQUM7S0FDTjtJQUNELE1BQU0sRUFBRSxXQUFXO1FBQ2Y7WUFDSSxvQkFBQSxLQUFJLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFDLFNBQVUsQ0FBQSxFQUFBO2dCQUNyQixvQkFBQyxXQUFXLEVBQUEsQ0FBQSxDQUFDLElBQUEsRUFBSSxDQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSyxDQUFFLENBQUEsRUFBQTtnQkFDckMsb0JBQUMsT0FBTyxFQUFBLENBQUEsQ0FBQyxJQUFBLEVBQUksQ0FBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUssQ0FBQSxDQUFHLENBQUE7WUFDaEMsQ0FBQTtTQUNUO0tBQ0o7QUFDTCxDQUFDLENBQUMsQ0FBQzs7QUFFSCxNQUFNLENBQUMsT0FBTyxHQUFHLE1BQU07OztBQy9FdkI7O0FBRUEsR0FBRzs7QUFFSCxJQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDeEMsSUFBSSxVQUFVLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDOztBQUUxQyxJQUFJLDZCQUE2Qix1QkFBQTtJQUM3QixNQUFNLEVBQUUsV0FBVztRQUNmLElBQUksQ0FBQyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2pDO2dCQUNJLG9CQUFBLE1BQUssRUFBQSxJQUFDLEVBQUEsZUFBb0IsQ0FBQTtjQUM1QjtTQUNMO2FBQ0k7QUFDYixZQUFZLElBQUksUUFBUSxHQUFHLEVBQUU7O1lBRWpCLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzVDLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDeEQ7aUJBQ0k7Z0JBQ0QsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUM5QztZQUNELElBQUksT0FBTyxHQUFHLElBQUksQ0FBQztZQUNuQixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsRUFBRSxHQUFHLENBQUM7Z0JBQ3pCLElBQUksQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQzFDLElBQUksR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDL0IsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUMzQixJQUFJLEdBQUcsSUFBSSxRQUFRLENBQUM7NEJBQ2hCLFFBQVEsQ0FBQyxPQUFPO2dDQUNaLG9CQUFDLFVBQVUsRUFBQSxDQUFBLENBQUMsT0FBQSxFQUFPLENBQUUsR0FBRyxFQUFDLENBQUMsSUFBQSxFQUFJLENBQUUsSUFBSSxDQUFDLElBQUksRUFBQyxDQUFDLEtBQUEsRUFBSyxDQUFFLElBQUksQ0FBQyxLQUFLLEVBQUMsQ0FBQyxHQUFBLEVBQUcsQ0FBRSxJQUFJLENBQUMsR0FBRyxFQUFDLEVBQUUsR0FBQSxFQUFHLENBQUUsR0FBSyxDQUFhLENBQUE7NkJBQ3hHO3lCQUNKOzZCQUNJOzRCQUNELFFBQVEsQ0FBQyxJQUFJO2dDQUNULG9CQUFDLFVBQVUsRUFBQSxDQUFBLENBQUMsT0FBQSxFQUFPLENBQUUsR0FBRyxFQUFDLENBQUMsSUFBQSxFQUFJLENBQUUsSUFBSSxDQUFDLElBQUksRUFBQyxDQUFDLEtBQUEsRUFBSyxDQUFFLElBQUksQ0FBQyxLQUFLLEVBQUMsQ0FBQyxHQUFBLEVBQUcsQ0FBRSxJQUFJLENBQUMsR0FBRyxFQUFDLEVBQUUsR0FBQSxFQUFHLENBQUUsR0FBSyxDQUFhLENBQUE7NkJBQ3hHO3lCQUNKO3FCQUNKO3lCQUNJO3dCQUNELFFBQVEsQ0FBQyxJQUFJOzRCQUNULG9CQUFDLFNBQVMsRUFBQSxDQUFBLENBQUMsV0FBQSxFQUFXLENBQUUsSUFBSSxDQUFDLFdBQVcsRUFBQyxDQUFDLEtBQUEsRUFBSyxDQUFFLElBQUksQ0FBQyxLQUFLLEVBQUMsQ0FBQyxRQUFBLEVBQVEsQ0FBRSxJQUFJLENBQUMsUUFBUSxFQUFDLENBQUMsR0FBQSxFQUFHLENBQUUsSUFBSSxDQUFDLEdBQUssQ0FBWSxDQUFBO3lCQUNwSDtBQUN6QixxQkFBcUI7O0FBRXJCLGlCQUFpQjs7YUFFSixDQUFDLENBQUM7WUFDSDtnQkFDSSxvQkFBQSxLQUFJLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFDLFVBQUEsRUFBVSxDQUFDLElBQUEsRUFBSSxDQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBTSxDQUFBLEVBQUE7bUJBQzdDLFFBQVM7Z0JBQ1AsQ0FBQTtjQUNSO1NBQ0w7S0FDSjtBQUNMLENBQUMsQ0FBQyxDQUFDOztBQUVILE1BQU0sQ0FBQyxPQUFPLEdBQUcsT0FBTzs7O0FDMUR4Qjs7QUFFQSxHQUFHOztBQUVILElBQUksK0JBQStCLHlCQUFBO0lBQy9CLFdBQVcsRUFBRSxTQUFTLElBQUksQ0FBQztBQUMvQixRQUFRLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLElBQUksRUFBRSxHQUFHLENBQUM7O0tBRTNEO0lBQ0QsTUFBTSxFQUFFLFdBQVc7UUFDZixJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNsRSxJQUFJLFFBQVEsR0FBRztZQUNYLGVBQWUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUs7U0FDcEM7UUFDRDtZQUNJLG9CQUFBLEtBQUksRUFBQSxDQUFBLENBQUMsU0FBQSxFQUFTLENBQUMsWUFBQSxFQUFZLENBQUMsS0FBQSxFQUFLLENBQUUsUUFBUSxFQUFDLENBQUMsT0FBQSxFQUFPLENBQUUsVUFBWSxDQUFBLEVBQUE7Z0JBQzlELG9CQUFBLElBQUcsRUFBQSxJQUFDLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFpQixDQUFBLEVBQUE7Z0JBQ2pDLG9CQUFBLE1BQUssRUFBQSxJQUFDLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFnQixDQUFBO1lBQ2hDLENBQUE7U0FDVDtBQUNULEtBQUs7O0FBRUwsQ0FBQyxDQUFDLENBQUM7O0FBRUgsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTOzs7QUN4QjFCOztBQUVBLEdBQUc7O0FBRUgsSUFBSSxnQ0FBZ0MsMEJBQUE7SUFDaEMsTUFBTSxFQUFFLFdBQVc7S0FDbEIsSUFBSSxRQUFRLEdBQUc7WUFDUixlQUFlLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLO1NBQ3BDO1FBQ0QsSUFBSSxlQUFlLEdBQUcsRUFBRSxDQUFDO1FBQ3pCLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLElBQUksUUFBUSxDQUFDO1lBQy9CLGVBQWUsR0FBRyxLQUFLLENBQUM7U0FDM0I7UUFDRDtZQUNJLG9CQUFBLEtBQUksRUFBQSxDQUFBLENBQUMsU0FBQSxFQUFTLENBQUUseUJBQXlCLEdBQUcsZUFBZSxFQUFDLENBQUMsS0FBQSxFQUFLLENBQUUsUUFBUyxDQUFFLENBQUEsRUFBQTtnQkFDM0Usb0JBQUEsSUFBRyxFQUFBLElBQUMsRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQVUsQ0FBQSxFQUFBO2dCQUMxQixvQkFBQSxHQUFFLEVBQUEsQ0FBQSxDQUFDLElBQUEsRUFBSSxDQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBSyxDQUFBLEVBQUEsUUFBVSxDQUFBO1lBQ2pDLENBQUE7U0FDVDtBQUNULEtBQUs7O0FBRUwsQ0FBQyxDQUFDLENBQUM7O0FBRUgsTUFBTSxDQUFDLE9BQU8sR0FBRyxVQUFVOzs7QUN2QjNCOztBQUVBLElBQUk7O0FBRUosSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDOztBQUVsQyxRQUFRLENBQUMsTUFBTTtJQUNYLG9CQUFBLEtBQUksRUFBQSxDQUFBLENBQUMsU0FBQSxFQUFTLENBQUMsTUFBTyxDQUFBLEVBQUE7UUFDbEIsb0JBQUEsSUFBRyxFQUFBLElBQUMsRUFBQSxjQUFpQixDQUFBLEVBQUE7UUFDckIsb0JBQUMsTUFBTSxFQUFBLENBQUEsQ0FBQyxZQUFBLEVBQVksQ0FBRSxLQUFNLENBQUUsQ0FBQTtJQUM1QixDQUFBO0lBQ04sUUFBUSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUM7QUFDcEMsQ0FBQyxDQUFDOztBQUVGLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBVTtDQUMzQixDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxTQUFTLENBQUMsQ0FBQztFQUNwRCxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7RUFDbkIsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0VBQ2xDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztFQUNyRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7RUFDdkQsTUFBTSxHQUFHLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztFQUN2RCxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0VBQ3pELENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0dBQ3hDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztHQUNyQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztHQUNsRCxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7R0FDM0UsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0dBQ3BFLENBQUMsQ0FBQztBQUNMLEVBQUUsQ0FBQyxDQUFDOztDQUVILENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBVTtFQUNqQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0VBQ3hDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztFQUN4QyxDQUFDLENBQUM7Q0FDSCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcbi8vaHR0cHM6Ly9naXRodWIuY29tL2RqYW5nby9kamFuZ28vYmxvYi9tYXN0ZXIvZGphbmdvL2NvbnRyaWIvYWRtaW4vc3RhdGljL2FkbWluL2pzL3VybGlmeS5qc1xudmFyIGNoYXJNYXAgPSB7XG4gIC8vIGxhdGluXG4gICfDgCc6ICdBJywgJ8OBJzogJ0EnLCAnw4InOiAnQScsICfDgyc6ICdBJywgJ8OEJzogJ0EnLCAnw4UnOiAnQScsICfDhic6ICdBRScsXG4gICfDhyc6ICdDJywgJ8OIJzogJ0UnLCAnw4knOiAnRScsICfDiic6ICdFJywgJ8OLJzogJ0UnLCAnw4wnOiAnSScsICfDjSc6ICdJJyxcbiAgJ8OOJzogJ0knLCAnw48nOiAnSScsICfDkCc6ICdEJywgJ8ORJzogJ04nLCAnw5InOiAnTycsICfDkyc6ICdPJywgJ8OUJzogJ08nLFxuICAnw5UnOiAnTycsICfDlic6ICdPJywgJ8WQJzogJ08nLCAnw5gnOiAnTycsICfDmSc6ICdVJywgJ8OaJzogJ1UnLCAnw5snOiAnVScsXG4gICfDnCc6ICdVJywgJ8WwJzogJ1UnLCAnw50nOiAnWScsICfDnic6ICdUSCcsICfDnyc6ICdzcycsICfDoCc6J2EnLCAnw6EnOidhJyxcbiAgJ8OiJzogJ2EnLCAnw6MnOiAnYScsICfDpCc6ICdhJywgJ8OlJzogJ2EnLCAnw6YnOiAnYWUnLCAnw6cnOiAnYycsICfDqCc6ICdlJyxcbiAgJ8OpJzogJ2UnLCAnw6onOiAnZScsICfDqyc6ICdlJywgJ8OsJzogJ2knLCAnw60nOiAnaScsICfDric6ICdpJywgJ8OvJzogJ2knLFxuICAnw7AnOiAnZCcsICfDsSc6ICduJywgJ8OyJzogJ28nLCAnw7MnOiAnbycsICfDtCc6ICdvJywgJ8O1JzogJ28nLCAnw7YnOiAnbycsXG4gICfFkSc6ICdvJywgJ8O4JzogJ28nLCAnw7knOiAndScsICfDuic6ICd1JywgJ8O7JzogJ3UnLCAnw7wnOiAndScsICfFsSc6ICd1JyxcbiAgJ8O9JzogJ3knLCAnw74nOiAndGgnLCAnw78nOiAneScsICfhup4nOiAnU1MnLFxuICAvLyBncmVla1xuICAnzrEnOidhJywgJ86yJzonYicsICfOsyc6J2cnLCAnzrQnOidkJywgJ861JzonZScsICfOtic6J3onLCAnzrcnOidoJywgJ864JzonOCcsXG4gICfOuSc6J2knLCAnzronOidrJywgJ867JzonbCcsICfOvCc6J20nLCAnzr0nOiduJywgJ86+JzonMycsICfOvyc6J28nLCAnz4AnOidwJyxcbiAgJ8+BJzoncicsICfPgyc6J3MnLCAnz4QnOid0JywgJ8+FJzoneScsICfPhic6J2YnLCAnz4cnOid4JywgJ8+IJzoncHMnLCAnz4knOid3JyxcbiAgJ86sJzonYScsICfOrSc6J2UnLCAnzq8nOidpJywgJ8+MJzonbycsICfPjSc6J3knLCAnzq4nOidoJywgJ8+OJzondycsICfPgic6J3MnLFxuICAnz4onOidpJywgJ86wJzoneScsICfPiyc6J3knLCAnzpAnOidpJyxcbiAgJ86RJzonQScsICfOkic6J0InLCAnzpMnOidHJywgJ86UJzonRCcsICfOlSc6J0UnLCAnzpYnOidaJywgJ86XJzonSCcsICfOmCc6JzgnLFxuICAnzpknOidJJywgJ86aJzonSycsICfOmyc6J0wnLCAnzpwnOidNJywgJ86dJzonTicsICfOnic6JzMnLCAnzp8nOidPJywgJ86gJzonUCcsXG4gICfOoSc6J1InLCAnzqMnOidTJywgJ86kJzonVCcsICfOpSc6J1knLCAnzqYnOidGJywgJ86nJzonWCcsICfOqCc6J1BTJywgJ86pJzonVycsXG4gICfOhic6J0EnLCAnzognOidFJywgJ86KJzonSScsICfOjCc6J08nLCAnzo4nOidZJywgJ86JJzonSCcsICfOjyc6J1cnLCAnzqonOidJJyxcbiAgJ86rJzonWScsXG4gIC8vdHVya2lzaFxuICAnxZ8nOidzJywgJ8WeJzonUycsICfEsSc6J2knLCAnxLAnOidJJywgJ8OnJzonYycsICfDhyc6J0MnLCAnw7wnOid1JywgJ8OcJzonVScsXG4gICfDtic6J28nLCAnw5YnOidPJywgJ8SfJzonZycsICfEnic6J0cnLFxuICAvLyBydXNzaWFuXG4gICfQsCc6J2EnLCAn0LEnOidiJywgJ9CyJzondicsICfQsyc6J2cnLCAn0LQnOidkJywgJ9C1JzonZScsICfRkSc6J3lvJywgJ9C2JzonemgnLFxuICAn0LcnOid6JywgJ9C4JzonaScsICfQuSc6J2onLCAn0LonOidrJywgJ9C7JzonbCcsICfQvCc6J20nLCAn0L0nOiduJywgJ9C+JzonbycsXG4gICfQvyc6J3AnLCAn0YAnOidyJywgJ9GBJzoncycsICfRgic6J3QnLCAn0YMnOid1JywgJ9GEJzonZicsICfRhSc6J2gnLCAn0YYnOidjJyxcbiAgJ9GHJzonY2gnLCAn0YgnOidzaCcsICfRiSc6J3NoJywgJ9GKJzondScsICfRiyc6J3knLCAn0YwnOicnLCAn0Y0nOidlJywgJ9GOJzoneXUnLFxuICAn0Y8nOid5YScsXG4gICfQkCc6J0EnLCAn0JEnOidCJywgJ9CSJzonVicsICfQkyc6J0cnLCAn0JQnOidEJywgJ9CVJzonRScsICfQgSc6J1lvJywgJ9CWJzonWmgnLFxuICAn0JcnOidaJywgJ9CYJzonSScsICfQmSc6J0onLCAn0JonOidLJywgJ9CbJzonTCcsICfQnCc6J00nLCAn0J0nOidOJywgJ9CeJzonTycsXG4gICfQnyc6J1AnLCAn0KAnOidSJywgJ9ChJzonUycsICfQoic6J1QnLCAn0KMnOidVJywgJ9CkJzonRicsICfQpSc6J0gnLCAn0KYnOidDJyxcbiAgJ9CnJzonQ2gnLCAn0KgnOidTaCcsICfQqSc6J1NoJywgJ9CqJzonVScsICfQqyc6J1knLCAn0KwnOicnLCAn0K0nOidFJywgJ9CuJzonWXUnLFxuICAn0K8nOidZYScsXG4gIC8vIHVrcmFuaWFuXG4gICfQhCc6J1llJywgJ9CGJzonSScsICfQhyc6J1lpJywgJ9KQJzonRycsICfRlCc6J3llJywgJ9GWJzonaScsICfRlyc6J3lpJywgJ9KRJzonZycsXG4gIC8vIGN6ZWNoXG4gICfEjSc6J2MnLCAnxI8nOidkJywgJ8SbJzonZScsICfFiCc6ICduJywgJ8WZJzoncicsICfFoSc6J3MnLCAnxaUnOid0JywgJ8WvJzondScsXG4gICfFvic6J3onLCAnxIwnOidDJywgJ8SOJzonRCcsICfEmic6J0UnLCAnxYcnOiAnTicsICfFmCc6J1InLCAnxaAnOidTJywgJ8WkJzonVCcsXG4gICfFric6J1UnLCAnxb0nOidaJyxcbiAgLy8gcG9saXNoXG4gICfEhSc6J2EnLCAnxIcnOidjJywgJ8SZJzonZScsICfFgic6J2wnLCAnxYQnOiduJywgJ8OzJzonbycsICfFmyc6J3MnLCAnxbonOid6JyxcbiAgJ8W8JzoneicsICfEhCc6J0EnLCAnxIYnOidDJywgJ8SYJzonZScsICfFgSc6J0wnLCAnxYMnOidOJywgJ8WaJzonUycsXG4gICfFuSc6J1onLCAnxbsnOidaJyxcbiAgLy8gbGF0dmlhblxuICAnxIEnOidhJywgJ8SNJzonYycsICfEkyc6J2UnLCAnxKMnOidnJywgJ8SrJzonaScsICfEtyc6J2snLCAnxLwnOidsJywgJ8WGJzonbicsXG4gICfFoSc6J3MnLCAnxasnOid1JywgJ8W+JzoneicsICfEgCc6J0EnLCAnxIwnOidDJywgJ8SSJzonRScsICfEoic6J0cnLCAnxKonOidpJyxcbiAgJ8S2JzonaycsICfEuyc6J0wnLCAnxYUnOidOJywgJ8WgJzonUycsICfFqic6J3UnLCAnxb0nOidaJyxcbiAgLy8gY3VycmVuY3lcbiAgJ+KCrCc6ICdldXJvJywgJ+KCoic6ICdjcnV6ZWlybycsICfigqMnOiAnZnJlbmNoIGZyYW5jJywgJ8KjJzogJ3BvdW5kJyxcbiAgJ+KCpCc6ICdsaXJhJywgJ+KCpSc6ICdtaWxsJywgJ+KCpic6ICduYWlyYScsICfigqcnOiAncGVzZXRhJywgJ+KCqCc6ICdydXBlZScsXG4gICfigqknOiAnd29uJywgJ+KCqic6ICduZXcgc2hlcXVlbCcsICfigqsnOiAnZG9uZycsICfigq0nOiAna2lwJywgJ+KCric6ICd0dWdyaWsnLFxuICAn4oKvJzogJ2RyYWNobWEnLCAn4oKwJzogJ3Blbm55JywgJ+KCsSc6ICdwZXNvJywgJ+KCsic6ICdndWFyYW5pJywgJ+KCsyc6ICdhdXN0cmFsJyxcbiAgJ+KCtCc6ICdocnl2bmlhJywgJ+KCtSc6ICdjZWRpJywgJ8KiJzogJ2NlbnQnLCAnwqUnOiAneWVuJywgJ+WFgyc6ICd5dWFuJyxcbiAgJ+WGhic6ICd5ZW4nLCAn77e8JzogJ3JpYWwnLCAn4oKgJzogJ2VjdScsICfCpCc6ICdjdXJyZW5jeScsICfguL8nOiAnYmFodCcsXG4gIFwiJFwiOiAnZG9sbGFyJyxcbiAgLy8gc3ltYm9sc1xuICAnwqknOicoYyknLCAnxZMnOiAnb2UnLCAnxZInOiAnT0UnLCAn4oiRJzogJ3N1bScsICfCric6ICcociknLCAn4oCgJzogJysnLFxuICAn4oCcJzogJ1wiJywgJ+KAnSc6ICdcIicsICfigJgnOiBcIidcIiwgJ+KAmSc6IFwiJ1wiLCAn4oiCJzogJ2QnLCAnxpInOiAnZicsICfihKInOiAndG0nLFxuICAn4oSgJzogJ3NtJywgJ+KApic6ICcuLi4nLCAny5onOiAnbycsICfCuic6ICdvJywgJ8KqJzogJ2EnLCAn4oCiJzogJyonLFxuICAn4oiGJzogJ2RlbHRhJywgJ+KInic6ICdpbmZpbml0eScsICfimaUnOiAnbG92ZScsICcmJzogJ2FuZCcsICd8JzogJ29yJyxcbiAgJzwnOiAnbGVzcycsICc+JzogJ2dyZWF0ZXInXG59O1xuXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoc3RyaW5nLCByZXBsYWNlbWVudCkge1xuICByZXBsYWNlbWVudCA9IHJlcGxhY2VtZW50IHx8ICctJztcbiAgdmFyIHJlc3VsdCA9ICcnO1xuICBmb3IgKHZhciBpPTA7IGkgPCBzdHJpbmcubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgY2ggPSBzdHJpbmdbaV07XG4gICAgaWYgKGNoYXJNYXBbY2hdKSB7XG4gICAgICBjaCA9IGNoYXJNYXBbY2hdO1xuICAgIH1cbiAgICBjaCA9IGNoLnJlcGxhY2UoL1teXFx3XFxzJFxcKlxcX1xcK35cXC5cXChcXClcXCdcXFwiXFwhXFwtOkBdL2csICcnKTsgLy8gYWxsb3dlZFxuICAgIHJlc3VsdCArPSBjaDtcbiAgfVxuICByZXN1bHQgPSByZXN1bHQucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpOyAvLyB0cmltIGxlYWRpbmcvdHJhaWxpbmcgc3BhY2VzXG4gIHJlc3VsdCA9IHJlc3VsdC5yZXBsYWNlKC9bLVxcc10rL2csIHJlcGxhY2VtZW50KTsgLy8gY29udmVydCBzcGFjZXNcbiAgcmVzdWx0LnJlcGxhY2UoXCIje3JlcGxhY2VtZW50fSRcIiwgJycpOyAvLyByZW1vdmUgdHJhaWxpbmcgc2VwYXJhdG9yXG4gIHJldHVybiByZXN1bHQ7XG59XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkga2V2aW4gb24gMDcvMDMvMTYuXG4gKi9cblxudmFyIEJyZWFkY3J1bWJzSXRlbSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIFx0Y29uc29sZS5sb2codGhpcy5wcm9wcy5pdGVtKVxuICAgIFx0aWYgKHRoaXMucHJvcHMuaXRlbS5jdXJyZW50ICE9IHRydWUpe1xuXHQgICAgICAgIHJldHVybiAoXG5cdCAgICAgICAgICAgIDxsaT48c3BhbiBjbGFzc05hbWU9XCJicmVhZC1sYWJlbFwiPjxhIGhyZWY9e3RoaXMucHJvcHMuaXRlbS5ocmVmfT57dGhpcy5wcm9wcy5pdGVtLmxhYmVsfTwvYT48L3NwYW4+PC9saT5cblx0ICAgICAgICApO1xuICAgIFx0fVxuICAgIFx0ZWxzZSB7XG5cdCAgICAgICAgcmV0dXJuIChcblx0ICAgICAgICAgICAgPGxpPjxzcGFuIGNsYXNzTmFtZT1cImJyZWFkLWxhYmVsIGN1cnJlbnRcIj57dGhpcy5wcm9wcy5pdGVtLmxhYmVsfTwvc3Bhbj48L2xpPlxuXHQgICAgICAgICk7ICAgIFx0XHRcbiAgICBcdH1cbiAgICB9XG59KVxuXG5tb2R1bGUuZXhwb3J0cyA9IEJyZWFkY3J1bWJzSXRlbTsiLCIvKipcbiAqIENyZWF0ZWQgYnkga2V2aW4gb24gMDcvMDMvMTYuXG4gKi9cbnZhciBCcmVhZGNydW1ic0l0ZW0gPSByZXF1aXJlKCcuL2JyZWFkY3J1bWJzLWl0ZW0nKTtcblxudmFyIEJyZWFkY3J1bWJzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIGl0ZW1zOiBbXSxcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHJldHVybiB7cGF0aDogJy8nLCBpdGVtczogW119XG4gICAgfSxcbiAgICByZWN1cnNlOiBmdW5jdGlvbihwYXRoLCBsdmwpe1xuICAgICAgICB2YXIgbWF0Y2hlcyA9IHBhdGgubWF0Y2goLyguKlxcLyk/KFthLXpBLVowLTlcXC1dKykvKTtcbiAgICAgICAgaWYgKG1hdGNoZXMgIT09IG51bGwpe1xuICAgICAgICAgICAgaHJlZiA9ICcjJyttYXRjaGVzWzBdO1xuICAgICAgICAgICAgaWYgKHR5cGVvZihtYXRjaGVzWzFdKSAhPSBcInVuZGVmaW5lZFwiKXtcbiAgICAgICAgICAgICAgICB0aGlzLnJlY3Vyc2UobWF0Y2hlc1sxXSwgbHZsKzEpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBocmVmID0gJyMnK21hdGNoZXNbMF07XG4gICAgICAgICAgICBsYWJlbCA9IG1hdGNoZXNbMl0ucmVwbGFjZSgvXFwvL2csICcnKVxuICAgICAgICAgICAgY29uc29sZS5sb2cobHZsLCBsdmw9PTApXG4gICAgICAgICAgICB0aGlzLml0ZW1zLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBtYXRjaGVzWzBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhyZWY6IGhyZWYsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IGxhYmVsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnQ6IGx2bD09MFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHRoaXMuaXRlbXMgPSBbXTtcbiAgICAgICAgdGhpcy5yZWN1cnNlKHRoaXMucHJvcHMucGF0aCwgMClcbiAgICAgICAgdmFyIGJyZWFkSXRlbXMgPSB0aGlzLml0ZW1zLm1hcChmdW5jdGlvbihiKXtcbiAgICAgICAgICAgIGlmIChiLmxhYmVsICE9ICcvJyl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgPEJyZWFkY3J1bWJzSXRlbSBpdGVtPXtifSBrZXk9e2IuaWR9PjwvQnJlYWRjcnVtYnNJdGVtPlxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJyZWFkY3J1bWJzXCI+XG4gICAgICAgICAgICAgICAgPHVsPlxuICAgICAgICAgICAgICAgICAgICA8bGk+PHNwYW4gY2xhc3NOYW1lPVwiYnJlYWQtbGFiZWwgaG9tZVwiPjxhIGhyZWY9XCIvIy9cIj48aSBjbGFzc05hbWU9XCJmYSBmYS1ob21lXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPkhvb21pZSE8L2E+PC9zcGFuPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgIHticmVhZEl0ZW1zfVxuICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJyZWFkY3J1bWJzOyIsIi8qKlxuICogQ3JlYXRlZCBieSBrZXZpbiBvbiAwNy8wMy8xNi4gXG4gKi9cblxudmFyIHNsdWdpZnkgPSByZXF1aXJlKCdzbHVnaWZ5Jyk7XG5cbnZhciBCcmVhZGNydW1icyA9IHJlcXVpcmUoJy4vYnJlYWRjcnVtYnMnKTtcbnZhciBEb2NMaXN0ID0gcmVxdWlyZSgnLi9kb2MtbGlzdCcpO1xuXG52YXIgRG9jQm94ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIHBhdGg6ICcvJyxcbiAgICBiYXNlVXJsOiBcImh0dHA6Ly9cIit3aW5kb3cubG9jYXRpb24uaG9zdG5hbWUrXCI6XCIrd2luZG93LmxvY2F0aW9uLnBvcnQrXCIvdGVzdFwiLFxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKXtcbiAgICAgICByZXR1cm4ge2RhdGE6IHt9LCBwYXRoOiAnLyd9XG4gICAgfSxcbiAgICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKXtcbiAgICAgICAgaGFzaCA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoLnN1YnN0cigxKTtcbiAgICAgICAgdGhpcy5wYXRoID0gaGFzaDtcbiAgICAgICAgc2V0SW50ZXJ2YWwodGhpcy5sb2FkRm9sZGVycyh0aGlzLnBhdGgpLCB0aGlzLnByb3BzLnBvbGxJbnRlcnZhbCk7XG4gICAgICAgICQod2luZG93KS5vbignaGFzaGNoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBzdWJmb2xkZXIgPSB3aW5kb3cubG9jYXRpb24uaGFzaC5zdWJzdHIoMSk7XG4gICAgICAgICAgICBjb250ZXh0LnBhdGggPSBzdWJmb2xkZXI7XG4gICAgICAgICAgICBjb250ZXh0LmxvYWRGb2xkZXJzKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBjb250ZXh0ID0gdGhpcztcbiAgICB9LFxuICAgIHNhbml0aXplUGF0aDogZnVuY3Rpb24oc3ViZm9sZGVyKXtcbiAgICAgICAgdmFyIHJldCA9IHN1YmZvbGRlci5yZXBsYWNlKC9cXC8vZywgJycpO1xuICAgICAgICByZXR1cm4gc2x1Z2lmeShyZXQudG9Mb3dlckNhc2UoKSk7XG4gICAgfSxcbiAgICByZWN1cnNlOiBmdW5jdGlvbihkYXRhLCBwYXRoKXtcbiAgICAgICAgaWYgKCFwYXRoIHx8IHBhdGggPT0gJy8nKXtcbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICB9XG4gICAgICAgIHBhcnQgPSBwYXRoLm1hdGNoKC9cXC8/KFthLXpBLVpcXC0wLTldKykoLiopLylcbiAgICAgICAgcGF0aCA9IHRoaXMuc2FuaXRpemVQYXRoKHBhcnRbMV0pO1xuICAgICAgICBjb25zb2xlLmxvZyhwYXRoKTtcbiAgICAgICAgaWYgKHBhdGggJiYgZGF0YS5oYXNPd25Qcm9wZXJ0eShwYXRoKSl7XG4gICAgICAgICAgICBpZiAoZGF0YVtwYXRoXS5oYXNPd25Qcm9wZXJ0eSgnY2hpbGRyZW4nKSl7XG4gICAgICAgICAgICAgICAgZGF0YSA9IHRoaXMucmVjdXJzZShkYXRhW3BhdGhdLmNoaWxkcmVuLCBwYXJ0WzJdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGRhdGFbcGF0aF0uaGFzT3duUHJvcGVydHkoJ3ZlcnNpb25zJykpIHtcbiAgICAgICAgICAgICAgICBkYXRhID0gZGF0YVtwYXRoXS52ZXJzaW9ucztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGRhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgIG1hc3RlcjpcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBjb250ZXh0LmJhc2VVcmwrXCIvXCIrcGF0aCtcIi9tYXN0ZXJcIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9LFxuICAgIGxvYWRGb2xkZXJzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogXCIvbGlzdC5qc29uXCIsXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgIGRhdGEgPSBjb250ZXh0LnJlY3Vyc2UoZGF0YSwgY29udGV4dC5wYXRoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtkYXRhOiBkYXRhLCBwYXRoOiBjb250ZXh0LnBhdGh9KTtcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSxcbiAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbih4aHIsIHN0YXR1cywgZXJyKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcih0aGlzLnByb3BzLnVybCwgc3RhdHVzLCBlcnIudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICB9LmJpbmQodGhpcylcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkb2MtYm94XCI+XG4gICAgICAgICAgICAgICAgPEJyZWFkY3J1bWJzIHBhdGg9e3RoaXMuc3RhdGUucGF0aH0vPlxuICAgICAgICAgICAgICAgIDxEb2NMaXN0IGRhdGE9e3RoaXMuc3RhdGUuZGF0YX0gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRG9jQm94OyIsIi8qKlxuICogQ3JlYXRlZCBieSBrZXZpbiBvbiAwNy8wMy8xNi5cbiAqL1xuXG52YXIgRG9jU3F1YXJlID0gcmVxdWlyZSgnLi9kb2Mtc3F1YXJlJyk7XG52YXIgRG9jVmVyc2lvbiA9IHJlcXVpcmUoJy4vZG9jLXZlcnNpb24nKTtcblxudmFyIERvY0xpc3QgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCQuaXNFbXB0eU9iamVjdCh0aGlzLnByb3BzLmRhdGEpKXtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPHNwYW4+SSdtIEVtcHR5IC1fLTwvc3Bhbj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgZG9jTm9kZXMgPSBbXVxuICAgICAgICAgICAgLyoqIHVnbHkgY2hlY2sgKiovXG4gICAgICAgICAgICB0ZXN0ID0gT2JqZWN0LmtleXModGhpcy5wcm9wcy5kYXRhKVswXTtcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLmRhdGFbdGVzdF0uaGFzT3duUHJvcGVydHkoJ3VybCcpKXtcbiAgICAgICAgICAgICAgICBrZXlzID0gT2JqZWN0LmtleXModGhpcy5wcm9wcy5kYXRhKS5zb3J0KCkucmV2ZXJzZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAga2V5cyA9IE9iamVjdC5rZXlzKHRoaXMucHJvcHMuZGF0YSkuc29ydCgpOyAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBjb250ZXh0ID0gdGhpcztcbiAgICAgICAgICAgICQuZWFjaChrZXlzLCBmdW5jdGlvbihfLCBpZHgpe1xuICAgICAgICAgICAgICAgIGlmICghJC5pc0VtcHR5T2JqZWN0KGNvbnRleHQucHJvcHMuZGF0YVtpZHhdKSl7XG4gICAgICAgICAgICAgICAgICAgIGRvY3MgPSBjb250ZXh0LnByb3BzLmRhdGFbaWR4XTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRvY3MuaGFzT3duUHJvcGVydHkoJ3VybCcpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpZHggPT0gJ21hc3Rlcicpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY05vZGVzLnVuc2hpZnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxEb2NWZXJzaW9uIHZlcnNpb249e2lkeH0gbmFtZT17ZG9jcy5uYW1lfSBjb2xvcj17ZG9jcy5jb2xvcn0gdXJsPXtkb2NzLnVybH0gIGtleT17aWR4fT48L0RvY1ZlcnNpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jTm9kZXMucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPERvY1ZlcnNpb24gdmVyc2lvbj17aWR4fSBuYW1lPXtkb2NzLm5hbWV9IGNvbG9yPXtkb2NzLmNvbG9yfSB1cmw9e2RvY3MudXJsfSAga2V5PXtpZHh9PjwvRG9jVmVyc2lvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb2NOb2Rlcy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxEb2NTcXVhcmUgZmlyc3RMZXR0ZXI9e2RvY3MuZmlyc3RMZXR0ZXJ9IGNvbG9yPXtkb2NzLmNvbG9yfSBmdWxsTmFtZT17ZG9jcy5mdWxsTmFtZX0ga2V5PXtkb2NzLmtleX0+PC9Eb2NTcXVhcmU+XG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZG9jLWxpc3RcIiBkYXRhPXt0aGlzLnByb3BzLmRhdGF9PlxuICAgICAgICAgICAgICAgICAgIHtkb2NOb2Rlc31cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBEb2NMaXN0OyIsIi8qKlxuICogQ3JlYXRlZCBieSBrZXZpbiBvbiAwNy8wMy8xNi5cbiAqL1xuXG52YXIgRG9jU3F1YXJlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIGhhbmRsZUNsaWNrOiBmdW5jdGlvbihwYXRoKXtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSB3aW5kb3cubG9jYXRpb24uaGFzaCArIHBhdGggK1wiL1wiO1xuXG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgYm91bmRDbGljayA9IHRoaXMuaGFuZGxlQ2xpY2suYmluZCh0aGlzLCB0aGlzLnByb3BzLmZ1bGxOYW1lKTtcbiAgICAgICAgdmFyIGRpdlN0eWxlID0ge1xuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiB0aGlzLnByb3BzLmNvbG9yXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZG9jLXNxdWFyZVwiIHN0eWxlPXtkaXZTdHlsZX0gb25DbGljaz17Ym91bmRDbGlja30+XG4gICAgICAgICAgICAgICAgPGgyPnt0aGlzLnByb3BzLmZpcnN0TGV0dGVyfTwvaDI+XG4gICAgICAgICAgICAgICAgPHNwYW4+e3RoaXMucHJvcHMuZnVsbE5hbWV9PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9LFxuXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBEb2NTcXVhcmU7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGtldmluIG9uIDA3LzAzLzE2LlxuICovXG5cbnZhciBEb2NWZXJzaW9uID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgXHR2YXIgZGl2U3R5bGUgPSB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IHRoaXMucHJvcHMuY29sb3JcbiAgICAgICAgfVxuICAgICAgICB2YXIgYWRkaXRpb25hbENsYXNzID0gJyc7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnZlcnNpb24gIT0gJ21hc3Rlcicpe1xuICAgICAgICAgICAgYWRkaXRpb25hbENsYXNzID0gJ3RhZyc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcImRvYy1zcXVhcmUgZG9jLXZlcnNpb24gXCIgKyBhZGRpdGlvbmFsQ2xhc3N9IHN0eWxlPXtkaXZTdHlsZX0gPlxuICAgICAgICAgICAgICAgIDxoMz57dGhpcy5wcm9wcy5uYW1lfTwvaDM+XG4gICAgICAgICAgICAgICAgPGEgaHJlZj17dGhpcy5wcm9wcy51cmx9PmJyb3dzZTwvYT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfSxcblxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRG9jVmVyc2lvbjsiLCIvKipcbiAqIENyZWF0ZWQgYnkga2V2aW4gb24gMDcvMDMvMTYuXG4gICovXG5cbnZhciBEb2NCb3ggPSByZXF1aXJlKCcuL2RvYy1ib3gnKTtcblxuUmVhY3RET00ucmVuZGVyKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwibWFpblwiPlxuICAgICAgICA8aDE+TEJDIFRlY2ggZG9jPC9oMT5cbiAgICAgICAgPERvY0JveCBwb2xsSW50ZXJ2YWw9ezIwMDAwfS8+XG4gICAgPC9kaXY+LFxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbmRleCcpXG4pO1xuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xuXHQkKCcjaW5kZXgnKS5vbignY2xpY2snLCAnLmRvYy12ZXJzaW9uIGEnLCBmdW5jdGlvbihlKXtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0bmV3U3JjID0gJChlLnRhcmdldCkuYXR0cignaHJlZicpO1xuXHRcdCQoZS50YXJnZXQpLmNsb3Nlc3QoJy5kb2MtdmVyc2lvbicpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdCQoZS50YXJnZXQpLmNsb3Nlc3QoJy5kb2MtdmVyc2lvbicpLmFkZENsYXNzKCdhY3RpdmUnKTtcblx0XHRvbGRTcmMgPSAkKCcjZG9jZnJhbWUnKVswXS5jb250ZW50V2luZG93LmxvY2F0aW9uLmhyZWY7XG5cdFx0JCgnI2ZyYW1lIGlmcmFtZScpLmF0dHIoJ3NyYycsICQoZS50YXJnZXQpLmF0dHIoJ2hyZWYnKSk7XG5cdFx0JCgnI2ZyYW1lIGlmcmFtZScpLm9uKCdsb2FkJywgZnVuY3Rpb24oZSl7XG5cdFx0XHQkKCcjaW5kZXgsICNmcmFtZScpLmFkZENsYXNzKCdvcGVuJyk7XG5cdFx0XHRpZnJhbWVib2R5ID0gZS50YXJnZXQuY29udGVudFdpbmRvdy5kb2N1bWVudC5ib2R5O1xuXHRcdFx0JCgnI2ZyYW1lJykuaGVpZ2h0KCgkKGlmcmFtZWJvZHkpLmZpbmQoJy5yc3QtY29udGVudCcpLmhlaWdodCgpKzEwMCkrJ3B4Jyk7XG5cdFx0XHQkKCcjbmV3LXdpbmRvdycpLmF0dHIoJ2hyZWYnLCBlLnRhcmdldC5jb250ZW50V2luZG93LmxvY2F0aW9uLmhyZWYpO1xuXHRcdH0pO1xuXHR9KTtcblxuXHQkKCcjY2xvc2UtcGFuZWwnKS5jbGljayhmdW5jdGlvbigpe1xuXHRcdCQoJy5kb2MtdmVyc2lvbicpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcblx0XHQkKCcjaW5kZXgsICNmcmFtZScpLnJlbW92ZUNsYXNzKCdvcGVuJyk7XG5cdH0pO1xufSkiXX0=
