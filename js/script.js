document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            if (this.classList.contains('active')) {
                this.querySelector('span:nth-child(1)').style.transform = 'rotate(45deg) translate(5px, 5px)';
                this.querySelector('span:nth-child(2)').style.opacity = '0';
                this.querySelector('span:nth-child(3)').style.transform = 'rotate(-45deg) translate(7px, -6px)';
                
                // Show mobile menu
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.padding = '20px';
                navLinks.style.backgroundColor = 'white';
                navLinks.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
                navLinks.style.zIndex = '1000';
            } else {
                this.querySelector('span:nth-child(1)').style.transform = 'none';
                this.querySelector('span:nth-child(2)').style.opacity = '1';
                this.querySelector('span:nth-child(3)').style.transform = 'none';
                
                // Hide mobile menu
                navLinks.style.display = '';
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (mobileMenuBtn && mobileMenuBtn.classList.contains('active')) {
                    mobileMenuBtn.click();
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animated counter for pricing
    const animatePricing = () => {
        const pricingCards = document.querySelectorAll('.pricing-card');
        
        pricingCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                const priceElement = this.querySelector('.amount');
                const targetPrice = parseInt(priceElement.textContent);
                let currentPrice = 0;
                
                const interval = setInterval(() => {
                    if (currentPrice >= targetPrice) {
                        clearInterval(interval);
                        priceElement.textContent = targetPrice;
                    } else {
                        currentPrice += Math.ceil(targetPrice / 20);
                        if (currentPrice > targetPrice) currentPrice = targetPrice;
                        priceElement.textContent = currentPrice;
                    }
                }, 30);
            });
            
            card.addEventListener('mouseleave', function() {
                const priceElement = this.querySelector('.amount');
                const targetPrice = parseInt(priceElement.textContent);
                priceElement.textContent = targetPrice;
            });
        });
    };
    
    animatePricing();
    
    // Form validation
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            let isValid = true;
            const formElements = this.elements;
            
            for (let i = 0; i < formElements.length; i++) {
                if (formElements[i].type !== 'submit' && formElements[i].hasAttribute('required')) {
                    if (!formElements[i].value.trim()) {
                        isValid = false;
                        formElements[i].style.borderColor = 'red';
                        
                        // Add error message if it doesn't exist
                        let nextElement = formElements[i].nextElementSibling;
                        if (!nextElement || !nextElement.classList.contains('error-message')) {
                            const errorMessage = document.createElement('div');
                            errorMessage.className = 'error-message';
                            errorMessage.style.color = 'red';
                            errorMessage.style.fontSize = '0.8rem';
                            errorMessage.style.marginTop = '5px';
                            errorMessage.textContent = 'Este campo es obligatorio';
                        }
                    } else {
                        formElements[i].style.borderColor = '';
                        
                        // Remove error message if it exists
                        let nextElement = formElements[i].nextElementSibling;
                        if (nextElement && nextElement.classList.contains('error-message')) {
                            nextElement.remove();
                        }
                    }
                }
            }
            
            if (isValid) {
                // Simulate form submission
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                submitBtn.disabled = true;
                submitBtn.textContent = 'Enviando...';
                
                setTimeout(() => {
                    // Show success message
                    contactForm.innerHTML = `
                        <div class="success-message" style="text-align: center;">
                            <svg viewBox="0 0 24 24" width="60" height="60" stroke="green" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" style="margin: 0 auto 20px;">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                            <h3 style="color: green; margin-bottom: 15px;">¡Mensaje Enviado Exitosamente!</h3>
                            <p>Gracias por contactarnos. Te responderemos a la brevedad.</p>
                        </div>
                    `;
                }, 2000);
            }
        });
        
        // Real-time validation
        const formInputs = contactForm.querySelectorAll('input, textarea');
        
        formInputs.forEach(input => {
            input.addEventListener('input', function() {
                if (this.hasAttribute('required') && this.value.trim()) {
                    this.style.borderColor = '';
                    
                    // Remove error message if it exists
                    let nextElement = this.nextElementSibling;
                    if (nextElement && nextElement.classList.contains('error-message')) {
                        nextElement.remove();
                    }
                }
            });
        });
    }
    
    // Intersection Observer for scroll animations
    const observeElements = (elements, className) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(className);
                }
            });
        }, { threshold: 0.1 });
        
        elements.forEach(element => {
            observer.observe(element);
        });
    };
    
    // Add animation classes
    const fadeElements = document.querySelectorAll('.section-header, .feature-card, .testimonial-card, .pricing-card');
    
    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    observeElements(fadeElements, 'fade-in');
    
    // Add fade-in class for CSS
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
    
    // Testimonial slider auto-scroll
    const testimonialSlider = document.querySelector('.testimonial-slider');
    
    if (testimonialSlider && testimonialSlider.children.length > 1) {
        let scrollAmount = 0;
        const cardWidth = testimonialSlider.querySelector('.testimonial-card').offsetWidth + 30; // card width + gap
        const maxScroll = testimonialSlider.scrollWidth - testimonialSlider.clientWidth;
        
        const autoScroll = setInterval(() => {
            scrollAmount += cardWidth;
            if (scrollAmount > maxScroll) {
                scrollAmount = 0;
                testimonialSlider.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                testimonialSlider.scrollTo({ left: scrollAmount, behavior: 'smooth' });
            }
        }, 5000);
        
        // Pause auto-scroll on hover
        testimonialSlider.addEventListener('mouseenter', () => {
            clearInterval(autoScroll);
        });
    }
});