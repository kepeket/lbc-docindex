/**
 * Created by kevin on 07/03/16.
  */

var DocBox = require('./doc-box');

ReactDOM.render(
    <div className="main">
        <h1>LBC Tech doc</h1>
        <DocBox pollInterval={20000}/>
    </div>,
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