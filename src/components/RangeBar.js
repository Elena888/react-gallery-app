import React from 'react'

class RangeBar extends React.Component{
    state = {
        value: this.props.numComments
    };
    handleChange = (e) => {
        this.setState({
            value: e.target.value
        }, this.props.handleRangeBar(this.state.value))
    };

    render(){
        return(
            <div className="slidecontainer">
                <form>
                    <h2>Current filter: {this.props.numComments}</h2>
                    <input
                        type="range"
                        min="-1"
                        max="1000"
                        value={this.state.value}
                        onChange={this.handleChange}
                        className="slider"
                        id="myRange"/>
                </form>
            </div>
        )
    }
}

export default RangeBar;