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
