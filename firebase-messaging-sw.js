'use strict';
  
importScripts("https://www.gstatic.com/firebasejs/8.2.4/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.4/firebase-messaging.js");
  
const firebaseConfig = {
    apiKey: "AIzaSyCDMr3UKlq22kU6w509YRAbXpCzolrOhqc",
    authDomain: "vaas-81acf.firebaseapp.com",
    databaseURL: "https://vaas-81acf-default-rtdb.firebaseio.com",
    projectId: "vaas-81acf",
    storageBucket: "vaas-81acf.appspot.com",
    messagingSenderId: "383486059418",
    appId: "1:383486059418:web:1af1dd6f1f4daae9d0d023",
    measurementId: "G-5DDZ330G17"
  };
  
// Initialize the firebase in the service worker.
firebase.initializeApp(firebaseConfig);

const messaging=firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    console.log(payload);
    const notificationOption={
        body:payload.data.message,
        icon:payload.icon,
        data:{
                latitude:payload.data.latitude,
                longitude: payload.data.longitude
            }
    };
     return self.registration.showNotification(payload.data.title,notificationOption);
});
 
// self.addEventListener('push', function (event) {
//   var data = event.data.json();
  
//   const title = data.Title;
//   data.Data.actions = data.Actions;
//   const options = {
//     body: data.Message,
//     data: data.Data
//   };
//   event.waitUntil(self.registration.showNotification(title, options));
// });
  
// self.addEventListener('notificationclick', function (event) {});
  
// self.addEventListener('notificationclose', function (event) {});

self.addEventListener('notificationclick', function(event) {
    // let url = event.notification.data.url;
    console.log("event is ");
    console.log(event);
    let url = "http://127.0.0.1:5500/Landing%20Page/neumorphism_website-02-main/Personal/hospitalHome.html";
    event.notification.close(); 
    event.waitUntil(
    clients.matchAll({includeUncontrolled: true}).then( windowClients => {
    // Check if there is already a window/tab open with the target URL
    for (var i = 0; i < windowClients.length; i++) {
    var client = windowClients[i];
    
    client.postMessage({
        msg: event.notification.body,
        latitude: event.notification.data.latitude,
        longitude:event.notification.data.longitude,
        url: url
      });
    // If so, just focus it.
    if (client.url === url && 'focus' in client) {
        console.log("Hello notification received");
    return client.focus();
    }
    }
    // If not, then open the target URL in a new window/tab.
    if (clients.openWindow) {
        console.log("hii new window opened");
    var newWindow =  clients.openWindow(url).then(windowClient =>
      windowClient.postMessage({
        msg: event.notification.body,
        latitude: event.notification.data.latitude,
        longitude:event.notification.data.longitude,
        url: url
      }));
    // console.log(newWindow);
    return newWindow;
    }
    })
    );
    });