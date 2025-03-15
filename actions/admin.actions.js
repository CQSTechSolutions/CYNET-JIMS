'use server'

import connectDB from '@/helpers/connectDb.helper';
import mongoose from 'mongoose';
import { sendEmail } from '@/utils/mailer';

// Import or define the Registration schema
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
}, { timestamps: true });

// Get the Registration model (creates if doesn't exist)
const Registration = mongoose.models.Registration || mongoose.model('Registration', RegistrationSchema);

export async function getRegistrations() {
    try {
        await connectDB();
        
        const registrations = await Registration.find({})
            .sort({ createdAt: -1 })
            .lean();
        
        const serializedRegistrations = registrations.map(reg => ({
            ...reg,
            _id: reg._id.toString(),
            createdAt: reg.createdAt?.toISOString(),
            updatedAt: reg.updatedAt?.toISOString()
        }));

        return { success: true, data: serializedRegistrations };
    } catch (error) {
        console.error('Error fetching registrations:', error);
        return { 
            success: false, 
            error: 'Failed to fetch registrations' 
        };
    }
}

export async function updateRegistrationStatus(registrationId, status) {
    try {
        await connectDB();
        
        const registration = await Registration.findByIdAndUpdate(
            registrationId,
            { status },
            { new: true }
        );
        
        if (!registration) {
            return { 
                success: false, 
                error: 'Registration not found' 
            };
        }

        // Send email based on status
        let emailHtml = '';
        let emailSubject = '';

        if (status === 'verified') {
            emailSubject = 'Registration Verified - Cynet 2025';
            emailHtml = `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; border: 2px solid #4CAF50; border-radius: 10px; background-color: #f9f9f9;">
                    <h2 style="color: #4CAF50; border-bottom: 2px solid #4CAF50; padding-bottom: 10px;">Registration Verified!</h2>
                    <p style="margin: 10px 0;">Dear ${registration.name},</p>
                    <p style="margin: 10px 0;">Your registration for Cynet 2025 has been verified successfully!</p>
                    
                    <h3 style="color: #4CAF50; margin-top: 20px;">Registration Details:</h3>
                    <ul style="list-style: none; padding-left: 0;">
                        <li style="margin: 5px 0;"><strong>Name:</strong> ${registration.name}</li>
                        <li style="margin: 5px 0;"><strong>Events:</strong> ${registration.events.join(', ')}</li>
                        <li style="margin: 5px 0;"><strong>Amount Paid:</strong> ₹${registration.totalPayable}</li>
                    </ul>

                    <p style="margin-top: 20px;">We look forward to seeing you at the event!</p>
                    <p>Best regards,<br>Team Cynet</p>
                </div>
            `;
        } else if (status === 'rejected') {
            emailSubject = 'Registration Update - Cynet 2025';
            emailHtml = `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; border: 2px solid #ff4444; border-radius: 10px; background-color: #f9f9f9;">
                    <h2 style="color: #ff4444; border-bottom: 2px solid #ff4444; padding-bottom: 10px;">Registration Update</h2>
                    <p style="margin: 10px 0;">Dear ${registration.name},</p>
                    <p style="margin: 10px 0;">We regret to inform you that your registration could not be verified at this time.</p>
                    <p style="margin: 10px 0;">This might be due to:</p>
                    <ul>
                        <li>Invalid payment details</li>
                        <li>Incomplete information</li>
                        <li>Payment verification issues</li>
                    </ul>
                    <p style="margin: 10px 0;">Please contact us for more information or try registering again.</p>
                    <p>Best regards,<br>Team Cynet</p>
                </div>
            `;
        }

        // Send email if status is verified or rejected
        if (emailHtml && emailSubject) {
            try {
                await sendEmail(
                    registration.email,
                    emailSubject,
                    emailHtml
                );
            } catch (emailError) {
                console.error('Failed to send status update email:', emailError);
                // Continue with the status update even if email fails
            }
        }

        // Return the updated registration data
        const serializedRegistration = {
            ...registration.toObject(),
            _id: registration._id.toString(),
            createdAt: registration.createdAt?.toISOString(),
            updatedAt: registration.updatedAt?.toISOString()
        };

        return { 
            success: true, 
            data: serializedRegistration 
        };

    } catch (error) {
        console.error('Error updating status:', error);
        return { 
            success: false, 
            error: 'Failed to update status' 
        };
    }
}

// Add the verify admin function
export async function verifyAdmin(credentials) {
    try {
        const adminUsername = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (!adminUsername || !adminPassword) {
            console.error('Admin credentials not configured');
            return { success: false };
        }
        // console.log(credentials);
        // console.log(adminUsername, adminPassword);

        if (credentials.username === adminUsername && 
            credentials.password === adminPassword) {
            return { success: true };
        }

        return { success: false };
    } catch (error) {
        console.error('Authentication error:', error);
        return { success: false };
    }
} 