'use client';

import CheatsRight from '@/components/blocks/cheats-right';
import CheatsLeft from '@/components/blocks/cheats-left';
import Navbar from '@/components/blocks/navbar';
import React, { useEffect, useRef } from 'react';
import { animate, inView, stagger } from 'motion';
import { Badge } from '@/components/ui/badge';
import { ArrowDownRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cheats } from '@/app/const/cheats';
import Footer from '@/components/blocks/footer';

const CheatsPage = () => {
    const heroSectionRef = useRef(null);
    const footerRef = useRef(null);

    useEffect(() => {
        // Animate Hero Section
        if (heroSectionRef.current) {
            inView(
                heroSectionRef.current,
                () => {
                    animate(
                        '.hero-badge, .hero-title, .hero-description, .hero-buttons > *',
                        { opacity: [0, 1], y: [50, 0] },
                        { delay: stagger(0.2), duration: 0.6 }
                    );

                    animate(
                        '.hero-video',
                        { opacity: [0, 1], scale: [0.9, 1] },
                        { duration: 0.8 }
                    );
                },
                { amount: 0.5 }
            );
        }

        // Animate Footer
        if (footerRef.current) {
            inView(
                footerRef.current,
                () => {
                    animate('.footer-text', { opacity: [0, 1], y: [50, 0] }, { duration: 0.6 });
                },
                { amount: 0.5 }
            );
        }
    }, []);

    return (
        <div>
            <Navbar />
            <section ref={heroSectionRef} className="py-[22em] justify-center flex relative mx-auto">
                <div className="container">
                    <div className="grid items-center gap-8 lg:grid-cols-2">
                        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                            <Badge variant="outline" className="hero-badge opacity-0">
                                New Release Every Week
                                <ArrowDownRight className="ml-2 size-4" />
                            </Badge>
                            <h1 className="my-6 text-pretty text-4xl font-bold lg:text-6xl hero-title opacity-0">
                                Here are the cheats
                            </h1>
                            <p className="mb-8 max-w-xl text-muted-foreground lg:text-xl hero-description opacity-0">
                                Get access to the latest cheats for your favorite games. We release new cheats every
                                week. Stay tuned!
                            </p>
                            <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start hero-buttons opacity-0">
                                <a href="https://github.com/OmegazonCMoi/COD-TOOLS">
                                    <Button className="w-full sm:w-auto">Discover</Button>
                                </a>
                                <Button variant="outline" className="w-full sm:w-auto">
                                    Learn More
                                    <ArrowDownRight className="ml-2 size-4" />
                                </Button>
                            </div>
                        </div>

                        <video
                            src="/videos/hero.mp4"
                            className="hero-video max-h-96 w-full rounded-md object-cover opacity-0"
                            autoPlay
                            loop
                            muted
                        />
                    </div>
                </div>
            </section>

            {cheats.map((cheat, index) => (
                index % 2 === 0 ? (
                    <CheatsLeft
                        id={cheat.id}
                        key={cheat.title}
                        title={cheat.title}
                        description={cheat.description}
                        video={cheat.video}
                        link={cheat.link}
                    />
                ) : (
                    <CheatsRight
                        id={cheat.id}
                        key={cheat.title}
                        title={cheat.title}
                        description={cheat.description}
                        video={cheat.video}
                        link={cheat.link}
                    />
                )
            ))}

            <p ref={footerRef} className="footer-text text-center pb-10 opacity-0">
                These videos are examples! Cheats presented in these videos may not be available!
            </p>

            <Footer />
        </div>
    );
};

export default CheatsPage;
