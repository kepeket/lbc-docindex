/**
 * Created by kevin on 07/03/16. 
 */

var slugify = require('slugify');

var ToolBox = React.createClass({
    getInitialState: function(){
        return {state: document.cookie}
    },
    render: function() {
        return (
            <div className="tool-box">
                <ul>
                    <li>
                        <i className="fa fa-compress" />
                    </li>
                    <li>
                        <i className="fa fa-th-large" />
                    </li>
                </ul>
            </div>
        )
    }
});

module.exports = ToolBox;