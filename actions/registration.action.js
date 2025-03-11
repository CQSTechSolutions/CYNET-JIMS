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
    },
    semester: {
      type: String,
      required: [true, 'Semester is required'],
    },
    events: {
      type: [String],
      required: [true, 'At least one event must be selected'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

  Registration = mongoose.model('Registration', RegistrationSchema);
}

export async function registerForEvents(formData) {
  try {
    // Connect to the database
    await connectDB();

    // Extract form data
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const college = formData.get('college');
    const enrollmentNumber = formData.get('enrollmentNumber');
    const transactionId = formData.get('transactionId');
    const semester = formData.get('semester');
    
    // Handle events (could be multiple selections)
    let events = formData.getAll('events');
    
    // Validate required fields
    if (!name || !email || !phone || !college || !enrollmentNumber || !transactionId || !semester || !events.length) {
      return {
        success: false,
        message: 'All fields are required. Please ensure you have selected at least one event.',
      };
    }

    // Create a new registration
    const registration = new Registration({
      name,
      email,
      phone,
      college,
      enrollmentNumber,
      transactionId,
      semester,
      events,
    });

    // Save to database
    await registration.save();

    // Revalidate the page to show updated data
    revalidatePath('/register-for-events');

    return {
      success: true,
      message: 'Registration successful! We look forward to seeing you at the event(s).',
    };
  } catch (error) {
    console.error('Registration error:', error);
    
    // Handle duplicate email error
    if (error.code === 11000 && error.keyPattern?.email) {
      return {
        success: false,
        message: 'This email has already been registered. Please use a different email or contact support.',
      };
    }
    
    return {
      success: false,
      message: 'Registration failed. Please try again later.',
      error: error.message,
    };
  }
}
