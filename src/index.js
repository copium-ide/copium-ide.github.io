// Ensure you have installed the package: npm install @supabase/supabase-js
import { createClient } from '@supabase/supabase-js';

// --- Configuration ---
const supabaseUrl = 'https://bmkocgtuwuwdoakptqan.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJta29jZ3R1d3V3ZG9ha3B0cWFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2NDk1NzAsImV4cCI6MjA2MDIyNTU3MH0.Hi5KxIT8T9jED2JbHO25TcdUcBFDfCPHgPxOttjezEo';
const supabase = createClient(supabaseUrl, supabaseKey);

async function insertData() {
    console.log("Attempting to insert data into 'test' table...");

    try {
        // Best practice: Let the database handle the primary key ('id') if it's auto-incrementing.
        // Only include columns you need to explicitly set.
        const { data, error } = await supabase
            .from('test')
            .insert([
                { name: 'Example Data' }
            ])
            .select(); // Optional: Returns the inserted row(s). Remove if not needed.

        if (error) {
            console.error('Error inserting data:');
            console.error('Status:', error.code || 'N/A'); // e.g., '42501' for permission denied
            console.error('Message:', error.message);
            console.error('Details:', error.details);
            console.error('Hint:', error.hint);

        } else {
            console.log('Data inserted successfully!');
            console.log('Inserted Record(s):', JSON.stringify(data, null, 2));
        }
    } catch (catchError) {
        console.error('Caught unexpected runtime error:', catchError);
    }
}

insertData();
