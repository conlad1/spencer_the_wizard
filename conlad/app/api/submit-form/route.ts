import { NextRequest, NextResponse } from "next/server";

/**
 * API Route Handler for Form Submissions
 * 
 * In Next.js App Router, API routes are created by exporting functions named
 * after HTTP methods (GET, POST, PUT, DELETE, etc.) from a route.ts file.
 * 
 * This route handles POST requests to /api/submit-form
 */
export async function POST(request: NextRequest) {
  try {
    // Parse the JSON body from the request
    // The request body contains the form data we sent from the frontend
    const body = await request.json();
    
    // Extract the form fields
    const { name, email, message } = body;

    // Print the form data to the command line (server console)
    console.log("\n=== FORM SUBMISSION RECEIVED ===");
    console.log("Timestamp:", new Date().toISOString());
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Message:", message);
    console.log("================================\n");

    // Return a success response
    // NextResponse.json() creates a JSON response with the appropriate headers
    return NextResponse.json(
      { 
        success: true, 
        message: "Form submitted successfully",
        receivedData: { name, email, message }
      },
      { status: 200 } // HTTP 200 = OK
    );
  } catch (error) {
    // If something goes wrong (e.g., invalid JSON), return an error
    console.error("Error processing form submission:", error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: "Error processing form submission" 
      },
      { status: 500 } // HTTP 500 = Internal Server Error
    );
  }
}

