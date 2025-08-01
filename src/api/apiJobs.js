import suparbaseClient from "../../utils/supabase";

export async function getJobs(token, { location, company_id, searchQuery }) {
  const supabase = await suparbaseClient(token);

  let query = supabase
    .from("jobs")
    .select("*, company:companies(name,logo_url), saved:saved_jobs(id)");

  if (location) {
    query = query.eq("location", location);
  }

  if (company_id) {
    query = query.eq("company_id", company_id);
  }

  if (searchQuery) {
    query = query.like("title", `%${searchQuery}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.log("Error fetching jobs:", error);
    return null;
  }

  return data;
}

export async function saveJob(token, { alreadySaved }, saveData) {
  const supabase = await suparbaseClient(token);

  if (alreadySaved) {
    const { data, error: deleteError } = await supabase
      .from("saved_jobs")
      .delete()
      .eq("job_id", saveData.job_id);

    if (deleteError) {
      console.log("Error deleting saved jobs:", error);
      return null;
    }

    return data;
  } else {
    const { data, error: deleteError } = await supabase
      .from("saved_jobs")
      .insert([saveData])
      .select();

    if (deleteError) {
      console.log("Error fetching jobs:", deleteError);
      return null;
    }

    return data;
  }
}



export async function addNewJob(token, _, jobData) {
  const supabase = await suparbaseClient(token);

  const { data, error } = await supabase
    .from("jobs")
    .insert([jobData])
    .select();

  if (error) {
    console.log("Error while creating job :", error);
    return null;
  }
  return data;
}

export async function getSavedJobs(token) {
  const supabase = await suparbaseClient(token);

  const { data, error } = await supabase
    .from("saved_jobs")
    .select("*, job:jobs(*, company:companies(name, logo_url))");

  if (error) {
    console.log("Error while Fetching saved Jobs:", error);
    return null;
  }
  return data;
}


export async function getMyJobs(token, { recruiter_id }) {
  const supabase = await suparbaseClient(token);

  const { data, error } = await supabase
    .from("jobs")
    .select("*, company:companies(name, logo_url)")
    .eq("recruiter_id", recruiter_id);

  if (error) {
    console.log("Error while Fetching jobs:", error);
    return null;
  }
  return data;
}

export async function deleteJobs(token, { job_id }) {
  const supabase = await suparbaseClient(token);

  const { data, error } = await supabase
    .from("jobs")
    .delete()
    .eq("id", job_id)
    .select();

  if (error) {
    console.log("Error while Deleting jobs:", error);
    return null;
  }
  return data;
}