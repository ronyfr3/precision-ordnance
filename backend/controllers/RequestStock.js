const asyncHandler = require("express-async-handler");
const sgMail =require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
// const sendEmail = require("../utils/sendEmail");

const RequestStock = asyncHandler(async (req, res) => {
  // sendEmail(req.body);
  // const { name, email, message } = req.body   


  const emailData = {
    from: process.env.SENDER_EMAIL,
    to: process.env.SENDER_EMAIL,
    subject: "Stock Request",
    html: `
      <h1>You have received a Stock Request.</h1>
      <p>Product ID:</p>
      <p>${new Date().toLocaleDateString}</p>
      <p>${new Date().toLocaleTimeString}</p>
      <h4>Products</h4>
    `,
  };

  try {
    sgMail
.send(emailData)
.then((response) => {
  console.log(response[0].statusCode)
  console.log(response[0].headers)
})
    
    res.status(201).json({
      message: "Request sent",
    });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});
module.exports = { RequestStock };
