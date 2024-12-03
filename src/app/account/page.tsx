'use client'

import React from 'react';
import Account from '@/components/blocks/account';
import Navbar from '@/components/blocks/navbar';

const AccountPage = () => {
    return (
        <div>
            <Navbar />
            <div className="pt-10"></div>
            <Account />
        </div>
    );
}

export default AccountPage;