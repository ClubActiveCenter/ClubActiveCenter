import { Inject } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';

export class SendGridService {
    constructor(
        @Inject('SENDGRID') private readonly sgMail: sgMail.MailService
    ){}

    async wellcomeMail(to: string, subject: string): Promise<void>{

        const mail = {
            to,
            from: "jumi.rc@hotmail.com",
            subject,
            templateId: "d-8c4aa8bdf6d24112b4f8dddea1f6363",
        }
        try {
            await this.sgMail.send(mail); 
            console.log('Email enviado correctamente');
          } catch (error) {
            console.error('Error enviando email:', error);
            throw new Error('Error sending email');
          }
    }
    
}
