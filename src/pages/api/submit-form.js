// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { values } = req.body;

    try {
      await sendEmail(values);
      res.status(200).json({ message: "Email sent successfully." });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

const sendEmail = async (values) => {
  const msg = {
    to: values.emailAddress,
    from: process.env.NEXT_PUBLIC_SENDER,
    subject: "Import permit application",
    html: `<b>Thank you for your submission. Here are your submission details:</b>
    <ul>
      ${Object.entries(values)
        .map(([key, value]) => `<li><b>${key}:</b> ${value}</li>`)
        .join("")}
    </ul>`,
  };

  await sgMail.send(msg);
};
