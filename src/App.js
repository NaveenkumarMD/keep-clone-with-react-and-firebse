import React,{useState} from 'react'
import Topbar from './Components/Topbar'
import './App.css'
import Textbox from './Components/Textbox'
import firebase from 'firebase'
import firebaseConfig from './firebase'
import Containers from './Components/Containers'

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig)
}
else{
  firebase.app()
}
function App() {
  const [title,setTitle]=useState()
  const [content,setContent]=useState('1')
  const [blur,setblur]=useState('')
  console.log(content,title)
  const hanldeclick=(title,content)=>{
    //alert(title)
    if(!content){
      return ;
    }
    firebase.firestore().collection('Notes').add({
      title,content
    }).then(()=>{
      console.log("success")
    })

  }
  return (
    <>
    
    <div style={{filter:blur}}>
      <Topbar/>
      <div style={{padding:'20px'}}>
      <Textbox onChangetitle={setTitle} onChangecontent={setContent} onsubmit={hanldeclick}/>
      <div style={{textAlign:'center'}}>
      <h2 style={{color:'rgba(0,0,0,0.7)',alignSelf:'center'}}>Notes</h2>
      </div>
      
      <Containers func={setblur}/>
      </div>
    </div>
    </>
  )
}

export default App
