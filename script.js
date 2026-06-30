/* ========================================
   Kishan & Ayushi Wedding - JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ── Welcome Screen → Music → Site ──
  const welcomeScreen = document.getElementById('welcome-screen');
  const welcomeBtn = document.getElementById('welcome-enter');
  const bgMusic = document.getElementById('bg-music');
  const musicToggle = document.getElementById('music-toggle');
  let isPlaying = false;

  welcomeBtn.addEventListener('click', () => {
    // Start music (user gesture = browser allows it)
    bgMusic.muted = false;
    bgMusic.volume = 0.5;
    bgMusic.play().then(() => {
      isPlaying = true;
      musicToggle.classList.add('playing');
      musicToggle.innerHTML = '🎶';
    });

    // Show music toggle button
    musicToggle.classList.add('visible');

    // Animate card out, then hide welcome
    welcomeScreen.classList.add('leaving');
    setTimeout(() => {
      welcomeScreen.classList.add('hidden');
    }, 500);
  });
  
  function createPetal() {
    const petal = document.createElement('span');
    petal.classList.add('petal');
    petal.textContent = petalEmojis[Math.floor(Math.random() * petalEmojis.length)];
    petal.style.left = Math.random() * 100 + '%';
    petal.style.fontSize = (Math.random() * 1 + 0.8) + 'rem';
    petal.style.animationDuration = (Math.random() * 6 + 8) + 's';
    petal.style.animationDelay = Math.random() * 2 + 's';
    petalsContainer.appendChild(petal);
    
    setTimeout(() => {
      petal.remove();
    }, 16000);
  }
  
  setInterval(createPetal, 800);

  // ── Countdown Timer ──
  const weddingDate = new Date('July 19, 2026 08:00:00').getTime();
  
  function updateCountdown() {
    const now = new Date().getTime();
    const diff = weddingDate - now;
    
    if (diff <= 0) {
      document.querySelectorAll('.countdown-value').forEach(el => el.textContent = '0');
      return;
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    document.getElementById('countdown-days').textContent = days;
    document.getElementById('countdown-hours').textContent = hours;
    document.getElementById('countdown-minutes').textContent = minutes;
    document.getElementById('countdown-seconds').textContent = seconds;
  }
  
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ── Navigation ──
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });
  
  // Close mobile nav on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // ── Scroll Reveal ──
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-rotate, .reveal-blur');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -30px 0px'
  });
  
  revealElements.forEach(el => revealObserver.observe(el));

  // ── FAQ Accordion ──
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const content = item.querySelector('.faq-answer-content');
    
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all
      faqItems.forEach(i => {
        i.classList.remove('active');
        i.querySelector('.faq-answer').style.maxHeight = '0';
      });
      
      // Open clicked if wasn't active
      if (!isActive) {
        item.classList.add('active');
        answer.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  // ── RSVP Form ──
  const rsvpForm = document.getElementById('rsvp-form');
  const rsvpSuccess = document.querySelector('.rsvp-success');
  
  rsvpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simulate form submission
    const submitBtn = rsvpForm.querySelector('.rsvp-submit');
    submitBtn.innerHTML = '<span>Sending...</span>';
    submitBtn.disabled = true;
    
    setTimeout(() => {
      rsvpForm.style.display = 'none';
      rsvpSuccess.classList.add('show');
      
      // Create celebration confetti
      createConfetti();
    }, 1500);
  });

  // ── Confetti on RSVP ──
  function createConfetti() {
    const confettiContainer = document.querySelector('.rsvp-section');
    const colors = ['#C8A951', '#E8D48B', '#D4707A', '#F4C2C2', '#8B1A2B'];
    
    for (let i = 0; i < 60; i++) {
      const confetti = document.createElement('div');
      confetti.style.cssText = `
        position: absolute;
        width: ${Math.random() * 10 + 5}px;
        height: ${Math.random() * 10 + 5}px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        top: 50%;
        left: ${Math.random() * 100}%;
        border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
        animation: confettiFall ${Math.random() * 2 + 2}s ease forwards;
        z-index: 10;
        pointer-events: none;
      `;
      confettiContainer.appendChild(confetti);
      
      setTimeout(() => confetti.remove(), 4000);
    }
  }

  // Add confetti keyframes
  const confettiStyle = document.createElement('style');
  confettiStyle.textContent = `
    @keyframes confettiFall {
      0% { transform: translateY(0) rotate(0deg); opacity: 1; }
      100% { transform: translateY(400px) rotate(720deg) translateX(${Math.random() * 200 - 100}px); opacity: 0; }
    }
  `;
  document.head.appendChild(confettiStyle);

  // ── Gallery Lightbox ──
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = lightbox.querySelector('img');
  const lightboxClose = lightbox.querySelector('.lightbox-close');
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });
  
  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  // ── Music Toggle Button ──
  musicToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    if (isPlaying) {
      bgMusic.pause();
      musicToggle.classList.remove('playing');
      musicToggle.innerHTML = '🎵';
      isPlaying = false;
    } else {
      bgMusic.muted = false;
      bgMusic.volume = 0.5;
      bgMusic.play().then(() => {
        musicToggle.classList.add('playing');
        musicToggle.innerHTML = '🎶';
        isPlaying = true;
      });
    }
  });

  // ── Smooth Scroll ──
  document.querySelector('.hero-scroll-indicator').addEventListener('click', () => {
    document.getElementById('couple').scrollIntoView({ behavior: 'smooth' });
  });

  // ── Active Nav ──
  const sections = document.querySelectorAll('section[id]');
  
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.querySelectorAll('a').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });

});
