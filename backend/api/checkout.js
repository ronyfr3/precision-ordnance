const stripeAPI = require('../stripe')

//https://stripe.com/docs/api/checkout/sessions/create

const createCheckoutSession= async (req,res)=>{
 const domainUrl = process.env.WEB_APP_URL;
 const {line_items,customer_email}=req.body;
 console.log(req.body);

 //check req body has line items and customer_email
 if(!line_items || !customer_email){
     return res.status(400).json({error:"missing required parameters"});
 }
 let session;
 try {
     session = await stripeAPI.checkout.sessions.create({
         payment_method_types:['card'],
         mode:'payment',
         line_items,
         customer_email,
         success_url:`${domainUrl}/success?success_id={CHECKOUT_SESSION_ID}`,
         cancel_url:`${domainUrl}/canceled`,
         //if you need to provide restriction area for shipping collection
         //shipping_address_collection:{allowed_countries:['GB','US']}
     })
     res.status(200).json({sessionId:session.id})
 } catch (error) {
     console.log(error);
     res.json(400).json({error:'an error happened, unable to create session!'})
 }
}

module.exports = createCheckoutSession