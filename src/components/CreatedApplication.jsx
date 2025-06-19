import { getApplications } from "@/api/apiApplications";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { BarLoader } from "react-spinners";
import ApplicationsCard from "./ApplicationsCard";

function CreatedApplication() {
  const { user } = useUser();
  const {
    loading: loadingApplications,
    data: applications,
    fn: fnApplications,
  } = useFetch(
    getApplications,
    {
      user_id: user.id,
    },
    []
  );

  useEffect(() => {
    fnApplications();
  }, [loadingApplications]);

  if (loadingApplications) {
    return <BarLoader className='mb-4' width={"100%"} color='#23312EFF' />;
  }
  return (
    <div className='flex flex-col gap-2.5'>
      {applications?.length > 0 ? (
        applications.map((application) => (
          <ApplicationsCard
            key={application.id}
            application={application}
            isCandidate
          />
        ))
      ) : (
        <p>No applications found.</p>
      )}
    </div>
  );
}

export default CreatedApplication;
