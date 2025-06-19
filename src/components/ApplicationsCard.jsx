import React from "react";
import { Card, CardContent, CardFooter, CardTitle } from "./ui/card";
import {
  Boxes,
  BriefcaseBusinessIcon,
  BriefcaseConveyorBeltIcon,
  Download,
  School2,
} from "lucide-react";
import useFetch from "@/hooks/use-fetch";
import { updateApplications } from "@/api/apiApplications";
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

function ApplicationsCard({ application, isCandidate = false }) {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = application?.resume;
    link.target = "_blank";
    link.click();
  };

  const { loading: loadingHiringStatus, fn: fnHiringStatus } = useFetch(
    updateApplications,
    {
      job_id: application.job_id,
    }
  );

  const handleStatusChange = (status) => {
    fnHiringStatus(status);
  };
  return (
    <Card>
      {loadingHiringStatus && <BarLoader width={"50%"} color='#36d7b7b' />}
      <CardTitle className='flex items-center justify-between text-xl font-bold'>
        {isCandidate
          ? `${application?.jobs?.title} at ${application?.jobs?.company?.name}`
          : application?.name || "No name provided"}
        <Download
          size={18}
          className='bg-white text-black rounded-full h-8 w-8 p-1.5 cursor-pointer'
          onClick={handleDownload}
        />
      </CardTitle>
      <CardContent className='flex flex-col gap-4'>
        <div className='flex flex-col md:flex-row justify-between'>
          <div className='flex gap-2 items-center'>
            <BriefcaseBusinessIcon size={15} /> {application?.experience} years
            of experience
          </div>
          <div className='flex gap-2 items-center'>
            <School2 size={15} /> {application?.education}
          </div>
          <div className='flex gap-2 items-center'>
            <Boxes size={15} /> Skills: {application?.skills}
          </div>
        </div>
        <hr />
      </CardContent>
      <CardFooter className='flex justify-between'>
        <span>{new Date(application?.created_at).toLocaleString()}</span>
        {isCandidate ? (
          <span className='capitalize font-bold'>
            Status:{application?.status}
          </span>
        ) : (
          <Select
            onValueChange={handleStatusChange}
            defaultValue={application.status}>
            <SelectTrigger className='w-52'>
              <SelectValue placeholder='Application Status' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='applied'>Applied</SelectItem>
              <SelectItem value='interviewing'>Interviewing</SelectItem>
              <SelectItem value='hired'>Hired</SelectItem>
              <SelectItem value='rejected'>Rejected</SelectItem>
            </SelectContent>
          </Select>
        )}
      </CardFooter>
    </Card>
  );
}

export default ApplicationsCard;
