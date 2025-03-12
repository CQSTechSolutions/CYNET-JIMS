'use server'

import connectDB from '@/helpers/connectDb.helper';
import mongoose from 'mongoose';

export async function getRegistrations() {
    try {
        await connectDB();
        
        const Registration = mongoose.model('Registration');
        const registrations = await Registration.find({})
            .sort({ createdAt: -1 })
            .lean(); // Convert Mongoose documents to plain JavaScript objects
        
        // Convert _id to string to ensure it's serializable
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
        
        const Registration = mongoose.model('Registration');
        const registration = await Registration.findByIdAndUpdate(
            registrationId,
            { status },
            { new: true, lean: true } // Get plain JavaScript object
        );
        
        if (!registration) {
            return { 
                success: false, 
                error: 'Registration not found' 
            };
        }
        
        // Convert _id to string and format dates
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