// eslint-disable-next-line no-console
console.log("Service Worker Loaded...");

// eslint-disable-next-line prettier/prettier
this.addEventListener("push", e => {
  const data = e.data.json();
  console.log("data", data);
  // eslint-disable-next-line no-console
  console.log("Push Recieved...");
  this.registration.showNotification(data.title, {
    body: data.bodyNotification,
    icon: "http://image.ibb.co/frYOFd/tmlogo.png",
  });
});
