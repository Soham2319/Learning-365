document.addEventListener('DOMContentLoaded', function() {
    // --- UI ELEMENTS ---
    const startExamBtn = document.getElementById('startExam');
    const historyList = document.getElementById('historyList');
    const historyEmptyState = document.getElementById('historyEmptyState');

    // Initialize the history array (Load from local storage with error handling)
    let examHistory = [];
    try {
        examHistory = JSON.parse(localStorage.getItem('learning365ExamHistory')) || [];
    } catch (e) {
        console.error("Error loading exam history from local storage:", e);
        examHistory = [];
    }

    // --- LOGIC FUNCTIONS ---

    /**
     * Toggles the visibility between the empty state and the history list.
     */
    function updateHistoryVisibility() {
        if (examHistory.length === 0) {
            historyEmptyState.style.display = 'list-item'; // Show the empty list item
        } else {
            historyEmptyState.style.display = 'none';
            renderExamHistory();
        }
    }

    /**
     * Renders all exams from the 'examHistory' array into the UI.
     */
    function renderExamHistory() {
        // Clear history list but keep the empty state element for control
        historyList.querySelectorAll('.history-item').forEach(item => item.remove()); 

        examHistory.forEach(exam => {
            const item = document.createElement('li');
            
            const isPassed = exam.score >= 70; // Example passing score
            const statusLabelText = isPassed ? 'Passed' : 'Failed';
            const statusClass = isPassed ? 'passed' : 'failed';

            item.className = 'history-item';
            item.innerHTML = `
                <div class="score-badge">${exam.score}%</div>
                <div class="history-details">
                    <span class="exam-name">${exam.name}</span>
                    <span class="exam-date"><i class="fas fa-calendar-alt"></i> Date: ${exam.date}</span>
                </div>
                <span class="status-label ${statusClass}">${statusLabelText}</span>
            `;
            historyList.appendChild(item);
        });
    }

    /**
     * Simulate a new exam attempt and save it.
     */
    function simulateExam() {
        // --- DEMO DATA GENERATION ---
        const examNames = ["Basic Concepts", "Intermediate Topics", "Advanced Assessment", "Final Review"];
        const randomScore = Math.floor(Math.random() * 100) + 1;
        const randomName = examNames[Math.floor(Math.random() * examNames.length)];
        
        const newAttempt = {
            id: Date.now(),
            name: randomName,
            score: randomScore,
            date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
        };

        // Add to history (prepend latest attempt to the top)
        examHistory.unshift(newAttempt); 

        // Update Local Storage
        localStorage.setItem('learning365ExamHistory', JSON.stringify(examHistory));

        // Update UI
        updateHistoryVisibility();
        
        // Optional: Alert the user (for demo purposes)
        alert(`Exam complete! Your simulated score for "${newAttempt.name}" is ${newAttempt.score}%.`);
    }

    // --- EVENT HANDLERS ---
    
    // 1. Start Exam Button
    startExamBtn.addEventListener('click', () => {
        // In a real app, this would redirect to the exam taking page.
        // For this demo, we simulate the result instantly.
        simulateExam();
    });

    // --- INITIALIZATION ---
    updateHistoryVisibility(); // Load initial state on page load
});