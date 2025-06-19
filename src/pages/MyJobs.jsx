import CreatedApplication from "@/components/CreatedApplication";
import CreatedJob from "@/components/CreatedJob";
import { useUser } from "@clerk/clerk-react";
import React from "react";
import { BarLoader } from "react-spinners";

function MyJobs() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <BarLoader className='mb-4' width={"100%"} color='#23312EFF' />;
  }
  return (
    <div>
      <h1 className='gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8 '>
        {user?.unsafeMetadata?.role === "candidate"
          ? "My Applications"
          : "My Jobs"}
      </h1>
      {user?.unsafeMetadata?.role === "candidate" ? (
        <CreatedApplication />
      ) : (
        <CreatedJob />
      )}
    </div>
  );
}

export default MyJobs;
