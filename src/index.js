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


function initializeNotifications() {
  if ('Notification' in window && 'serviceWorker' in navigator) {
    if (Notification.permission === 'default') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          console.log('Notification permission granted.');
          navigator.serviceWorker.ready.then((registration) => {
            registration.showNotification('Welcome!', {
              body: 'Notifications are working!',
              icon: '/logo512.png', // Replace with your icon path
              tag: 'test-notification',
            });
          });
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

serviceWorkerRegistration.register({
  onSuccess: () => {
    console.log('Service worker registered successfully.');
    initializeNotifications();
  },
  onUpdate: () => {
    console.log('Service worker updated.');
    initializeNotifications();
  },
});

reportWebVitals();
