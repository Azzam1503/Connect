const nodemailer = require('../config/nodemailer');

exports.newComment = (comment)=> {
    console.log('inside newComment Mailer');

    
    nodemailer.transporter.sendMail({
        from: 'Connect.com',
        to: comment.user.email,
        subject: "new Comment is published",
        html: '<h1>Yup,your comment is now published<h1/>'
    }, (err, info)=>{
        if(err){
            console.log("Error in sending mail", err); 
            return;
        }

        console.log('Message sent', info);
        return;
    })
}