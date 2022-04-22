// eslint-disable-next-line no-console
console.log("Service Worker Loaded...");

// eslint-disable-next-line prettier/prettier
this.addEventListener("push", e => {
  const data = e.data.json();
  // eslint-disable-next-line no-console
  console.log("Push Recieved...");
  this.registration.showNotification(data.title, {
    body: "you have a new Notification!",
    icon: "http://image.ibb.co/frYOFd/tmlogo.png",
  });
});
