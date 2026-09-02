document.addEventListener('DOMContentLoaded', () => {
    const step1 = document.getElementById('step-1');
    const stepUnqualified = document.getElementById('step-unqualified');
    const step3 = document.getElementById('step-3');
    const stepSuccess = document.getElementById('step-success');
    const currentStepName = document.getElementById('current-step-name');

    const btnNextStep1 = document.getElementById('btn-next-step1');
    const btnPrevUnqualified = document.getElementById('btn-prev-unqualified');
    
    const salesRange = document.getElementById('sales-range');
    const adSpendRange = document.getElementById('ad-spend-range');

    // Show/Hide steps
    function showStep(stepElement, stepName) {
        document.querySelectorAll('.funnel-step').forEach(step => {
            step.classList.remove('active');
        });
        stepElement.classList.add('active');
        currentStepName.textContent = stepName;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Qualification Logic
    btnNextStep1.addEventListener('click', () => {
        if (!salesRange.value || !adSpendRange.value) {
            alert('Please select both your sales range and ad spend range.');
            return;
        }

        const qualifiedSales = ['600k-1m', '1m-3m', '3m-5m', 'above-5m'];
        const qualifiedSpend = ['100k-200k', '200k-400k', 'above-500k'];

        const isQualified = qualifiedSales.includes(salesRange.value) && qualifiedSpend.includes(adSpendRange.value);

        if (isQualified) {
            showStep(step3, 'Discovery Call');
        } else {
            showStep(stepUnqualified, 'Not Qualified Yet');
        }
    });

    btnPrevUnqualified.addEventListener('click', () => {
        showStep(step1, 'Getting Started');
    });

    // File Upload Preview
    const fileInput = document.getElementById('screenshot');
    const filePreview = document.getElementById('file-name-preview');
    const dropArea = document.getElementById('file-drop-area');

    fileInput.addEventListener('change', function() {
        if (this.files && this.files[0]) {
            filePreview.textContent = 'Selected file: ' + this.files[0].name;
        } else {
            filePreview.textContent = '';
        }
    });

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults (e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, () => dropArea.classList.add('dragover'), false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, () => dropArea.classList.remove('dragover'), false);
    });

    dropArea.addEventListener('drop', function(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        fileInput.files = files;
        if (files[0]) {
            filePreview.textContent = 'Selected file: ' + files[0].name;
        }
    });

    // Date generation for next 14 available days (skipping Fridays)
    const datePickerGrid = document.getElementById('date-picker-grid');
    const selectedDateInput = document.getElementById('selected-date');
    const dateError = document.getElementById('date-error');

    function generateDates() {
        let datesAdded = 0;
        let currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 1); // Start from tomorrow

        while (datesAdded < 14) {
            // Skip Fridays (5)
            if (currentDate.getDay() !== 5) {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'date-btn';
                
                const month = currentDate.toLocaleString('default', { month: 'short' });
                const day = currentDate.getDate();
                const dayName = currentDate.toLocaleString('default', { weekday: 'short' });
                
                const dateString = `${dayName}, ${month} ${day}`;
                btn.textContent = dateString;
                btn.dataset.date = currentDate.toISOString();
                
                btn.addEventListener('click', function() {
                    document.querySelectorAll('.date-btn').forEach(b => b.classList.remove('selected'));
                    this.classList.add('selected');
                    selectedDateInput.value = this.dataset.date;
                    dateError.style.display = 'none';
                });
                
                datePickerGrid.appendChild(btn);
                datesAdded++;
            }
            currentDate.setDate(currentDate.getDate() + 1);
        }
    }

    generateDates();

    // Form Submission
    const discoveryForm = document.getElementById('discovery-form');
    discoveryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (!selectedDateInput.value) {
            dateError.style.display = 'block';
            return;
        }

        // Frontend only success message
        showStep(stepSuccess, 'Success');
    });
});
