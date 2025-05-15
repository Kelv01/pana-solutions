document.addEventListener('DOMContentLoaded', () => {
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const emailInput = document.getElementById('newsletterEmail');
            const submitButton = newsletterForm.querySelector('button[type="submit"]');
            
            // Disable submit button and show loading state
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
            
            try {
                // Submit email to API
                const response = await api.subscribeToNewsletter(emailInput.value);
                
                // Show success message
                showNotification('Successfully subscribed to our newsletter!', 'success');
                
                // Reset form
                newsletterForm.reset();
                
            } catch (error) {
                // Show error message
                showNotification(error.message || 'Failed to subscribe. Please try again.', 'error');
            } finally {
                // Re-enable submit button
                submitButton.disabled = false;
                submitButton.innerHTML = 'Subscribe';
            }
        });
    }
}); 