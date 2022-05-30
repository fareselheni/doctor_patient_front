import axios from "axios";
import store from "../store";
const API_URL = "http://localhost:3000/api/notification/";
const publicVapidKey =
  "BJthRQ5myDgc7OSXzPCMftGw-n16F7zQBEN7EUD6XxcfTTvrLGWSIG7y_JxiWtVlCFua0S8MTB5rPziBqNx1qIo";
class NotificationService {
  async send(bodyNotification) {
    // Register Service Worker
    // eslint-disable-next-line no-console
    console.log("Registering service worker...");
    const register = await navigator.serviceWorker.register("/sw.js", {
      scope: "/",
    });
    // eslint-disable-next-line no-console
    console.log("Service Worker Registered...");

    // Register Push
    // eslint-disable-next-line no-console
    console.log("Registering Push...");
    const subscription = await register.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: this.urlBase64ToUint8Array(publicVapidKey),
    });
    // eslint-disable-next-line no-console
    console.log("Push Registered...");

    // Send Push Notification
    // eslint-disable-next-line no-console
    console.log("Sending Push...");
    await axios.post("http://localhost:3000/subscribe", {
      body: JSON.stringify(subscription),
      bodyNotification: bodyNotification,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "X-Requested-With",
      },
    });
    // eslint-disable-next-line no-console
    console.log("Push Sent...");
  }

  urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      // eslint-disable-next-line no-useless-escape
      .replace(/\-/g, "+")
      .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
  async allNotifications() {
    const response = await axios.get(API_URL + "getNotifications", {
      params: {
        user_id: store.state.auth.user.id,
      },
    });
    return response.data.allNotifications;
  }
  async addNotification(event) {
    return axios.post(API_URL + "addNotification", {
      score: event.score,
      doctor_id: event.doctor_id,
      user_id: store.state.auth.user.id,
    });
  }
}

export default new NotificationService();
