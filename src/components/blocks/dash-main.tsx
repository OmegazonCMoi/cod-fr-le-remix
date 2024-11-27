'use client';

import React from 'react';
import { Button } from '../ui/button';

const AdminPanelDashboard = () => {

    return (
        <div className="p-6 mt-20">
            <h2 className="text-3xl font-semibold text-gray-900">Dashboard</h2>
            <p className="text-lg text-gray-600 mt-2">Welcome to your admin dashboard! Manage your platform effectively.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                {/* Card 1 */}
                <div className="bg-white p-4 rounded-lg hover:shadow-xl transition-shadow">
                    <h3 className="text-xl font-medium text-gray-700">Manage Users</h3>
                    <p className="text-sm text-gray-500 mt-2">View, edit, or remove users.</p>
                    <Button className="mt-4">Go to Users</Button>
                </div>

                {/* Card 2 */}
                <div className="bg-white p-4 rounded-lg hover:shadow-xl transition-shadow">
                    <h3 className="text-xl font-medium text-gray-700">Settings</h3>
                    <p className="text-sm text-gray-500 mt-2">Adjust platform settings and preferences.</p>
                    <Button className="mt-4">Go to Settings</Button>
                </div>

                {/* Card 3 */}
                <div className="bg-white p-4 rounded-lg hover:shadow-xl transition-shadow">
                    <h3 className="text-xl font-medium text-gray-700">Recent Activity</h3>
                    <p className="text-sm text-gray-500 mt-2">Check recent user activity and logs.</p>
                    <Button className="mt-4">View Activity</Button>
                </div>
            </div>

            {/* Add more sections as needed */}
        </div>
    );
};

export default AdminPanelDashboard;
