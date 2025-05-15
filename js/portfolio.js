// Portfolio Filtering
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const modal = document.getElementById('projectModal');
    const modalClose = document.querySelector('.modal-close');
    const modalBody = document.querySelector('.modal-body');

    // Project data for modal content
    const projectData = {
        project1: {
            title: 'E-commerce Platform',
            description: 'A modern e-commerce solution with advanced features including real-time inventory management, secure payment processing, and personalized shopping experiences.',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
            technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Redux'],
            features: [
                'Real-time inventory management',
                'Secure payment processing',
                'Personalized shopping experience',
                'Advanced search and filtering',
                'Responsive design'
            ],
            results: 'Increased conversion rate by 45% and reduced cart abandonment by 30%'
        },
        project2: {
            title: 'Fitness Tracker App',
            description: 'A comprehensive mobile application for tracking workouts, nutrition, and health metrics with social features and progress visualization.',
            image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3',
            technologies: ['Flutter', 'Firebase', 'REST API', 'Google Fit API'],
            features: [
                'Workout tracking and planning',
                'Nutrition monitoring',
                'Social features',
                'Progress visualization',
                'Integration with health devices'
            ],
            results: 'Achieved 100,000+ downloads and 4.5-star rating on app stores'
        },
        project3: {
            title: 'SEO Optimization',
            description: 'Comprehensive SEO strategy implementation for a tech startup, resulting in significant organic traffic growth and improved search rankings.',
            image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a',
            technologies: ['SEO', 'Analytics', 'Content Strategy', 'Technical SEO'],
            features: [
                'Keyword research and optimization',
                'Content strategy development',
                'Technical SEO improvements',
                'Link building campaign',
                'Performance monitoring'
            ],
            results: 'Increased organic traffic by 200% and improved keyword rankings'
        },
        project4: {
            title: 'Content Strategy',
            description: 'Digital content creation and management strategy for a leading brand, focusing on engagement and conversion optimization.',
            image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643',
            technologies: ['Content Writing', 'Social Media', 'Analytics', 'CMS'],
            features: [
                'Content calendar development',
                'Social media management',
                'Blog content creation',
                'Email marketing campaigns',
                'Performance analytics'
            ],
            results: 'Increased engagement by 150% and improved conversion rates'
        }
    };

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Modal functionality
    document.querySelectorAll('.project-link[data-project]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = link.getAttribute('data-project');
            const project = projectData[projectId];

            if (project) {
                modalBody.innerHTML = `
                    <div class="modal-project">
                        <img src="${project.image}" alt="${project.title}" class="modal-image">
                        <h2>${project.title}</h2>
                        <p class="modal-description">${project.description}</p>
                        
                        <div class="modal-tech">
                            <h3>Technologies Used</h3>
                            <div class="tech-tags">
                                ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
                            </div>
                        </div>

                        <div class="modal-features">
                            <h3>Key Features</h3>
                            <ul>
                                ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                            </ul>
                        </div>

                        <div class="modal-results">
                            <h3>Results</h3>
                            <p>${project.results}</p>
                        </div>
                    </div>
                `;
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal
    modalClose.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}); 