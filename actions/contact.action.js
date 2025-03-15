'use server';

import { sendEmail } from '@/utils/mailer';

export async function sendContactEmail(formData) {
  try {
    // Get form data
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return {
        success: false,
        message: 'All fields are required.',
      };
    }

    // Validate email format
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return {
        success: false,
        message: 'Please enter a valid email address.',
      };
    }

    // Email HTML template
    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; border: 2px solid #4CAF50; border-radius: 10px; background-color: #f9f9f9;">
        <h2 style="color: #4CAF50; border-bottom: 2px solid #4CAF50; padding-bottom: 10px;">New Contact Form Submission</h2>
        <p style="margin: 10px 0;"><strong>Name:</strong> <span style="color: #333;">${name}</span></p>
        <p style="margin: 10px 0;"><strong>Email:</strong> <span style="color: #333;">${email}</span></p>
        <p style="margin: 10px 0;"><strong>Subject:</strong> <span style="color: #333;">${subject}</span></p>
        <h3 style="color: #4CAF50; margin-top: 20px;">Message:</h3>
        <p style="color: #333;">${message.replace(/\n/g, '<br>')}</p>
      </div>
    `;

    // Send email using mailer utility
    const emailSent = await sendEmail(
      process.env.EMAIL_USER,
      `Contact Form: ${subject}`,
      html
    );

    if (!emailSent) {
      throw new Error('Failed to send email');
    }

    return {
      success: true,
      message: 'Your message has been sent successfully! We will get back to you soon.',
    };

  } catch (error) {
    console.error('Contact form error:', error);
    return {
      success: false,
      message: 'An error occurred while sending your message. Please try again later.',
    };
  }
} 