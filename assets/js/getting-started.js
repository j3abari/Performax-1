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
    // Form Submission (Connected to Webhook)
    // Form Submission (Connected directly to Google Sheets via Apps Script)
    const discoveryForm = document.getElementById('discovery-form');
    if (discoveryForm) {
        discoveryForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.btn-submit');
            const originalText = submitBtn.textContent;
            
            // 1. Change button state to loading
            submitBtn.textContent = 'Submitting Request...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';

            // 2. Gather text data
            const salesRange = document.getElementById('sales-range').options[document.getElementById('sales-range').selectedIndex].text;
            const adSpend = document.getElementById('ad-spend-range').options[document.getElementById('ad-spend-range').selectedIndex].text;
            
            const formData = new FormData(this);
            const payload = {
                salesRange: salesRange,
                adSpend: adSpend,
                videoWatched: formData.get('video_watched'),
                name: formData.get('name'),
                phone: formData.get('phone'),
                email: formData.get('email'),
                role: formData.get('role'),
                instagram: formData.get('instagram'),
                goals: formData.get('goals'),
                extra: formData.get('extra'),
                meetingTime: this.querySelector('.date-btn.selected') ? this.querySelector('.date-btn.selected').textContent : 'Not Selected',
                fileData: null,
                fileName: null,
                fileType: null
            };

            // ==========================================
            // ⚠️ ضع رابط الـ Google Apps Script الخاص بك هنا
            // ==========================================
            const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxQ0MRQisDrZ30z0Fj9OIx0CtBoQRH2kiwS_AnsDHApJ5SUfsNQmdQceIPvDS2R6RUY/exec';

            // 3. Handle File Upload (Convert to Base64 for Google Apps Script)
            const fileInput = this.querySelector('input[type="file"]');
            
            const sendDataToGoogle = async (finalPayload) => {
                try {
                    // Using text/plain avoids CORS preflight issues with Google Scripts
                    const response = await fetch(GOOGLE_SCRIPT_URL, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'text/plain;charset=utf-8',
                        },
                        body: JSON.stringify(finalPayload)
                    });

                    // 4. Show Success Message
                    discoveryForm.innerHTML = 
                        <div style="text-align: center; padding: 3rem 1rem;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#E61919" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 1rem;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                            <h2 style="color: var(--white); margin-bottom: 1rem;">Application Submitted Successfully!</h2>
                            <p style="color: var(--text-secondary); font-size: 1.1rem; line-height: 1.6;">Our team will review your application and sales data. We will reach out within 24-48 hours via email or WhatsApp to schedule your Discovery Call.</p>
                        </div>
                    ;
                    document.querySelector('.next-steps-box').style.display = 'none';
                    
                } catch (error) {
                    console.error('Error submitting form:', error);
                    alert("Something went wrong. Please try again or contact us directly at performax.one1@gmail.com");
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                }
            };

            if (fileInput.files.length > 0) {
                const file = fileInput.files[0];
                const reader = new FileReader();
                reader.onload = function(event) {
                    // Extract the base64 string without the data URL prefix
                    payload.fileData = event.target.result.split(',')[1];
                    payload.fileName = file.name;
                    payload.fileType = file.type;
                    sendDataToGoogle(payload);
                };
                reader.readAsDataURL(file);
            } else {
                sendDataToGoogle(payload);
            }
        });
    }
                    // 4. Show Success Message
                    discoveryForm.innerHTML = 
                        <div style="text-align: center; padding: 3rem 1rem;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#E61919" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 1rem;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                            <h2 style="color: var(--white); margin-bottom: 1rem;">Application Submitted Successfully!</h2>
                            <p style="color: var(--text-secondary); font-size: 1.1rem; line-height: 1.6;">Our team will review your application and sales data. We will reach out within 24-48 hours via email or WhatsApp to schedule your Discovery Call.</p>
                        </div>
                    ;
                    document.querySelector('.next-steps-box').style.display = 'none';
                } else {
                    throw new Error('Network response was not ok');
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                alert("Something went wrong. Please try again or contact us directly.");
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
            }
        });
    }
});
