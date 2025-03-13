'use server';

import connectDB from '@/helpers/connectDb.helper';
import mongoose from 'mongoose';
import { revalidatePath } from 'next/cache';

// Define the Registration schema
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
        message: 'This transaction ID has already been used. Please provide a unique transaction ID.',
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
          message: 'This transaction ID has already been used. Please provide a unique transaction ID.',
        };
      }
    }
    
    return {
      success: false,
      message: 'An error occurred during registration. Please try again.',
    };
  }
}
