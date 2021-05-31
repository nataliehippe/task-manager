const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);


const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'natalie.alibegashvili@gmail.com',
        subject: "Thanks for joining in!",
        text: 'Welcome to the app, ' + name + '. Let me know how you get along with the app.',
        //TODO: Add html code
    }).then(() => {
        console.log('Email sent');
    }).catch((error) => {
        console.log(error.response.body);
    })
}

const sendCancelEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'natalie.alibegashvili@gmail.com',
        subject: 'Sorry to see you go!',
        text: "Byeeee!!! " + name
    }).then((response) => {
        console.log(response[0].statusCode);
        console.log(response[0].headers);
    }).catch((error) => {
        console.log(error.response.body);
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelEmail
}