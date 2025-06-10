// Navigation mobile
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

mobileMenuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

// Fermer le menu mobile lors du clic sur un lien
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// Effet de scroll sur le header
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Smooth scroll pour les liens d'ancrage
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Animation des éléments au scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observer les cartes de fonctionnalités
document.querySelectorAll('.feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease-out';
    observer.observe(card);
});

// Observer les statistiques
document.querySelectorAll('.stat').forEach(stat => {
    stat.style.opacity = '0';
    stat.style.transform = 'translateY(30px)';
    stat.style.transition = 'all 0.6s ease-out';
    observer.observe(stat);
});

// Animation des compteurs
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/\D/g, ''));
        const suffix = counter.textContent.replace(/\d/g, '');
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target + suffix;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current) + suffix;
            }
        }, 20);
    });
};

// Observer pour déclencher l'animation des compteurs
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}


// Gestion des boutons CTA
document.querySelectorAll('.primary-button, .cta-button').forEach(button => {
    button.addEventListener('click', (e) => {
        // Effet de ripple
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
        
        // Simulation d'action (remplacer par vraie logique)
        console.log('Bouton cliqué:', button.textContent);
    });
});

// Gestion des boutons de téléchargement
document.querySelectorAll('.download-btn').forEach(button => {
    button.addEventListener('click', () => {
        const platform = button.classList.contains('ios') ? 'iOS' : 'Android';
        console.log(`Téléchargement pour ${platform} demandé`);
        
        // Ici vous pourriez rediriger vers les stores appropriés
        // window.open('https://apps.apple.com/...', '_blank');
        // window.open('https://play.google.com/...', '_blank');
        
        // Animation de feedback
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 150);
    });
});

// Gestion du formulaire de contact (si ajouté plus tard)
const handleContactForm = (e) => {
    e.preventDefault();
    // Logique de traitement du formulaire
    console.log('Formulaire de contact soumis');
};

// Ajout de styles CSS dynamiques pour les effets
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .nav-links.active {
        display: flex;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        flex-direction: column;
        padding: 1rem;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        border-radius: 0 0 15px 15px;
    }
    
    .mobile-menu-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .mobile-menu-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-menu-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    @media (max-width: 768px) {
        .nav-links {
            display: none;
        }
    }
`;
document.head.appendChild(style);

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    console.log('DogWalk Landing Page chargée avec succès!');
    
    // Préchargement des images importantes
    const importantImages = [
        'public/image.png'
    ];
    
    importantImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
});

// Gestion des erreurs globales
window.addEventListener('error', (e) => {
    console.error('Erreur détectée:', e.error);
});

// Performance monitoring basique
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log(`Page chargée en ${Math.round(perfData.loadEventEnd - perfData.loadEventStart)}ms`);
        }, 0);
    });
}