'use client';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { faqs } from '@/app/const/faq';
import { useInView } from 'react-intersection-observer';
import { animate, inView, stagger } from 'motion';
import { useEffect, useRef } from 'react';

const Faq = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        // Trigger animation when the entire section is in view
        if (sectionRef.current) {
            inView(sectionRef.current, () => {
                // Animate the title
                animate('.faq-title', { opacity: [0, 1], y: [-50, 0] }, { duration: 0.6 });

                // Animate each accordion item with stagger
                animate('.accordion-item', { opacity: [0, 1], y: [-50, 0] }, { duration: 0.6, delay: stagger(0.2) });
            }, { amount: 1.0 }); // Ensure the entire section is visible before triggering
        }
    }, []);

    return (
        <section ref={sectionRef} className="py-32 justify-center mx-auto flex">
            <div className="container">
                <h1 className="faq-title mb-4 text-3xl font-semibold md:mb-11 md:text-5xl opacity-0">
                    Frequently asked questions
                </h1>
                {faqs.map((faq, index) => (
                    <Accordion key={index} type="single" collapsible>
                        <AccordionItem value={`item-${index}`} className="accordion-item opacity-0">
                            <AccordionTrigger className="hover:text-foreground/60 hover:no-underline">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent>{faq.answer}</AccordionContent>
                        </AccordionItem>
                    </Accordion>
                ))}
            </div>
        </section>
    );
};

export default Faq;
