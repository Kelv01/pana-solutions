document.addEventListener('DOMContentLoaded', function() {
    // Tab Switching
    const tabs = document.querySelectorAll('.auth-tab');
    const forms = document.querySelectorAll('.auth-form');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;
            
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Show target form
            forms.forEach(form => {
                form.classList.remove('active');
                if (form.id === target) {
                    form.classList.add('active');
                }
            });
        });
    });

    // Password Visibility Toggle
    const toggleButtons = document.querySelectorAll('.toggle-password');
    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const input = button.previousElementSibling;
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            button.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
        });
    });

    // Form Validation
    const validationPatterns = {
        fullName: {
            pattern: /^[a-zA-Z\s]{2,50}$/,
            message: 'Please enter a valid name (2-50 characters, letters only)'
        },
        email: {
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Please enter a valid email address'
        },
        password: {
            pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
            message: 'Password must be at least 8 characters with letters and numbers'
        }
    };

    // Real-time validation
    const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="password"]');
    inputs.forEach(input => {
        input.addEventListener('input', () => validateField(input));
        input.addEventListener('blur', () => validateField(input));
    });

    function validateField(input) {
        const pattern = validationPatterns[input.name];
        if (!pattern) return;

        const errorElement = input.parentElement.nextElementSibling;
        const isValid = pattern.pattern.test(input.value);

        if (!isValid && input.value) {
            input.style.borderColor = '#dc3545';
            errorElement.textContent = pattern.message;
            errorElement.style.display = 'block';
        } else {
            input.style.borderColor = '#ddd';
            errorElement.style.display = 'none';
        }

        return isValid;
    }

    // Form Submission
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = loginForm.querySelector('input[name="email"]');
        const password = loginForm.querySelector('input[name="password"]');

        if (validateField(email) && validateField(password)) {
            const submitButton = loginForm.querySelector('.submit-button');
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';

            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Login successful! Redirecting...';
                loginForm.appendChild(successMessage);
                successMessage.style.display = 'block';

                // Redirect after delay
                setTimeout(() => {
                    window.location.href = '/dashboard';
                }, 1500);
            } catch (error) {
                console.error('Login error:', error);
                submitButton.disabled = false;
                submitButton.innerHTML = '<i class="fas fa-sign-in-alt"></i> Login';
            }
        }
    });

    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const fullName = signupForm.querySelector('input[name="fullName"]');
        const email = signupForm.querySelector('input[name="email"]');
        const password = signupForm.querySelector('input[name="password"]');
        const confirmPassword = signupForm.querySelector('input[name="confirmPassword"]');

        if (validateField(fullName) && validateField(email) && validateField(password)) {
            if (password.value !== confirmPassword.value) {
                const errorElement = confirmPassword.parentElement.nextElementSibling;
                errorElement.textContent = 'Passwords do not match';
                errorElement.style.display = 'block';
                return;
            }

            const submitButton = signupForm.querySelector('.submit-button');
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating account...';

            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Account created successfully! Redirecting...';
                signupForm.appendChild(successMessage);
                successMessage.style.display = 'block';

                // Redirect after delay
                setTimeout(() => {
                    window.location.href = '/dashboard';
                }, 1500);
            } catch (error) {
                console.error('Signup error:', error);
                submitButton.disabled = false;
                submitButton.innerHTML = '<i class="fas fa-user-plus"></i> Sign Up';
            }
        }
    });

    // Social Login Handlers
    const socialButtons = document.querySelectorAll('.social-button');
    socialButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const provider = button.dataset.provider;
            button.disabled = true;
            button.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Connecting...`;

            try {
                // Simulate social login
                await new Promise(resolve => setTimeout(resolve, 1500));
                console.log(`Logging in with ${provider}...`);
                // Redirect to dashboard
                window.location.href = '/dashboard';
            } catch (error) {
                console.error(`${provider} login error:`, error);
                button.disabled = false;
                button.innerHTML = `<i class="fab fa-${provider.toLowerCase()}"></i> Continue with ${provider}`;
            }
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Parallax effect for hero image
    const heroImage = document.querySelector('.auth-image');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
    });

    // Active navigation state
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
}); 