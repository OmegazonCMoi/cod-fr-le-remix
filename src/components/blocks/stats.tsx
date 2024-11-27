'use client';

import { Star } from "lucide-react";
import { useEffect, useRef } from "react";
import { animate, inView, stagger } from "motion";

const Stat = () => {
    const sectionRef = useRef(null);

    // Function to animate number growth
    const animateNumber = (from: number, to: number, elementId: string, disableDecimal = false) => {
        const element = document.getElementById(elementId);
        if (element) {
            let startTime = 0;
            const duration = 2; // seconds for the animation duration

            // Interpolation function
            const step = (timestamp: number) => {
                if (startTime === 0) startTime = timestamp;
                const progress = (timestamp - startTime) / (duration * 1000); // in seconds
                const currentNumber = Math.min(from + (to - from) * progress, to);

                // Conditionally format the number to avoid showing .0 or decimals
                const formattedNumber = disableDecimal
                    ? Math.floor(currentNumber)
                    : currentNumber % 1 === 0
                        ? currentNumber.toFixed(0)
                        : currentNumber.toFixed(1);

                element.innerHTML = formattedNumber.toString(); // Display the formatted number

                if (progress < 1) {
                    requestAnimationFrame(step);
                }
            };

            requestAnimationFrame(step);
        }
    };

    useEffect(() => {
        if (sectionRef.current) {
            inView(sectionRef.current, () => {
                // Animate the title
                animate('.stat-title', { opacity: [0, 1], y: [-50, 0] }, { duration: 0.6 });

                // Animate each stat block with stagger
                animate('.stat-block', { opacity: [0, 1], y: [-50, 0] }, { duration: 0.6, delay: stagger(0.2) });

                // Animate numbers for each stat
                animateNumber(0, 4, 'stat-4x');   // For "4x"
                animateNumber(0, 6300, 'stat-98', true);   // For "6300" with no decimal
                animateNumber(0, 4.9, 'stat-4.9'); // For "4.9"
            }, { amount: 1.0 }); // Trigger when the section is fully in view
        }
    }, []);

    return (
        <section ref={sectionRef} className="py-32 justify-center mx-auto flex">
            <div className="container">
                <h1 className="stat-title text-center text-4xl font-semibold lg:text-6xl opacity-0">
                    Let&apos;s talk about the stats
                </h1>
                <div className="grid gap-10 pt-9 md:grid-cols-3 lg:gap-0 lg:pt-20">
                    <div className="stat-block text-center opacity-0">
                        <p className="text-sm font-medium text-muted-foreground">
                            Reduce your time to find cheats by
                        </p>
                        <p className="pt-4 text-7xl font-semibold lg:pt-10"><span id="stat-4x">0</span>x</p>
                        <p className="text-2xl font-semibold text-muted-foreground">
                            quicker
                        </p>
                    </div>
                    <div className="stat-block text-center opacity-0">
                        <p className="text-sm font-medium text-muted-foreground">
                            More than
                        </p>
                        <p className="pt-4 text-7xl font-semibold lg:pt-10">+<span id="stat-98">0</span></p>
                        <p className="text-2xl font-semibold text-muted-foreground">
                            satisfied members
                        </p>
                    </div>
                    <div className="stat-block text-center opacity-0">
                        <p className="text-sm font-medium text-muted-foreground">
                            People rate us
                        </p>
                        <p id="stat-4.9" className="pt-4 text-7xl font-semibold lg:pt-10">0</p>
                        <p className="text-2xl font-semibold text-muted-foreground">
                            /5 <Star className="size-5 inline-block -mt-1" />
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Stat;
