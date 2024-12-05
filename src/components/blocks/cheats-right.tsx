'use client';

import { ArrowDownRight } from 'lucide-react';
import React, { useEffect, useRef } from 'react';
import { animate, inView, stagger } from 'motion';
import { Button } from '@/components/ui/button';

interface CheatsProps {
    id: string;
    title: string;
    description: string;
    video: string;
    link: string;
}

const CheatsRight: React.FC<CheatsProps> = ({ id, title, description, video, link }) => {
    const sectionRef = useRef(null);

    useEffect(() => {
        if (sectionRef.current) {
            inView(
                sectionRef.current,
                () => {
                    // Animate video
                    animate(`#${id} .cheats-video`, { opacity: [0, 1], x: [50, 0] }, { duration: 0.6 });

                    // Animate text elements sequentially
                    animate(
                        `#${id} .cheats-text > *`,
                        { opacity: [0, 1], y: [50, 0] },
                        { delay: stagger(0.2), duration: 0.6 }
                    );
                },
                { amount: 0.5 }
            );
        }
    }, [id]);

    return (
        <section ref={sectionRef} className="py-[12em] justify-center flex relative mx-auto" id={id}>
            <div className="container">
                <div className="grid items-center gap-8 lg:grid-cols-2">
                    <div className="cheats-text flex flex-col items-center text-start lg:items-start lg:text-left">
                        <h1 className="text-pretty text-4xl font-bold lg:text-6xl opacity-0">{title}</h1>
                        <p className="text-muted-foreground lg:text-xl opacity-0 py-8">{description}</p>
                        <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start opacity-0">
                            <a href={link} target="_blank" rel="noopener noreferrer">
                                <Button variant="outline" className="w-full sm:w-auto">
                                    Learn More
                                    <ArrowDownRight className="ml-2 size-4" />
                                </Button>
                            </a>
                        </div>
                    </div>
                    <video
                        src={video}
                        className="cheats-video max-h-96 w-full rounded-md object-cover opacity-0"
                        autoPlay
                        loop
                        muted
                    />
                </div>
            </div>
        </section>
    );
};

export default CheatsRight;
