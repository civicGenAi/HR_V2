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
