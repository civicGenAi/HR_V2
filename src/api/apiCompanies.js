import suparbaseClient from "../../utils/supabase";

export async function getCompanies(token) {
  const supabase = await suparbaseClient(token);

  const { data, error } = await supabase.from("companies").select("*");

  if (error) {
    console.log("Error while getting compaies :", error);
    return null;
  }
  return data;
}



export async function getSingleJob(token, { job_id }) {
  const supabase = await suparbaseClient(token);

  const { data, error } = await supabase
    .from("jobs")
    .select("*, company:companies(name, logo_url), applications(*)")
    .eq("id", job_id)
    .single();

  if (error) {
    console.log("Error while getting single job:", error);
    return null;
  }
  return data;
}

export async function updateHringStatus(token, { job_id }, isOpen) {
  const supabase = await suparbaseClient(token);

  const { data, error } = await supabase
    .from("jobs")
    .update({ isOpen })
    .eq("id", job_id)
    .select();

  if (error) {
    console.log("Error while updating job:", error);
    return null;
  }
  return data;
}
  
