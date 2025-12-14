document.addEventListener('DOMContentLoaded', function() {
    // Check for user login (kept from original code for functionality)
    if (!localStorage.getItem("currentUser")) {
        // Assuming your 'index.html' is the login page
        window.location.href = "index.html"; 
        return; 
    }
    
    // Load user data
    let user = JSON.parse(localStorage.getItem("currentUser"));

    // --- DOM REFERENCES ---
    const nameElement = document.getElementById("name");
    const emailElement = document.getElementById("email");
    const useridElement = document.getElementById("userid");
    const profilePicElement = document.getElementById("profilePic");
    const fileUploadInput = document.getElementById("fileUpload");

    // --- INITIAL DATA LOAD ---
    if (user) {
        nameElement.innerText = (user.fname || '') + " " + (user.lname || '');
        emailElement.innerText = user.email || 'N/A';
        useridElement.innerText = user.id || 'N/A';
        
        // Load profile photo if exists
        if (user.photo) {
            profilePicElement.src = user.photo;
        }
    }


    // --- FUNCTIONALITY ---

    /**
     * Handles the file upload event, reads the image, updates the UI,
     * and saves the Data URL to Local Storage for persistence.
     */
    window.uploadPhoto = function(event) {
        let file = event.target.files[0];
        
        if (!file || !file.type.startsWith('image/')) {
            alert("Please select a valid image file.");
            return;
        }

        // Optional: Add basic file size check (e.g., max 2MB)
        if (file.size > 2 * 1024 * 1024) {
             alert("File size exceeds 2MB limit.");
             fileUploadInput.value = ""; // Clear file input
             return;
        }

        let reader = new FileReader();

        reader.onload = function () {
            // 1. Update UI
            profilePicElement.src = reader.result;
            
            // 2. Update user object
            user.photo = reader.result;

            // 3. Update current user in Local Storage
            localStorage.setItem("currentUser", JSON.stringify(user));

            // 4. Update the global users array (assuming 'users' array exists)
            let users = JSON.parse(localStorage.getItem("users"));
            if (users && Array.isArray(users)) {
                users = users.map(u => u.email === user.email ? user : u);
                localStorage.setItem("users", JSON.stringify(users));
            }
            
            alert("Profile photo updated successfully!");
        };

        reader.readAsDataURL(file);
    };
    
    // Attach the file change event to the global function
    // This is already done inline in the HTML: onchange="uploadPhoto(event)"
});