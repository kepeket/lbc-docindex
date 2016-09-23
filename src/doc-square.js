/**
 * Created by kevin on 07/03/16.
 */

var DocSquare = React.createClass({
    handleClick: function(path){
        window.location.hash = window.location.hash + path +"/";
        $('html, body').animate({
            scrollTop: 0
        }, 500);

    },
    render: function() {
        var boundClick = this.handleClick.bind(this, this.props.fullName);
        var divStyle = {
            backgroundColor: this.props.color
        }
        return (
            <div className="doc-square" style={divStyle} onClick={boundClick}>
                <h2>{this.props.firstLetter}</h2>
                <span>{this.props.fullName}</span>
            </div>
        )
    },

});

module.exports = DocSquare;