/**
 * Created by kevin on 07/03/16. 
 */

var Breadcrumbs = require('./breadcrumbs')
var DocList = require('./doc-list');

var DocBox = React.createClass({
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
            <div className="doc-box">
                <Breadcrumbs path={this.state.path}/>
                <DocList data={this.state.data} />
            </div>
        )
    }
});

module.exports = DocBox;