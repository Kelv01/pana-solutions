document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formGroups = document.querySelectorAll('.form-group');
    const submitButton = contactForm.querySelector('button[type="submit"]');

    // Form validation patterns
    const validationPatterns = {
        fullName: {
            pattern: /^[a-zA-Z\s]{2,50}$/,
            message: 'Please enter a valid name (2-50 characters, letters only)'
        },
        email: {
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Please enter a valid email address'
        },
        subject: {
            pattern: /^(?!$)/,
            message: 'Please select a subject'
        },
        message: {
            pattern: /^[\s\S]{10,1000}$/,
            message: 'Message must be between 10 and 1000 characters'
        }
    };

    // Real-time validation
    formGroups.forEach(group => {
        const input = group.querySelector('input, select, textarea');
        const errorMessage = group.querySelector('.error-message');

        if (input) {
            input.addEventListener('input', () => {
                validateField(input, errorMessage);
            });

            input.addEventListener('blur', () => {
                validateField(input, errorMessage);
            });
        }
    });

    // Field validation function
    function validateField(input, errorElement) {
        const fieldName = input.name;
        const value = input.value.trim();
        const pattern = validationPatterns[fieldName];

        if (pattern && !pattern.pattern.test(value)) {
            errorElement.textContent = pattern.message;
            errorElement.style.display = 'block';
            input.style.borderColor = '#dc3545';
            return false;
        } else {
            errorElement.style.display = 'none';
            input.style.borderColor = '#ddd';
            return true;
        }
    }

    // Form submission
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Disable submit button and show loading state
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        try {
            // Get form data
            const formData = {
                name: document.getElementById('fullName').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value,
                subject: document.getElementById('subject').value
            };

            // Submit form data to API
            const response = await api.submitContactForm(formData);

            // Show success message
            showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
            
            // Reset form
            contactForm.reset();

        } catch (error) {
            // Show error message
            showNotification(error.message || 'Failed to send message. Please try again.', 'error');
        } finally {
            // Re-enable submit button
            submitButton.disabled = false;
            submitButton.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Parallax effect for hero section
    const hero = document.querySelector('.contact-hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
        });
    }

    // Active navigation state
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });

    // Function to show notifications
    function showNotification(message, type = 'success') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                <span>${message}</span>
            </div>
        `;

        // Add to document
        document.body.appendChild(notification);

        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        // Remove notification after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    }
}); 