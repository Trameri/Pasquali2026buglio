/**
 * ═══════════════════════════════════════════════════════════════════════
 *  PASQUALI 2026 - BUGLIO
 *  JavaScript Main File
 *  Funzionalità Interattive e Animazioni
 * ═══════════════════════════════════════════════════════════════════════
 */

// ═══════════════════════════════════════════════════════════════════════
// CONFIGURAZIONE
// ═══════════════════════════════════════════════════════════════════════
const CONFIG = {
    pasqualeNumber: "PASQUALE N°12",
    qrUrl: window.location.origin + window.location.pathname.replace(/[^\/]*$/, '') + "vota.html",
    emailRecipient: "nico.trameri@gmail.com"
};

// ═══════════════════════════════════════════════════════════════════════
// INIZIALIZZAZIONE
// ═══════════════════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initHeaderScroll();
    initQRCode();
    initAnimations();
    initScrollAnimations();
    initEmojiReactions();
    initSmoothScroll();
});

// ═══════════════════════════════════════════════════════════════════════
// MENU MOBILE
// ═══════════════════════════════════════════════════════════════════════
function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navClose = document.querySelector('.nav-close');
    const navOverlay = document.querySelector('.nav-overlay');
    
    if (navToggle && navMenu) {
        // Apri menu
        navToggle.addEventListener('click', function() {
            navMenu.classList.add('active');
            navToggle.classList.add('active');
            if (navOverlay) navOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        // Chiudi menu
        const closeMenu = function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            if (navOverlay) navOverlay.classList.remove('active');
            document.body.style.overflow = '';
        };
        
        if (navClose) {
            navClose.addEventListener('click', closeMenu);
        }
        
        if (navOverlay) {
            navOverlay.addEventListener('click', closeMenu);
        }
        
        // Chiudi menu al click su un link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }
}

// ═══════════════════════════════════════════════════════════════════════
// HEADER SCROLL EFFECT
// ═══════════════════════════════════════════════════════════════════════
function initHeaderScroll() {
    const header = document.querySelector('.header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
}

// ═══════════════════════════════════════════════════════════════════════
// QR CODE GENERATOR
// ═══════════════════════════════════════════════════════════════════════
function initQRCode() {
    const qrContainer = document.getElementById('qr-code-container');
    if (qrContainer) {
        generateQRCode(qrContainer, CONFIG.qrUrl);
    }
}

function generateQRCode(container, url) {
    const qrSize = 180;
    // Usa l'API QR Server per generare il QR code
    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(url)}&color=1a1612&bgcolor=faf6ef`;
    
    container.innerHTML = `
        <img src="${qrApiUrl}" alt="QR Code per votare" loading="lazy" style="width: 100%; height: 100%; object-fit: contain;">
    `;
}

function downloadQR() {
    const qrContainer = document.getElementById('qr-code-container');
    if (qrContainer) {
        const img = qrContainer.querySelector('img');
        if (img) {
            const link = document.createElement('a');
            link.href = img.src;
            link.download = 'pasquale-qr-code.png';
            link.click();
            showNotification('QR Code scaricato!', 'success');
        }
    }
}

// ═══════════════════════════════════════════════════════════════════════
// ANIMAZIONI BASE
// ═══════════════════════════════════════════════════════════════════════
function initAnimations() {
    // Animation for elements already visible
    const animatedElements = document.querySelectorAll('.fade-in, .scale-in, .fade-in-left');
    
    animatedElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
    });
}

// ═══════════════════════════════════════════════════════════════════════
// SCROLL ANIMATIONS (Intersection Observer)
// ═══════════════════════════════════════════════════════════════════════
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.card, .symbol-item, .name-item, .gallery-item, ' +
        '.participants-header, .thanks-section, .ar-hero, ' +
        '.ar-instructions, .reviews-hero, .emoji-rating-container'
    );
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animatedElements.forEach(el => {
            observer.observe(el);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        animatedElements.forEach(el => {
            el.classList.add('fade-in');
        });
    }
}

// ═══════════════════════════════════════════════════════════════════════
// SMOOTH SCROLL
// ═══════════════════════════════════════════════════════════════════════
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                e.preventDefault();
                const target = document.querySelector(targetId);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// ═══════════════════════════════════════════════════════════════════════
// EMOJI REACTIONS (Per feedback)
// ═══════════════════════════════════════════════════════════════════════
function initEmojiReactions() {
    const emojiBtns = document.querySelectorAll('.emoji-btn');
    
    emojiBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Rimuovi selezione precedente
            emojiBtns.forEach(b => b.classList.remove('selected'));
            
            // Seleziona questo emoji
            this.classList.add('selected');
            
            // Animazione
            const emoji = this.querySelector('.emoji');
            if (emoji) {
                emoji.style.transform = 'scale(1.3)';
                setTimeout(() => {
                    emoji.style.transform = 'scale(1.15)';
                }, 150);
            }
        });
    });
}

// ═══════════════════════════════════════════════════════════════════════
// NOTIFICATIONS
// ═══════════════════════════════════════════════════════════════════════
function showNotification(message, type = 'success') {
    // Rimuovi notifica esistente
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${escapeHtml(message)}</span>
    `;
    
    // Stile inline per la notifica
    Object.assign(notification.style, {
        position: 'fixed',
        bottom: '30px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '16px 28px',
        borderRadius: '50px',
        color: 'white',
        fontWeight: '600',
        zIndex: '9999',
        animation: 'slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        background: type === 'success' ? 'linear-gradient(135deg, #2d5a3d, #1e4a2c)' : 'linear-gradient(135deg, #c41e3a, #a01830)',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3), 0 0 20px rgba(201, 162, 39, 0.2)',
        fontFamily: 'var(--font-body)'
    });
    
    document.body.appendChild(notification);
    
    // Animazione slide up
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideUp {
            from { opacity: 0; transform: translate(-50%, 30px); }
            to { opacity: 1; transform: translate(-50%, 0); }
        }
        @keyframes slideDown {
            from { opacity: 1; transform: translate(-50%, 0); }
            to { opacity: 0; transform: translate(-50%, 30px); }
        }
    `;
    document.head.appendChild(style);
    
    // Rimuovi dopo 3 secondi
    setTimeout(() => {
        notification.style.animation = 'slideDown 0.3s ease-out forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ═══════════════════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// ═══════════════════════════════════════════════════════════════════════
// FEEDBACK FORM (Per pagina recensioni)
// ═══════════════════════════════════════════════════════════════════════
function initFeedbackForm() {
    const form = document.getElementById('feedback-form');
    if (form) {
        form.addEventListener('submit', handleFeedbackSubmit);
    }
}

function handleFeedbackSubmit(e) {
    e.preventDefault();
    
    const rating = document.getElementById('rating-value').value;
    const emoji = document.getElementById('rating-emoji').value;
    const comment = document.getElementById('comment-text').value;
    
    if (!rating) {
        showNotification('Per favore seleziona un\'emoji', 'error');
        return;
    }
    
    // Crea URL mailto per invio feedback
    const subject = encodeURIComponent(`[Pasquali 2026 Buglio] Feedback - ${emoji} (${rating}/5)`);
    const body = encodeURIComponent(
        `FEEDBACK - Pasquali 2026 Buglio\n` +
        `=============================\n\n` +
        `Data: ${new Date().toLocaleString('it-IT')}\n` +
        `Voto: ${emoji} (${rating}/5)\n\n` +
        `Commento:\n${comment || 'Nessun commento inserito'}\n\n` +
        `---\nInviato tramite sito web Pasquali Buglio`
    );
    
    // Apri email client
    window.location.href = `mailto:${CONFIG.emailRecipient}?subject=${subject}&body=${body}`;
    
    // Mostra messaggio successo
    const successMsg = document.getElementById('success-message');
    const form = document.getElementById('feedback-form');
    if (successMsg && form) {
        form.style.display = 'none';
        successMsg.classList.add('show');
    }
    
    showNotification('Grazie! Il tuo feedback è stato inviato', 'success');
}

function resetFeedbackForm() {
    const form = document.getElementById('feedback-form');
    const successMsg = document.getElementById('success-message');
    const emojiBtns = document.querySelectorAll('.emoji-btn');
    const ratingInput = document.getElementById('rating-value');
    const commentInput = document.getElementById('comment-text');
    
    if (form && successMsg) {
        emojiBtns.forEach(b => b.classList.remove('selected'));
        if (ratingInput) ratingInput.value = '';
        if (commentInput) commentInput.value = '';
        
        successMsg.classList.remove('show');
        form.style.display = 'block';
    }
}

// ═══════════════════════════════════════════════════════════════════════
// 3D VIEWER FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════
function resetCamera() {
    const camera = document.querySelector('[camera]');
    if (camera) {
        camera.setAttribute('position', '0 2 6');
        camera.setAttribute('rotation', '0 0 0');
    }
}

function toggleAutoRotate() {
    const scene = document.querySelector('a-scene');
    if (scene) {
        const camera = scene.querySelector('[camera]');
        if (camera) {
            if (camera.hasAttribute('animation')) {
                camera.removeAttribute('animation');
                showNotification('Auto rotazione disattivata', 'success');
            } else {
                camera.setAttribute('animation', {
                    property: 'rotation',
                    to: '0 360 0',
                    dur: 20000,
                    loop: true,
                    easing: 'linear'
                });
                showNotification('Auto rotazione attivata', 'success');
            }
        }
    }
}

function startAR() {
    alert(
        '🧭 Per utilizzare la Realtà Aumentata:\n\n' +
        '1. Apri questa pagina sullo smartphone\n' +
        '2. Assicurati di avere la fotocamera attiva\n' +
        '3. Inquadra il Pasquale reale\n\n' +
        'Per un\'esperienza completa, visita:\n' +
        'https://pasquali-bormio.it/ar'
    );
}

// ═══════════════════════════════════════════════════════════════════════
// PARALLAX EFFECT (Light)
// ═══════════════════════════════════════════════════════════════════════
function initParallax() {
    const hero = document.querySelector('.hero');
    
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            
            if (scrolled < window.innerHeight) {
                hero.style.transform = `translateY(${rate * 0.3}px)`;
            }
        });
    }
}

// ═══════════════════════════════════════════════════════════════════════
// LAZY LOAD IMAGES
// ═══════════════════════════════════════════════════════════════════════
function initLazyLoad() {
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supporta lazy loading nativo
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            img.src = img.dataset.src || img.src;
        });
    } else {
        // Fallback
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.removeAttribute('loading');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            lazyImages.forEach(img => {
                imageObserver.observe(img);
            });
        }
    }
}

// ═══════════════════════════════════════════════════════════════════════
// PRINT FUNCTIONALITY
// ═══════════════════════════════════════════════════════════════════════
function printPage() {
    window.print();
}

// ═══════════════════════════════════════════════════════════════════════
// COPY TO CLIPBOARD
// ═══════════════════════════════════════════════════════════════════════
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('Copiato negli appunti!', 'success');
        }).catch(() => {
            showNotification('Errore nella copia', 'error');
        });
    } else {
        // Fallback
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showNotification('Copiato negli appunti!', 'success');
    }
}

// ═══════════════════════════════════════════════════════════════════════
// SHARE FUNCTIONALITY
// ═══════════════════════════════════════════════════════════════════════
function sharePage() {
    if (navigator.share) {
        navigator.share({
            title: document.title,
            text: 'Scopri il Pasquale N°12 di Buglio!',
            url: window.location.href
        }).catch(console.error);
    } else {
        copyToClipboard(window.location.href);
        showNotification('Link copiato! Condividilo con i tuoi amici', 'success');
    }
}
