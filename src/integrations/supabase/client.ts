// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://gfsjdhhvlcrctmvbqhqz.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdmc2pkaGh2bGNyY3RtdmJxaHF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4ODAxNzYsImV4cCI6MjA2NDQ1NjE3Nn0.x_b_leYnEqvwlqisroaBQdJOsKd7kAhYHxyozvvtAMU";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);