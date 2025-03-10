'use client'
import { useState } from 'react';
import Footer from '../(components)/Footer';

const Page = () => {
    const [formData, setFormData] = useState({
        name: '',
        college: '',
        shift: '',
        enrollmentNumber: '',
        transactionId: '',
        paymentScreenshot: null,
        selectedEvent: ''
    });

    const events = [
        { id: 1, name: 'Innovision 6', price: '200' },
        { id: 2, name: 'AI Design Sprint', price: '300' },
        { id: 3, name: 'Hack The Hunt', price: '800' },
        { id: 4, name: 'GameXcite', price: '400' },
        { id: 5, name: 'Byete Beyond', price: '600' },
        { id: 6, name: 'Green Pixel', price: '300' },
        { id: 7, name: 'Green Tech Quest', price: '500' }
    ];

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: files ? files[0] : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Add your form submission logic here
    };

    return (
        <>
        <div className="min-h-screen bg-green-800 py-12 px-4 sm:px-6 lg:px-8 font-poppins">
            <div className="max-w-3xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl text-white mb-2 font-monot">Event  Registration</h1>
                    <p className="text-lg text-white">Join us in creating a sustainable future through technology</p>
                </div>

                {/* Main Form Card */}
                <div className="bg-white rounded-sm shadow-lg p-8 border border-green-100">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Personal Information Section */}
                        <div className="space-y-6">
                            <h2 className="text-xl font-semibold text-green-700 pb-2 border-b border-green-200">Personal Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-green-700 mb-1">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        className="w-full p-2.5 border border-green-500 rounded-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                        onChange={handleChange}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-green-700 mb-1">College</label>
                                    <input
                                        type="text"
                                        name="college"
                                        required
                                        className="w-full p-2.5 border border-green-500 rounded-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                        onChange={handleChange}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-green-700 mb-1">Shift</label>
                                    <select
                                        name="shift"
                                        required
                                        className="w-full p-2.5 border border-green-500 rounded-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                        onChange={handleChange}
                                    >
                                        <option value="">Select Shift</option>
                                        <option value="morning">Morning</option>
                                        <option value="evening">Evening</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-green-700 mb-1">Enrollment Number</label>
                                    <input
                                        type="text"
                                        name="enrollmentNumber"
                                        required
                                        className="w-full p-2.5 border border-green-500 rounded-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Event Selection Section */}
                        <div className="space-y-6">
                            <h2 className="text-xl font-semibold text-green-700 pb-2 border-b border-green-200">Event Details</h2>
                            <div>
                                <label className="block text-sm font-medium text-green-700 mb-1">Select Event</label>
                                <select
                                    name="selectedEvent"
                                    required
                                    className="w-full p-2.5 border border-green-500 rounded-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                    onChange={handleChange}
                                >
                                    <option value="">Select an Event</option>
                                    {events.map(event => (
                                        <option key={event.id} value={event.id}>
                                            {event.name} - ₹{event.price}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Payment Section */}
                        <div className="space-y-6">
                            <h2 className="text-xl font-semibold text-green-700 pb-2 border-b border-green-200">Payment Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-green-700 mb-1">Transaction ID</label>
                                    <input
                                        type="text"
                                        name="transactionId"
                                        required
                                        className="w-full p-2.5 border border-green-500 rounded-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                        onChange={handleChange}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-green-700 mb-1">Payment Screenshot</label>
                                    <input
                                        type="file"
                                        name="paymentScreenshot"
                                        accept="image/*"
                                        required
                                        className="w-full p-2.5 border border-green-500 rounded-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-6">
                            <button
                                type="submit"
                                className="w-full cursor-pointer bg-green-600 text-white py-3 px-4 rounded-md font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                            >
                                Complete Registration
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <Footer />
        </>
    );
};

export default Page;