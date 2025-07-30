document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = new FormData(this);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            
            // Here you would typically send the data to a server
            console.log('Form submitted:', data);
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }
    
    // Add active class to current page in navigation
    const currentPage = location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (currentPage === linkPage) {
            link.classList.add('active');
        }
    });
    
    // Add hover effect to blog posts
    const blogPosts = document.querySelectorAll('.blog-post');
    blogPosts.forEach(post => {
        post.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '12px 12px 0 rgba(0, 0, 0, 0.15)';
            this.style.transition = 'all 0.3s ease';
        });
        
        post.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '8px 8px 0 rgba(0, 0, 0, 0.1)';
        });
    });
    document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        
        // Email validation function
        function isValidEmail(email) {
            const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return re.test(String(email).toLowerCase());
        }
        
        // Word count function
        function countWords(str) {
            return str.trim() === '' ? 0 : str.trim().split(/\s+/).length;
        }
        
        // Real-time email validation
        emailInput.addEventListener('blur', function() {
            if (this.value && !isValidEmail(this.value)) {
                this.classList.add('invalid');
                this.nextElementSibling?.remove(); // Remove existing error if any
                const error = document.createElement('div');
                error.className = 'error-message';
                error.textContent = 'Please enter a valid email address (e.g., yourname@example.com)';
                error.style.color = 'red';
                error.style.fontSize = '0.8rem';
                error.style.marginTop = '5px';
                this.parentNode.insertBefore(error, this.nextSibling);
            } else {
                this.classList.remove('invalid');
                this.nextElementSibling?.remove(); // Remove error if fixed
            }
        });
        
        // Real-time message length validation
        messageInput.addEventListener('input', function() {
            const wordCount = countWords(this.value);
            const minWords = 20;
            
            // Update or create word counter
            let counter = this.parentNode.querySelector('.word-counter');
            if (!counter) {
                counter = document.createElement('div');
                counter.className = 'word-counter';
                counter.style.fontSize = '0.8rem';
                counter.style.marginTop = '5px';
                this.parentNode.appendChild(counter);
            }
            
            counter.textContent = `${wordCount} words (minimum ${minWords} required)`;
            counter.style.color = wordCount >= minWords ? 'green' : 'red';
            
            if (this.value && wordCount < minWords) {
                this.classList.add('invalid');
            } else {
                this.classList.remove('invalid');
            }
        });
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;
            
            // Validate email
            if (!isValidEmail(emailInput.value)) {
                emailInput.classList.add('invalid');
                if (!emailInput.nextElementSibling || !emailInput.nextElementSibling.classList.contains('error-message')) {
                    const error = document.createElement('div');
                    error.className = 'error-message';
                    error.textContent = 'Please enter a valid email address';
                    error.style.color = 'red';
                    error.style.fontSize = '0.8rem';
                    error.style.marginTop = '5px';
                    emailInput.parentNode.insertBefore(error, emailInput.nextSibling);
                }
                isValid = false;
            } else {
                emailInput.classList.remove('invalid');
                emailInput.nextElementSibling?.remove();
            }
            
            // Validate message word count
            const wordCount = countWords(messageInput.value);
            if (wordCount < 20) {
                messageInput.classList.add('invalid');
                isValid = false;
                
                // Ensure error message is shown
                let error = messageInput.parentNode.querySelector('.error-message');
                if (!error) {
                    error = document.createElement('div');
                    error.className = 'error-message';
                    error.style.color = 'red';
                    error.style.fontSize = '0.8rem';
                    error.style.marginTop = '5px';
                    messageInput.parentNode.appendChild(error);
                }
                error.textContent = `Please write at least 20 words (currently ${wordCount})`;
            } else {
                messageInput.classList.remove('invalid');
                messageInput.parentNode.querySelector('.error-message')?.remove();
            }
            
            // If all valid, submit form
            if (isValid) {
                // Get form values
                const formData = new FormData(this);
                const data = {};
                formData.forEach((value, key) => {
                    data[key] = value;
                });
                
                // Here you would typically send the data to a server
                console.log('Form submitted:', data);
                
                // Show success message
                alert('Thank you for your message! I will get back to you soon.');
                this.reset();
                
                // Clear word counter if it exists
                const counter = messageInput.parentNode.querySelector('.word-counter');
                if (counter) counter.remove();
            } else {
                // Scroll to first error
                const firstError = this.querySelector('.invalid');
                if (firstError) {
                    firstError.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }
            }
        });
    }
    
    // Add active class to current page in navigation
    const currentPage = location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (currentPage === linkPage) {
            link.classList.add('active');
        }
    });
    
    // Add hover effect to blog posts
    const blogPosts = document.querySelectorAll('.blog-post');
    blogPosts.forEach(post => {
        post.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '12px 12px 0 rgba(0, 0, 0, 0.15)';
            this.style.transition = 'all 0.3s ease';
        });
        
        post.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '8px 8px 0 rgba(0, 0, 0, 0.1)';
        });
    });
});





});

