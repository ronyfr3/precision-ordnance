const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../middleware/errorMiddleware");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// const sendEmail = require("../utils/sendEmail");

const ContactUs = catchAsyncError(async (req, res, next) => {
  // sendEmail(req.body);

  const { name, email, message, phone } = req.body;
  if (!name || !email || !message) {
    return next(new ErrorHandler("you have to fill all the fields", 400));
  } else {
    const emailData = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "contact us",
      html: `
        <h1>Contact Us</h1>
        <p>Name: ${name}</p>
        <p>Number: ${phone}</p>
        <hr />
        <p>${message}</p>
        <h3>Precision Ordnance</h3>
      `,
    };
    sgMail.send(emailData).then((response) => {
      console.log(response[0].statusCode);
      console.log(response[0].headers);
    });
    res.status(200).json({
      message: "Thanks for your message! We’ll get back to you shortly.",
    });
  }
});
module.exports = { ContactUs };
