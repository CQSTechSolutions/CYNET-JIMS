'use server'

import connectDB from '@/helpers/connectDb.helper';
import mongoose from 'mongoose';
import { sendEmail } from '@/utils/mailer';
import * as XLSX from 'xlsx';
import ExcelJS from 'exceljs';

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
    },
    teamMembers: {
        type: [{
            eventId: String,
            members: [{
                name: String,
                email: String,
                phone: String,
                college: String
            }],
            substitutes: [{
                name: String,
                email: String,
                phone: String,
                college: String
            }]
        }],
        required: false
    }
}, { timestamps: true });

// Get the Registration model (creates if doesn't exist)
const Registration = mongoose.models.Registration || mongoose.model('Registration', RegistrationSchema);

export async function getRegistrations() {
    try {
        await connectDB();
        
        const registrations = await Registration.find({}).sort({ createdAt: -1 });
        
        // Properly serialize the MongoDB documents
        const serializedRegistrations = registrations.map(reg => {
            const regObj = reg.toObject();
            return {
                ...regObj,
                _id: regObj._id.toString(),
                createdAt: regObj.createdAt?.toISOString(),
                updatedAt: regObj.updatedAt?.toISOString(),
                // Ensure teamMembers are properly serialized
                teamMembers: regObj.teamMembers?.map(team => ({
                    ...team,
                    _id: team._id?.toString(),
                    members: team.members?.map(member => ({
                        ...member,
                        _id: member._id?.toString()
                    })),
                    substitutes: team.substitutes?.map(sub => ({
                        ...sub,
                        _id: sub._id?.toString()
                    }))
                }))
            };
        });

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

/**
 * Export registrations to Excel by event name and status
 */
export async function exportRegistrationsToExcel(event = 'all', status = 'verified') {
    try {
        await connectDB();

        // Build query based on event and status
        const query = {};
        if (status !== 'all') {
            query.status = status;
        }
        if (event !== 'all') {
            query.events = event;
        }

        console.log('Export query:', query);
        const registrations = await Registration.find(query);

        if (!registrations || registrations.length === 0) {
            return {
                success: false,
                error: 'No registrations found to export'
            };
        }

        const workbook = new ExcelJS.Workbook();
        const sheetName = `${event === 'all' ? 'All' : event.substring(0, 20)} - ${status === 'all' ? 'All Status' : status}`;
        const worksheet = workbook.addWorksheet(sheetName.substring(0, 31));

        // Define columns with specific widths
        worksheet.columns = [
            { header: 'Registration Date', key: 'date', width: 20 },
            { header: 'Name', key: 'name', width: 25 },
            { header: 'Email', key: 'email', width: 30 },
            { header: 'Phone', key: 'phone', width: 15 },
            { header: 'College', key: 'college', width: 30 },
            { header: 'Enrollment Number', key: 'enrollmentNumber', width: 20 },
            { header: 'Semester', key: 'semester', width: 10 },
            { header: 'Events', key: 'events', width: 30 },
            { header: 'Event ID', key: 'eventId', width: 20 },
            { header: 'Role', key: 'role', width: 15 },
            { header: 'Member Name', key: 'memberName', width: 25 },
            { header: 'Member Email', key: 'memberEmail', width: 30 },
            { header: 'Member Phone', key: 'memberPhone', width: 15 },
            { header: 'Member College', key: 'memberCollege', width: 30 },
            { header: 'Transaction ID', key: 'transactionId', width: 20 },
            { header: 'Amount', key: 'amount', width: 10 },
            { header: 'Status', key: 'status', width: 10 }
        ];

        // Style the header row
        worksheet.getRow(1).font = { bold: true };
        worksheet.getRow(1).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFE2F0D9' }
        };

        // Add data rows
        registrations.forEach(registration => {
            const baseData = {
                date: registration.createdAt.toLocaleString(),
                name: registration.name,
                email: registration.email,
                phone: registration.phone,
                college: registration.college,
                enrollmentNumber: registration.enrollmentNumber,
                semester: registration.semester,
                events: registration.events.join(', '),
                transactionId: registration.transactionId,
                amount: registration.totalPayable,
                status: registration.status
            };

            // Add main registrant as team leader for each event
            registration.events.forEach(eventName => {
                const teamData = registration.teamMembers?.find(t => t.eventId === eventName);
                
                // Add main registrant row
                worksheet.addRow({
                    ...baseData,
                    eventId: eventName,
                    role: 'Team Leader',
                    memberName: registration.name,
                    memberEmail: registration.email,
                    memberPhone: registration.phone,
                    memberCollege: registration.college
                });

                // Add team members
                if (teamData?.members) {
                    teamData.members.slice(1).forEach((member, index) => {
                        worksheet.addRow({
                            ...baseData,
                            eventId: eventName,
                            role: `Team Member ${index + 1}`,
                            memberName: member.name,
                            memberEmail: member.email,
                            memberPhone: member.phone,
                            memberCollege: member.college
                        });
                    });
                }

                // Add substitutes
                if (teamData?.substitutes) {
                    teamData.substitutes.forEach((sub, index) => {
                        worksheet.addRow({
                            ...baseData,
                            eventId: eventName,
                            role: `Substitute ${index + 1}`,
                            memberName: sub.name,
                            memberEmail: sub.email,
                            memberPhone: sub.phone,
                            memberCollege: sub.college
                        });
                    });
                }
            });
        });

        // Auto-filter for all columns
        worksheet.autoFilter = {
            from: { row: 1, column: 1 },
            to: { row: 1, column: worksheet.columns.length }
        };

        // Generate Excel file
        const buffer = await workbook.xlsx.writeBuffer();
        const content = buffer.toString('base64');

        return {
            success: true,
            data: {
                content,
                filename: `registrations_${event}_${status}_${new Date().toISOString().split('T')[0]}.xlsx`
            }
        };
    } catch (error) {
        console.error('Export error:', error);
        return {
            success: false,
            error: 'Failed to export registrations'
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

/**
 * Delete all rejected registrations
 */
export async function deleteRejectedRegistrations() {
    try {
        await connectDB();
        
        // Find all rejected registrations first to get the count
        const rejected = await Registration.find({ status: 'rejected' });
        const count = rejected.length;
        
        if (count === 0) {
            return {
                success: true,
                count: 0,
                message: 'No rejected registrations found'
            };
        }
        
        // Delete all rejected registrations
        await Registration.deleteMany({ status: 'rejected' });
        
        return {
            success: true,
            count,
            message: `Successfully deleted ${count} rejected registrations`
        };
    } catch (error) {
        console.error('Error deleting rejected registrations:', error);
        return {
            success: false,
            error: 'Failed to delete rejected registrations'
        };
    }
} 