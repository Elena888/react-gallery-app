import React from 'react'

const RangeBar = (props) => {
    return (
        <div className="slidecontainer">
            <form>
                <h2>Current filter: {props.minComments}</h2>
                <input
                    type="range"
                    min="0"
                    max="1000"
                    value={props.minComments}
                    onChange={(e) => props.handleRangeBar(e.target.value)}
                    className="slider"
                    id="myRange"/>
            </form>
        </div>
    )
};

export default RangeBar;