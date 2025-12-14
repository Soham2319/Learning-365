document.addEventListener('DOMContentLoaded', function() {
    
    // --- 0. LOGIN GUARD AND USER RETRIEVAL ---
    
    let user = null;
    try {
        const userString = localStorage.getItem("currentUser");
        if (!userString) {
            // If currentUser is missing, redirect to login
            window.location.href = "index.html"; 
            return; // Stop execution if no user is found
        }
        user = JSON.parse(userString);
    } catch (e) {
        console.error("Error parsing user data:", e);
        // Clear corrupt data and redirect
        localStorage.removeItem("currentUser");
        window.location.href = "index.html";
        return;
    }

    // --- 1. SIDEBAR AND HAMBURGER MENU LOGIC (Existing Code) ---
    
    const sidebar = document.getElementById('sidebar');
    const hamburger = document.getElementById('hamburger');
    const overlay = document.getElementById('overlay');

    /**
     * Toggles the sidebar visibility and overlay state.
     */
    function toggleSidebar() {
        sidebar.classList.toggle('open'); 
        overlay.classList.toggle('active');
    }

    // Event listeners to open/close the sidebar
    if (hamburger) {
        hamburger.addEventListener('click', toggleSidebar);
    }
    if (overlay) {
        overlay.addEventListener('click', toggleSidebar);
    }
    
    // Auto-close sidebar on larger screens if window is resized while sidebar is open
    window.addEventListener('resize', function() {
        if (window.innerWidth > 1024) {
            sidebar.classList.remove('open');
            overlay.classList.remove('active');
        }
    });

    // --- 2. DYNAMIC WELCOME GREETING LOGIC (Modified) ---

    /**
     * Updates the welcome greeting with the logged-in user's name.
     * @param {string} name - The full name of the user.
     */
    function updateWelcomeGreeting(name) {
        const userNameElement = document.getElementById('userNamePlaceholder');
        
        if (userNameElement && name) {
            // This logic cleans up the name (e.g., "anubhav samanta" -> "Anubhav Samanta")
            const formattedName = name
                .trim()
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                .join(' ');
                
            // Assuming your placeholder is in an element that needs its text content updated
            userNameElement.textContent = formattedName; 
        }
    }

    // --- 3. LOGOUT FUNCTIONALITY (NEW - GLOBAL) ---
    
    /**
     * Executes the logout process.
     * Note: This function is attached to the global window object 
     * so it can be called directly from the HTML's onclick attribute.
     */
    window.logout = function() {
        localStorage.removeItem("currentUser");
        // Redirect to the login page
        window.location.href = "index.html";
    }

    // --- 4. EXECUTION: CALLING THE GREETING FUNCTION (Fixed) ---
    
    if (user) {
        // Use the user's first and last name from the stored user object
        const loggedInUserName = `${user.fname || ''} ${user.lname || ''}`; 
        
        // Call the function to update the dashboard greeting
        updateWelcomeGreeting(loggedInUserName);
        
        // Optional: If you have a separate profile picture element, update it here:
        // document.getElementById('profilePicSidebar').src = user.photo || 'default-avatar.png';
    }
    
    // Attach logout function to a sidebar link/button if needed (e.g., id="logoutLink")
    const logoutLink = document.getElementById('logoutLink'); 
    if (logoutLink) {
        logoutLink.addEventListener('click', window.logout);
    }
});