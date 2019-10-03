import React from 'react'

const RefreshButton = (props) =>{
    return(
        <div>
            <button onClick={() => props.refreshData()}>
                {props.refreshBtn ? 'Stops' : 'Start'} Auto Refresh
            </button>
        </div>
    )
};

export default RefreshButton;