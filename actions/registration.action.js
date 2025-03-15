'use server';

import connectDB from '@/helpers/connectDb.helper';
import mongoose from 'mongoose';
import { revalidatePath } from 'next/cache';
import { sendEmail } from '@/utils/mailer';

let Registration;

try {
  // Check if the model is already defined to prevent overwriting
  Registration = mongoose.model('Registration');
} catch (e) {
  const RegistrationSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
      unique: true, 
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    college: {
      type: String,
      required: [true, 'College name is required'],
      trim: true,
    },
    enrollmentNumber: {
      type: String,
      required: [true, 'Enrollment number is required'],
      trim: true,
    },
    transactionId: {
      type: String,
      required: [true, 'Transaction ID is required'],
      trim: true,
      unique: true
    },
    semester: {
      type: String,
      required: [true, 'Semester is required'],
    },
    payment_ss: {
      type: String,
      required: [true, 'Please Upload the Payment Screenshot']
    },
    events: {
      type: [String],
      required: [true, 'At least one event must be selected'],
    },
    totalPayable: {
      type: Number,
      required: [true, 'Total payable amount is required'],
    },
    status: {
      type: String,
      enum: ['pending', 'verified', 'rejected'],
      default: 'pending'
    }
  },{timestamps: true});

  Registration = mongoose.model('Registration', RegistrationSchema);
}

export async function registerForEvents(formData) {
  try {
    // Connect to the database
    await connectDB();

    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const college = formData.get('college');
    const enrollmentNumber = formData.get('enrollmentNumber');
    const transactionId = formData.get('transactionId');
    const semester = formData.get('semester');
    const payment_ss = formData.get('payment_ss');
    const totalPayable = formData.get('totalPayable');
    
    let events = formData.getAll('events');
    
    // Validate required fields
    if (!name || !email || !phone || !college || !enrollmentNumber || !transactionId || !semester || !payment_ss || !events.length) {
      return {
        success: false,
        message: 'All fields are required. Please ensure you have selected at least one event and uploaded payment proof.',
      };
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return {
        success: false,
        message: 'Please enter a valid email address.',
      };
    }

    if (phone.length < 10) {
      return {
        success: false,
        message: 'Please enter a valid phone number.',
      };
    }

    // Check for duplicate transaction ID first
    const existingTransaction = await Registration.findOne({ transactionId });
    if (existingTransaction) {
      return {
        success: false,
        message: 'Email is already used.',
      };
    }

    // Check for duplicate email
    const existingRegistration = await Registration.findOne({ email });
    if (existingRegistration) {
      return {
        success: false,
        message: 'This email has already been registered. Please use a different email or contact support.',
      };
    }

    const registration = new Registration({
      name,
      email,
      phone,
      college,
      enrollmentNumber,
      transactionId,
      semester,
      payment_ss,
      events,
      totalPayable: Number(totalPayable),
    });

    await registration.save();

    // Prepare email content
    const userEmailHtml = `
      <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; border: 2px solid #4CAF50; border-radius: 10px;">
        <h2 style="color: #4CAF50; border-bottom: 2px solid #4CAF50; padding-bottom: 10px;">Registration Confirmation - Cynet 2025</h2>
        <p>Dear <strong style="color: #333;">${name}</strong>,</p>
        <p>Thank you for registering for <strong style="color: #4CAF50;">Cynet 2025</strong>! Your registration has been received successfully.</p>
        
        <h3 style="color: #4CAF50;">Registration Details:</h3>
        <ul style="list-style-type: none; padding: 0;">
          <li style="border-bottom: 1px solid #ddd; padding: 8px;"><strong>Name:</strong> <span style="color: #333;">${name}</span></li>
          <li style="border-bottom: 1px solid #ddd; padding: 8px;"><strong>Email:</strong> <span style="color: #333;">${email}</span></li>
          <li style="border-bottom: 1px solid #ddd; padding: 8px;"><strong>Phone:</strong> <span style="color: #333;">${phone}</span></li>
          <li style="border-bottom: 1px solid #ddd; padding: 8px;"><strong>College:</strong> <span style="color: #333;">${college}</span></li>
          <li style="border-bottom: 1px solid #ddd; padding: 8px;"><strong>Enrollment Number:</strong> <span style="color: #333;">${enrollmentNumber}</span></li>
          <li style="border-bottom: 1px solid #ddd; padding: 8px;"><strong>Semester:</strong> <span style="color: #333;">${semester}</span></li>
          ${email === transactionId && email === payment_ss ? '' : `<li style="border-bottom: 1px solid #ddd; padding: 8px;"><strong>Transaction ID:</strong> <span style="color: #333;">${transactionId}</span></li>`}
          ${email === payment_ss ? '' : `<li style="border-bottom: 1px solid #ddd; padding: 8px;"><strong>Total Amount:</strong> <span style="color: #333;">₹${totalPayable}</span></li>`}
        </ul>

        <h3 style="color: #4CAF50;">Registered Events:</h3>
        <ul style="list-style-type: none; padding: 0;">
          ${events.map(event => `<li style="border-bottom: 1px solid #ddd; padding: 8px;">${event}</li>`).join('')}
        </ul>

        <p>Your registration is currently under review. We will verify your payment and send you a confirmation email.</p>
        
        <p>If you have any questions, feel free to reply to this email.</p>
        
        <p>Best regards,<br><strong style="color: #4CAF50;">Team Cynet</strong></p>
      </div>
    `;

    // Send notification email to admin
    const adminEmailHtml = `
      <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; border: 2px solid #4CAF50; border-radius: 10px;">
        <h2 style="color: #4CAF50; border-bottom: 2px solid #4CAF50; padding-bottom: 10px;">New Event Registration</h2>
        <h3 style="color: #4CAF50;">Participant Details:</h3>
        <ul style="list-style-type: none; padding: 0;">
          <li style="border-bottom: 1px solid #ddd; padding: 8px;"><strong>Name:</strong> <span style="color: #333;">${name}</span></li>
          <li style="border-bottom: 1px solid #ddd; padding: 8px;"><strong>Email:</strong> <span style="color: #333;">${email}</span></li>
          <li style="border-bottom: 1px solid #ddd; padding: 8px;"><strong>Phone:</strong> <span style="color: #333;">${phone}</span></li>
          <li style="border-bottom: 1px solid #ddd; padding: 8px;"><strong>College:</strong> <span style="color: #333;">${college}</span></li>
          <li style="border-bottom: 1px solid #ddd; padding: 8px;"><strong>Enrollment Number:</strong> <span style="color: #333;">${enrollmentNumber}</span></li>
          <li style="border-bottom: 1px solid #ddd; padding: 8px;"><strong>Semester:</strong> <span style="color: #333;">${semester}</span></li>
          ${email === transactionId ? '' : `<li style="border-bottom: 1px solid #ddd; padding: 8px;"><strong>Transaction ID:</strong> <span style="color: #333;">${transactionId}</span></li>`}
          <li style="border-bottom: 1px solid #ddd; padding: 8px;"><strong>Total Amount:</strong> <span style="color: #333;">₹${totalPayable}</span></li>
          ${email === payment_ss ? '' : `<li style="border-bottom: 1px solid #ddd; padding: 8px;"><strong>Payment Screenshot:</strong> <a href="${payment_ss}" style="color: #4CAF50;">View Screenshot</a></li>`}
        </ul>

        <h3 style="color: #4CAF50;">Registered Events:</h3>
        <ul style="list-style-type: none; padding: 0;">
          ${events.map(event => `<li style="border-bottom: 1px solid #ddd; padding: 8px;">${event}</li>`).join('')}
        </ul>
      </div>
    `;

    // Send emails
    await Promise.all([
      sendEmail(
        email,
        'Registration Confirmation - Cynet 2025',
        userEmailHtml
      ),
      sendEmail(
        process.env.EMAIL_USER,
        `New Registration: ${name} - ${events.length} events`,
        adminEmailHtml
      )
    ]);

    revalidatePath('/register-for-events');

    return {
      success: true,
      message: 'Registration successful! We look forward to seeing you at the event(s).',
    };
  } catch (error) {
    console.error('Registration error:', error);
    
    // Handle duplicate key errors
    if (error.code === 11000) {
      if (error.keyPattern?.email) {
        return {
          success: false,
          message: 'This email has already been registered. Please use a different email or contact support.',
        };
      }
      if (error.keyPattern?.transactionId) {
        return {
          success: false,
          message: 'Invalid Details. Please Check the form before submitting.',
        };
      }
    }
    
    return {
      success: false,
      message: 'An error occurred during registration. Please try again.',
    };
  }
}
