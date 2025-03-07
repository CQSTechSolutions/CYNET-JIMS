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
        <div className="max-w-2xl mx-auto p-6 font-poppins">
            <h1 className="text-3xl font-bold mb-6">Event Registration</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1">Name</label>
                    <input
                        type="text"
                        name="name"
                        required
                        className="w-full p-2 border rounded"
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="block mb-1">College</label>
                    <input
                        type="text"
                        name="college"
                        required
                        className="w-full p-2 border rounded"
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="block mb-1">Shift</label>
                    <select
                        name="shift"
                        required
                        className="w-full p-2 border rounded"
                        onChange={handleChange}
                    >
                        <option value="">Select Shift</option>
                        <option value="morning">Morning</option>
                        <option value="evening">Evening</option>
                    </select>
                </div>

                <div>
                    <label className="block mb-1">Enrollment Number</label>
                    <input
                        type="text"
                        name="enrollmentNumber"
                        required
                        className="w-full p-2 border rounded"
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="block mb-1">Select Event</label>
                    <select
                        name="selectedEvent"
                        required
                        className="w-full p-2 border rounded"
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

                <div>
                    <label className="block mb-1">Transaction ID</label>
                    <input
                        type="text"
                        name="transactionId"
                        required
                        className="w-full p-2 border rounded"
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="block mb-1">Payment Screenshot</label>
                    <input
                        type="file"
                        name="paymentScreenshot"
                        accept="image/*"
                        required
                        className="w-full p-2 border rounded"
                        onChange={handleChange}
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    Register
                </button>
            </form>
        </div>
    );
};

export default Page;