'use client'

import { subMenuItemsOne, subMenuItemsTwo } from '@/app/const/navbar';
import { useEffect, useRef } from 'react';
import { animate, inView, stagger } from 'motion';
import { Button, buttonVariants } from '@/components/ui/button';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { useAuth } from '../../hooks/auth-context';
import Link from 'next/link';

const Navbar = () => {

    const sectionRef = useRef(null);

    const { isLoggedIn, user, setIsLoggedIn, setUser } = useAuth();

    useEffect(() => {
        // Check if there's any authentication data in localStorage when the component mounts
        if (typeof window !== 'undefined') {
            const isConnected = localStorage.getItem('isConnected') === 'true'; // Check if user is logged in
            if (isConnected) {
                const storedUser = localStorage.getItem('user');
                if (storedUser && storedUser !== 'undefined') {
                    try {
                        const parsedUser = JSON.parse(storedUser);
                        // Set the user state and login state
                        setUser(parsedUser);
                        setIsLoggedIn(true);
                    } catch {
                        setIsLoggedIn(false);
                        setUser(null);
                    }
                }
            } else {
                setIsLoggedIn(false);
                setUser(null);
            }
        }
    }, [setIsLoggedIn, setUser]);

    const isAdmin = user?.roles?.includes('Administrateur');

    useEffect(() => {
        if (sectionRef.current) {
            inView(sectionRef.current, () => {
                animate('.navbar-logo', { opacity: [0, 1], y: [50, 0] }, { duration: 0.6 });
                animate('.navbar-menu', { opacity: [0, 1], y: [50, 0] }, { duration: 0.6, delay: 0.2 });
                animate('.navbar-socials', { opacity: [0, 1], y: [50, 0] }, { duration: 0.6, delay: 0.4 });
                animate('.navbar-item', { opacity: [0, 1], y: [50, 0] }, { duration: 0.6, delay: stagger(0.2) });
            }, { amount: 0.8 });
        }
    }, []);

    return (
        <section ref={sectionRef} className="py-4 w-full fixed bg-white z-20">
            <div className="w-full max-w-screen-2xl mx-auto flex justify-between items-center px-4 lg:px-8">
                <nav className="hidden lg:flex w-full justify-between items-center">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <svg width="40" height="40" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M165.963 134.037C160.496 139.504 151.631 139.504 146.164 134.037L122.027 109.899C116.559 104.432 116.559 95.5678 122.027 90.1005L146.164 65.9631C151.631 60.4957 160.496 60.4957 165.963 65.9631L190.101 90.1004C195.568 95.5678 195.568 104.432 190.101 109.899L165.963 134.037ZM53.8359 134.037C48.3686 139.504 39.5042 139.504 34.0369 134.037L9.89952 109.899C4.43218 104.432 4.43217 95.5678 9.89951 90.1005L34.0369 65.9631C39.5042 60.4957 48.3686 60.4957 53.8359 65.9631L77.9733 90.1004C83.4406 95.5678 83.4406 104.432 77.9733 109.899L53.8359 134.037ZM109.9 190.1C104.432 195.568 95.5679 195.568 90.1005 190.1L65.9631 165.963C60.4958 160.496 60.4958 151.631 65.9631 146.164L90.1005 122.027C95.5679 116.559 104.432 116.559 109.9 122.027L134.037 146.164C139.504 151.631 139.504 160.496 134.037 165.963L109.9 190.1ZM109.9 77.9732C104.432 83.4405 95.5679 83.4406 90.1005 77.9732L65.9631 53.8358C60.4958 48.3685 60.4958 39.5042 65.9631 34.0368L90.1005 9.89946C95.5679 4.43212 104.432 4.43211 109.9 9.89945L134.037 34.0368C139.504 39.5042 139.504 48.3685 134.037 53.8358L109.9 77.9732Z" fill="url(#paint0_linear_105_379)" />
                                <defs>
                                    <linearGradient id="paint0_linear_105_379" x1="154.166" y1="35.9433" x2="47.2475" y2="144.745" gradientUnits="userSpaceOnUse">
                                        <stop offset="0.0509862" stopColor="#5A5A5A" />
                                        <stop offset="1" stopColor="#161616" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <span className="navbar-logo text-xl font-bold opacity-0">Hack on COD</span>
                        </div>
                        <div className="flex items-center space-x-4 navbar-menu opacity-0">
                            <Link
                                className={cn(
                                    'text-muted-foreground',
                                    'z-50',
                                    navigationMenuTriggerStyle,
                                    buttonVariants({
                                        variant: 'ghost',
                                    }),
                                )}
                                href="/"
                            >
                                Home
                            </Link>
                            <NavigationMenu>
                                <NavigationMenuList>
                                    <NavigationMenuItem className="text-muted-foreground navbar-item opacity-0">
                                        <NavigationMenuTrigger>
                                            Cheats
                                        </NavigationMenuTrigger>
                                        <NavigationMenuContent>
                                            <ul className="w-80 p-3">
                                                {subMenuItemsOne.map((item, idx) => (
                                                    <li key={idx}>
                                                        <Link
                                                            className={cn(
                                                                'flex select-none gap-4 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
                                                            )}
                                                            href="/"
                                                        >
                                                            {item.icon}
                                                            <div>
                                                                <div className="text-sm font-semibold">
                                                                    {item.title}
                                                                </div>
                                                                <p className="text-sm leading-snug text-muted-foreground">
                                                                    {item.description}
                                                                </p>
                                                            </div>
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </NavigationMenuContent>
                                    </NavigationMenuItem>
                                    <NavigationMenuItem className="text-muted-foreground navbar-item opacity-0">
                                        <NavigationMenuTrigger>Games</NavigationMenuTrigger>
                                        <NavigationMenuContent>
                                            <ul className="w-80 p-3">
                                                {subMenuItemsTwo.map((item, idx) => (
                                                    <li key={idx}>
                                                        <a
                                                            className={cn(
                                                                'flex select-none gap-4 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
                                                            )}
                                                            href="#"
                                                        >
                                                            {item.icon}
                                                            <div>
                                                                <div className="text-sm font-semibold">
                                                                    {item.title}
                                                                </div>
                                                                <p className="text-sm leading-snug text-muted-foreground">
                                                                    {item.description}
                                                                </p>
                                                            </div>
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </NavigationMenuContent>
                                    </NavigationMenuItem>
                                </NavigationMenuList>
                            </NavigationMenu>
                            <Link
                                className={cn(
                                    'text-muted-foreground',
                                    navigationMenuTriggerStyle,
                                    buttonVariants({
                                        variant: 'ghost',
                                    }),
                                )}
                                href="videos"
                            >
                                Videos
                            </Link>
                            <Link
                                className={cn(
                                    'text-muted-foreground',
                                    navigationMenuTriggerStyle,
                                    buttonVariants({
                                        variant: 'ghost',
                                    }),
                                )}
                                href="#"
                            >
                                Reviews
                            </Link>
                        </div>
                    </div>
                    <div className="navbar-socials flex items-center space-x-6 opacity-0">
                        {!isLoggedIn ? (
                            <>
                                <Link href="login"><Button variant="outline">Login</Button></Link>
                                <Link href="register"><Button>Register</Button></Link>
                            </>
                        ) : (
                            <>
                                <Link href="logout"><Button variant="outline">Logout</Button></Link>
                                {isAdmin ? <Link href="dashboard"><Button>Dashboard</Button></Link> : <Link href="account"><Button>Account</Button></Link>}
                            </>
                        )}
                    </div>
                </nav>
            </div>
        </section>
    );
};

export default Navbar;
