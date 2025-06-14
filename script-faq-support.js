document.addEventListener('DOMContentLoaded', () => {
    // FAQ Section Logic
    const faqQuestionButtons = document.querySelectorAll('.faq-question-btn');
    const faqAnswerContentDisplay = document.getElementById('faq-answer-content-display');
    const faqInitialMessage = document.querySelector('.faq-answer-area .faq-initial-message');

    if (faqQuestionButtons.length > 0 && faqAnswerContentDisplay && faqInitialMessage) {
        faqQuestionButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                faqQuestionButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to the clicked button
                button.classList.add('active');

                // Hide initial message
                faqInitialMessage.style.display = 'none';

                // Get the answer ID from data attribute
                const answerId = button.dataset.answerId;
                const answerTemplate = document.getElementById(answerId);

                // Display the answer
                if (answerTemplate) {
                    faqAnswerContentDisplay.innerHTML = answerTemplate.innerHTML;
                    faqAnswerContentDisplay.classList.add('active-answer');
                     // Ensure animation restarts if the same answer is "re-selected"
                    faqAnswerContentDisplay.style.animation = 'none';
                    faqAnswerContentDisplay.offsetHeight; /* trigger reflow */
                    faqAnswerContentDisplay.style.animation = null; 
                } else {
                    faqAnswerContentDisplay.innerHTML = '<p>عفواً، لم يتم العثور على إجابة لهذا السؤال.</p>';
                    faqAnswerContentDisplay.classList.add('active-answer');
                }
            });
        });
    }

    // Support Me - Copy Address/ID Logic
    const copyButtons = document.querySelectorAll('.copy-address-btn, .copy-id-btn');

    copyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const address = button.dataset.address || button.dataset.id;
            const originalText = button.innerHTML; // Store original button content

            navigator.clipboard.writeText(address).then(() => {
                button.innerHTML = '<i class="fas fa-check"></i> تم النسخ!';
                button.classList.add('copied');

                setTimeout(() => {
                    button.innerHTML = originalText;
                    button.classList.remove('copied');
                }, 2000); // Revert after 2 seconds
            }).catch(err => {
                console.error('Failed to copy: ', err);
                // Fallback for older browsers or if clipboard API fails
                try {
                    const fullAddressInput = button.nextElementSibling; // The hidden input
                    if (fullAddressInput && fullAddressInput.tagName === 'INPUT') {
                        fullAddressInput.select();
                        document.execCommand('copy');
                        
                        button.innerHTML = '<i class="fas fa-check"></i> تم النسخ!';
                        button.classList.add('copied');
                        setTimeout(() => {
                            button.innerHTML = originalText;
                            button.classList.remove('copied');
                         }, 2000);
                    } else {
                        alert('فشل النسخ. يرجى النسخ يدوياً.');
                    }
                } catch (execErr) {
                    console.error('Fallback copy failed: ', execErr);
                    alert('فشل النسخ. يرجى النسخ يدوياً.');
                }
            });
        });
    });

    // If you have the current year span, you can keep this
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
    const currentYearSidebarSpan = document.querySelector('.current-year-sidebar');
     if (currentYearSidebarSpan) {
        currentYearSidebarSpan.textContent = new Date().getFullYear();
    }

});