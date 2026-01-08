import { createClient } from "@supabase/supabase-js";


const supabaseUrl = "https://yzfkfbgumgijdemntrzw.supabase.co";
const supabaseAnonKey = "sb_publishable_1OTbwJqGj4ia12r-mxwPVw_9vhVGqKR";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
