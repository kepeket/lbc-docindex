/**
 * Created by kevin on 07/03/16.
 */

var DocSquare = React.createClass({
    handleClick: function(path){
        window.location.hash = window.location.hash + path +"/";

    },
    render: function() {
        var boundClick = this.handleClick.bind(this, this.props.fullName);
        return (
            <div className={this.props.color + " doc-square"} onClick={boundClick}>
                <h2>{this.props.firstLetter}</h2>
                <span>{this.props.fullName}</span>
            </div>
        )
    },

});

module.exports = DocSquare;