import React, { useEffect, useState } from "react";
import { getJobs } from "@/api/apiJobs";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";
import JobCard from "@/components/jobsCard";
import { getCompanies } from "@/api/apiCompanies";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { State } from "country-state-city";

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

  const { fn: fnCompanies, data: companies = [] } = useFetch(getCompanies);

  useEffect(() => {
    if (isLoaded) fnCompanies();
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded) fnJobs();
  }, [isLoaded, location, company_id, searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();

    let formData = new FormData(e.target);

    const query = formData.get("search-query");
    if (query) setSearchQuery(query);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setCompany_id("");
    setLocation("");
  };

  if (!isLoaded || loadingJobs) {
    return <BarLoader className='mb-4' width={"100%"} color='#23312EFF' />;
  }

  return (
    <div>
      <h1 className='font-extrabold text-6xl sm:text-7xl text-center pb-8'>
        Latest Jobs
      </h1>

      {/* filters */}
      <form
        onSubmit={handleSearch}
        className='h-10 flex w-full gap-2 items-center mb-3'>
        <Input
          type='text'
          placeholder='Search jobs by title..'
          name='search-query'
          className='h-full flex px-4 pt-2 text-shadow-md'
        />
        <Button type='submit' className='h-full sm:w-28' variant='default'>
          search
        </Button>
      </form>

      <div className='flex flex-col sm:flex-row gap-3 items-center '>
        <Select value={location} onValueChange={(value) => setLocation(value)}>
          <SelectTrigger>
            <SelectValue placeholder='Filter by Location' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {State.getStatesOfCountry("TZ").map(({ name }) => {
                return (
                  <SelectItem key={name} value={name}>
                    {name}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          value={company_id}
          onValueChange={(value) => setCompany_id(value)}>
          <SelectTrigger>
            <SelectValue placeholder='Filter by Company' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {companies.map(({ name, id }) => {
                return (
                  <SelectItem key={name} value={id}>
                    {name}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button onClick={clearFilters} className='sm:w-1/2 bg-[#157347] '>
          Clear Filters
        </Button>
      </div>

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
