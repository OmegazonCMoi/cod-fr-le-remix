'use client'

import { Star } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { animate, inView, stagger } from 'motion';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import type { CarouselApi } from '@/components/ui/carousel';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from '@/components/ui/carousel';

import { testimonials } from '@/app/const/testimonial';

const Testimonial = () => {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const sectionRef = useRef(null);

    useEffect(() => {
        // Observe the section when it comes into view
        if (sectionRef.current) {
            inView(sectionRef.current, () => {
                // Animate the testimonial text and avatars with staggered effects
                animate('.testimonial-item', { opacity: [0, 1], y: [50, 0] }, { duration: 0.6, delay: stagger(0.2) });
                animate('.carousel-button', { opacity: [0, 1], y: [50, 0] }, { duration: 0.6, delay: stagger(0.2) });
            }, { amount: 0.8 }); // Trigger when 80% of the section is in view
        }
    }, []);

    useEffect(() => {
        if (!api) return;

        const updateCurrent = () => {
            setCurrent(api.selectedScrollSnap());
        };

        api.on('select', updateCurrent);
        return () => {
            api.off('select', updateCurrent);
        };
    }, [api]);

    return (
        <section ref={sectionRef} className="py-32 flex justify-center items-center mx-auto w-full">
            <div className="max-w-[1200px] w-full flex flex-col items-center">
                <Carousel setApi={setApi}>
                    <CarouselContent>
                        {testimonials.map((testimonial) => (
                            <CarouselItem key={testimonial.id}>
                                <div className="testimonial-item container flex flex-col items-center text-center opacity-0">
                                    <p className="mb-8 max-w-4xl font-medium md:px-8 lg:text-3xl">
                                        &ldquo;{testimonial.text}&rdquo;
                                    </p>
                                    <Avatar className="mb-2 size-12 md:size-24">
                                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                                        <AvatarFallback>{testimonial.name}</AvatarFallback>
                                    </Avatar>
                                    <p className="mb-1 text-sm font-medium md:text-lg">
                                        {testimonial.name}
                                    </p>
                                    <p className="mb-2 text-sm text-muted-foreground md:text-lg">
                                        {testimonial.role}
                                    </p>
                                    <div className="mt-2 flex items-center gap-0.5">
                                        <Star className="size-5 fill-primary stroke-none" />
                                        <Star className="size-5 fill-primary stroke-none" />
                                        <Star className="size-5 fill-primary stroke-none" />
                                        <Star className="size-5 fill-primary stroke-none" />
                                        <Star className="size-5 fill-primary stroke-none" />
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
                <div className="container flex justify-center py-16">
                    {testimonials.map((testimonial, index) => (
                        <Button
                            key={testimonial.id}
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                                api?.scrollTo(index);
                            }}
                            className="carousel-button opacity-0"
                        >
                            <div
                                className={`size-2.5 rounded-full ${index === current ? 'bg-primary' : 'bg-input'}`}
                            />
                        </Button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonial;
