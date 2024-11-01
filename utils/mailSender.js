const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = async (email,title,body) => {

    try {

        let transporter = nodemailer.createTransport ({
            host:process.env.MAIL_HOST,
            auth:{                                                                      
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            }
        })



        //send 
        let info = await transporter.sendMail({
            from:"from  Bhai ",
            to:`${email}`,
            subject:`${title}`,
            html:`${body},`
        })

        console.log("mail info::", info);
        return info;





    } catch(error) {
        console.log("error in mailSender");
        console.log(error);

    }
}

module.exports = mailSender;