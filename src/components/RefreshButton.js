import React from 'react'

const RefreshButton = (props) =>{
    return(
        <div>
            <button onClick={() => props.refreshData()}>{props.btnText}</button>
        </div>
    )
};

export default RefreshButton;