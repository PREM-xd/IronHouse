
const axios = require("axios");

const sendEmail = async (
  to,
  subject,
  htmlContent
) => {
  try {
    console.log("BREVO API KEY EXISTS:", !!process.env.BREVO_API_KEY);
console.log("SENDING TO:", to);
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "Iron House Gym",
          email: "ironhouse79@gmail.com",
        },

        to: [
          {
            email: to,
          },
        ],

        subject,
        htmlContent,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("EMAIL SENT:", response.data);

  }catch (error) {
  console.log("FULL BREVO ERROR:");

 if (error.response) {
  console.log("STATUS:", error.response.status);
  console.log("DATA:", JSON.stringify(error.response.data, null, 2));
} else {
    console.log(error.message);
  }
}
};

module.exports = sendEmail;