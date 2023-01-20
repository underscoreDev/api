import "dotenv/config";
import * as nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
const {
  EMAIL_USERNAME,
  EMAIL_PASSWORD,
  NODE_ENV,
  SENDINBLUE_SMTP_Server,
  SENDINBLUE_PASSWORD,
  SENDINBLUE_Login,
} = process.env;

// EMAIL CLASS
export const Email = class {
  to: string;
  name: string;
  url?: string;
  from: string;

  constructor(user: { email: string; name: string }, url?: string) {
    this.to = user.email;
    this.name = user.name;
    this.url = url;
    this.from = "Hackathon <noreply@hackathon.com>";
  }

  readonly newTransport = (): nodemailer.Transporter<SMTPTransport.SentMessageInfo> => {
    if (NODE_ENV === "production") {
      return nodemailer.createTransport({
        host: SENDINBLUE_SMTP_Server,
        port: 465,
        auth: {
          user: SENDINBLUE_Login,
          pass: SENDINBLUE_PASSWORD,
        },
      });
    } else {
      return nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: EMAIL_USERNAME,
          pass: EMAIL_PASSWORD,
        },
      });
    }
  };

  readonly send = async (template: any, subject: any) => {
    // render the html for the email

    // define the email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject: subject,
      html: template,
    };

    // create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  };

  readonly sendEmailVerificationCode = async (emailToken: string) => {
    const html = `
           <h3>Welcome to Hackathon. Your NestJS Starter API KITs</h3>
           <h1> ${emailToken} </h1> <span> is your Email Verification Code</span>
           <h4>Verification code is Valid for 10 minutes</h4>
    `;

    return await this.send(html, "Email Verification Code");
  };
};

/*

export async function sendEmail(email: string, subject: string, url: string, code: string) {
  const filePath = path.join(__dirname, "../utils/activation_email.html");
  const source = fs.readFileSync(filePath, "utf-8").toString();
  const template = handlebars.compile(source);
  const replacements = { code };
  const htmlToSend = template(replacements);
  const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525, // 587
    secure: false,
    auth: {
      user: "fg7f6g7g67",
      pass: "asds7ds7d6",
    },
  });
  const mailOptions = {
    from: "noreply@yourdomain.com",
    to: email,
    subject: subject,
    text: url,
    html: htmlToSend,
  };
  const info = await transporter.sendMail(mailOptions);
  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", "https://mailtrap.io/inboxes/test/messages/");
}

*/
