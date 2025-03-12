'use server'

import connectDB from '@/helpers/connectDb.helper';
import mongoose from 'mongoose';

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
            { new: true, lean: true }
        );
        
        if (!registration) {
            return { 
                success: false, 
                error: 'Registration not found' 
            };
        }
        
        const serializedRegistration = {
            ...registration,
            _id: registration._id.toString(),
            createdAt: registration.createdAt?.toISOString(),
            updatedAt: registration.updatedAt?.toISOString()
        };

        return { success: true, data: serializedRegistration };
    } catch (error) {
        console.error('Error updating status:', error);
        return { 
            success: false, 
            error: 'Failed to update status' 
        };
    }
} 