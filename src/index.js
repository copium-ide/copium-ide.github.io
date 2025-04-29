import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bmkocgtuwuwdoakptqan.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJta29jZ3R1d3V3ZG9ha3B0cWFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2NDk1NzAsImV4cCI6MjA2MDIyNTU3MH0.Hi5KxIT8T9jED2JbHO25TcdUcBFDfCPHgPxOttjezEo';
const supabase = createClient(supabaseUrl, supabaseKey);

async function register(email, password) {
    const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      emailRedirectTo: 'https://copium-ide.github.io',
    },
  });
}
async function login(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  })
}
async function changePassword(password) {
    await supabase.auth.updateUser({ password: password })
}
