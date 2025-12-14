document.addEventListener('DOMContentLoaded', function() {
    // --- UI ELEMENTS ---
    const addResourceBtn = document.getElementById('addResourceBtn');
    const modal = document.getElementById('modal');
    const closeModalBtn = document.getElementById('closeModal');
    const saveResourceBtn = document.getElementById('saveResource');
    const resourceListContainer = document.getElementById('resourceList');
    const emptyState = document.getElementById('emptyState');
    const fileNameDisplay = document.getElementById('fileNameDisplay');

    // --- FORM ELEMENTS ---
    const formInputs = {
        title: document.getElementById('resTitle'),
        subject: document.getElementById('resSubject'),
        file: document.getElementById('resFile')
    };

    // Initialize the resources array (Load from local storage with error handling)
    let resources = [];
    try {
        resources = JSON.parse(localStorage.getItem('learning365Resources')) || [];
    } catch (e) {
        console.error("Error loading resources from local storage:", e);
        resources = [];
    }

    // --- LOGIC FUNCTIONS ---

    /**
     * Toggles the visibility between the empty state and the resource list.
     */
    function updateResourceListVisibility() {
        if (resources.length === 0) {
            emptyState.style.display = 'block';
            resourceListContainer.style.display = 'none';
        } else {
            emptyState.style.display = 'none';
            resourceListContainer.style.display = 'grid'; // Use grid for card display
            renderResources();
        }
    }
    
    /**
     * Helper to get the correct icon class based on file extension (for display purposes).
     */
    function getFileIcon(fileName) {
        const ext = fileName.split('.').pop().toLowerCase();
        switch (ext) {
            case 'pdf': return 'fas fa-file-pdf';
            case 'doc':
            case 'docx': return 'fas fa-file-word';
            case 'xls':
            case 'xlsx': return 'fas fa-file-excel';
            case 'ppt':
            case 'pptx': return 'fas fa-file-powerpoint';
            case 'zip':
            case 'rar': return 'fas fa-file-archive';
            case 'jpg':
            case 'png':
            case 'jpeg': return 'fas fa-file-image';
            default: return 'fas fa-file';
        }
    }

    /**
     * Renders all resources from the 'resources' array into the UI.
     */
    function renderResources() {
        resourceListContainer.innerHTML = ''; // Clear existing content

        resources.forEach(resourceData => {
            const card = document.createElement('div');
            card.className = `resource-card`;
            
            const fileIcon = getFileIcon(resourceData.fileName);
            
            // NOTE: The link is now a placeholder (#) because we are not saving the actual file content.
            // In production, this link would be the URL to the uploaded file on your server.
            const downloadLink = '#'; 

            card.innerHTML = `
                <div class="card-icon"><i class="${fileIcon}"></i></div>
                <div class="card-info">
                    <h3 class="resource-title-card">${resourceData.title}</h3>
                    <span class="resource-subject"><i class="fas fa-tag"></i> Subject: ${resourceData.subject}</span>
                    <span class="resource-date"><i class="fas fa-calendar-alt"></i> Added: ${resourceData.dateAdded}</span>
                </div>
                <a href="${downloadLink}" class="download-btn" target="_blank"><i class="fas fa-download"></i> Download</a>
            `;
            resourceListContainer.appendChild(card);
        });
    }

    /**
     * Clears all input fields and resets the file display.
     */
    function clearForm() {
        formInputs.title.value = '';
        formInputs.subject.value = '';
        formInputs.file.value = ''; // Clear file input
        fileNameDisplay.textContent = 'No file chosen';
    }

    // --- EVENT HANDLERS ---

    // 1. File Input Change: Update the file name display (FIXED)
    formInputs.file.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            fileNameDisplay.textContent = file.name;
            // Removed the problematic CSS variable access for color. 
        } else {
            fileNameDisplay.textContent = 'No file chosen';
        }
    });

    // 2. Modal Open
    addResourceBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
    });

    // 3. Modal Close
    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        clearForm();
    });

    // 4. Save Resource (Simplified and Fixed Logic)
    saveResourceBtn.addEventListener('click', () => {
        const title = formInputs.title.value.trim();
        const subject = formInputs.subject.value.trim();
        const file = formInputs.file.files[0];

        // Basic Validation
        if (!title || !subject || !file) {
            alert('Please fill in the Resource Title, Subject, and select a File.');
            return;
        }

        // Gather data to save (only metadata, not content)
        const newResource = {
            title: title,
            subject: subject,
            fileName: file.name,
            dateAdded: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
        };

        // Add to array
        resources.push(newResource);

        // Update Local Storage
        localStorage.setItem('learning365Resources', JSON.stringify(resources));

        // Update UI
        updateResourceListVisibility(); 
        
        // Final Steps
        modal.style.display = 'none';
        clearForm();
    });

    // --- INITIALIZATION ---
    updateResourceListVisibility(); // Load initial state on page load
});