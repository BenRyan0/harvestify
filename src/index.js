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
    Notification.requestPermission().then((permission) => {
      console.log('Notification permission:', permission);

      if (permission === 'granted') {
        navigator.serviceWorker.ready.then((registration) => {
          registration.showNotification('Welcome!', {
            body: 'This is your test notification!',
            icon: '/icon.png', // Replace with your app icon path
            tag: 'welcome-notification',
          });
          console.log('Notification displayed via service worker.');
        }).catch((err) => {
          console.error('Error accessing service worker:', err);
        });
      } else {
        console.warn('Notification permission denied.');
      }
    });
  } else {
    console.warn('Notifications or service workers are not supported.');
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
