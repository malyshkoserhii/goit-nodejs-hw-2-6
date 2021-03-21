const Mailgen = require('mailgen');
const sgMail = require('@sendgrid/mail');
require('dotenv').config();
const config = require('../config/email.json');

class EmailService {
  #sender = sgMail;
  #GenerateTemplate = Mailgen;
  constructor(env) {
    switch (env) {
      case 'development':
        this.link = config.development;
        break;
      case 'stage':
        this.link = config.stage;
        break;
      case 'production':
        this.link = config.production;
        break;
      default:
        this.link = config.development;
        break;
    }
  }
  #createEmailTemplate(verificationToken, name = 'Guest') {
    const mailGenerator = new this.#GenerateTemplate({
      theme: 'salted',
      product: {
        name: 'MalSer Contacts Storage',
        link: this.link,
        copyright:
          'Copyright © 2021 MalSer Conatcts Storage. All rights reserved.',
      },
    });
    const emailTemplate = {
      body: {
        name,
        intro:
          "Welcome to MalSer Contacts Storage! We're very excited to have you on board.",
        action: {
          instructions:
            'To get started with Contacts Storage, please click here:',
          button: {
            color: '#22BC66',
            text: 'Confirm your account',
            link: `${this.link}/api/users/auth/verify/${verificationToken}`,
          },
        },
        outro:
          "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    };
    return mailGenerator.generate(emailTemplate);
  }
  async sendEmail(verificationToken, email, name) {
    const emailBody = this.#createEmailTemplate(verificationToken, name);
    this.#sender.setApiKey(process.env.SENDGRID_API_KEY);
    console.log('API_KEY', process.env.SENDGRID_API_KEY);
    const msg = {
      to: email,
      from: 'malyshkoserhii@meta.ua', // Use the email address or domain you verified above
      subject: 'MalSer Contacts Storage. Confrim your email',
      html: emailBody,
    };
    sgMail.send(msg).then(
      () => {},
      (error) => {
        console.error(error);

        if (error.response) {
          console.error(error.response.body);
        }
      },
    );
  }
}

module.exports = EmailService;
