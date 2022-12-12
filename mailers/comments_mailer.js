const nodeMailer = require('../config/nodemailer');

exports.newComment = (comment)=> {
    console.log('inside newComment Mailer');
    let htmlString = nodeMailer.renderTemplate({comment: comment}, '/comments/new_comment.ejs');

    
    nodeMailer.transporter.sendMail({
        from: 'johnloayl1580@gmail.com',
        to: comment.user.email,
        subject: "new Comment is published",
        html: htmlString
    }, (err, info)=>{
        if(err){
            console.log("Error in sending mail", err); 
            return;
        }

        console.log('Message sent', info);
        return;
    })
}