// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://algckmirlqmactjvnwlh.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFsZ2NrbWlybHFtYWN0anZud2xoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0ODYzNzksImV4cCI6MjA2MDA2MjM3OX0.bcGB9ziXrUW8EM55bi7FRGaLWGGwmc9-M5XcYtFEPtw";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);