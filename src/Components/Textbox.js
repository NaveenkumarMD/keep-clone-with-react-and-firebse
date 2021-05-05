import React, { useState, useRef, useEffect } from 'react'

function Textbox(props) {
    console.log(props)
    const [flag, setflag] = useState('none')
    const [brad, setbrad] = useState('10px')
    const [border, setBorder] = useState(null)
    const [height, setheight] = useState(null)
    const contentref = useRef(null)
    const titleref = useRef(null)
    

    const handleclick = () => {
        props.onChangetitle(titleref.current.innerHTML)    
        props.onChangecontent(contentref.current.innerHTML) 
        props.onsubmit(titleref.current.innerHTML,contentref.current.innerHTML)
        titleref.current.innerHTML=""
        contentref.current.innerHTML=""
    }

    return (
        <div style={{ textAlign: 'start', marginTop: '30px' }}>

            <div contentEditable ref={titleref} placeholder="Title" className="title" style={{ display: flag }}></div>
            <div contentEditable ref={contentref} placeholder="Type something..." className="textbox" onClick={() => {
                setflag(null)
                setBorder('0px')
                setheight('100px')
            }} style={{borderTopLeftRadius:border,borderTopRightRadius:border,height:height}}></div>
            <div style={{ textAlign: 'center', marginTop: '20px', display: flag }}>
                <button className="btn" onClick={handleclick}>Done</button>
            </div>
        </div>
    )
}

export default Textbox
