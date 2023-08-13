const express = require('express');
const bodyParser = require('body-parser');
const mailgun = require('mailgun-js');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Configure Mailgun with my API key and domain
const api_key = 'dbf6ad012733eacfe7e7cb55414b53b8-28e9457d-0b49d352';
const domain = 'sandboxaa076ae129014b1d9462321ea352aae4.mailgun.org';
const mg = mailgun({ apiKey: api_key, domain: domain });

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// Handle form submission and send welcome email
app.post('/', (req, res) => {
    const email = req.body.email;

    const data = {
        from: 'Your App <arjunbhardwaj219@gmail.com>',
        to: email,
        subject: 'Welcome to my Web Site!',
        text: `Hello, Welcome to my Web Site! We're excited to have you join us.\n\nBest regards,\nArjun Bhardwaj`
    };

    mg.messages().send(data, (error, body) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error sending email.');
        } else {
            console.log('Email sent:', body);
            res.status(200).send('Welcome email sent successfully.');
        }
    });
});

app.listen(8000, () => {
    console.log("Server is running at port 8000!!!");
});
