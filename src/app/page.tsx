'use client'

import Feature from "@/components/blocks/whyus";
import Faq from "@/components/blocks/faq";
import Hero from "@/components/blocks/hero";
import Navbar from "@/components/blocks/navbar";
import Stat from "@/components/blocks/stats";
import Testimonial from "@/components/blocks/testimonials";
import React from "react";
import Footer from "@/components/blocks/footer";

export default function Home() {
  return (
    <div id="home">
      <Navbar />
      <Hero />
      <Feature />
      <Faq />
      <Stat />
      <Testimonial />
      <Navbar />
      <Footer />
    </div>
  );
}
