// const nodemailer = require("nodemailer");
// const { google } = require("googleapis");
// const router = require("express").Router();
// // NODEMAILER
// const data = [];
// const OAuth2 = google.auth.OAuth2;
// const oauth2Client = new OAuth2(
//   "241756016698-vagkljjd1o8iqd657aivf6p64cigqrve.apps.googleusercontent.com",
//   "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",
//   "https://developers.google.com/oauthplayground"
// );
// oauth2Client.setCredentials({
//   refresh_token:
//     "1//04vM5B32voY0fCgYIARAAGAQSNwF-L9IrbnFSHBeMNdsPTgrNoEgmCYnQDNEY3QTSUEme6N2klu28gBBfQbGvDVYoaCQvWC-UmLo",
// });
// const access_token = oauth2Client.getAccessToken();

// let transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     type: "OAuth2",
//     user: "markosispower@gmail.com",
//     pass: "400377markosis",
//     clientId:
//       "241756016698-vagkljjd1o8iqd657aivf6p64cigqrve.apps.googleusercontent.com",
//     clientSecret: "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",
//     refreshToken:
//       "1//04vM5B32voY0fCgYIARAAGAQSNwF-L9IrbnFSHBeMNdsPTgrNoEgmCYnQDNEY3QTSUEme6N2klu28gBBfQbGvDVYoaCQvWC-UmLo",
//     accessToken: access_token,
//   },
// });

// transporter.verify((err, success) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(`Server is ready to take messages: ${success}`);
//   }
// });

// router.post("/", (req, res) => {
//     data.push(req.body);
//     let mailOptions = {
//       from: req.body.email,
//       to: "rakib.fstackdev@gmail.com,mohiuddin0240@gmail.com,sharan9037@gmail.com",
//       subject: "Contact Us",
//       html: `
//         <h1 style="color:"green"">${req.body.name} wants to connect us</h1>
//         <p>Email: ${req.body.email}</p>
//         <p>Message: ${req.body.message}</p>
//       `,
//     };
//     transporter.sendMail(mailOptions, function (err, res) {
//       if (err) {
//         res.status(500).json({
//           msg: "fail",
//         });
//       } else {
//         res.status(200).json({
//           msg: "success",
//         });
//       }
//     });
//     res.status(200).json({message:"message sent"})
//   });
  
// module.exports = router;

const express = require("express");
const router = express.Router();
const { ContactUs } = require("../controllers/ContactUs");

router.route("/").post(ContactUs);

module.exports = router;
