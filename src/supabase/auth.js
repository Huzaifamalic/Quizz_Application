import { supabase } from "./client";

export const getUser = async () => {
  const { data } = await supabase.auth.getUser();
  return data.user;
};
