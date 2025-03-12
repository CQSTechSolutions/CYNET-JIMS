'use client'
import { useState } from 'react';
import Footer from '../(components)/Footer';
import { registerForEvents } from '@/actions/registration.action';
import ComingSoon from '../(components)/ComingSoon';
import Image from 'next/image';
import { CldUploadWidget } from 'next-cloudinary';
import Navbar from '../(components)/Navbar';

const Page = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        college: '',
        enrollmentNumber: '',
        transactionId: '',
        semester: '',
        payment_ss: '',
        events: [],
        totalPayable: 0
    });
    
    const [status, setStatus] = useState({
        message: '',
        type: '', 
        isSubmitting: false
    });

    const events = [
        { id: 'innovision-6', name: 'Innovision 6', price: 0 },
        { id: 'gen-ai-poster-makin', name: 'Gen AI Poster Making', price: 0 },
        { id: 'techno-treasure', name: 'Techno Treasure', price: 200 },
        { id: 'ux-marvels', name: 'UX Marvels: Figma UI Challenge', price: 0 },
        { id: 'techwiz-green-tech-quest', name: 'Techwiz: Green Tech Quest', price: 0 },
        { id: 'reelify-reel-making', name: 'Reelify: Reel Making Competition', price: 0}
    ];

    const gamingEvents = [
        {id: "Assassin-creed-shadow", name: "Assassin's Creed Shadows", price: 0},
        {id: "bgmi-tournament", name: "BGMI Tournament", price: 0},
        {id: "takken-7", name: "Takken 7", price: 0},
        {id: "smash-kart", name: "Smash Kart", price: 0},
        {id: "stumble-guys", name: "Stumble Guys", price: 0},
        {id: "valorant-tournament", name: "Valorant Tournament", price: 0},
        {id: "squid-games-robolox", name: "Squid Games (Robolox)", price: 0},
        {id: "squid-games-robolox", name: "Squid Games (Robolox)", price: 0},
    ]

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        if (type === 'checkbox') {
            if (name === 'events') {
                setFormData(prev => {
                    const updatedEvents = checked 
                        ? [...prev.events, value]
                        : prev.events.filter(event => event !== value);
                    
                    // Calculate total payable amount based on selected events
                    const totalAmount = updatedEvents.reduce((sum, eventId) => {
                        const event = events.find(e => e.id === eventId);
                        return sum + (event ? event.price : 0);
                    }, 0);

                    return { 
                        ...prev, 
                        events: updatedEvents,
                        totalPayable: totalAmount 
                    };
                });
            }
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ message: '', type: '', isSubmitting: true });
        
        // Validate required fields
        if (!formData.payment_ss) {
            setStatus({
                message: 'Please upload your payment screenshot before submitting',
                type: 'error',
                isSubmitting: false
            });
            return;
        }
        
        try {
            
            const formDataObj = new FormData();
            formDataObj.append('name', formData.name);
            formDataObj.append('email', formData.email);
            formDataObj.append('phone', formData.phone);
            formDataObj.append('college', formData.college);
            formDataObj.append('enrollmentNumber', formData.enrollmentNumber);
            formDataObj.append('transactionId', formData.transactionId);
            formDataObj.append('semester', formData.semester);
            formDataObj.append('payment_ss', formData.payment_ss);
            formDataObj.append('totalPayable', formData.totalPayable.toString());
            
            formData.events.forEach(event => {
                formDataObj.append('events', event);
            });
            
            const result = await registerForEvents(formDataObj);
            
            if (result.success) {
                setStatus({
                    message: result.message,
                    type: 'success',
                    isSubmitting: false
                });
                // Reset form on success
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    college: '',
                    enrollmentNumber: '',
                    transactionId: '',
                    semester: '',
                    payment_ss: '',
                    events: [],
                    totalPayable: 0
                });
            } else {
                setStatus({
                    message: result.message,
                    type: 'error',
                    isSubmitting: false
                });
            }
        } catch (error) {
            setStatus({
                message: 'An unexpected error occurred. Please try again.',
                type: 'error',
                isSubmitting: false
            });
            console.error('Form submission error:', error);
        }
    };

    return (
        <div className="overflow-x-hidden">
        <Navbar/>
        <div className="min-h-screen pt-36 overflow-x-hidden bg-green-800 py-12 px-4 sm:px-6 lg:px-8 font-poppins select-none">
            <div className="max-w-3xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl text-white mb-2 font-monot">Event Registration</h1>
                    <p className="text-lg text-white">Join us in creating a sustainable future through technology</p>
                </div>

                {/* Status Message */}
                {status.message && (
                    <div className={`mb-6 p-4 rounded-md ${status.type ===   'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {status.message}
                    </div>
                )}

                {/* Main Form Card */}
                <div className="bg-white rounded-sm shadow-lg p-8 border border-green-100">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Personal Information Section */}
                        <div className="space-y-6">
                            <h2 className="text-xl font-semibold text-green-700 pb-2 border-b border-green-200">Personal Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-green-700 mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        required
                                        autoComplete="name"
                                        className="w-full p-2.5 border border-green-500 rounded-sm focus:outline-none focus:ring-0 focus:border-green-500"
                                        onChange={handleChange}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-green-700 mb-1">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        required
                                        autoComplete="email"
                                        className="w-full p-2.5 border border-green-500 rounded-sm focus:outline-none focus:ring-0 focus:border-green-500"
                                        onChange={handleChange}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-green-700 mb-1">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        required
                                        autoComplete="tel"
                                        className="w-full p-2.5 border border-green-500 rounded-sm focus:outline-none focus:ring-0 focus:border-green-500"
                                        onChange={handleChange}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-green-700 mb-1">Enrollment Number</label>
                                    <input
                                        type="text"
                                        name="enrollmentNumber"
                                        value={formData.enrollmentNumber}
                                        required
                                        className="w-full p-2.5 border border-green-500 rounded-sm focus:outline-none focus:ring-0 focus:border-green-500"
                                        onChange={handleChange}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-green-700 mb-1">College/University</label>
                                    <input
                                        type="text"
                                        name="college"
                                        value={formData.college}
                                        required
                                        autoComplete="organization"
                                        className="w-full p-2.5 border border-green-500 rounded-sm focus:outline-none focus:ring-0 focus:border-green-500"
                                        onChange={handleChange}
                                    />
                                </div>

   

                                <div>
                                    <label className="block text-sm font-medium text-green-700 mb-1">Semester</label>
                                    <select
                                        name="semester"
                                        value={formData.semester}
                                        required
                                        className="w-full p-2.5 border border-green-500 rounded-sm focus:outline-none focus:ring-0 focus:border-green-500"
                                        onChange={handleChange}
                                    >
                                        <option value="">Select Semester</option>
                                        <option value="1">1st Semester</option>
                                        <option value="2">2nd Semester</option>
                                        <option value="3">3rd Semester</option>
                                        <option value="4">4th Semester</option>
                                        <option value="5">5th Semester</option>
                                        <option value="6">6th Semester</option>
                                        <option value="7">7th Semester</option>
                                        <option value="8">8th Semester</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Event Selection Section */}
                        <div className="space-y-6">
                            <h2 className="text-xl font-semibold text-green-700 pb-2 border-b border-green-200">Event Selection</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {events.map(event => (
                                    <div key={event.id} className="flex items-start">
                                        <input
                                            id={event.id}
                                            name="events"
                                            type="checkbox"
                                            value={event.id}
                                            checked={formData.events.includes(event.id)}
                                            onChange={handleChange}
                                            className="h-5 w-5 text-green-600 border-green-500 rounded mt-1"
                                        />
                                        <label htmlFor={event.id} className="ml-3 text-sm text-gray-700">
                                            {event.name}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            {formData.events.length === 0 ? (
                                <p className="text-sm text-red-500">Please select at least one event</p>
                            ) : (
                                <p className="text-lg font-semibold text-green-700">Total Amount to Pay: ₹{formData.totalPayable}</p>
                            )}
                        </div>
                        <div className="bg-green-500 p-2 w-max rounded-sm mx-auto">
                            <Image src="/payment_qr.jpeg" alt="payment_qr" width={200} height={200} />
                        </div>
                        <div className="flex w-full items-center justify-between">

                        {/* <div>
                                    <label className="block text-sm font-medium text-green-700 mb-1">Transaction ID</label>
                                    <input
                                        type="text"
                                        name="transactionId"
                                        value={formData.transactionId}
                                        required
                                        className="w-full p-2.5 border border-green-500 rounded-sm focus:outline-none focus:ring-0 focus:border-green-500"
                                        onChange={handleChange}
                                    />
                                </div> */}
                        <CldUploadWidget 
                            uploadPreset="Cynet2025"
                            onSuccess={(result, widget) => {
                                try {
                                    if (result.event === "success") {
                                        setFormData(prev => ({
                                            ...prev,
                                            payment_ss: result.info.secure_url
                                        }));
                                        setStatus({
                                            message: 'Payment screenshot uploaded successfully!',
                                            type: 'success',
                                            isSubmitting: false
                                        });
                                    }
                                } catch (error) {
                                    console.error('Upload error:', error);
                                    setStatus({
                                        message: 'Failed to upload payment screenshot. Please try again.',
                                        type: 'error',
                                        isSubmitting: false
                                    });
                                }
                            }}
                            onError={(error) => {
                                console.error('Upload error:', error);
                                setStatus({
                                    message: 'Failed to upload payment screenshot. Please try again.',
                                    type: 'error',
                                    isSubmitting: false
                                });
                            }}
                        >
                            {({ open }) => {
                                return (
                                    <button 
                                        type="button"
                                        onClick={() => open()}
                                        className="cursor-pointer w-max bg-green-100 text-green-700 py-3 px-4 rounded-md font-medium hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200 mt-[1.5vw]"
                                    >
                                        {formData.payment_ss ? 'Change Payment Screenshot' : 'Upload Payment Screenshot'}
                                    </button>
                                );
                            }}
                        </CldUploadWidget>
                        </div>
                            
                        <div className="">
                            <button
                                type="submit"
                                disabled={status.isSubmitting || formData.events.length === 0 || !formData.payment_ss}
                                className="w-full cursor-pointer bg-green-600 text-white py-3 px-4 rounded-md font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                {status.isSubmitting ? 'Submitting...' : 'Complete Registration'}
                            </button>
                        </div>
                     
                    </form>
                </div>
            </div>
        </div>
        <Footer />
        </div>
        // <ComingSoon />
    );
};

export default Page;