const Mailgen = require('mailgen');
const sgMail = require('@sendgrid/mail');
require('dotenv').config();

class EmailService {
  #sender = sgMail;
  #Generatetemolate = Mailgen;
  constructor(env) {}
  #createTemplate(vereficationToken, name = 'Guest') {}
  sendEmail() {}
}

module.exports = EmailService;
