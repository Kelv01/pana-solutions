// Mobile Navigation
const navToggle = document.getElementById('navToggle');
const navMenu = document.querySelector('.nav-menu');
const dropdowns = document.querySelectorAll('.dropdown');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

dropdowns.forEach(dropdown => {
    dropdown.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            dropdown.classList.toggle('active');
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// Testimonials Carousel
const testimonials = [
    {
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
        quote: "Pana Solutions transformed our digital presence completely. Their team's expertise and dedication are unmatched.",
        name: "John Smith",
        title: "CEO, TechCorp"
    },
    {
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
        quote: "Working with Pana Solutions was a game-changer for our business. Their innovative approach and attention to detail are exceptional.",
        name: "Sarah Johnson",
        title: "Marketing Director, InnovateCo"
    },
    {
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
        quote: "The team at Pana Solutions delivered beyond our expectations. Their technical expertise and creative solutions are outstanding.",
        name: "Michael Chen",
        title: "CTO, DigitalWave"
    }
];

let currentTestimonial = 0;
const carousel = document.querySelector('.testimonial-carousel');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

function updateTestimonial() {
    const testimonial = testimonials[currentTestimonial];
    carousel.innerHTML = `
        <div class="testimonial-slide">
            <div class="testimonial-content">
                <img src="${testimonial.image}" alt="${testimonial.name}">
                <p>"${testimonial.quote}"</p>
                <h4>${testimonial.name}</h4>
                <p class="client-title">${testimonial.title}</p>
            </div>
        </div>
    `;
}

prevBtn.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    updateTestimonial();
});

nextBtn.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    updateTestimonial();
});

// Auto-rotate testimonials
setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    updateTestimonial();
}, 5000);

// Form Validation
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Basic validation
    if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // If validation passes, you would typically send the data to a server
    // For now, we'll just show a success message
    alert('Thank you for your message! We will get back to you soon.');
    contactForm.reset();
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'var(--background-light)';
        navbar.style.boxShadow = 'none';
    }
});

// Initialize AOS (Animate On Scroll) if you want to add more animations
// You would need to include the AOS library in your HTML
// AOS.init();

// Add more portfolio items dynamically
const portfolioItems = [
    {
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
        title: 'E-commerce Platform',
        description: 'Custom shopping experience'
    },
    {
        image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3',
        title: 'Mobile App',
        description: 'Cross-platform solution'
    },
    {
        image: 'https://images.unsplash.com/photo-1547658719-da2b51169166',
        title: 'Corporate Website',
        description: 'Modern design & functionality'
    }
];

const portfolioGrid = document.querySelector('.portfolio-grid');

portfolioItems.forEach(item => {
    const portfolioItem = document.createElement('div');
    portfolioItem.className = 'portfolio-item';
    portfolioItem.innerHTML = `
        <img src="${item.image}" alt="${item.title}">
        <div class="portfolio-overlay">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <a href="#" class="portfolio-link">View Project</a>
        </div>
    `;
    portfolioGrid.appendChild(portfolioItem);
});

// Add more team members dynamically
const teamMembers = [
    {
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a',
        name: 'Michael Johnson',
        role: 'Lead Developer'
    },
    {
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2',
        name: 'Emily Davis',
        role: 'UX Designer'
    },
    {
        image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7',
        name: 'David Wilson',
        role: 'Project Manager'
    }
];

const teamGrid = document.querySelector('.team-grid');

teamMembers.forEach(member => {
    const teamMember = document.createElement('div');
    teamMember.className = 'team-member';
    teamMember.innerHTML = `
        <img src="${member.image}" alt="${member.name}">
        <h3>${member.name}</h3>
        <p>${member.role}</p>
    `;
    teamGrid.appendChild(teamMember);
}); 


  // Intersection Observer for scroll animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, observerOptions);

// Observe all elements with animation classes
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
});