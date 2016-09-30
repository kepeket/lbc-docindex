/**
 * Created by kevin on 07/03/16.
  */

var DocBox = require('./doc-box');
//var ToolBox = require('./tool-box');

ReactDOM.render(
    <div className="main">
        <h1>LBC Tech doc</h1>
        <DocBox pollInterval={10000}/>
    </div>,
    document.getElementById('index')
);

$(document).ready(function(){
	$('#close-panel').click(function(){
		$('.doc-version').removeClass('active');
		$('#index, #frame').removeClass('open');
	});
})
