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
// Import des icônes Heroicons
import {
    HomeIcon,
    FolderIcon,
    UsersIcon,
    CubeIcon,
    VideoCameraIcon,
    StarIcon,
    UserCircleIcon,
    ArrowRightOnRectangleIcon,
    ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';
import AdminPanelForum from '@/components/blocks/dash-forum';

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
            case 'Forum':
                return <AdminPanelForum />;
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
                className="fixed top-1/2 -translate-y-1/2 left-5 z-40 w-64 h-auto bg-white rounded-3xl flex flex-col items-center"
            >
                <h1 className="text-lg font-bold text-gray-900 mt-6 mb-4">Admin Dashboard</h1>

                <div className="w-full px-6 py-4">
                    <ul className="space-y-2">
                        {[
                            { label: 'Dashboard', icon: <HomeIcon className="h-6 w-6" /> },
                            { label: 'Files', icon: <FolderIcon className="h-6 w-6" /> },
                            { label: 'Users', icon: <UsersIcon className="h-6 w-6" /> },
                            { label: 'Games', icon: <CubeIcon className="h-6 w-6" /> },
                            { label: 'Videos', icon: <VideoCameraIcon className="h-6 w-6" /> },
                            { label: 'Reviews', icon: <StarIcon className="h-6 w-6" /> },
                            { label: 'Account', icon: <UserCircleIcon className="h-6 w-6" /> },
                            { label: 'Forum', icon: <ChatBubbleLeftRightIcon className="h-6 w-6" /> },
                            { label: 'Disconnect', icon: <ArrowRightOnRectangleIcon className="h-6 w-6" /> }
                        ].map(({ label, icon }) => (
                            <li
                                key={label}
                                onClick={() => setSelectedComponent(label)}
                                className={`group flex items-center w-full p-3 text-sm font-medium text-gray-900 rounded-xl hover:bg-gray-100 transition cursor-pointer ${selectedComponent === label ? 'bg-gray-200' : ''}`}
                            >
                                <span className="text-lg text-gray-700 group-hover:text-gray-800 mr-4">
                                    {icon}
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
