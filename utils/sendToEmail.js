export const sendToEmail= (name,email,message)=>{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'kasemalolo2002@gmail.com',
          pass: 'powf prmp bhpk dzgu',
        },
      });
      
      // Setup email data
      const mailOptions = {
        from: 'midnightX.app',
        to: email,
        subject: ` verified code`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n ${message} `,
      };
      // Send the email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).json({ success: false, error: error.message });
        }
        res.status(200).json({ success: true, message: 'Email sent successfully!' });
      });
    
}