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
    console.log(data, error);
}
async function login(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
    console.log(data, error);
}
async function changePassword(password) {
    await supabase.auth.updateUser({ password: password })
}
async function google() {
    supabase.auth.signInWithOAuth({
      provider: 'google',
    })
}
async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Error signing out:', error.message);
  } else {
     console.log('User signed out successfully.');
    // The onAuthStateChange listener will handle UI updates for SIGNED_OUT
    // Or call clearUserProfile() directly if not using the listener
  }
}
function init() {
    const registerButton = document.getElementById("register");
    const loginButton = document.getElementById("login");
    const emailInput = document.getElementById("email");
    const passInput = document.getElementById("password");
    const email = emailInput.value;
    const password = passInput.value;
    const googleButton = document.getElementById("google");
    const logoutButton = document.getElementById("logout");
    logoutButton.addEventListener("click", function (e) {
        logout();
    });
    googleButton.addEventListener("click", function (e) {
        google();
    });
    registerButton.addEventListener("click", function (e) {
        register(email, password);
    });
    loginButton.addEventListener("click", function (e) {
        login(email, password);
    });
}
init();

