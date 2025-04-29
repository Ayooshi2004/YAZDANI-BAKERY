/*------------------------------------------
  Yazdani Bakery - Contact Page JavaScript
  Version: 1.0
--------------------------------------------*/

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
    initMapPlaceholder();
});

/**
 * Contact form validation and submission
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    const formError = document.getElementById('formError');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value.trim();
        const newsletter = document.getElementById('newsletter').checked;
        
        // Basic validation
        if (!name || !email || !subject || !message) {
            showFormError('Please fill in all required fields.');
            highlightEmptyFields();
            return;
        }
        
        if (!isValidEmail(email)) {
            showFormError('Please enter a valid email address.');
            highlightField('email');
            return;
        }
        
        if (phone && !isValidPhone(phone)) {
            showFormError('Please enter a valid phone number.');
            highlightField('phone');
            return;
        }
        
        // Form data is valid - in a real implementation, this would send data to a server
        // For demonstration purposes, we'll just show a success message
        
        // Create a form data object (would be used in actual form submission)
        const formData = {
            name,
            email,
            phone,
            subject,
            message,
            newsletter
        };
        
        console.log('Form data:', formData);
        
        // Show success message and reset form
        showFormSuccess();
        contactForm.reset();
    });
    
    // Helper function to highlight empty required fields
    function highlightEmptyFields() {
        const requiredFields = ['name', 'email', 'subject', 'message'];
        
        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (!field.value.trim()) {
                highlightField(fieldId);
            }
        });
    }
    
    // Helper function to highlight a specific field
    function highlightField(fieldId) {
        const field = document.getElementById(fieldId);
        field.classList.add('error-field');
        field.style.borderColor = 'var(--error)';
        
        field.addEventListener('input', function() {
            field.classList.remove('error-field');
            field.style.borderColor = '';
        }, { once: true });
    }
    
    // Show form error message
    function showFormError(message) {
        if (formError) {
            const errorMessage = formError.querySelector('p');
            if (errorMessage) {
                errorMessage.textContent = message;
            }
            
            formSuccess.style.display = 'none';
            formError.style.display = 'block';
            
            // Scroll to error message
            formError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Hide error after 5 seconds
            setTimeout(() => {
                formError.style.display = 'none';
            }, 5000);
        } else {
            // Fallback if the error element doesn't exist
            alert(message);
        }
    }
    
    // Show form success message
    function showFormSuccess() {
        if (formSuccess) {
            formError.style.display = 'none';
            formSuccess.style.display = 'block';
            
            // Scroll to success message
            formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                formSuccess.style.display = 'none';
            }, 5000);
        }
    }
}

/**
 * Initialize map placeholder with interactive elements
 */
function initMapPlaceholder() {
    const mapPlaceholder = document.querySelector('.map-placeholder');
    
    if (!mapPlaceholder) return;
    
    // Add hover effect
    mapPlaceholder.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.02)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    mapPlaceholder.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
    
    // Add click handler to simulate a map interaction
    mapPlaceholder.addEventListener('click', function() {
        this.innerHTML = `
            <div class="map-icon">
                <i class="fas fa-map-marked-alt"></i>
            </div>
            <p>This would open a detailed map in a real implementation.</p>
            <p>Our location: 123 Baker Street, Cityville</p>
        `;
    });
}

/**
 * Simple email validation
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Simple phone validation - accepts various formats
 */
function isValidPhone(phone) {
    // Allow various formats including international
    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    return phoneRegex.test(phone);
}
