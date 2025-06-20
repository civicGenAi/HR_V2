import { useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Heart, MapPinIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { deleteJobs, saveJob } from "@/api/apiJobs";
import useFetch from "@/hooks/use-fetch";
import SavedJobs from "@/pages/SavedJobs";
import { BarLoader } from "react-spinners";

function JobCard({
  job,
  isMyJob = false,
  savedInit = false,
  onJobSaved = () => {},
}) {
  const { user } = useUser();
  const [saved, setSaved] = useState(savedInit);

  const {
    fn: fnSavedJob,
    data: savedJob,
    loading: loadingSavedJob,
  } = useFetch(saveJob, {
    alreadySaved: saved,
  });

  const handleSaveJob = async () => {
    await fnSavedJob({
      user_id: user.id,
      job_id: job.id,
    });
    onJobSaved();
  };

  const { loading: loadingDeleteJob, fn: fnDeleteJob } = useFetch(deleteJobs, {
    job_id: job.id,
  });

  const handleDeleteJob = async () => {
    await fnDeleteJob();
    onJobSaved();
  };

  useEffect(() => {
    if (savedJob !== undefined) setSaved(savedJob?.length > 0);
  }, [savedJob]);

  return (
    <Card className='flex flex-col'>
      {loadingDeleteJob && (
        <BarLoader className='mt-4' width={"100%"} colors='#36d7b7' />
      )}
      <CardHeader>
        <CardTitle className='flex justify-between font-bold'>
          {job.title}

          {isMyJob && (
            <Trash2Icon
              fill='red'
              size={18}
              className='text-red-300 cursor-pointer'
              onClick={handleDeleteJob}
            />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col gap-4 flex-1'>
        <div className='flex justify-between'>
          {job.company && <img src={job.company.logo_url} className='h-6' />}
          <div className='flex gap-2 items-center'>
            <MapPinIcon size={15} /> {job.location}
          </div>
        </div>
        <hr />
        {job.description.substring(0, job.description.indexOf("."))}
      </CardContent>
      <CardFooter className='flex gap-2'>
        <Link to={`/job/${job.id}`} className='flex-1'>
          <Button className='w-full' variant='default'>
            More Details
          </Button>
        </Link>
        {!isMyJob && (
          <Button className='w-15' variant='outline' onClick={handleSaveJob}>
            {saved ? (
              <Heart size={20} stroke='red' fill='red' />
            ) : (
              <Heart size={20} />
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default JobCard;
