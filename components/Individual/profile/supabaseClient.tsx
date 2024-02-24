import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://behfmqoilcgpyoobcuck.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJlaGZtcW9pbGNncHlvb2JjdWNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg1NjQ5NjYsImV4cCI6MjAyNDE0MDk2Nn0.sUkHtw15ul70rwuEARoJ4B-Mcilge2gbbo9eZyf53ak";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
