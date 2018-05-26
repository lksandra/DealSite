//this module provides API for sending deal alert mails to the users.

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'outlook',
  auth: {
    user: 'lsandra@syr.edu',
    pass: 'L.k.3154505974'
  }
});

var mailOptions = {
  from: 'lsandra@syr.edu',
  to: 'slkcopy@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});