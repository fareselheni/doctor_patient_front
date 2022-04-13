<template>
  <div id="container">
    <h1>Email-verification System in Node.js</h1>
    <input
      type="text"
      id="to"
      placeholder="Enter E-mail which you want to verify"
    /><br />
    <button id="send_email">Send Email</button><br />
    <span id="message"></span>
  </div>
</template>
<script>
// $(document).ready(function () {
//   var to;
//   $("#send_email").click(function () {
//     to = $("#to").val();
//     $("#message").text("Sending E-mail...Please wait");
//     $.get("http://localhost:3000/send", { to: to }, function (data) {
//       if (data == "sent") {
//         $("#message")
//           .empty()
//           .html(
//             "<p>Email is been sent at " + to + " . Please check inbox !</p>"
//           );
//       }
//     });
//   });
// });
</script>
<style>
#container {
  margin-left: 400px;
  margin-top: 50px;
}
#to,
#subject,
#content {
  font-family: "Segoe UI";
  font-size: 18px;
  width: 530px;
}
h1 {
  font-family: "Segoe UI";
  font-size: 40px;
  color: #3b5998;
}
p {
  color: green;
}
#send_email {
  font-size: 15px;
  font-family: "Segoe UI";
}
#message {
  font-size: 18px;
}
</style>
