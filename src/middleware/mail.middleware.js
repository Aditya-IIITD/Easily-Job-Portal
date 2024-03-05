import nodemailer from "nodemailer";

//middleware to send confirmation mail to student about their job application
export const sendEmail = (req, res, next) => {
  const { name, email } = req.body;
  //transport created
  const transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "janager8860000281@gmail.com",
      pass: "ypnn wwah ppep zgep",
    },
  });

  //mail options
  const mailOptions = {
    from: "janager8860000281@gmail.com",
    to: email,
    subject: "Your Application has been Received",
    text: `Dear ${name}, 

    Thank you for applying and for the time and effort you’ve put into exploring a role with us.  We wanted to let you know we’ve received your application and are currently reviewing it. 
    
    Kind regards
    Easily Jobs
    `,
  };

  //sending mail
  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error occurred while sending confirmation Email:", error);
    } else {
      console.log("Email sent");
    }
  });

  //next middleware called
  next();
};
