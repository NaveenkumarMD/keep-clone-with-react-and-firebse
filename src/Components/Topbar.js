import React from 'react'
import Icon from './Icon'

function Topbar() {
    return (
        <div id="topbar">
            <div style={{display:'flex',flexDirection:'row'}}>
                <Icon/>
                <div id="topbar-title-text">
                    Keep
                </div>
            </div>
        </div>
    )
}

export default Topbar
