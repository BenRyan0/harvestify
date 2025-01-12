import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import store from "./store/index";
import "./components/i18/i18";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

import { socket } from './utils/utils'; // Import your socket instance

function initializeNotifications() {
  if ('Notification' in window && 'serviceWorker' in navigator) {
    if (Notification.permission === 'default') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          console.log('Notification permission granted.');
        } else {
          console.warn('Notification permission denied.');
        }
      }).catch((error) => {
        console.error('Error requesting notification permission:', error);
      });
    } else if (Notification.permission === 'granted') {
      console.log('Notification permission already granted.');
    } else if (Notification.permission === 'denied') {
      console.warn('Notification permission was previously denied.');
    }
  } else {
    console.warn('Notifications are not supported in this browser.');
  }
}

function setupSocketNotifications() {
  if ('serviceWorker' in navigator) {
    socket.on('seller_message_', (msg) => {
      if (document.visibilityState !== 'visible') {
        navigator.serviceWorker.ready.then((registration) => {
          console.log("TAE")
          registration.showNotification(`Message from ${msg.senderName}`, {
            body: msg.text,
            icon: '/path/to/icon.png', // Replace with your app's icon
            vibrate: [200, 100, 200],
            tag: `message-${msg.id}`, // Tag to replace previous notifications with the same ID
          });
        });
      } else {
        console.log("Message received but no notification since the page is visible.");
      }
    });

    return () => {
      socket.off('seller_message_');
    };
  } else {
    console.warn('Service workers are not supported in this browser.');
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
    <Toaster
      toastOptions={{
        position: "top-right",
        style: {
          background: "white",
          color: "black",
        },
      }}
    />
  </Provider>
);

// Register service worker and initialize notifications
serviceWorkerRegistration.register({
  onSuccess: () => {
    console.log('Service worker registered successfully.');
    initializeNotifications();
    setupSocketNotifications(); // Setup socket notifications after service worker registration
  },
  onUpdate: () => {
    console.log('Service worker updated.');
    initializeNotifications();
  },
});

reportWebVitals();
