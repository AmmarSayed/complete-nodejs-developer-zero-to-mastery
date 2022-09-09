require("dotenv").config();
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = async (email, name) => {
  const msg = {
    to: email, // Change to your recipient
    from: "ammarsayed1988@gmail.com", // Change to your verified sender
    subject: "Welcome to task Manager App",
    text: `Welcome dear ${name}, let me know how do find the App so far!`,
    html: `<strong>Welcome dear ${name}, let me know how do find the App so far!</strong>`,
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

const sendGoodbyEmail = async (email, name) => {
  const msg = {
    to: email, // Change to your recipient
    from: "ammarsayed1988@gmail.com", // Change to your verified sender
    subject: "Goodby from task Manager App",
    text: `Dear ${name}, we're sorry to see leaving our App. We hope seeing you subscribing again soon. Please let us know what could have done to keep you onboard!`,
    html: `<strong>Dear ${name}, we're sorry to see leaving our App. We hope seeing you subscribing again soon. Please let us know what could have done to keep you onboard!</strong>`,
  };

  await sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = { sendWelcomeEmail, sendGoodbyEmail };
