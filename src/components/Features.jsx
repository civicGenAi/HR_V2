import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Sparkles, Briefcase, Bot, SlidersHorizontal } from "lucide-react";

function PlatformFeatures() {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 py-6'>
      <Card className='hover:shadow-lg transition'>
        <CardHeader>
          <Sparkles className='text-[#FE047F]' />
          <CardTitle>AI Job Match</CardTitle>
          <CardDescription>
            Instantly get job recommendations tailored to your skills,
            experience, and preferences.
          </CardDescription>
        </CardHeader>
        <CardContent>
          Our AI scans your profile and matches you with the most relevant
          opportunities — no more endless searching.
        </CardContent>
      </Card>

      <Card className='hover:shadow-lg transition'>
        <CardHeader>
          <Briefcase className='text-[#FE047F]' />
          <CardTitle>Gig & Contract Finder</CardTitle>
          <CardDescription>
            Find short-term or freelance jobs easily with our dedicated
            gig-matching feature.
          </CardDescription>
        </CardHeader>
        <CardContent>
          Whether you’re a freelancer or just want something flexible, this tool
          helps you land your next quick job.
        </CardContent>
      </Card>

      <Card className='hover:shadow-lg transition'>
        <CardHeader>
          <Bot className='text-[#FE047F]' />
          <CardTitle>CareerHR Assistant</CardTitle>
          <CardDescription>
            Ask questions and get instant help from our smart assistant.
          </CardDescription>
        </CardHeader>
        <CardContent>
          From applying to jobs to understanding features — our chatbot is your
          24/7 HR guide.
        </CardContent>
      </Card>

      <Card className='hover:shadow-lg transition'>
        <CardHeader>
          <SlidersHorizontal className='text-[#FE047F]' />
          <CardTitle>Skill-Based Search</CardTitle>
          <CardDescription>
            Filter jobs by your actual skills, not just by job title or
            location.
          </CardDescription>
        </CardHeader>
        <CardContent>
          Let your abilities guide the job search. We connect you with jobs
          based on the things you’re truly good at.
        </CardContent>
      </Card>
    </div>
  );
}

export default PlatformFeatures;
