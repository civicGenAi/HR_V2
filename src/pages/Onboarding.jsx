import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";

function Onboarding() {
  const { user, isLoaded } = useUser();

  const navigate = useNavigate();

  const handleRoleSelection = async (role) => {
    await user
      .update({
        unsafeMetadata: { role },
      })
      .then(() => {
        navigate(role === "recruter" ? "/post-job" : "/jobs");
      })
      .catch((err) => {
        console.error("Error updating role", err);
      });
  };

  useEffect(() => {
    if (user?.unsafeMetadata?.role) {
      navigate(
        user?.unsafeMetadata?.role === "recruter" ? "/post-job" : "/jobs"
      );
    }
  }, [user]);

  if (!isLoaded) {
    return <BarLoader className='mb-4' width={"100%"} color='#23312EFF' />;
  }
  return (
    <div className='flex flex-col items-center justify-center mt-32'>
      <h2 className='font-extrabold text-7xl sm:text-8xl tracking-tighter'>
        I am a ...
      </h2>
      <div className='mt-16 grid grid-cols-2 gap-4 w-full md:px-40'>
        <Button
          variant='default'
          className='h-36 text-2xl'
          onClick={() => handleRoleSelection("candidate")}>
          Candidate
        </Button>
        <Button
          className='bg-[#157347] text-white hover:bg-[#12623c] h-36 text-2xl'
          onClick={() => handleRoleSelection("recruter")}>
          Recruiter
        </Button>
      </div>
    </div>
  );
}

export default Onboarding;
