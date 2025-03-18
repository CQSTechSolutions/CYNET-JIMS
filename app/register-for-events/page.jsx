"use client";

import { useState } from 'react';
import Footer from '../(components)/Footer';
import { registerForEvents } from '@/actions/registration.action';
import ComingSoon from '../(components)/ComingSoon';
import Image from 'next/image';
import { CldUploadWidget } from 'next-cloudinary';
import Navbar from '../(components)/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        totalPayable: 0,    
        teamMembers: {}
    });

    const [openSections, setOpenSections] = useState({
        personalInfo: true,
        eventSelection: true,
        paymentInfo: true,
        teamMembers: {}
    });

    const [status, setStatus] = useState({
        message: '',
        type: '',
        isSubmitting: false,
        emailError: false // New state to track email registration issues
    });

    const events = [
        { id: 'innovision-6', name: 'Innovision 6', price: 0 , multiplayer: 0, substitute: 0},
        { id: 'gen-ai-poster-makin', name: 'Gen AI Poster Making', price: 0, multiplayer: 0, substitute: 0 },
        { id: 'techno-treasure', name: 'Techno Treasure', price: 200, multiplayer: 2, substitute: 0},
        { id: 'ux-marvels', name: 'UX Marvels: Figma UI Challenge', price: 0 , multiplayer: 0, substitute: 0},
        { id: 'techwiz-green-tech-quest', name: 'Techwiz: Green Tech Quest', price: 0 , multiplayer: 0, substitute: 0},
        { id: 'reelify-reel-making', name: 'Reelify: Reel Making Competition', price: 0 , multiplayer: 0, substitute: 0}
    ];

    const gamexcite = [
        { id: "Assassin-creed-shadow", name: "Assassin's Creed Shadows", price: 50 , multiplayer: 0, substitute: 0},
        { id: "bgmi-tournament", name: "BGMI Tournament", price: 200 , multiplayer:4, substitute: 1 },
        { id: "takken-7", name: "Tekken 7", price: 50 , multiplayer: 0, substitute: 0},
        { id: "smash-kart", name: "Smash Karts", price: 30 , multiplayer: 0, substitute: 0},
        { id: "stumble-guys", name: "Stumble Guys", price: 30 , multiplayer: 0, substitute: 0},
        { id: "valorant-tournament", name: "Valorant Tournament", price: 250 , multiplayer: 5, substitute: 1},
        { id: "squid-games-robolox", name: "Squid Games (Roblox)", price: 50 , multiplayer: 0, substitute: 0},
        { id: "mortal-kombat-11", name: "Mortal kombat 11", price: 100 , multiplayer: 0, substitute: 0},
    ];

    const toggleSection = (section, eventId = null) => {
        if (eventId) {
            setOpenSections(prev => ({
                ...prev,
                teamMembers: {
                    ...prev.teamMembers,
                    [eventId]: {
                        ...prev.teamMembers[eventId],
                        [section]: !prev.teamMembers[eventId]?.[section]
                    }
                }
            }));
        } else {
            setOpenSections(prev => ({
                ...prev,
                [section]: !prev[section]
            }));
        }
    };

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
                        const event = events.find(e => e.id === eventId) || gamexcite.find(g => g.id === eventId);
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

    const handleTeamMemberChange = (eventId, type, index, field, value) => {
        setFormData(prev => {
            const teamMembers = { ...prev.teamMembers };
            if (!teamMembers[eventId]) {
                teamMembers[eventId] = {
                    members: [],
                    substitutes: []
                };
            }

            if (type === 'member') {
                if (!teamMembers[eventId].members[index]) {
                    teamMembers[eventId].members[index] = {};
                }
                teamMembers[eventId].members[index] = {
                    ...teamMembers[eventId].members[index],
                    [field]: value
                };
            } else {
                if (!teamMembers[eventId].substitutes[index]) {
                    teamMembers[eventId].substitutes[index] = {};
                }
                teamMembers[eventId].substitutes[index] = {
                    ...teamMembers[eventId].substitutes[index],
                    [field]: value
                };
            }

            return { ...prev, teamMembers };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ message: '', type: '', isSubmitting: true, emailError: false });

        // Debug logs for form data
        // console.log('Form Data:', formData);
        // console.log('Team Members:', formData.teamMembers);

        // First validate the main registration form (personal information)
        if (!formData.name || !formData.email || !formData.phone || !formData.college || !formData.enrollmentNumber || !formData.semester) {
            toast.error('Please fill all required fields in the personal information section');
            setStatus({ isSubmitting: false });
            return;
        }

        // Validate selected events
        if (formData.events.length === 0) {
            toast.error('Please select at least one event');
            setStatus({ isSubmitting: false });
            return;
        }

        // Validate team members for multiplayer events
        const selectedEvents = [...events, ...gamexcite].filter(event => formData.events.includes(event.id));
        // console.log('Selected Events:', selectedEvents);

        for (const event of selectedEvents) {
            if (event.multiplayer > 0) {
                const teamData = formData.teamMembers[event.id];
                // console.log(`Team Data for ${event.name}:`, teamData);
                
                // Check if team data exists and has required number of members
                if (!teamData?.members || !Array.isArray(teamData.members) || teamData.members.length < event.multiplayer) {
                    // console.log(`Missing team members for ${event.name}. Required: ${event.multiplayer}, Found:`, teamData?.members?.length || 0);
                    toast.error(`Please add all ${event.multiplayer} team members for ${event.name}`);
                    setStatus({ isSubmitting: false });
                    return;
                }

                // Validate each team member's required fields
                for (let i = 0; i < teamData.members.length; i++) {
                    const member = teamData.members[i];
                    // console.log(`Validating member ${i + 1}:`, member);

                    if (!member || typeof member !== 'object') {
                        // console.log(`Invalid member object at index ${i}`);
                        toast.error(`Please fill all details for team member ${i + 1} in ${event.name}`);
                        setStatus({ isSubmitting: false });
                        return;
                    }

                    // Check each required field
                    const requiredFields = ['name', 'email', 'phone', 'college'];
                    const missingFields = requiredFields.filter(field => !member[field]?.trim());
                    
                    if (missingFields.length > 0) {
                        // console.log(`Missing fields for member ${i + 1}:`, missingFields);
                        toast.error(`Please fill ${missingFields.join(', ')} for team member ${i + 1} in ${event.name}`);
                        setStatus({ isSubmitting: false });
                        return;
                    }
                }

                // Validate substitutes if required
                if (event.substitute > 0) {
                    if (!teamData?.substitutes || !Array.isArray(teamData.substitutes) || teamData.substitutes.length < event.substitute) {
                        // console.log(`Missing substitutes for ${event.name}. Required: ${event.substitute}, Found:`, teamData?.substitutes?.length || 0);
                        toast.error(`Please add ${event.substitute} substitute(s) for ${event.name}`);
                        setStatus({ isSubmitting: false });
                        return;
                    }

                    // Validate each substitute's required fields
                    for (let i = 0; i < teamData.substitutes.length; i++) {
                        const sub = teamData.substitutes[i];
                        // console.log(`Validating substitute ${i + 1}:`, sub);

                        if (!sub || typeof sub !== 'object') {
                            // console.log(`Invalid substitute object at index ${i}`);
                            toast.error(`Please fill all details for substitute ${i + 1} in ${event.name}`);
                            setStatus({ isSubmitting: false });
                            return;
                        }

                        const requiredFields = ['name', 'email', 'phone', 'college'];
                        const missingFields = requiredFields.filter(field => !sub[field]?.trim());
                        
                        if (missingFields.length > 0) {
                            // console.log(`Missing fields for substitute ${i + 1}:`, missingFields);
                            toast.error(`Please fill ${missingFields.join(', ')} for substitute ${i + 1} in ${event.name}`);
                            setStatus({ isSubmitting: false });
                            return;
                        }
                    }
                }
            }
        }

        // Validate payment information for paid events
        if (formData.totalPayable > 0) {
            if (!formData.transactionId?.trim()) {
                toast.error('Please enter the transaction ID');
                setStatus({ isSubmitting: false });
                return;
            }
            if (!formData.payment_ss) {
                toast.error('Please upload your payment screenshot');
                setStatus({ isSubmitting: false });
                return;
            }
        }

        // Proceed with form submission
        try {
            const formDataObj = new FormData();
            // Log the data being sent to the backend
            // console.log('Sending data to backend:', {
            //     name: formData.name,
            //     email: formData.email,
            //     phone: formData.phone,
            //     college: formData.college,
            //     enrollmentNumber: formData.enrollmentNumber,
            //     semester: formData.semester,
            //     events: formData.events,
            //     teamMembers: formData.teamMembers,
            //     totalPayable: formData.totalPayable
            // });

            formDataObj.append('name', formData.name);
            formDataObj.append('email', formData.email);
            formDataObj.append('phone', formData.phone);
            formDataObj.append('college', formData.college);
            formDataObj.append('enrollmentNumber', formData.enrollmentNumber);
            formDataObj.append('semester', formData.semester);
            formDataObj.append('totalPayable', formData.totalPayable.toString());

            // For free events, use email as transaction ID and payment screenshot
            if (formData.totalPayable === 0) {
                formDataObj.append('transactionId', formData.email);
                formDataObj.append('payment_ss', formData.email);
            } else {
                formDataObj.append('transactionId', formData.transactionId);
                formDataObj.append('payment_ss', formData.payment_ss);
            }

            // Append events
            formData.events.forEach(event => {
                formDataObj.append('events', event);
            });

            // Append team members data
            formData.events.forEach(eventId => {
                if (formData.teamMembers[eventId]) {
                    formDataObj.append(`teamMembers_${eventId}`, JSON.stringify(formData.teamMembers[eventId]));
                }
            });

            const result = await registerForEvents(formDataObj);

            if (result.success) {
                toast.success(result.message);
                // Reset form
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
                    totalPayable: 0,
                    teamMembers: {}
                });
                setStatus({ ...status, isSubmitting: false });
            } else {
                if (result.message.includes('already registered')) {
                    setStatus({ ...status, emailError: true, isSubmitting: false });
                } else {
                    toast.error(result.message);
                    setStatus({ ...status, isSubmitting: false });
                }
            }
        } catch (error) {
            console.error('Form submission error:', error);
            toast.error('An unexpected error occurred. Please try again.');
            setStatus({ ...status, isSubmitting: false });
        }
    };

    const showPaymentFields = formData.totalPayable > 0;

    return (
        <div className="overflow-x-hidden">
            <Navbar />
            <div className="min-h-screen pt-36 overflow-x-hidden bg-green-800 py-12 px-4 sm:px-6 lg:px-8 font-poppins select-none">
                <div className="max-w-3xl mx-auto">
                    {/* Header Section */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl text-white mb-2 font-monot">Event Registration</h1>
                        <p className="text-lg text-white">Join us in creating a sustainable future through technology</p>
                    </div>

                    {/* Main Form Card */}
                    <div className="bg-white rounded-sm shadow-lg p-8 border border-green-100">
                        <form id="registration-form" onSubmit={handleSubmit} className="space-y-6">
                            {/* Personal Information Section */}
                            <div className="space-y-6">
                                <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection('personalInfo')}>
                                    <h2 className="text-xl font-semibold text-green-700 pb-2">Personal Information</h2>
                                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 text-green-700 transform transition-transform ${openSections.personalInfo ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                                <div className={`transition-all duration-300 ${openSections.personalInfo ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-green-700 mb-1">Full Name *</label>
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
                                            <label className="block text-sm font-medium text-green-700 mb-1">Email *</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                required
                                                autoComplete="email"
                                                className={`w-full p-2.5 border ${status.emailError ? 'border-red-500' : 'border-green-500'} rounded-sm focus:outline-none focus:ring-0 focus:border-green-500`}
                                                onChange={handleChange}
                                            />
                                            {status.emailError && <p className="text-sm text-red-500">This email is already registered.</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-green-700 mb-1">Phone Number *</label>
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
                                            <label className="block text-sm font-medium text-green-700 mb-1">College Name *</label>
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
                                            <label className="block text-sm font-medium text-green-700 mb-1">Semester *</label>
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

                                        <div>
                                            <label className="block text-sm font-medium text-green-700 mb-1">Enrollment Number *</label>
                                            <input
                                                type="text"
                                                name="enrollmentNumber"
                                                value={formData.enrollmentNumber}
                                                required
                                                className="w-full p-2.5 border border-green-500 rounded-sm focus:outline-none focus:ring-0 focus:border-green-500"
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Event Selection Section */}
                            <div className="space-y-6">
                                <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection('eventSelection')}>
                                    <h2 className="text-xl font-semibold text-green-700 pb-2">Event Selection</h2>
                                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 text-green-700 transform transition-transform ${openSections.eventSelection ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                                <div className={`transition-all duration-300 ${openSections.eventSelection ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                                    {/* Technical Events */}
                                    <div>
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
                                                        {event.name} - {event.price === 0 ? 'Free' : `₹${event.price}`}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Gaming Events */}
                                    <div>
                                        <h3 className="text-lg font-medium text-green-600 mb-3">Gaming Events (GameXcite)</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {gamexcite.map(event => (
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
                                                        {event.name} - ₹{event.price}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {formData.events.length === 0 ? (
                                        <p className="text-sm text-red-500">Please select at least one event</p>
                                    ) : (
                                        <p className="text-lg font-semibold text-green-700">Total Amount to Pay: ₹{formData.totalPayable}</p>
                                    )}
                                </div>
                            </div>

                            {/* Payment Fields Section */}
                            {showPaymentFields && (
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection('paymentInfo')}>
                                        <h2 className="text-xl font-semibold text-green-700 pb-2">Payment Information</h2>
                                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 text-green-700 transform transition-transform ${openSections.paymentInfo ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                    <div className={`transition-all duration-300 ${openSections.paymentInfo ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                                        <div className="bg-green-500 p-2 w-max rounded-sm mx-auto">
                                            <Image src="/payment_qr.jpeg" alt="payment_qr" width={200} height={200} />
                                        </div>
                                        <div className="flex w-full items-center justify-between flex-col md:flex-row">
                                            <div>
                                                <label className="block text-sm font-medium text-green-700 mb-1">UPI Transaction ID</label>
                                                <input
                                                    type="text"
                                                    name="transactionId"
                                                    value={formData.transactionId}
                                                    required
                                                    className="w-full p-2.5 border border-green-500 rounded-sm focus:outline-none focus:ring-0 focus:border-green-500"
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <CldUploadWidget
                                                uploadPreset="Cynet2025"
                                                onSuccess={(result, widget) => {
                                                    try {
                                                        if (result.event === "success") {
                                                            setFormData(prev => ({
                                                                ...prev,
                                                                payment_ss: result.info.secure_url
                                                            }));
                                                            toast.success('Payment screenshot uploaded successfully!');
                                                        }
                                                    } catch (error) {
                                                        console.error('Upload error:', error);
                                                        toast.error('Failed to upload payment screenshot. Please try again.');
                                                    }
                                                }}
                                                onError={(error) => {
                                                    console.error('Upload error:', error);
                                                    toast.error('Failed to upload payment screenshot. Please try again.');
                                                }}
                                            >
                                                {({ open }) => (
                                                    <button
                                                        type="button"
                                                        onClick={() => open()}
                                                        className="cursor-pointer w-auto md:w-max bg-green-100 text-green-700 py-3 px-4 rounded-md font-medium hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200 mt-[1.5vw]"
                                                    >
                                                        {formData.payment_ss ? 'Change Payment Screenshot' : 'Upload Payment Screenshot'}
                                                    </button>
                                                )}
                                            </CldUploadWidget>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </form>
                    </div>

                    {/* Team Members Section */}
                    {formData.events.map(eventId => {
                        const event = [...events, ...gamexcite].find(e => e.id === eventId);
                        if (event && event.multiplayer > 0) {
                            if (!openSections.teamMembers[eventId]) {
                                setOpenSections(prev => ({
                                    ...prev,
                                    teamMembers: {
                                        ...prev.teamMembers,
                                        [eventId]: {
                                            main: true,
                                            members: true,
                                            substitutes: true
                                        }
                                    }
                                }));
                            }
                            
                            return (
                                <div key={eventId} className="bg-white rounded-sm shadow-lg p-8 border border-green-100 space-y-6 mt-8">
                                    <div className="flex items-center justify-between border-b border-green-200 pb-4 cursor-pointer"
                                         onClick={() => toggleSection('main', eventId)}>
                                        <h3 className="text-xl font-semibold text-green-700">{event.name} - Team Details</h3>
                                        <div className="flex items-center gap-2">
                                            <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                                                {event.multiplayer} Players {event.substitute > 0 ? `+ ${event.substitute} Sub` : ''}
                                            </span>
                                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 text-green-700 transform transition-transform ${openSections.teamMembers[eventId]?.main ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                    
                                    <div className={`transition-all duration-300 ${openSections.teamMembers[eventId]?.main ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                                        {/* Team Members */}
                                        <div className="space-y-6">
                                            <div className="flex items-center justify-between cursor-pointer"
                                                 onClick={() => toggleSection('members', eventId)}>
                                                <div className="flex items-center gap-2 text-green-700">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                                                    </svg>
                                                    <h4 className="font-medium">Team Members</h4>
                                                </div>
                                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 text-green-700 transform transition-transform ${openSections.teamMembers[eventId]?.members ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                            <div className={`transition-all duration-300 ${openSections.teamMembers[eventId]?.members ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                                                <div className="grid grid-cols-1 gap-6">
                                                    {Array.from({ length: event.multiplayer }).map((_, index) => {
                                                        if (index === 0) {
                                                            // For the first team member, automatically use the main registrant's details
                                                            const mainRegistrantData = {
                                                                name: formData.name,
                                                                email: formData.email,
                                                                phone: formData.phone,
                                                                college: formData.college,
                                                                enrollmentNumber: formData.enrollmentNumber
                                                            };
                                                            
                                                            // Automatically set the main registrant's data in teamMembers
                                                            if (!formData.teamMembers[eventId]?.members?.[0]) {
                                                                handleTeamMemberChange(eventId, 'member', 0, 'name', mainRegistrantData.name);
                                                                handleTeamMemberChange(eventId, 'member', 0, 'email', mainRegistrantData.email);
                                                                handleTeamMemberChange(eventId, 'member', 0, 'phone', mainRegistrantData.phone);
                                                                handleTeamMemberChange(eventId, 'member', 0, 'college', mainRegistrantData.college);
                                                                handleTeamMemberChange(eventId, 'member', 0, 'enrollmentNumber', mainRegistrantData.enrollmentNumber);
                                                            }
                                                            
                                                            // Display the main registrant's info without form fields
                                                            return (
                                                                <div key={`member-${index}`} className="bg-gradient-to-r from-green-50 to-white rounded-lg shadow-sm p-6 border border-green-100">
                                                                    <div className="flex items-center gap-3 mb-4">
                                                                        <div className="bg-green-100 rounded-full p-2">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-700" viewBox="0 0 20 20" fill="currentColor">
                                                                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                                            </svg>
                                                                        </div>
                                                                        <h4 className="font-medium text-green-800">Team Leader (You)</h4>
                                                                    </div>
                                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                        <div>
                                                                            <label className="block text-sm font-medium text-green-700 mb-1">Full Name</label>
                                                                            <p className="text-gray-800 p-2.5">{mainRegistrantData.name}</p>
                                                                        </div>
                                                                        <div>
                                                                            <label className="block text-sm font-medium text-green-700 mb-1">Email Address</label>
                                                                            <p className="text-gray-800 p-2.5">{mainRegistrantData.email}</p>
                                                                        </div>
                                                                        <div>
                                                                            <label className="block text-sm font-medium text-green-700 mb-1">Phone Number</label>
                                                                            <p className="text-gray-800 p-2.5">{mainRegistrantData.phone}</p>
                                                                        </div>
                                                                        <div>
                                                                            <label className="block text-sm font-medium text-green-700 mb-1">College Name</label>
                                                                            <p className="text-gray-800 p-2.5">{mainRegistrantData.college}</p>
                                                                        </div>
                                                                        <div>
                                                                            <label className="block text-sm font-medium text-green-700 mb-1">Enrollment Number</label>
                                                                            <p className="text-gray-800 p-2.5">{mainRegistrantData.enrollmentNumber}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            );
                                                        }
                                                        
                                                        // For additional team members, render the form as usual
                                                        return (
                                                            <TeamMemberFields
                                                                key={`member-${index}`}
                                                                eventId={eventId}
                                                                type="member"
                                                                index={index}
                                                                data={formData.teamMembers[eventId]?.members[index]}
                                                                onChange={handleTeamMemberChange}
                                                                formData={formData}
                                                            />
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {/* Substitutes */}
                                        {event.substitute > 0 && (
                                            <div className="space-y-6">
                                                <div className="flex items-center justify-between cursor-pointer pt-4"
                                                     onClick={() => toggleSection('substitutes', eventId)}>
                                                    <div className="flex items-center gap-2 text-green-700">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                            <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                                                        </svg>
                                                        <h4 className="font-medium">Substitute Players</h4>
                                                    </div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 text-green-700 transform transition-transform ${openSections.teamMembers[eventId]?.substitutes ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </div>
                                                <div className={`transition-all duration-300 ${openSections.teamMembers[eventId]?.substitutes ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                                                    <div className="grid grid-cols-1 gap-6">
                                                        {Array.from({ length: event.substitute }).map((_, index) => (
                                                            <TeamMemberFields
                                                                key={`substitute-${index}`}
                                                                eventId={eventId}
                                                                type="substitute"
                                                                index={index}
                                                                data={formData.teamMembers[eventId]?.substitutes[index]}
                                                                onChange={handleTeamMemberChange}
                                                                formData={formData}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        }
                        return null;
                    })}

                    {/* Registration Button Section */}
                    <div className="mt-8 bg-white rounded-sm shadow-lg p-8 border border-green-100">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <h3 className="text-xl font-semibold text-green-700">Ready to Complete Registration?</h3>
                                    <p className="text-sm text-gray-600">Please ensure all required information is filled correctly.</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-sm font-medium text-green-600">
                                        {formData.events.length} Event{formData.events.length !== 1 ? 's' : ''} Selected
                                    </span>
                                </div>
                            </div>

                            {formData.totalPayable > 0 && (
                                <div className="bg-green-50 rounded-lg p-4 flex items-center justify-between">
                                    <span className="text-green-800 font-medium">Total Amount:</span>
                                    <span className="text-2xl font-bold text-green-700">₹{formData.totalPayable}</span>
                                </div>
                            )}

                            <button
                                type="submit"
                                form="registration-form"
                                disabled={status.isSubmitting || formData.events.length === 0 || (showPaymentFields && !formData.payment_ss) || status.emailError}
                                className="w-full cursor-pointer bg-green-600 text-white py-4 px-6 rounded-md font-medium text-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed mt-4"
                            >
                                {status.isSubmitting ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span>Processing...</span>
                                    </div>
                                ) : 'Complete Registration'}
                            </button>

                            <p className="text-center text-sm text-red-400 mt-2">
                                * Please read the detailed rule book of the event before registration
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <ToastContainer />
        </div>
    );
};

const TeamMemberFields = ({ eventId, type, index, data, onChange, formData }) => {
    const validateDuplicateDetails = (field, value) => {
        const allMembers = formData.teamMembers[eventId]?.members || [];
        const allSubstitutes = formData.teamMembers[eventId]?.substitutes || [];
        const allParticipants = [...allMembers, ...allSubstitutes];
        
        const isDuplicate = allParticipants.some((participant, idx) => {
            // Skip checking against self
            if ((type === 'member' && idx === index) || 
                (type === 'substitute' && idx === index + allMembers.length)) {
                return false;
            }
            return participant[field] === value;
        });

        if (isDuplicate) {
            toast.error(`This ${field} is already used by another team member`);
            return false;
        }
        return true;
    };

    const handleFieldChange = (field, value) => {
        if ((field === 'email' || field === 'phone') && !validateDuplicateDetails(field, value)) {
            return;
        }
        onChange(eventId, type, index, field, value);
    };

    // Pre-fill data for first team member if it's the main registrant
    const isMainRegistrant = type === 'member' && index === 0;
    const defaultData = isMainRegistrant ? {
        name: formData.name || '',
        email: formData.email || '',
        phone: formData.phone || '',
        college: formData.college || '',
        enrollmentNumber: formData.enrollmentNumber || ''
    } : data;

    return (
        <div className="bg-gradient-to-r from-green-50 to-white rounded-lg shadow-sm p-6 border border-green-100">
            <div className="flex items-center gap-3 mb-4">
                <div className="bg-green-100 rounded-full p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-700" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                </div>
                <h4 className="font-medium text-green-800">
                    {type === 'member' ? `Team Member ${index + 1}` : `Substitute ${index + 1}`}
                </h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-green-700 mb-1">Full Name *</label>
                    <input
                        type="text"
                        placeholder="Enter full name"
                        value={defaultData?.name || ''}
                        onChange={(e) => handleFieldChange('name', e.target.value)}
                        className="w-full p-2.5 border border-green-200 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-green-700 mb-1">Email Address *</label>
                    <input
                        type="email"
                        placeholder="Enter email address"
                        value={defaultData?.email || ''}
                        onChange={(e) => handleFieldChange('email', e.target.value)}
                        className="w-full p-2.5 border border-green-200 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-green-700 mb-1">Phone Number *</label>
                    <input
                        type="tel"
                        placeholder="Enter phone number"
                        value={defaultData?.phone || ''}
                        onChange={(e) => handleFieldChange('phone', e.target.value)}
                        className="w-full p-2.5 border border-green-200 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-green-700 mb-1">College Name *</label>
                    <input
                        type="text"
                        placeholder="Enter college name"
                        value={defaultData?.college || ''}
                        onChange={(e) => handleFieldChange('college', e.target.value)}
                        className="w-full p-2.5 border border-green-200 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        required
                    />
                </div>
                {isMainRegistrant && (
                    <div>
                        <label className="block text-sm font-medium text-green-700 mb-1">Enrollment Number *</label>
                        <input
                            type="text"
                            placeholder="Enter enrollment number"
                            value={defaultData?.enrollmentNumber || ''}
                            onChange={(e) => handleFieldChange('enrollmentNumber', e.target.value)}
                            className="w-full p-2.5 border border-green-200 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                            required
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Page;
