import asyncHandler from "express-async-handler";
import nodemailer from "nodemailer";

export const emialController = asyncHandler(async (req, res) => {
    const output = `
     <p>you have a new contact request</p>
     <h3>contact details</h3>
     <ul>
        <li>name : ${req.body.name}</li>
        <li>email : ${req.body.email}</li>
        <li>phone : ${req.body.phone}</li>
        <li>compnay : ${req.body.compnay}</li>

     </ul>
     <h3>Message</h3>
     <p>${req.body.message}</p>
    `

    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL, // generated ethereal user
            pass: process.env.EMAIL_PASSWORD, // generated ethereal password
        },
    });
    let mailOptions = {
        from: process.env.EMAIL, // sender address
        to: "mahsa.hmd1@yahoo.com", // list of receivers
        subject: "express app test", // Subject line
        text: "Hello world?", // plain text body
        html: output, // html body
    }
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error)
        }
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

        res.render('contact', { msg: 'Email has been sent' })
    });


})