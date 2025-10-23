document.addEventListener('DOMContentLoaded', function() {
    // Star Rating System
    const stars = document.querySelectorAll('.star');
    let selectedRating = 0;

    stars.forEach((star, index) => {
        star.addEventListener('click', function() {
            selectedRating = index + 1;
            updateStars();
        });

        star.addEventListener('mouseover', function() {
            highlightStars(index + 1);
        });
    });

    const ratingContainer = document.querySelector('.rating');
    if (ratingContainer) {
        ratingContainer.addEventListener('mouseleave', function() {
            updateStars();
        });
    }

    function highlightStars(rating) {
        stars.forEach((star, index) => {
            if (index < rating) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    }

    function updateStars() {
        stars.forEach((star, index) => {
            if (index < selectedRating) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    }

    // Review Form Handler
    const reviewForm = document.querySelector('.review-form');
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (selectedRating === 0) {
                alert('Vui lòng chọn số sao đánh giá!');
                return;
            }
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Đang gửi...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Cảm ơn bạn đã chia sẻ đánh giá! Phản hồi của bạn rất quan trọng với chúng tôi.');
                this.reset();
                selectedRating = 0;
                updateStars();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // Animate review cards on scroll
    const reviewCards = document.querySelectorAll('.review-card');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, observerOptions);

    reviewCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });

    // Counter animation for stats
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                animateCounter(target, finalValue);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });

    function animateCounter(element, finalValue) {
        let currentValue = 0;
        const increment = parseInt(finalValue) / 100;
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= parseInt(finalValue)) {
                element.textContent = finalValue;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(currentValue) + (finalValue.includes('+') ? '+' : finalValue.includes('%') ? '%' : '');
            }
        }, 20);
    }
});