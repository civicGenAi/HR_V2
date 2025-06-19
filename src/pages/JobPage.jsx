import { getSingleJob, updateHringStatus } from "@/api/apiCompanies";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import MDEditor from "@uiw/react-md-editor";
import {
  Briefcase,
  BriefcaseBusiness,
  DoorClosed,
  DoorOpen,
  MapPinIcon,
} from "lucide-react";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ApplyJobDrawer from "@/components/ApplyJob";
import ApplicationsCard from "@/components/ApplicationsCard";

function JobPage() {
  const { isLoaded, user } = useUser();
  const { id } = useParams();

  const {
    fn: fnJobs,
    data: jobs,
    loading: loadingJobs,
  } = useFetch(getSingleJob, {
    job_id: id,
  });

  const { fn: fnHiringStatus, loading: loadingHiringStatus } = useFetch(
    updateHringStatus,
    {
      job_id: id,
    }
  );

  const handleStatusChange = (value) => {
    const isOpen = value === "open";
    fnHiringStatus(isOpen).then(() => fnJobs());
  };

  useEffect(() => {
    if (isLoaded) fnJobs();
  }, [isLoaded]);

  if (!isLoaded || loadingJobs) {
    return <BarLoader className='mb-4' width={"100%"} color='#23312EFF' />;
  }

  return (
    <div className='flex flex-col gap-8 mt-5'>
      <div className='flex flex-col-reverse gap-6 md:flex-row justify-between items-center'>
        <h1 className='gradient-title font-extrabold pb-3 text-4xl sm:text-6xl'>
          {jobs?.title}
        </h1>
        <img src={jobs?.company?.logo_url} className='h-12' alt={jobs?.title} />
      </div>
      <div className='flex justify-between'>
        <div className='flex gap-2'>
          <MapPinIcon />
          {jobs?.location}
        </div>
        <div className='flex gap-2'>
          <BriefcaseBusiness /> {jobs?.applications?.length} Applications
        </div>
        <div className='flex gap-2'>
          {jobs?.isOpen ? (
            <>
              <DoorOpen />
              Open
            </>
          ) : (
            <>
              <DoorClosed />
              Closed
            </>
          )}
        </div>
      </div>

      {/* hiring status */}

      {loadingHiringStatus && <BarLoader width={"100%"} color='#23312EFF' />}
      {jobs?.recruiter_id === user?.id && (
        <Select onValueChange={handleStatusChange}>
          <SelectTrigger
            className={`w-full ${
              jobs?.isOpen ? "bg-green-950" : "bg-red-900"
            }`}>
            <SelectValue
              placeholder={
                "Hiring Status" + (jobs?.isOpen ? "(Open)" : "(Closed)")
              }
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='open'>Open</SelectItem>
            <SelectItem value='closed'>Closed</SelectItem>
          </SelectContent>
        </Select>
      )}

      <h2 className='text-2xl sm:text-3xl font-bold'>About the job</h2>
      <p className='sm:text-lg'>{jobs?.description}</p>

      <h2 className='text-2xl sm:text-3xl font-bold'>
        What we are looking for
      </h2>
      <MDEditor.Markdown
        source={jobs?.requirements}
        className='bg-transparent sm:text-lg'
      />

      {/* render applications */}
      {jobs?.recruiter_id !== user?.id && (
        <ApplyJobDrawer
          jobs={jobs}
          user={user}
          fetchJob={fnJobs}
          applied={jobs?.applications?.find(
            (ap) => ap.candidate_id === user.id
          )}
        />
      )}

      {jobs?.applications?.length > 0 && jobs?.recruiter_id === user?.id && (
        <div className='flex flex-col gap-2'>
          <h2 className='text-2xl sm:text-3xl font-bold'>Applications</h2>
          {jobs?.applications.map((application) => {
            return (
              <ApplicationsCard
                key={application.id}
                application={application}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default JobPage;
