'use client'
import { useState, useEffect } from 'react';
import { CldImage } from 'next-cloudinary';
import { FaSearch, FaFilter } from 'react-icons/fa';
import { getRegistrations, updateRegistrationStatus } from '@/actions/admin.actions';

const AdminDashboard = () => {
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        status: 'all',
        search: '',
        dateRange: 'all',
        event: 'all'
    });

    // Fetch registrations using server action
    const fetchRegistrations = async () => {
        try {
            const result = await getRegistrations();
            if (result.success) {
                setRegistrations(result.data);
            } else {
                console.error('Error:', result.error);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching registrations:', error);
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
            if (result.success) {
                // Update the local state with the new data
                setRegistrations(prev => 
                    prev.map(reg => 
                        reg._id === registrationId 
                            ? { ...reg, status: newStatus }
                            : reg
                    )
                );
            } else {
                console.error('Error:', result.error);
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const filteredRegistrations = registrations.filter(reg => {
        const matchesSearch = reg.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                            reg.email.toLowerCase().includes(filters.search.toLowerCase()) ||
                            reg.college.toLowerCase().includes(filters.search.toLowerCase());
        
        const matchesStatus = filters.status === 'all' || reg.status === filters.status;
        
        const matchesEvent = filters.event === 'all' || reg.events.includes(filters.event);

        return matchesSearch && matchesStatus && matchesEvent;
    });

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Registration Dashboard</h1>

                {/* Filters Section */}
                <div className="bg-white p-4 rounded-lg shadow mb-6 space-y-4 md:space-y-0 md:flex md:items-center md:space-x-4">
                    <div className="flex items-center bg-gray-50 rounded-md px-3 py-2">
                        <FaSearch className="text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="ml-2 bg-transparent focus:outline-none w-full"
                            value={filters.search}
                            onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                        />
                    </div>

                    <select
                        className="w-full md:w-auto px-3 py-2 border rounded-md"
                        value={filters.status}
                        onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                    >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="verified">Verified</option>
                        <option value="rejected">Rejected</option>
                    </select>

                    <select
                        className="w-full md:w-auto px-3 py-2 border rounded-md"
                        value={filters.event}
                        onChange={(e) => setFilters(prev => ({ ...prev, event: e.target.value }))}
                    >
                        <option value="all">All Events</option>
                        <option value="innovision-6">Innovision 6</option>
                        <option value="ai-design-sprint">AI Poster Making</option>
                        <option value="hack-the-hunt">Hack The Hunt</option>
                        {/* Add other events */}
                    </select>
                </div>

                {/* Registrations Table */}
                <div className="bg-white rounded-lg shadow overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Events</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-4 text-center">Loading...</td>
                                </tr>
                            ) : filteredRegistrations.map((registration) => (
                                <tr key={registration._id}>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-medium">{registration.name}</span>
                                            <span className="text-sm text-gray-500">{registration.email}</span>
                                            <span className="text-sm text-gray-500">{registration.phone}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-wrap gap-1">
                                            {registration.events.map((event, index) => (
                                                <span 
                                                    key={index}
                                                    className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full"
                                                >
                                                    {event}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-2">
                                            <span className="text-sm">₹{registration.totalPayable}</span>
                                            <span className="text-xs text-gray-500">ID: {registration.transactionId}</span>
                                            {registration.payment_ss && (
                                                <div className="relative w-20 h-20 cursor-pointer">
                                                    <CldImage
                                                        width="80"
                                                        height="80"
                                                        src={registration.payment_ss}
                                                        alt="Payment Screenshot"
                                                        className="rounded-md"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs rounded-full ${
                                            registration.status === 'verified' ? 'bg-green-100 text-green-800' :
                                            registration.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                            'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {registration.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <select
                                            className="px-3 py-1 border rounded-md text-sm"
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
