import React, { createRef, useEffect, useState } from 'react'
import firebase from 'firebase'
import ReactDOM from 'react-dom';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import Delete from './Delete';
import Edit from './Edit';
function Containers(props) {
    const [data, setdata] = useState(null)
    const [open, setOpen] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    console.log(props)
    function fun() {
        setOpen(true)
    }
    useEffect(() => {
        firebase.firestore().collection('Notes').onSnapshot(query => {
            var arry = []
            query.forEach(doc => {
                console.log(doc.data())
                arry.push({
                    data: doc.data(),
                    id: doc.id
                })
            })
            setdata(arry)
        })
    }, [])
    return (
        <>
            <div className="containers">


                {data != null && data.map(doc => {
                    return <Container title={doc.data.title} content={doc.data.content} fun={fun} id={doc.id} />

                })}
            </div></>
    )
}
function Container({ title, content, fun, id }) {
    const titleref=createRef(null)
    const contentref=createRef(null)
    const [data, setdata] = useState(null)
    const [open, setOpen] = useState(false);
    const [titleeditable,settitleeditable]=useState(false)
    const [contenteditable,setcontenteditable]=useState(false)
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    const del = () => {
        //alert("delete")
        firebase.firestore().collection('Notes').doc(id).delete()
        onCloseModal()
    }
    const edit=()=>{
        setcontenteditable(true);
        settitleeditable(true)
    }
    const done=()=>{
        firebase.firestore().collection('Notes').doc(id).set({
            title:titleref.current.innerHTML,
            content:contentref.current.innerHTML
        }).then(()=>{
            onCloseModal()
        })
    }
    return (
        <>
            <Modal open={open} onClose={onCloseModal} center classNames={{
                overlay: 'customOverlay',
                modal: 'customModal',
            }}>
                <div ref={titleref} style={{ fontSize: '24px', fontWeight: 700, padding: '8px', marginTop: '5px',outline:'none' }} spellCheck="false" contentEditable={titleeditable}>{title}</div>
                <div ref={contentref} style={{ fontSize: '16px', padding: '12px', fontWeight: 400, color: 'rgb(128,134,139)',outline:'none' }} spellCheck="false" contentEditable={contenteditable}>{content}</div>
                {
                    titleeditable &&
                    <div className="btn" style={{textAlign:'center',margin:'20px'}} onClick={done}>Done</div>
                }
               
                <div style={{ display:'flex',flexDirection:'row',justifyContent:'space-between' ,marginVertical:'20px'}} >
                    <div className="icon" onClick={edit}>
                    <Edit/>
                    </div>
                    <div onClick={del} className="icon">
                    <Delete />
                    </div>
                    
                    
                </div>

            </Modal>
            <div className="container" onClick={onOpenModal}>

                <div className="container-title" >{title}</div>
                <div className="container-content">
                    {content}
                </div>
            </div></>
    )
}
export default Containers
