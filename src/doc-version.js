/**
 * Created by kevin on 07/03/16.
 */

var DocVersion = React.createClass({
    handleClick: function(path){
        $('html, body').animate({
            scrollTop: 0
        }, 500);
        newSrc = path;
        $(this).closest('.doc-version').siblings().removeClass('active');
        $(this).closest('.doc-version').addClass('active');
        oldSrc = $('#docframe')[0].contentWindow.location.href;
        $('#frame iframe').attr('src', newSrc);
        $('#frame iframe').on('load', function(e){
            $('#index, #frame').addClass('open');
            iframebody = e.target.contentWindow.document.body;
            h = $(iframebody).find('.rst-content').height()+100;
            // albater theme support
            if (h == 100){
                h = $(iframebody).find('.document').height()+100;
            }
            // jsdoc support
            if (h == 100){
                h = $(iframebody).find('#main').height()+100;
            }
            $('#frame').height(h+'px');
            $('#new-window').attr('href', e.target.contentWindow.location.href);
        });
    },
    render: function() {
    	var divStyle = {
            backgroundColor: this.props.color
        }
        var additionalClass = '';
        if (this.props.version != 'master'){
            additionalClass = 'tag';
        }
        var boundClick = this.handleClick.bind(this, this.props.url);
        return (
            <div className={"doc-square doc-version " + additionalClass} style={divStyle} onClick={boundClick}>
                <h3>{this.props.name}</h3>
            </div>
        )
    },

});

module.exports = DocVersion;