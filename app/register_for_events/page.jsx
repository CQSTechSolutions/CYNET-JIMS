'use client'
import { useState } from 'react';

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
        { id: 1, name: 'Tech Hackathon 2024', price: '500' },
        { id: 2, name: 'Coding Competition', price: '300' },
        { id: 3, name: 'Robotics Workshop', price: '800' },
        { id: 4, name: 'AI/ML Seminar', price: '400' },
        { id: 5, name: 'Web Development Bootcamp', price: '600' }
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
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Event Registration</h1>
                    <p className="text-lg text-gray-600">Register for your favorite tech events</p>
                </div>

                {/* Main Form Card */}
                <div className="bg-white rounded-lg shadow-xl p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Personal Information Section */}
                        <div className="space-y-6">
                            <h2 className="text-xl font-semibold text-gray-800 pb-2 border-b">Personal Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        className="w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        onChange={handleChange}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">College</label>
                                    <input
                                        type="text"
                                        name="college"
                                        required
                                        className="w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        onChange={handleChange}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Shift</label>
                                    <select
                                        name="shift"
                                        required
                                        className="w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        onChange={handleChange}
                                    >
                                        <option value="">Select Shift</option>
                                        <option value="morning">Morning</option>
                                        <option value="evening">Evening</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Enrollment Number</label>
                                    <input
                                        type="text"
                                        name="enrollmentNumber"
                                        required
                                        className="w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Event Selection Section */}
                        <div className="space-y-6">
                            <h2 className="text-xl font-semibold text-gray-800 pb-2 border-b">Event Details</h2>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Select Event</label>
                                <select
                                    name="selectedEvent"
                                    required
                                    className="w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                            <h2 className="text-xl font-semibold text-gray-800 pb-2 border-b">Payment Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Transaction ID</label>
                                    <input
                                        type="text"
                                        name="transactionId"
                                        required
                                        className="w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        onChange={handleChange}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Payment Screenshot</label>
                                    <input
                                        type="file"
                                        name="paymentScreenshot"
                                        accept="image/*"
                                        required
                                        className="w-full p-2.5 border border-gray-300 rounded-md shadow-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-6">
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                            >
                                Complete Registration
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Page;