import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bmkocgtuwuwdoakptqan.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJta29jZ3R1d3V3ZG9ha3B0cWFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2NDk1NzAsImV4cCI6MjA2MDIyNTU3MH0.Hi5KxIT8T9jED2JbHO25TcdUcBFDfCPHgPxOttjezEo';
const supabase = createClient(supabaseUrl, supabaseKey);



async function handleSignInWithGoogle(response) {
      console.log("signin completed");
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: 'google',
        token: response.credential,
      })
      if (error) {
        console.log(error);
      }
    }

async function register(info) {
    const { data, error } = await supabase.auth.signUp({
    email: info.email,
    password: info.password,
    options: {
      emailRedirectTo: 'https://copium-ide.github.io',
    },
  });
    console.log(data, error);
}
async function login(info) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: info.email,
    password: info.password,
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

function getInfo() {
  
      
      const emailInput = document.getElementById("email");
      const passInput = document.getElementById("password");
    
      const email = emailInput.value;
      const password = passInput.value;
      return {'email': email,'password': password};
}



function init() {
      const googleButton = document.getElementById("google");
      const logoutButton = document.getElementById("logout");
      const registerButton = document.getElementById("register");
      const loginButton = document.getElementById("login");
    
    logoutButton.addEventListener("click", function (e) {
        signOut();
    });
    googleButton.addEventListener("click", function (e) {
        google();
    });
    registerButton.addEventListener("click", function (e) {
        register(getInfo());
    });
    loginButton.addEventListener("click", function (e) {
        login(getInfo());
    });
}
init();

let profileContainer = null;
let userAvatar = null;
let userName = null;
let userEmail = null;

// --- 3. Function to Create Profile UI Elements ---
function createProfileDisplayElements(containerId) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Profile container element with ID '${containerId}' not found.`);
    return null;
  }
  profileContainer = container;

  // Clear loading message or previous content
  profileContainer.innerHTML = '';

  // Create elements for displaying user info
  userAvatar = document.createElement('img');
  userAvatar.id = 'user-avatar';
  userAvatar.alt = 'User Avatar';
  // Don't append yet, wait until we know user exists

  userName = document.createElement('p');
  userName.id = 'user-name';

  userEmail = document.createElement('p');
  userEmail.id = 'user-email';

  return profileContainer; // Return the container element
}

// --- 4. Function to Display User Profile Data ---
function displayUserProfile(user) {
  if (!profileContainer) {
    console.error("Profile container not initialized.");
    return;
  }

  // Clear previous content before adding new or message
  profileContainer.innerHTML = '';
  profileContainer.classList.remove('visible', 'no-user'); // Reset classes

  if (user) {
    // --- User is Logged In ---
    console.log("Displaying profile for user:", user);

    // Get profile info (handle potential missing fields)
    const profile = user.user_metadata || {};
    const name = profile?.full_name || profile?.name || 'Name not provided';
    const avatarUrl = profile?.avatar_url || profile?.picture || 'default-avatar.png'; // Provide a fallback
    const email = user.email || 'Email not provided';

    // Set element content
    userAvatar.src = avatarUrl;
    userName.textContent = `${name}`; // Display just the name or add "Name: " prefix if preferred
    userEmail.textContent = `${email}`; // Display just the email or add "Email: " prefix

    // Append elements to the container
    profileContainer.appendChild(userAvatar);
    profileContainer.appendChild(userName);
    profileContainer.appendChild(userEmail);

    // Make the container visible
    profileContainer.classList.add('visible');

  } else {
    // --- No User Found ---
    console.log("No user session found. Cannot display profile.");
    profileContainer.textContent = 'You are not logged in.';
    profileContainer.classList.add('no-user'); // Add class for specific styling if needed
  }
}

// --- 5. Auth State Listener (Optional but Recommended) ---
// This handles cases where the auth state might change AFTER initial load,
// e.g., if the token expires and can't be refreshed, or if metadata updates.
supabase.auth.onAuthStateChange((event, session) => {
  console.log(`Supabase Auth Event (Display Only): ${event}`);

  // We only care about the final user state here
  const currentUser = session?.user ?? null;
  displayUserProfile(currentUser);
});

// --- 6. Initial Load Logic ---
document.addEventListener('DOMContentLoaded', () => {
  // Find the container and create the elements within it
  const containerElement = createProfileDisplayElements('user-profile-container');

  if (containerElement) {
    // Check the current session state when the page loads
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error("Error getting initial session:", error.message);
        displayUserProfile(null); // Show not logged in on error
      } else {
        console.log('Initial session check complete.');
        // Display profile based on whether a session exists
        // The onAuthStateChange listener might fire immediately after this
        // anyway, but calling displayUserProfile here ensures the UI updates
        // promptly based on the initial check result.
        displayUserProfile(session?.user ?? null);
      }
    }).catch(err => {
      console.error("Catch: Failed to get initial session:", err);
      displayUserProfile(null); // Show not logged in on failure
    });
  } else {
      // Handle case where the container wasn't found
      console.error("Profile container div not found in HTML.");
      // Optionally display an error message elsewhere in the body
      // document.body.insertAdjacentHTML('afterbegin', '<p style="color: red;">Error: Profile container not found!</p>');
  }
});

