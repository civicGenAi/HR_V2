import { getSavedJobs, saveJob } from "@/api/apiJobs";
import JobCard from "@/components/jobsCard";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { BarLoader } from "react-spinners";

function SavedJobs() {
  const { isLoaded, user } = useUser();
  const {
    loading: loadingSavedJob,
    data: SavedJobs,
    fn: fnSavedJobs,
  } = useFetch(getSavedJobs);

  useEffect(() => {
    if (isLoaded) fnSavedJobs();
  }, [isLoaded]);

  if (!isLoaded || loadingSavedJob) {
    return <BarLoader className='mb-4' width={"100%"} color='#23312EFF' />;
  }

  return (
    <div>
      <h1 className='font-extrabold text-6xl sm:text-7xl text-center pb-8 '>
        Saved Jobs
      </h1>

      {loadingSavedJob === false && (
        <div className='mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {SavedJobs?.length ? (
            SavedJobs.map((saved) => {
              return (
                <JobCard
                  key={saved.id}
                  job={saved?.job}
                  savedInit={true}
                  onJobSaved={fnSavedJobs}
                />
              );
            })
          ) : (
            <div>No SavedJobs found</div>
          )}
        </div>
      )}
    </div>
  );
}

export default SavedJobs;
