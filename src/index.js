/**
 * Created by kevin on 07/03/16.
  */

var DocBox = require('./doc-box');
var ToolBox = require('./tool-box');

ReactDOM.render(
    <div className="main">
        <h1>LBC Tech doc</h1>
        <ToolBox />
        <DocBox pollInterval={20000}/>
    </div>,
    document.getElementById('index')
);

$(document).ready(function(){
	$('#index').on('click', '.doc-version a', function(e){
		e.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 500);
		newSrc = $(e.target).attr('href');
		$(e.target).closest('.doc-version').siblings().removeClass('active');
		$(e.target).closest('.doc-version').addClass('active');
		oldSrc = $('#docframe')[0].contentWindow.location.href;
		$('#frame iframe').attr('src', $(e.target).attr('href'));
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
	});

	$('#close-panel').click(function(){
		$('.doc-version').removeClass('active');
		$('#index, #frame').removeClass('open');
	});
})
