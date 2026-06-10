import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'All fields required' }, { status: 400 });
    }

    // Option 1: Use Resend (recommended — add RESEND_API_KEY to .env)
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);

      await resend.emails.send({
        from: 'Portfolio <noreply@kunalbuilds.me>',
        to: process.env.CONTACT_EMAIL ?? 'devkunal2812@gmail.com',
        subject: `[Portfolio] ${subject} — from ${name}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
            <h2 style="color:#00d4ff;">New Portfolio Contact</h2>
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:8px;font-weight:bold;color:#888;">Name</td><td style="padding:8px;">${name}</td></tr>
              <tr><td style="padding:8px;font-weight:bold;color:#888;">Email</td><td style="padding:8px;"><a href="mailto:${email}">${email}</a></td></tr>
              <tr><td style="padding:8px;font-weight:bold;color:#888;">Subject</td><td style="padding:8px;">${subject}</td></tr>
            </table>
            <div style="margin-top:16px;padding:16px;background:#f5f5f5;border-radius:8px;">
              <strong>Message:</strong><br/><br/>
              ${message.replace(/\n/g, '<br/>')}
            </div>
          </div>
        `,
        reply_to: email,
      });
    } else {
      // Option 2: Log to console in dev (replace with your email service)
      console.log('📧 New contact form submission:', { name, email, subject, message });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
