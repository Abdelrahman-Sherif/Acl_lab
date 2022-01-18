const router = require('express').Router();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service:"gmail",
    
    auth:{
        user: "yassin.sameh.dev@gmail.com",
        //It's a temp account with 2FA, don't try :)
        pass: "4ag3NmN2PpM6gD",
    }
})

router.route('/sendMail').post(async (req, res) =>{
    console.log("Send email request body: " + JSON.stringify(req.body));
    const options = {
        from: "commercialuse2@proton.com",
        to: req.body.recipientEmail,
        subject: "Egeeeept air",
        text: req.body.text,
    }
    transporter.sendMail(options, function (err,info){

        if(err){
            console.log("Error sending email: "+ err);
            return;
        }
        console.log("Response from sending email: "+ info.response);
    });

    return res;
    
  });

  module.exports = router;

// async function sendEmail(recipientEmail, messageText){
// }




