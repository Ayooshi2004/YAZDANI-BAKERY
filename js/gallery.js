/*------------------------------------------
  Yazdani Bakery - Gallery JavaScript
  Version: 1.0
--------------------------------------------*/

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initGalleryFilters();
    initGalleryModal();
});

/**
 * Gallery category filter functionality
 */
function initGalleryFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (!filterButtons.length || !galleryItems.length) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active filter button
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            this.classList.add('active');
            
            const category = this.getAttribute('data-filter');
            
            // Show/hide gallery items based on category
            galleryItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'block';
                    // Add a delay for a staggered animation effect
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Set initial display styles
    galleryItems.forEach(item => {
        item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    });
}

/**
 * Gallery modal functionality for image viewing
 */
function initGalleryModal() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.querySelector('.gallery-modal');
    
    if (!galleryItems.length || !modal) return;
    
    const modalImage = modal.querySelector('.modal-placeholder');
    const modalCaption = modal.querySelector('.modal-caption');
    const closeBtn = modal.querySelector('.modal-close');
    const prevBtn = modal.querySelector('.modal-prev');
    const nextBtn = modal.querySelector('.modal-next');
    
    let currentIndex = 0;
    let visibleItems = []; // Will store currently visible gallery items
    
    // Update the visible items array
    function updateVisibleItems() {
        visibleItems = Array.from(galleryItems).filter(item => 
            item.style.display !== 'none'
        );
    }
    
    // Open modal with the selected image
    function openModal(index) {
        updateVisibleItems();
        
        if (visibleItems.length === 0) return;
        
        currentIndex = index;
        
        const item = visibleItems[currentIndex];
        const icon = item.querySelector('.gallery-placeholder i').cloneNode(true);
        const title = item.querySelector('.gallery-caption h3').textContent;
        const desc = item.querySelector('.gallery-caption p').textContent;
        
        // Set modal content
        modalImage.innerHTML = '';
        modalImage.appendChild(icon);
        modalImage.style.backgroundColor = item.querySelector('.gallery-placeholder').style.backgroundColor;
        
        modalCaption.innerHTML = `<h3>${title}</h3><p>${desc}</p>`;
        
        // Show modal
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        
        // Add animation
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);
    }
    
    // Close the modal
    function closeModal() {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = ''; // Restore scrolling
        }, 300);
    }
    
    // Navigate to previous image
    function showPrevImage() {
        currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
        updateModalContent();
    }
    
    // Navigate to next image
    function showNextImage() {
        currentIndex = (currentIndex + 1) % visibleItems.length;
        updateModalContent();
    }
    
    // Update modal content for navigation
    function updateModalContent() {
        const item = visibleItems[currentIndex];
        const icon = item.querySelector('.gallery-placeholder i').cloneNode(true);
        const title = item.querySelector('.gallery-caption h3').textContent;
        const desc = item.querySelector('.gallery-caption p').textContent;
        
        // Set modal content with animation
        modalImage.style.opacity = '0';
        modalCaption.style.opacity = '0';
        
        setTimeout(() => {
            modalImage.innerHTML = '';
            modalImage.appendChild(icon);
            modalImage.style.backgroundColor = item.querySelector('.gallery-placeholder').style.backgroundColor;
            
            modalCaption.innerHTML = `<h3>${title}</h3><p>${desc}</p>`;
            
            modalImage.style.opacity = '1';
            modalCaption.style.opacity = '1';
        }, 300);
    }
    
    // Add click event to gallery items
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            openModal(index);
        });
    });
    
    // Modal controls event listeners
    closeBtn.addEventListener('click', closeModal);
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);
    
    // Close modal when clicking outside content
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (modal.style.display === 'flex' || modal.style.display === 'block') {
            if (e.key === 'Escape') {
                closeModal();
            } else if (e.key === 'ArrowLeft') {
                showPrevImage();
            } else if (e.key === 'ArrowRight') {
                showNextImage();
            }
        }
    });
    
    // Set transition for animations
    modalImage.style.transition = 'opacity 0.3s ease';
    modalCaption.style.transition = 'opacity 0.3s ease';
    modal.style.transition = 'opacity 0.3s ease';
}
