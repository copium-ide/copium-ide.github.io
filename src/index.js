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
function init() {
    const register = document.getElementById("register");
    const login = document.getElementById("login");
    const emailInput = document.getElementById("email");
    const passInput = document.getElementById("password");
    const email = emailInput.value;
    const password = passInput.value;
    register.addEventListener("click", function () {
        register(email, password);
    });
    login.addEventListener("click", function () {
        login(email, password);
    });
}
init();

