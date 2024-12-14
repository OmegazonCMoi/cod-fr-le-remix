'use client';

import React, { useState } from 'react';
import Navbar from '@/components/blocks/navbar';
import AdminPanelUser from '@/components/blocks/dash-user';
import AdminPanelDashboard from '@/components/blocks/dash-main';
import AdminPanelGames from '@/components/blocks/dash-games';
import AdminPanelVideos from '@/components/blocks/dash-videos';
import AdminPanelFiles from '@/components/blocks/dash-files';
import AdminPanelReviews from '@/components/blocks/dash-reviews';
import AccountPage from '@/components/blocks/account';
import { withAdminProtection } from '@/hooks/useAdminGuard';
// import missing icons
import { LayoutDashboard, Folder, Users, Gamepad, Video, Star, UserCircle, LogOut } from 'lucide-react'

const AdminPanel = () => {
    const [selectedComponent, setSelectedComponent] = useState<string>('Dashboard');

    const logout = () => {
        localStorage.clear();
        window.location.href = '/';
    };

    const renderSelectedComponent = () => {
        switch (selectedComponent) {
            case 'Dashboard':
                return <AdminPanelDashboard />;
            case 'Users':
                return <AdminPanelUser />;
            case 'Games':
                return <AdminPanelGames />;
            case 'Videos':
                return <AdminPanelVideos />;
            case 'Files':
                return <AdminPanelFiles />;
            case 'Reviews':
                return <AdminPanelReviews />;
            case 'Account':
                return <AccountPage />;
            case 'Disconnect':
                logout();
                return null;
            default:
                return <div>Dashboard Component</div>;
        }
    };

    return (
        <div className="flex h-screen bg-neutral-100 overflow-hidden">
            {/* Sidebar */}
            <aside
                id="default-sidebar"
                className="fixed top-1/2 -translate-y-1/2 left-5 z-40 w-64 h-auto bg-white rounded-xl flex flex-col items-center"
            >
                <h1 className="text-xl font-bold text-neutral-800 mt-6 mb-4">Admin Dashboard</h1>
                <div className="w-full px-4 py-2">
                    <ul className="space-y-2">
                        {[
                            { label: 'Dashboard', icon: LayoutDashboard },
                            { label: 'Files', icon: Folder },
                            { label: 'Users', icon: Users },
                            { label: 'Games', icon: Gamepad },
                            { label: 'Videos', icon: Video },
                            { label: 'Reviews', icon: Star },
                            { label: 'Account', icon: UserCircle },
                            { label: 'Disconnect', icon: LogOut },
                        ].map(({ label, icon }) => (
                            <li
                                key={label}
                                onClick={() => setSelectedComponent(label)}
                                className={`group flex items-center w-full p-3 text-sm font-medium text-neutral-700 rounded-md hover:bg-neutral-100 hover:text-neutral-900 transition ${selectedComponent === label
                                    ? 'bg-neutral-200 text-neutral-900'
                                    : ''
                                    }`}
                            >
                                <span className="material-icons-outlined text-lg me-3 text-neutral-500 group-hover:text-neutral-800">
                                    {typeof icon === 'string' ? (
                                        <span className="material-icons-outlined text-lg me-3 text-neutral-500 group-hover:text-neutral-800">
                                            {icon}
                                        </span>
                                    ) : (
                                        React.createElement(icon, { className: "text-lg me-3 text-neutral-500 group-hover:text-neutral-800" })
                                    )}
                                </span>
                                {label}
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>

            {/* Main Content */}
            <Navbar />
            <main className="flex-1 ml-72 p-4 mt-[5.15em] mr-[0.65em] h-[91vh] bg-white rounded-3xl overflow-y-auto">
                {renderSelectedComponent()}
            </main>
        </div>
    );
};

export default withAdminProtection(AdminPanel);
