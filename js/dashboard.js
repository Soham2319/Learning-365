document.addEventListener('DOMContentLoaded', function() {
    // --- 1. SIDEBAR AND HAMBURGER MENU LOGIC ---
    
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

    // --- 2. DYNAMIC WELCOME GREETING LOGIC ---

    /**
     * Updates the welcome greeting with the logged-in user's name.
     * @param {string} name - The full name of the user (e.g., "anubhav samanta").
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
                
            userNameElement.textContent = formattedName;
        }
    }

    // --- 3. EXECUTION: CALLING THE GREETING FUNCTION ---
    
    // IMPORTANT: In a real application, you must replace the hardcoded string 
    // below with the actual user name retrieved from your server/session data 
    // when the page loads after login.
    
    // Example User Name (replace this with your backend variable)
    const loggedInUserName = "anubhav samanta"; 

    // Call the function to update the dashboard greeting
    updateWelcomeGreeting(loggedInUserName);
});