import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport, Transporter } from 'nodemailer';

// Picks the first mailer that is configured:
// 1. SMTP_HOST + SMTP_USER + SMTP_PASS: any SMTP server (production uses the Hostinger mailbox talkmate@edsol.academy)
// 2. GMAIL_USER + GMAIL_APP_PASSWORD: Gmail SMTP
// 3. RESEND_API_KEY: Resend's HTTP API (no SDK)
// With none, the message is printed to the server log, which is enough for local development.
@Injectable()
export class MailService {
  private readonly log = new Logger('Mail');
  private smtp: { transport: Transporter; from: string } | null | undefined;
  constructor(private readonly config: ConfigService) {}

  // built once, on first use
  private smtpTransport() {
    if (this.smtp !== undefined) return this.smtp;
    const host = this.config.get<string>('SMTP_HOST')?.trim();
    const user = this.config.get<string>('SMTP_USER')?.trim();
    const pass = this.config.get<string>('SMTP_PASS');
    const gmailUser = this.config.get<string>('GMAIL_USER')?.trim();
    // an App Password is shown with spaces ("abcd efgh ijkl mnop"), so they are dropped
    const gmailPass = this.config.get<string>('GMAIL_APP_PASSWORD')?.replace(/\s+/g, '');
    if (host && user && pass) {
      const port = Number(this.config.get<string>('SMTP_PORT')) || 465;
      this.smtp = {
        transport: createTransport({
          host,
          port,
          secure: port === 465, // 587 upgrades with STARTTLS
          auth: { user, pass },
          connectionTimeout: 10_000,
          socketTimeout: 15_000,
        }),
        // the server only accepts its own address as sender, so the name is the only part MAIL_FROM can change
        from: this.config.get<string>('MAIL_FROM')?.trim() || `TalkMate <${user}>`,
      };
    } else if (gmailUser && gmailPass) {
      this.smtp = {
        transport: createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: { user: gmailUser, pass: gmailPass },
          connectionTimeout: 10_000,
          socketTimeout: 15_000,
        }),
        // Gmail always sends from the signed-in account, whatever "from" says
        from: `TalkMate <${gmailUser}>`,
      };
    } else {
      this.smtp = null;
    }
    return this.smtp;
  }

  async send(to: string, subject: string, text: string, html: string) {
    const smtp = this.smtpTransport();
    if (smtp) {
      await smtp.transport.sendMail({ from: smtp.from, to, subject, text, html });
      return;
    }
    const key = this.config.get<string>('RESEND_API_KEY');
    if (!key) {
      this.log.warn(`No SMTP_*, GMAIL_* or RESEND_API_KEY is set, so this email was not sent. To: ${to}\n${subject}\n${text}`);
      return;
    }
    const from = this.config.get<string>('MAIL_FROM')?.trim() || 'TalkMate <onboarding@resend.dev>';
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to, subject, text, html }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`Resend ${res.status}: ${(await res.text().catch(() => '')).slice(0, 300)}`);
  }
}
