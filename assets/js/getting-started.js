document.addEventListener('DOMContentLoaded', () => {
    const step1 = document.getElementById('step-1');
    const stepUnqualified = document.getElementById('step-unqualified');
    const step3 = document.getElementById('step-3');
    const stepSuccess = document.getElementById('step-success');
    const currentStepName = document.getElementById('currentStepName');

    const btnNextStep1 = document.getElementById('btn-next-step1');
    const btnPrevUnqualified = document.getElementById('btn-prev-unqualified');
    
    const salesRange = document.getElementById('sales-range');
    const adSpendRange = document.getElementById('ad-spend-range');

    // Show/Hide steps
    function showStep(stepElement, stepName) {
        if (!stepElement) return;
        document.querySelectorAll('.funnel-step').forEach(step => {
            step.classList.remove('active');
        });
        stepElement.classList.add('active');
        if (currentStepName) currentStepName.textContent = stepName;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Next Step Button - Everyone goes to the Discovery Call form
    if (btnNextStep1) {
        btnNextStep1.addEventListener('click', () => {
            if (salesRange && adSpendRange && (!salesRange.value || !adSpendRange.value)) {
                alert('Please select both your sales range and ad spend range.');
                return;
            }
            // No qualification filter - all leads go to the discovery form
            showStep(step3, 'Discovery Call');
        });
    }

    if (btnPrevUnqualified) {
        btnPrevUnqualified.addEventListener('click', () => {
            showStep(step1, 'Getting Started');
        });
    }

    // File Upload Preview
    const fileInput = document.getElementById('screenshot');
    const filePreview = document.getElementById('file-name-preview');
    const dropArea = document.getElementById('file-drop-area');

    if (fileInput) {
        fileInput.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                filePreview.textContent = 'Selected file: ' + this.files[0].name;
            } else {
                filePreview.textContent = '';
            }
        });
    }

    if (dropArea) {
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, function(e) {
                e.preventDefault();
                e.stopPropagation();
            }, false);
        });

        ['dragenter', 'dragover'].forEach(eventName => {
            dropArea.addEventListener(eventName, () => dropArea.classList.add('dragover'), false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, () => dropArea.classList.remove('dragover'), false);
        });

        dropArea.addEventListener('drop', function(e) {
            const dt = e.dataTransfer;
            const files = dt.files;
            if (fileInput) fileInput.files = files;
            if (files[0]) {
                filePreview.textContent = 'Selected file: ' + files[0].name;
            }
        });
    }

    // Date generation for next 14 available days (skipping Fridays)
    const datePickerGrid = document.getElementById('date-picker-grid');
    const selectedDateInput = document.getElementById('selected-date');
    const dateError = document.getElementById('date-error');

    function generateDates() {
        let datesAdded = 0;
        let currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 1); // Start from tomorrow

        while (datesAdded < 14) {
            if (currentDate.getDay() !== 5) { // Skip Fridays
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'date-btn';
                
                const month = currentDate.toLocaleString('default', { month: 'short' });
                const day = currentDate.getDate();
                const dayName = currentDate.toLocaleString('default', { weekday: 'short' });
                
                btn.textContent = dayName + ', ' + month + ' ' + day;
                btn.dataset.date = currentDate.toISOString();
                btn.setAttribute('aria-pressed', 'false'); // Accessibility
                
                btn.addEventListener('click', function() {
                    document.querySelectorAll('.date-btn').forEach(b => {
                        b.classList.remove('selected');
                        b.setAttribute('aria-pressed', 'false');
                    });
                    this.classList.add('selected');
                    this.setAttribute('aria-pressed', 'true');
                    if (selectedDateInput) selectedDateInput.value = this.dataset.date;
                    if (dateError) dateError.style.display = 'none';
                });
                
                datePickerGrid.appendChild(btn);
                datesAdded++;
            }
            currentDate.setDate(currentDate.getDate() + 1);
        }
    }

    if (datePickerGrid) generateDates();

    // =============================================
    // Form Submission -> Google Sheets (Apps Script)
    // =============================================
        // Obfuscated webhook URL to prevent simple scraping
    const _0x1a = "aHR0cHM6Ly9zY3JpcHQuZ29vZ2xlLmNvbS9tYWNyb3Mvcy9BS2Z5Y2J4UTBNUlFpc0RyWjMwejBG";
    const _0x1b = "ajlPSXgwQ3RCb1FSSDJraXdTX0Fuc0RIQXBKNVNVZnNOUW1kUWNlSVB2RFMyUjZSVVkvZXhlYw==";
    const GOOGLE_SCRIPT_URL = atob(_0x1a + _0x1b);

    const discoveryForm = document.getElementById('discovery-form');

    if (discoveryForm) {
        discoveryForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.btn-submit');
            if (!submitBtn) return;
            const originalText = submitBtn.textContent;

            // Date validation (P0: prevent silent fail if hidden field is empty)
            const selectedDateBtn = this.querySelector('.date-btn.selected');
            if (!selectedDateBtn) {
                const dateError = document.getElementById('date-error');
                if (dateError) dateError.style.display = 'block';
                return; // Stop submission
            }

            // Remove previous error if any
            const prevErr = discoveryForm.querySelector('.form-submit-error');
            if (prevErr) prevErr.remove();

            // P0: Safe File Upload Handling
            const formFileInput = this.querySelector('input[type="file"]');
            let fileData = null;
            let fileName = null;
            let fileType = null;

            if (formFileInput && formFileInput.files.length > 0) {
                const file = formFileInput.files[0];
                const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
                const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
                
                if (!allowedTypes.includes(file.type)) {
                    showError('Invalid file type. Please upload an image or PDF.');
                    return;
                }

                if (file.size > MAX_FILE_SIZE) {
                    showError('File is too large. Maximum size is 5MB.');
                    return;
                }

                fileName = file.name;
                fileType = file.type;
                const reader = new FileReader();
                try {
                    fileData = await new Promise((resolve, reject) => {
                        reader.onload = (e) => resolve(e.target.result.split(',')[1]);
                        reader.onerror = () => reject(new Error('File reading failed'));
                        reader.readAsDataURL(file);
                    });
                } catch (e) {
                    showError('Error reading file. Please try again.');
                    return;
                }
            }

            // Loading state
            submitBtn.textContent = 'Submitting...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';

            // Collect data
            const salesRangeSelect = document.getElementById('sales-range');
            const adSpendSelect = document.getElementById('ad-spend-range');
            const formData = new FormData(this);

            const payload = {
                salesRange: salesRangeSelect ? salesRangeSelect.options[salesRangeSelect.selectedIndex].text : '',
                adSpend: adSpendSelect ? adSpendSelect.options[adSpendSelect.selectedIndex].text : '',
                videoWatched: formData.get('watched_video') || '',
                name: formData.get('name') || '',
                phone: formData.get('phone') || '',
                email: formData.get('email') || '',
                role: formData.get('role') || '',
                instagram: formData.get('instagram') || '',
                goals: formData.get('goals') || '',
                extra: formData.get('extra') || '',
                meetingTime: selectedDateBtn.textContent,
                fileData: fileData,
                fileName: fileName,
                fileType: fileType
            };

            const successHTML = '<div style="text-align:center;padding:3rem 1rem;">'
                + '<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#E61919" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom:1rem;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>'
                + '<h2 style="color:#fff;margin-bottom:1rem;">Application Submitted!</h2>'
                + '<p style="color:#aaa;font-size:1.1rem;line-height:1.6;">Our team will review your details and reach out within 24-48 hours via email or WhatsApp to schedule your Discovery Call.</p>'
                + '</div>';

            function showError(message) {
                const errDiv = document.createElement('div');
                errDiv.className = 'form-submit-error';
                errDiv.style.cssText = 'background:rgba(230,25,25,0.08);border:1px solid rgba(230,25,25,0.3);color:#ff6b6b;padding:1rem 1.25rem;border-radius:8px;margin-top:1rem;font-size:0.9rem;line-height:1.5;';
                errDiv.textContent = message;
                discoveryForm.appendChild(errDiv);
                
                if (submitBtn) {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                }
            }

            try {
                const response = await fetch(GOOGLE_SCRIPT_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                    body: JSON.stringify(payload)
                });
                
                if (!response.ok) {
                    throw new Error(`Server returned status: ${response.status}`);
                }
                
                discoveryForm.innerHTML = successHTML;
                const nextStepsBox = document.querySelector('.next-steps-box');
                if (nextStepsBox) nextStepsBox.style.display = 'none';
            } catch (error) {
                showError('Something went wrong. Please try again or contact us at performax.one1@gmail.com');
            }
        });
    }
});
