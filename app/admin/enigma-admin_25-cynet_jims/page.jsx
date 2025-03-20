'use client'
import { useState, useEffect } from 'react';
import { CldImage } from 'next-cloudinary';
import { FaSearch, FaFilter, FaLock, FaTrash, FaExclamationTriangle } from 'react-icons/fa';
import { getRegistrations, updateRegistrationStatus, verifyAdmin, exportRegistrationsToExcel, deleteRejectedRegistrations } from '@/actions/admin.actions';
import toast, { Toaster } from 'react-hot-toast';
import Image from 'next/image';

const AdminDashboard = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [totalRegistrations, setTotalRegistration] = useState(0);
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: ''
    });
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [deletingRegistrations, setDeletingRegistrations] = useState(false);
    const [filters, setFilters] = useState({
        status: 'all',
        search: '',
        dateRange: 'all', 
        event: 'all',
        college: 'all',
        semester: 'all',
        paymentAmount: {
            min: '',
            max: ''
        },
        sortBy: 'newest'
    });
    const [downloadingExcel, setDownloadingExcel] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState('all');

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await verifyAdmin(loginForm);
            if (result.success) {
                setIsAuthenticated(true);
                toast.success('Login successful!');
                fetchRegistrations();
            } else {
                toast.error('Invalid credentials');
            }
        } catch (error) {
            toast.error('Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Fetch registrations using server action
    const fetchRegistrations = async () => {
        try {
            setError(null);
            const result = await getRegistrations();
            if (result?.success) {
                setRegistrations(result.data || []);
                console.log(result.data);
                setTotalRegistration(result.data.length);
            } else {
                setError(result?.error || 'Failed to fetch registrations');
                setRegistrations([]);
            }
        } catch (error) {
            setError(error?.message || 'An unexpected error occurred');
            setRegistrations([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRegistrations();
    }, []);

    // Handle status change using server action
    const handleStatusChange = async (registrationId, newStatus) => {
        try {
            const result = await updateRegistrationStatus(registrationId, newStatus);
            if (result?.success) {
                setRegistrations(prev => 
                    prev.map(reg => 
                        reg._id === registrationId 
                            ? { ...reg, status: newStatus }
                            : reg
                    )
                );
                setSelectedPayment(null);
            } else {
                console.error('Failed to update status:', result?.error);
            }
        } catch (error) {
            console.error('Error updating status:', error?.message || 'An unexpected error occurred');
        }
    };

    const filteredRegistrations = registrations.filter(reg => {
        const matchesSearch = reg.name?.toLowerCase().includes(filters.search.toLowerCase()) ||
                            reg.email?.toLowerCase().includes(filters.search.toLowerCase()) ||
                            reg.college?.toLowerCase().includes(filters.search.toLowerCase()) ||
                            reg.transactionId?.toLowerCase().includes(filters.search.toLowerCase());
        
        const matchesStatus = filters.status === 'all' || reg.status === filters.status;
        
        // Fixed event filtering
        const matchesEvent = filters.event === 'all' || 
                           (reg.events && Array.isArray(reg.events) && 
                            reg.events.some(event => event === filters.event));
                            
        const matchesCollege = filters.college === 'all' || reg.college === filters.college;
        const matchesSemester = filters.semester === 'all' || reg.semester === filters.semester;
        
        const matchesPaymentAmount = (!filters.paymentAmount.min || reg.totalPayable >= Number(filters.paymentAmount.min)) &&
                                   (!filters.paymentAmount.max || reg.totalPayable <= Number(filters.paymentAmount.max));

        return matchesSearch && matchesStatus && matchesEvent && matchesCollege && matchesSemester && matchesPaymentAmount;
    }).sort((a, b) => {
        switch(filters.sortBy) {
            case 'newest':
                return new Date(b.createdAt) - new Date(a.createdAt);
            case 'oldest':
                return new Date(a.createdAt) - new Date(b.createdAt);
            case 'amountHighToLow':
                return b.totalPayable - a.totalPayable;
            case 'amountLowToHigh':
                return a.totalPayable - b.totalPayable;
            default:
                return 0;
        }
    });

    // Add unique events calculation
    const uniqueEvents = [...new Set(
        registrations
            .filter(reg => reg.events && Array.isArray(reg.events))
            .flatMap(reg => reg.events)
            .filter(Boolean)
    )];
    
    const uniqueColleges = [...new Set(registrations.map(reg => reg.college).filter(Boolean))];
    const uniqueSemesters = [...new Set(registrations.map(reg => reg.semester).filter(Boolean))];

    // Add function to handle rejected registrations deletion
    const handleDeleteRejected = async () => {
        try {
            setDeletingRegistrations(true);
            const result = await deleteRejectedRegistrations();
            
            if (result?.success) {
                toast.success(`Successfully deleted ${result.count} rejected registrations`);
                // Refresh registrations after deletion
                fetchRegistrations();
            } else {
                toast.error(result?.error || 'Failed to delete rejected registrations');
            }
            setShowDeleteConfirmation(false);
        } catch (error) {
            console.error('Delete error:', error);
            toast.error('An error occurred while deleting rejected registrations');
        } finally {
            setDeletingRegistrations(false);
        }
    };

    // Add a function to handle Excel export
    const handleExportExcel = async (event, status = 'verified') => {
        try {
            setDownloadingExcel(true);
            const result = await exportRegistrationsToExcel(event, status);
            
            if (result?.success && result.data) {
                // Create a download link
                const link = document.createElement('a');
                link.href = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${result.data.content}`;
                link.download = result.data.filename;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else {
                alert(result?.error || 'No registrations found to export');
            }
        } catch (error) {
            console.error('Export error:', error);
            alert('Failed to export data. Please try again.');
        } finally {
            setDownloadingExcel(false);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-green-800 to-green-900 flex items-center justify-center px-4">
                <Toaster position="top-center" />
                <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
                    <div className="text-center mb-8">
                        <FaLock className="mx-auto text-4xl text-green-600 mb-4" />
                        <h2 className="text-2xl font-bold text-gray-800">Admin Login</h2>
                        <p className="text-gray-600">Please sign in to continue</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Username
                            </label>
                            <input
                                type="text"
                                value={loginForm.username}
                                onChange={(e) => setLoginForm(prev => ({
                                    ...prev,
                                    username: e.target.value
                                }))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                value={loginForm.password}
                                onChange={(e) => setLoginForm(prev => ({
                                    ...prev,
                                    password: e.target.value
                                }))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:bg-green-400"
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-4 sm:p-6 font-poppins">
            {selectedPayment && (
                <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white p-6 rounded-2xl w-full max-w-2xl shadow-xl">
                        <div className="relative w-full h-48 sm:h-96 mb-6">
                            <CldImage
                                fill
                                src={selectedPayment.payment_ss}
                                alt="Payment Screenshot"
                                className="rounded-xl object-contain"
                            />
                        </div>
                        <p className="text-center mb-6 text-gray-700 font-medium">
                            Transaction ID: {selectedPayment.transactionId}
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-3">
                            <button
                                onClick={() => handleStatusChange(selectedPayment._id, 'verified')}
                                className="px-6 py-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all shadow-md hover:shadow-lg"
                            >
                                Approve
                            </button>
                            <button
                                onClick={() => handleStatusChange(selectedPayment._id, 'rejected')}
                                className="px-6 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all shadow-md hover:shadow-lg"
                            >
                                Reject
                            </button>
                            <button
                                onClick={() => setSelectedPayment(null)}
                                className="px-6 py-2.5 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all shadow-md hover:shadow-lg"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteConfirmation && (
                <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-xl text-center">
                        <FaExclamationTriangle className="mx-auto text-5xl text-red-500 mb-4" />
                        <h2 className="text-2xl font-bold mb-4">Delete Rejected Registrations</h2>
                        <p className="mb-6 text-gray-700">
                            This will permanently delete all rejected registrations. This action cannot be undone.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-3">
                            <button
                                onClick={handleDeleteRejected}
                                disabled={deletingRegistrations}
                                className="px-6 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all shadow-md hover:shadow-lg"
                            >
                                {deletingRegistrations ? 'Deleting...' : 'Yes, Delete All'}
                            </button>
                            <button
                                onClick={() => setShowDeleteConfirmation(false)}
                                disabled={deletingRegistrations}
                                className="px-6 py-2.5 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all shadow-md hover:shadow-lg"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl sm:text-4xl font-bold text-green-800 mb-8">Registration Dashboard</h1>

                {error && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-6">
                        <strong className="font-medium">Error: </strong>
                        <span>{error}</span>
                    </div>
                )}

                {/* Action Buttons Section */}
                <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Export Excel Section */}
                    <div className="p-4 bg-gray-800 rounded-lg">
                        <h2 className="text-xl font-semibold text-white mb-4">Export Registrations</h2>
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col md:flex-row gap-4 items-center">
                                <select
                                    value={selectedEvent}
                                    onChange={(e) => setSelectedEvent(e.target.value)}
                                    className="bg-gray-700 text-white px-4 py-2 rounded-md w-full md:w-auto"
                                >
                                    <option value="all">All Events</option>
                                    {uniqueEvents.map((event, index) => (
                                        <option key={index} value={event}>{event}</option>
                                    ))}
                                </select>
                                
                                <button
                                    onClick={() => handleExportExcel(selectedEvent, 'verified')}
                                    disabled={downloadingExcel}
                                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md w-full md:w-auto flex items-center justify-center"
                                >
                                    {downloadingExcel ? 'Downloading...' : 'Export Verified'}
                                    {!downloadingExcel && (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            
                            <button
                                onClick={() => handleExportExcel(selectedEvent, 'all')}
                                disabled={downloadingExcel}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center justify-center"
                            >
                                {downloadingExcel ? 'Downloading...' : 'Export All Registrations'}
                                {!downloadingExcel && (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                    
                    {/* Danger Zone Section */}
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <h2 className="text-xl font-semibold text-red-800 mb-4">Danger Zone</h2>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-3 border border-red-300 rounded-lg bg-white">
                                <div>
                                    <h3 className="font-semibold text-red-700">Delete Rejected Registrations</h3>
                                    <p className="text-sm text-gray-600">Remove all registrations with rejected status</p>
                                </div>
                                <button
                                    onClick={() => setShowDeleteConfirmation(true)}
                                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center"
                                >
                                    <FaTrash className="mr-2" /> Delete
                                </button>
                            </div>
                            
                            <div className="text-sm text-gray-500 italic">
                                Note: Deleted registrations cannot be recovered. Use with caution.
                            </div>
                        </div>
                    </div>
                </div>

                {/* Advanced Filters Section */}
                <div className="bg-white p-6 rounded-xl shadow-lg mb-8 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="flex items-center bg-green-50 rounded-lg px-4 py-2.5">
                            <FaSearch className="text-green-500" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="ml-3 bg-transparent focus:outline-none w-full text-green-800 placeholder-green-400"
                                value={filters.search}
                                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                            />
                        </div>

                        <select
                            className="px-4 py-2.5 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            value={filters.status}
                            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                        >
                            <option value="all">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="verified">Verified</option>
                            <option value="rejected">Rejected</option>
                        </select>

                        <select
                            className="px-4 py-2.5 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            value={filters.event}
                            onChange={(e) => setFilters(prev => ({ ...prev, event: e.target.value }))}
                        >
                            <option value="all">All Events</option>
                            {uniqueEvents.map((event, index) => (
                                <option key={index} value={event}>{event}</option>
                            ))}
                        </select>

                        <select
                            className="px-4 py-2.5 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            value={filters.college}
                            onChange={(e) => setFilters(prev => ({ ...prev, college: e.target.value }))}
                        >
                            <option value="all">All Colleges</option>
                            {uniqueColleges.map(college => (
                                <option key={college} value={college}>{college}</option>
                            ))}
                        </select>

                        <select
                            className="px-4 py-2.5 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            value={filters.semester}
                            onChange={(e) => setFilters(prev => ({ ...prev, semester: e.target.value }))}
                        >
                            <option value="all">All Semesters</option>
                            {uniqueSemesters.map(semester => (
                                <option key={semester} value={semester}>Semester {semester}</option>
                            ))}
                        </select>

                        <div className="flex gap-3 items-center">
                            <input
                                type="number"
                                placeholder="Min"
                                className="px-4 py-2.5 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent w-full"
                                value={filters.paymentAmount.min}
                                onChange={(e) => setFilters(prev => ({ 
                                    ...prev, 
                                    paymentAmount: {...prev.paymentAmount, min: e.target.value}
                                }))}
                            />
                            <input
                                type="number"
                                placeholder="Max"
                                className="px-4 py-2.5 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent w-full"
                                value={filters.paymentAmount.max}
                                onChange={(e) => setFilters(prev => ({ 
                                    ...prev, 
                                    paymentAmount: {...prev.paymentAmount, max: e.target.value}
                                }))}
                            />
                        </div>

                        <select
                            className="px-4 py-2.5 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            value={filters.sortBy}
                            onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                        >
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                            <option value="amountHighToLow">Amount (High to Low)</option>
                            <option value="amountLowToHigh">Amount (Low to High)</option>
                        </select>
                    </div>
                </div>

                {/* Registrations Table */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="p-4 bg-green-50 border-b border-green-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <h2 className="text-xl font-semibold text-green-800">Total Registrations: {filteredRegistrations.length} of {registrations.length}</h2>
                        <div className="text-sm text-green-600 flex flex-wrap gap-2">
                            <span className="px-2 py-1 bg-green-100 rounded-full">Verified: {registrations.filter(reg => reg.status === 'verified').length}</span>
                            <span className="px-2 py-1 bg-yellow-100 rounded-full">Pending: {registrations.filter(reg => reg.status === 'pending').length}</span>
                            <span className="px-2 py-1 bg-red-100 rounded-full">Rejected: {registrations.filter(reg => reg.status === 'rejected').length}</span>
                        </div>
                    </div>
                    <table className="min-w-full divide-y divide-green-100">
                        <thead className="bg-green-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-green-700 uppercase tracking-wider">User</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-green-700 uppercase tracking-wider">Events</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-green-700 uppercase tracking-wider">Team Members</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-green-700 uppercase tracking-wider">Payment</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-green-700 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-green-700 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-green-100">
                            {loading ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-4 text-center text-green-600">Loading...</td>
                                </tr>
                            ) : filteredRegistrations.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-4 text-center text-green-600">No registrations found</td>
                                </tr>
                            ) : filteredRegistrations.map((registration) => (
                                <tr key={registration._id} className="hover:bg-green-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-medium text-green-800">{registration.name}</span>
                                            <span className="text-sm text-green-600">{registration.email}</span>
                                            <span className="text-sm text-green-600">{registration.phone}</span>
                                            <span className="text-sm text-green-600">{registration.college}</span>
                                            <span className="text-sm text-green-600">Enrollment: {registration.enrollmentNumber}</span>
                                            <span className="text-sm text-green-600">Semester: {registration.semester}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-wrap gap-2">
                                            {registration.events.map((event, index) => (
                                                <span 
                                                    key={index}
                                                    className="px-3 py-1 text-xs bg-green-100 text-green-800 rounded-full font-medium"
                                                >
                                                    {event}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="space-y-4">
                                            {registration.teamMembers?.map((team, teamIndex) => (
                                                <div key={teamIndex} className="border-b border-green-100 pb-2 last:border-0 last:pb-0">
                                                    <h5 className="font-medium text-green-700 mb-2">{team.eventId}</h5>
                                                    {team.members?.map((member, memberIndex) => (
                                                        <div key={memberIndex} className="text-sm mb-2">
                                                            <div className="flex items-center gap-2">
                                                                <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs">
                                                                    {memberIndex === 0 ? 'Leader' : `Member ${memberIndex + 1}`}
                                                                </span>
                                                                <span>{member.name}</span>
                                                            </div>
                                                            <div className="text-green-600 text-xs ml-6">
                                                                {member.email} | {member.phone} | {member.college}
                                                            </div>
                                                        </div>
                                                    ))}
                                                    {team.substitutes?.map((sub, subIndex) => (
                                                        <div key={subIndex} className="text-sm mb-2">
                                                            <div className="flex items-center gap-2">
                                                                <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-xs">
                                                                    Substitute {subIndex + 1}
                                                                </span>
                                                                <span>{sub.name}</span>
                                                            </div>
                                                            <div className="text-green-600 text-xs ml-6">
                                                                {sub.email} | {sub.phone} | {sub.college}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-2">
                                            {registration.totalPayable > 0 ? (
                                                <>
                                                    <span className="text-green-800 font-medium">₹{registration.totalPayable}</span>
                                                    <span className="text-sm text-green-600">ID: {registration.transactionId}</span>
                                                    {registration.payment_ss && (
                                                        <div 
                                                            className="relative w-20 h-20 cursor-pointer hover:opacity-80 transition-opacity rounded-lg overflow-hidden shadow-md"
                                                            onClick={() => setSelectedPayment(registration)}
                                                        >
                                                            <CldImage
                                                                width="80"
                                                                height="80"
                                                                src={registration.payment_ss}
                                                                alt="Payment Screenshot"
                                                                className="object-cover"
                                                            />
                                                        </div>
                                                    )}
                                                </>
                                            ) : (
                                                <span className="text-green-800 font-medium">FREE</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                                            registration.status === 'verified' ? 'bg-green-100 text-green-800' :
                                            registration.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                            'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {registration.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <select
                                            className="px-3 py-2 border border-green-200 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                            value={registration.status}
                                            onChange={(e) => handleStatusChange(registration._id, e.target.value)}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="verified">Verify</option>
                                            <option value="rejected">Reject</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
