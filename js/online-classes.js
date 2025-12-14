document.addEventListener('DOMContentLoaded', function() {
    // --- UI ELEMENTS ---
    const addClassBtn = document.getElementById('addClassBtn');
    const modal = document.getElementById('modal');
    const closeModalBtn = document.getElementById('closeModal');
    const saveClassBtn = document.getElementById('saveClass');
    const classListContainer = document.getElementById('classList');
    const emptyState = document.getElementById('emptyState');

    // --- FORM ELEMENTS ---
    const formInputs = {
        title: document.getElementById('classTitle'),
        teacher: document.getElementById('classTeacher'),
        link: document.getElementById('classLink'),
        startDate: document.getElementById('startDate'),
        startTime: document.getElementById('startTime'),
        startMeridiem: document.getElementById('startMeridiem'),
        endDate: document.getElementById('endDate'),
        endTime: document.getElementById('endTime'),
        endMeridiem: document.getElementById('endMeridiem')
    };

    // Initialize the classes array (to store added classes)
    // Try to load existing classes from local storage, or start with an empty array
    let classes = JSON.parse(localStorage.getItem('learning365Classes')) || [];

    // --- LOGIC FUNCTIONS ---

    /**
     * Toggles the visibility between the empty state and the class list.
     */
    function updateClassListVisibility() {
        if (classes.length === 0) {
            emptyState.style.display = 'block';
            classListContainer.style.display = 'none';
        } else {
            emptyState.style.display = 'none';
            classListContainer.style.display = 'grid'; // Use grid for card display
            renderClasses();
        }
    }

    /**
     * Renders all classes from the 'classes' array into the UI.
     */
    function renderClasses() {
        classListContainer.innerHTML = ''; // Clear existing content

        classes.forEach(classData => {
            const card = document.createElement('div');
            card.className = 'class-card';

            // Determine if the class is starting today/soon (Basic check for demo)
            const classDate = new Date(classData.startDate);
            const today = new Date();
            const statusText = (classDate.toDateString() === today.toDateString()) ? 'LIVE' : 'SCHEDULED';
            const statusClass = (statusText === 'LIVE') ? 'live' : 'scheduled';

            card.innerHTML = `
                <div class="class-header">
                    <span class="status ${statusClass}">${statusText}</span>
                </div>
                <h3 class="class-title-card">${classData.title}</h3>
                <p class="class-teacher"><i class="fas fa-user-tie"></i> Taught by: ${classData.teacher}</p>
                <div class="class-schedule">
                    <span class="schedule-item"><i class="fas fa-calendar-alt"></i> Starts: ${new Date(classData.startDate).toLocaleDateString()}</span>
                    <span class="schedule-item"><i class="fas fa-clock"></i> Time: ${classData.startTime} ${classData.startMeridiem} - ${classData.endTime} ${classData.endMeridiem}</span>
                </div>
                <a href="${classData.link}" target="_blank" class="join-btn"><i class="fas fa-video"></i> Join Class</a>
            `;
            classListContainer.appendChild(card);
        });
    }

    /**
     * Clears all input fields in the modal form.
     */
    function clearForm() {
        Object.values(formInputs).forEach(input => {
            if (input.tagName === 'SELECT') {
                input.value = 'AM';
            } else {
                input.value = '';
                // Reset text input type for placeholder effect if needed
                if (input.type === 'date' || input.type === 'time') {
                     input.type = 'text';
                }
            }
        });
    }

    // --- EVENT HANDLERS ---

    // 1. Modal Open
    addClassBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
    });

    // 2. Modal Close
    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        clearForm(); // Optionally clear form on cancel
    });

    // 3. Save Class (The core logic)
    saveClassBtn.addEventListener('click', () => {
        // Basic Validation: Check if key fields are filled
        if (!formInputs.title.value || !formInputs.teacher.value || !formInputs.startDate.value || !formInputs.startTime.value) {
            alert('Please fill in at least the Class Title, Teacher, Start Date, and Start Time.');
            return;
        }

        // Gather all data
        const newClass = {
            title: formInputs.title.value,
            teacher: formInputs.teacher.value,
            link: formInputs.link.value || '#', // Use '#' if link is empty
            startDate: formInputs.startDate.value,
            startTime: formInputs.startTime.value,
            startMeridiem: formInputs.startMeridiem.value,
            endDate: formInputs.endDate.value,
            endTime: formInputs.endTime.value,
            endMeridiem: formInputs.endMeridiem.value,
        };

        // Add to array
        classes.push(newClass);

        // Update Local Storage
        localStorage.setItem('learning365Classes', JSON.stringify(classes));

        // Update UI
        updateClassListVisibility(); 
        
        // Final Steps
        modal.style.display = 'none';
        clearForm();
    });

    // --- INITIALIZATION ---
    updateClassListVisibility(); // Load initial state on page load
});