const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));  // Correct data parsing
app.use(express.static('project')); // Serve static files

// Route to handle form submission
app.post('/submit', (req, res) => {
    const { name, email, phone } = req.body;

    // Nodemailer transporter setup
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'gouda3859@gmail.com',
            pass: 'qhti ymwp pwhm lxfi'
        }
    });

    const mailOptions = {
        from: 'gouda3859@gmail.com',
        to: 'gouda3859@gmail.com',
        subject: 'New Course Enrollment',
        text: `You have a new submission:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(`Error: ${error}`);
            return res.status(500).send('Error sending email. Please try again.');
        }
        console.log('Email sent: ' + info.response);
        res.send('Form submitted successfully! Email sent.');
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
