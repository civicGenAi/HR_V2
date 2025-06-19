import suparbaseClient, { supabaseUrl } from "../../utils/supabase";

export async function applyToJobs(token, _, jobData) {
  const supabase = await suparbaseClient(token);

  const random = Math.floor(Math.random() * 10000);
  const fileName = `resume-${random}-${jobData.candidate_id}`;

  const { error: storageError } = await supabase.storage
    .from("resumes")
    .upload(fileName, jobData.resume);

  if (storageError) {
    console.log("Error while storing the resume:", storageError);
    return null;
  }

  const resume = `${supabaseUrl}/storage/v1/object/public/resumes/${fileName}`;
  const { data, error } = await supabase
    .from("applications")
    .insert([
      {
        ...jobData,
        resume,
      },
    ])
    .select();

  if (error) {
    console.log("Error while submitting applications:", error);
    return null;
  }

  return data;
}

export async function updateApplications(token, { job_id }, status) {
  const supabase = await suparbaseClient(token);

  const { data, error } = await supabase
    .from("applications")
    .update({ status })
    .eq("job_id", job_id)
    .select();

  if (error || data.length === 0) {
    console.log("Error while updating application status :", error);
    return null;
  }
  return data;
}



export async function getApplications(token, { user_id }) {
  const supabase = await suparbaseClient(token);

  const { data, error } = await supabase
    .from("applications")
    .select("*, jobs:jobs(title, company:companies(name))")
    .eq("candidate_id", user_id);

  if (error || data.length === 0) {
    console.log("Error while fetching applications  :", error);
    return null;
  }
  return data;
}



