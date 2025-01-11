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

// Custom function to request notification permissions and display a test notification
function initializeNotifications() {
  if ('Notification' in window && 'serviceWorker' in navigator) {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');

        navigator.serviceWorker.ready.then((registration) => {
          registration.showNotification('Welcome!', {
            body: 'Welcome to Harvestify!',
            icon: '/logo512.png', // Replace with your app's notification icon path
            tag: 'welcome-notification',
          });
        });
      } else {
        console.warn('Notification permission denied.');
      }
    });
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

// Register the service worker
serviceWorkerRegistration.register({
  onSuccess: () => initializeNotifications(),
  onUpdate: () => {
    console.log('Service worker updated.');
    initializeNotifications();
  },
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
