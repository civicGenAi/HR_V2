import suparbaseClient, { supabaseUrl } from "../../utils/supabase";

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

export async function addNewCompany(token, _, companyData) {
  const supabase = await suparbaseClient(token);

  const random = Math.floor(Math.random() * 10000);
  const fileName = `logo-${random}-${companyData.name}`;

  const { error: storageError } = await supabase.storage
    .from("company-logo")
    .upload(fileName, companyData.logo);

  if (storageError) {
    console.log("Error while uploading company logo:", storageError);
    return null;
  }

  const logo_url = `${supabaseUrl}/storage/v1/object/public/company-logo/${fileName}`;

  const { data, error } = await supabase
    .from("companies")
    .insert([
      {
        name: companyData.name,
        logo_url,
      },
    ])
    .select();

  if (error) {
    console.log("Error while submitting the compaies :", error);
    return null;
  }
  return data;
}
