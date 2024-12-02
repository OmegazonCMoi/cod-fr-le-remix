// pages/403.tsx

import { FC } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const ForbiddenPage: FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 flex justify-center items-center">
            <div className="text-center p-10 bg-white rounded-xl">
                <h1 className="text-6xl font-extrabold text-red-500">403</h1>
                <p className="text-lg text-gray-700 mt-4">Forbidden - You do not have permission to access this page.</p>
                <Link href="/">
                    <Button className="mt-6 px-8 py-3">
                        Go Back to Home
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default ForbiddenPage;
