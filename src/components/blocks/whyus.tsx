'use client';

import { Star, Lock, Zap } from 'lucide-react';
import { animate, inView, stagger } from 'motion';
import { useEffect, useRef } from 'react';

const Feature = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        // Trigger animation when the entire section is in view
        if (sectionRef.current) {
            inView(sectionRef.current, () => {
                // Remove hidden class from all elements before animation
                document.querySelectorAll('.hidden').forEach((el) => el.classList.remove('hidden'));

                // Animate the title
                animate('.title', { opacity: [0, 1], y: [-50, 0] }, { duration: 0.6 });

                // Animate the subtitle
                animate('.subtitle', { opacity: [0, 1], y: [-30, 0] }, { duration: 0.6, delay: 0.3 });

                // Animate feature blocks with stagger
                animate('.feature-block', { opacity: [0, 1], y: [-50, 0] }, { duration: 0.6, delay: stagger(0.2) });
            }, { amount: 1.0 }); // Ensure the entire section is visible before triggering
        }
    }, []);

    return (
        <section ref={sectionRef} className="pt-56 pb-32 justify-center mx-auto flex" id='whyus'>
            <div className="container">
                <p className="subtitle mb-4 text-sm text-muted-foreground lg:text-base hidden">
                    OUR VALUES
                </p>
                <h2 className="title text-3xl font-medium lg:text-4xl hidden">Why Choose Us?</h2>
                <div className="mt-14 grid gap-6 lg:mt-20 lg:grid-cols-3">
                    <div className="feature-block rounded-lg bg-accent p-5 hidden">
                        <span className="mb-8 flex size-12 items-center justify-center rounded-full bg-background">
                            <Lock className="size-6" />
                        </span>
                        <h3 className="mb-2 text-xl font-medium">Security</h3>
                        <p className="leading-7 text-muted-foreground">
                            We take security very seriously. We have a dedicated team of security experts who are always on the lookout for any potential threats on content we host.
                        </p>
                    </div>
                    <div className="feature-block rounded-lg bg-accent p-5 hidden">
                        <span className="mb-8 flex size-12 items-center justify-center rounded-full bg-background">
                            <Star className="size-6" />
                        </span>
                        <h3 className="mb-2 text-xl font-medium">Quality</h3>
                        <p className="leading-7 text-muted-foreground">
                            We strive to provide the best quality content to our users. By constantly updating our content and servers, we ensure that our users have the best experience possible.
                        </p>
                    </div>
                    <div className="feature-block rounded-lg bg-accent p-5 hidden">
                        <span className="mb-8 flex size-12 items-center justify-center rounded-full bg-background">
                            <Zap className="size-6" />
                        </span>
                        <h3 className="mb-2 text-xl font-medium">Fast</h3>
                        <p className="leading-7 text-muted-foreground">
                            We understand that time is valuable. That&apos;s why we constantly search for new cheats and hacks to make sure our users have the fastest and most efficient experience possible.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Feature;
