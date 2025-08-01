import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "./ui/label";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import useFetch from "@/hooks/use-fetch";
import { applyToJobs } from "@/api/apiApplications";
import { BarLoader } from "react-spinners";

const schema = z.object({
  experience: z
    .number()
    .min(0, { message: "Experince must be altleast 0" })
    .int(),

  skills: z.string().min(1, { message: "Skills are required" }),
  education: z.enum(["intermediate", "graduate", "post-graduate"], {
    message: "Education is required",
  }),

  resume: z
    .any()
    .refine(
      (file) =>
        file[0] &&
        (file[0].type === "application/pdf" ||
          file[0].type === "application/msword"),
      { message: "Only PDF or Word documents are allowed" }
    ),
});

function ApplyJobDrawer({ user, jobs, applied = false, fetchJob }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const {
    loading: loadingApply,
    error: errorApply,
    fn: fnApply,
  } = useFetch(applyToJobs);

  const onSubmit = (data) => {
    fnApply({
      ...data,
      job_id: jobs.id,
      candidate_id: user.id,
      name: user.fullName,
      status: "applied",
      resume: data.resume[0],
    }).then(() => {
      fetchJob();
      reset();
    });
  };
  return (
    <Drawer open={applied ? false : undefined}>
      <DrawerTrigger asChild>
        <Button
          size='lg'
          variant={jobs?.isOpen && !applied ? "default" : "destructive"}
          disabled={!jobs?.isOpen || applied}>
          {jobs?.isOpen ? (applied ? "Applied" : "Apply") : "Hiring Closed"}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            Apply for {jobs?.title} at {jobs?.company?.name}
          </DrawerTitle>
          <DrawerDescription>Please fill the form below.</DrawerDescription>
        </DrawerHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col gap-4 p-4 pb-0'>
          <Input
            type='number'
            placeholder='Years of Experience'
            className='flex-1'
            {...register("experience", {
              valueAsNumber: true,
            })}
          />

          {errors.experience && (
            <p className='text-red-600'>{errors.experience.message}</p>
          )}
          <Input
            type='text'
            placeholder='Skills (Comma Separated)'
            className='flex-1'
            {...register("skills")}
          />

          {errors.skills && (
            <p className='text-red-600'>{errors.skills.message}</p>
          )}

          <Controller
            name='education'
            control={control}
            render={({ field }) => (
              <RadioGroup onValueChange={field.onChange} {...field}>
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem value='intermediate' id='intermediate' />
                  <Label htmlFor='intermediate'>Intermediate</Label>
                </div>
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem value='graduate' id='graduate' />
                  <Label htmlFor='graduate'>Graduate</Label>
                </div>

                <div className='flex items-center space-x-2'>
                  <RadioGroupItem value='post-graduate' id='post-graduate' />
                  <Label htmlFor='post-graduate'>Post Graduate</Label>
                </div>
              </RadioGroup>
            )}
          />
          {errors.education && (
            <p className='text-red-600'>{errors.education.message}</p>
          )}

          <Input
            type='file'
            accept='.pdf, .doc, .docx'
            className='flex-1/2 file:text-gray-400'
            {...register("resume")}
          />

          {errors.resume && (
            <p className='text-red-600'>{errors.resume.message}</p>
          )}

          {errors.errorApply && (
            <p className='text-red-600'>{errors.errorApply.message}</p>
          )}

          {loadingApply && <BarLoader width={"100%"} color='#36d7b7' />}

          <Button type='submit' variant='default' size='lg'>
            Apply
          </Button>
        </form>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default ApplyJobDrawer;
