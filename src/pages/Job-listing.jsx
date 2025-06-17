import React, { useEffect, useState } from "react";
import { getJobs } from "@/api/apiJobs";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";
import JobCard from "@/components/jobsCard";

function JobListing() {
  const { isLoaded } = useUser();
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState("");

  const {
    fn: fnJobs,
    data: jobs,
    loading: loadingJobs,
  } = useFetch(getJobs, {
    location,
    company_id,
    searchQuery,
  });

  // Fetch jobs when user is loaded or filters change
  useEffect(() => {
    if (isLoaded) fnJobs();
  }, [isLoaded, location, company_id, searchQuery]);

  if (!isLoaded) {
    return <BarLoader className='mb-4' width={"100%"} color='#23312EFF' />;
  }

  return (
    <div>
      <h1 className='gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8'>
        Latest Jobs
      </h1>
      {loadingJobs && (
        <BarLoader className='mt-4' width={"100%"} color='#23312EFF' />
      )}
      {loadingJobs === false && (
        <div className='mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {jobs?.length ? (
            jobs.map((job) => {
              return (
                <JobCard
                  key={job.id}
                  job={job}
                  savedInit={job.saved?.length > 0}
                />
              );
            })
          ) : (
            <div>No job found</div>
          )}
        </div>
      )}
    </div>
  );
}

export default JobListing;
