'use client'

import { FaDiscord, FaGithub } from 'react-icons/fa';
import { sections } from '@/app/const/footer';
import { useEffect, useRef } from 'react';
import { animate, inView, stagger } from 'motion';

const Footer = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        // Trigger animations when the footer section comes into view
        if (sectionRef.current) {
            inView(sectionRef.current, () => {
                // Animate the footer content (logo, text, social icons)
                animate('.footer-logo', { opacity: [0, 1], y: [50, 0] }, { duration: 0.6 });
                animate('.footer-description', { opacity: [0, 1], y: [50, 0] }, { duration: 0.6, delay: 0.2 });
                animate('.footer-socials', { opacity: [0, 1], y: [50, 0] }, { duration: 0.6, delay: 0.4 });
                animate('.footer-section', { opacity: [0, 1], y: [50, 0] }, { duration: 0.6, delay: stagger(0.2) });
                animate('.footer-bottom', { opacity: [0, 1], y: [50, 0] }, { duration: 0.6, delay: 0.6 });
            }, { amount: 0.8 });
        }
    }, []);

    return (
        <section ref={sectionRef} className="pt-20 pb-12 justify-center mx-auto flex">
            <div className="container w-full">
                <footer>
                    <div className="flex flex-col items-center justify-between gap-10 text-center lg:flex-row lg:text-left">
                        <div className="flex w-full max-w-96 shrink flex-col items-center justify-between gap-6 lg:items-start">
                            <div>
                                <span className="footer-logo flex items-center justify-center gap-4 lg:justify-start opacity-0">
                                    <svg width="50" height="50" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M165.963 134.037C160.496 139.504 151.631 139.504 146.164 134.037L122.027 109.899C116.559 104.432 116.559 95.5678 122.027 90.1005L146.164 65.9631C151.631 60.4957 160.496 60.4957 165.963 65.9631L190.101 90.1004C195.568 95.5678 195.568 104.432 190.101 109.899L165.963 134.037ZM53.8359 134.037C48.3686 139.504 39.5042 139.504 34.0369 134.037L9.89952 109.899C4.43218 104.432 4.43217 95.5678 9.89951 90.1005L34.0369 65.9631C39.5042 60.4957 48.3686 60.4957 53.8359 65.9631L77.9733 90.1004C83.4406 95.5678 83.4406 104.432 77.9733 109.899L53.8359 134.037ZM109.9 190.1C104.432 195.568 95.5679 195.568 90.1005 190.1L65.9631 165.963C60.4958 160.496 60.4958 151.631 65.9631 146.164L90.1005 122.027C95.5679 116.559 104.432 116.559 109.9 122.027L134.037 146.164C139.504 151.631 139.504 160.496 134.037 165.963L109.9 190.1ZM109.9 77.9732C104.432 83.4405 95.5679 83.4406 90.1005 77.9732L65.9631 53.8358C60.4958 48.3685 60.4958 39.5042 65.9631 34.0368L90.1005 9.89946C95.5679 4.43212 104.432 4.43211 109.9 9.89945L134.037 34.0368C139.504 39.5042 139.504 48.3685 134.037 53.8358L109.9 77.9732Z" fill="url(#paint0_linear_105_379)" />
                                        <defs>
                                            <linearGradient id="paint0_linear_105_379" x1="154.166" y1="35.9433" x2="47.2475" y2="144.745" gradientUnits="userSpaceOnUse">
                                                <stop offset="0.0509862" stopColor="#5A5A5A" />
                                                <stop offset="1" stopColor="#161616" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                    <p className="text-3xl font-semibold">Hack on COD</p>
                                </span>
                                <p className="footer-description mt-6 text-sm text-muted-foreground opacity-0">
                                    We provide the best cheats and hacks for Call of Duty. The cheats are undetectable and will help you win every game.
                                </p>
                            </div>
                            <ul className="footer-socials flex items-center space-x-6 text-muted-foreground opacity-0">
                                <li className="font-medium hover:text-primary">
                                    <a href="https://github.com/OmegazonCMoi/COD-TOOLS">
                                        <FaGithub className="size-6" />
                                    </a>
                                </li>
                                <li className="font-medium hover:text-primary">
                                    <a href="https://discord.gg/cod-fr">
                                        <FaDiscord className="size-6" />
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="grid grid-cols-3 gap-6 lg:gap-20">
                            {sections.map((section, sectionIdx) => (
                                <div key={sectionIdx} className="footer-section opacity-0">
                                    <h3 className="mb-6 font-bold">{section.title}</h3>
                                    <ul className="space-y-4 text-sm text-muted-foreground">
                                        {section.links.map((link, linkIdx) => (
                                            <li
                                                key={linkIdx}
                                                className="font-medium hover:text-primary"
                                            >
                                                <a href={link.href}>{link.name}</a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="footer-bottom mt-20 flex flex-col justify-between gap-4 border-t pt-8 text-center text-sm font-medium text-muted-foreground lg:flex-row lg:items-center lg:text-left opacity-0">
                        <p>© 2024 Hack on COD. All rights reserved.</p>
                        <ul className="flex justify-center gap-4 lg:justify-start">
                            <li className="hover:text-primary">
                                <a href="#"> Terms and Conditions</a>
                            </li>
                            <li className="hover:text-primary">
                                <a href="#"> Privacy Policy</a>
                            </li>
                        </ul>
                    </div>
                </footer>
            </div>
        </section>
    );
};

export default Footer;
