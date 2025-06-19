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
    console.log("Error while creating job job:", error);
    return null;
  }
  return data;
}