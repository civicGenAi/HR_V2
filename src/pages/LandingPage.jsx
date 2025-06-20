import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import companies from "../data/companies.json";
import faqs from "../data/faq.json";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import PlatformFeatures from "@/components/Features";
import { Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function LandingPage() {
  const [open, setOpen] = useState(false);
  return (
    <main className='flex flex-col gap-10 sm:gap-20 py-10 sm:py20'>
      <section className='text-center '>
        <h1
          className='flex flex-col items-center justify-center  text-4xl
         font-extrabold sm:text-6xl lg:text-8xl tracking-tight py-4'>
          Find Your Dream Job{" "}
          <span className='flex items-center gap-2 sm:gap-6'>
            and get Hired
            {/* <img src='/logo.png' alt='logo' className='h-1 sm:h-24 lg:h-32 ' /> */}
          </span>
        </h1>
        <p className='sm:mt-4 text-xs sm:text-xl'>
          Explore thousand of jobs listing or find the perfect candidate
        </p>
      </section>
      <div className='flex gap-6 justify-center'>
        <Link to='/jobs'>
          <Button size='xl'>Find Jobs</Button>
        </Link>
        <Link to='/post-job'>
          <Button
            className='bg-[#157347] text-white hover:bg-[#12623c]'
            size='xl'>
            Post Jobs
          </Button>
        </Link>
      </div>

      <Carousel plugins={[Autoplay({ delay: 2000 })]} className='w-full py-10'>
        <CarouselContent className='flex gap-5 sm:gap-20 items-center'>
          {companies.map(({ name, id, path }) => {
            return (
              <CarouselItem key={id} className='basis-1/3 lg:basis-1/4'>
                <img
                  src={path}
                  alt={name}
                  className='h-9 sm:h-14 object-contain'
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
      {/* banner */}
      <img src='/pic.jpg' className='w-full' />
      <section className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <Card>
          <CardHeader>
            <CardTitle>For Job Seekers</CardTitle>
          </CardHeader>
          <CardContent>
            Search and apply for jobs, track applications, and more..
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>For Employers</CardTitle>
          </CardHeader>
          <CardContent>
            Post jobs, manage applications, and find the best candidate
          </CardContent>
        </Card>
      </section>

      <PlatformFeatures />
      {/* <Accordion type='single' collapsible>
        {faqs.map((faq, index) => {
          return (
            <AccordionItem key={index} value={`item-${index + 1}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion> */}

      {/* Floating Sparkles Button */}
      <Button
        className='fixed bottom-6 right-6 z-50 rounded-full p-6 bg-[#FE047F]  text-white shadow-xl'
        size='icon'
        variant='default'
        onClick={() => setOpen(true)}>
        <Sparkles className='h-6 w-6' />
      </Button>

      {/* Dialog Popup */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='sm:max-w-md'>
          <DialogHeader>
            <DialogTitle>CareerHR Assistant</DialogTitle>
          </DialogHeader>
          <div className='text-sm text-muted-foreground'>
            🚀 We're working on something amazing! The AI Assistant is coming
            soon.
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}

export default LandingPage;
