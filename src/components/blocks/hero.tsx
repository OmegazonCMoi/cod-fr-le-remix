'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { integrations } from '@/app/const/hero';
import Link from 'next/link';

const Hero = () => {

    return (
        <section className="relative overflow-hidden w-full justify-center mx-auto flex flex-col pt-20 sm:pt-24 md:pt-40 pb-16 animate-fadeIn">
            {/* Background SVG */}
            <div className="absolute inset-0 overflow-hidden">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1400 600"
                    className="min-h-full min-w-full"
                    preserveAspectRatio="xMidYMid slice"
                >
                    <defs>
                        <pattern
                            id="grid"
                            width="24"
                            height="24"
                            patternUnits="userSpaceOnUse"
                        >
                            <path
                                d="M 24 0 L 0 0 0 24"
                                fill="none"
                                stroke="hsl(var(--muted))"
                                strokeWidth="1"
                                strokeOpacity={0.5}
                            />
                        </pattern>
                    </defs>
                    <rect width="1400" height="600" fill="url(#grid)" />
                </svg>
            </div>

            {/* Content */}
            <div className="relative w-full px-6 md:px-12 lg:px-20 z-10">
                <div className="absolute left-0 z-10 hidden h-full w-1/2 bg-[linear-gradient(to_right,hsl(var(--background))_85%,transparent_100%)] md:block"></div>
                <div className="container mx-auto flex flex-col items-start gap-12 md:flex-row md:items-center">
                    {/* Left Section */}
                    <div className="z-20 w-full md:w-1/2 bg-background bg-opacity-90 p-8 rounded-lg md:rounded-none md:bg-transparent">
                        <div className="flex flex-col items-start text-left space-y-4 animate-slideInLeft">
                            <h1 className="my-4 text-pretty text-3xl font-bold sm:text-4xl lg:text-6xl">
                                Welcome to Hack on COD
                            </h1>
                            <Link href="#whyus">
                                <Button>
                                    Discover{' '}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="lucide lucide-move-right"
                                    >
                                        <path d="M18 8L22 12L18 16" />
                                        <path d="M2 12H22" />
                                    </svg>
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="flex flex-col gap-16 pb-8 pt-12 md:py-32">
                        {integrations.map((line, i) => (
                            <div
                                key={i}
                                className="flex gap-x-24 odd:-translate-x-24 animate-fadeIn"
                                style={{ animationDelay: `${i * 0.2}s` }}
                            >
                                {line.map((integration) => (
                                    <div
                                        key={integration.id}
                                        className="size-24 rounded-xl border border-background bg-background shadow-xl hover:scale-105 transition-transform duration-300"
                                    >
                                        <div className="size-full bg-muted/20 p-4 animate-scaleUp">
                                            {integration.icon}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
