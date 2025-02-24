// import { serve } from "https://deno.land/std@0.181.0/http/server.ts";
// import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// // Initialize Supabase client
// const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
// const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
// const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

// serve(async (req: Request) => {
//   // Simple content-type header is all we need
//   const headers = { "Content-Type": "application/json" };

//   try {
//     // Handle GET request - fetch messages
//     if (req.method === "GET") {
//       const { data, error } = await supabase.from("messages").select("*");

//       if (error) throw error;
//       return new Response(JSON.stringify(data), { headers });
//     }

//     // Handle POST request - add message
//     if (req.method === "POST") {
//       const { message } = await req.json();
//       const { error } = await supabase.from("messages").insert([{ message }]);

//       if (error) throw error;
//       return new Response(
//         JSON.stringify({ success: true, message: "Message sent!" }),
//         { headers }
//       );
//     }

//     // Handle unsupported methods
//     return new Response(JSON.stringify({ error: "Method not allowed" }), {
//       status: 405,
//       headers,
//     });
//   } catch (error) {
//     const errorMessage =
//       error instanceof Error ? error.message : "Unknown error";
//     return new Response(JSON.stringify({ error: errorMessage }), {
//       status: 500,
//       headers,
//     });
//   }
// });

import { serve } from "https://deno.land/std@0.181.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Initialize Supabase client
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

serve(async (req: Request) => {
  // Simple content-type header is all we need
  const headers = { "Content-Type": "application/json" };

  try {
    // Handle GET request - fetch all records
    if (req.method === "GET") {
      const { data, error } = await supabase
        .from("messages") // Ensure your table name is correct
        .select(
          "id, name, age, phone_number, email, date_of_birth, department, meal_preference, travelling_from"
        );

      if (error) throw error;
      return new Response(JSON.stringify(data), { headers });
    }

    // Handle POST request - insert a new record
    if (req.method === "POST") {
      // Extract only the required fields
      const {
        name,
        age,
        phone_number,
        email,
        date_of_birth,
        department,
        meal_preference,
        travelling_from,
      } = await req.json();

      // Insert into the correct table with all required fields
      const { error } = await supabase.from("messages").insert([
        {
          name,
          age,
          phone_number,
          email,
          date_of_birth,
          department,
          meal_preference,
          travelling_from,
        },
      ]);

      if (error) throw error;
      return new Response(
        JSON.stringify({
          success: true,
          message: "Record added successfully!",
        }),
        { headers }
      );
    }

    // Handle unsupported methods
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers,
    });
  }
});
