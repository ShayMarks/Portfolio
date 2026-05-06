// script.js

// המתנה לטעינת ה-DOM לפני הרצת הסקריפטים
document.addEventListener('DOMContentLoaded', () => {
  // Cinematic preloader: animated progress + curtain reveal
  const preloader = document.getElementById('preloader');
  const fillEl    = document.querySelector('.preloader-bar-fill');
  const pctEl     = document.getElementById('preloader-percent');
  const curtain   = document.querySelector('.preloader-curtain');

  let progress = 0;
  let target   = 5;
  const tick = () => {
    progress += (target - progress) * 0.12;
    if (fillEl) fillEl.style.width = progress.toFixed(2) + '%';
    if (pctEl)  pctEl.textContent  = Math.round(progress);
    if (progress < 99.4) requestAnimationFrame(tick);
  };
  tick();
  // Bump the target up smoothly during page load
  const bumpInterval = setInterval(() => {
    target = Math.min(target + 5 + Math.random() * 7, 92);
  }, 220);

  window.addEventListener('load', () => {
    clearInterval(bumpInterval);
    target = 100;
    setTimeout(() => {
      if (curtain) {
        curtain.style.display = 'block';
        // Force reflow so the next class change triggers the transition
        // eslint-disable-next-line no-unused-expressions
        curtain.offsetHeight;
        curtain.classList.add('split');
      }
      preloader.classList.add('fade-out');
      document.body.classList.remove('is-loading');
      setTimeout(() => {
        preloader.style.display = 'none';
        if (curtain) curtain.style.display = 'none';
      }, 1100);
    }, 500);
  });

  // אפקט גלילה ל-header
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Typed.js לאפקט הקלדה בקטע ה-Hero
  new Typed('.typed-text', {
    strings: [
      'Manual QA Tester',
      'Honors Graduate',
      'Frontend Developer',
      'JavaScript Enthusiast',
      'C# Developer',
      'HTML and CSS Expert',
      'Problem Solver',
      'Full-Stack Developer',
      'Self-Learner',
      'AI-Generated Music Creator',
    ],
    typeSpeed: 40,
    backSpeed: 20,
    loop: true,
  });

  // Hero particles — refined, slower, dual-tone palette
  particlesJS('hero-canvas', {
    particles: {
      number: { value: 60, density: { enable: true, value_area: 900 } },
      color: { value: ['#ffffff', '#305cde', '#08ba8d'] },
      shape: { type: 'circle', stroke: { width: 0, color: '#000000' } },
      opacity: { value: 0.45, random: true, anim: { enable: true, speed: 0.6, opacity_min: 0.1, sync: false } },
      size:    { value: 2.4, random: true, anim: { enable: true, speed: 1.5, size_min: 0.3, sync: false } },
      line_linked: { enable: true, distance: 140, color: '#7aa2ff', opacity: 0.18, width: 1 },
      move: { enable: true, speed: 1.2, direction: 'none', random: true, straight: false, out_mode: 'out', bounce: false },
    },
    interactivity: {
      detect_on: 'canvas',
      events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' }, resize: true },
      modes: {
        grab:    { distance: 180, line_linked: { opacity: 0.7 } },
        bubble:  { distance: 220, size: 6, duration: 2, opacity: 0.9, speed: 3 },
        repulse: { distance: 120, duration: 0.4 },
        push:    { particles_nb: 3 },
        remove:  { particles_nb: 2 },
      },
    },
    retina_detect: true,
  });

  // GSAP אנימציות עם ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  // אנימציה לכותרות הסקשנים
  gsap.utils.toArray('.section-title').forEach((title) => {
    gsap.from(title, {
      scrollTrigger: {
        trigger: title,
        start: 'top 110%',
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
    });
  });

  // אנימציה לאלמנטים עם המחלקה 'fade-in'
  gsap.utils.toArray('.fade-in').forEach((element) => {
    gsap.from(element, {
      scrollTrigger: {
        trigger: element,
        start: 'top 110%',
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
    });
  });

  // פונקציונליות סינון הכישורים (Skills) בקטע 'About Me'
  const skillsFilters = document.querySelectorAll('.skills-filter');
  const skillItems = document.querySelectorAll('.skill-item');

  skillsFilters.forEach((filter) => {
    filter.addEventListener('click', () => {
      // הסרת המחלקה 'active' מהפילטר הקודם והוספתה לפילטר הנוכחי
      document.querySelector('.skills-filter.active').classList.remove('active');
      filter.classList.add('active');
      const category = filter.getAttribute('data-category');

      // סינון הכישורים על פי הקטגוריה
      skillItems.forEach((item) => {
        // הפסקת אנימציות קודמות על האלמנט
        gsap.killTweensOf(item);

        if (
          category === 'all' ||
          item.getAttribute('data-category') === category
        ) {
          item.style.display = 'flex'; // שינוי ל-'flex' כדי לשמור על הפריסה
          gsap.fromTo(
            item,
            { opacity: 0, scale: 0.8 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.5,
              ease: 'power2.out',
              onComplete: () => {
                gsap.set(item, { clearProps: 'transform' });
              }
            }
          );
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // פילטרים של הפרויקטים (Portfolio)
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelector('.filter-btn.active').classList.remove('active');
      btn.classList.add('active');
      const filterValue = btn.getAttribute('data-filter');

      // סינון הפרויקטים על פי הקטגוריה
      portfolioItems.forEach((item) => {
        // הפסקת אנימציות קודמות על האלמנט
        gsap.killTweensOf(item);

        if (
          filterValue === 'all' ||
          item.getAttribute('data-category') === filterValue
        ) {
          item.style.display = 'block';
          gsap.fromTo(
            item,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: 'power2.out',
              delay: 0.1,
            }
          );
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // פונקציונליות של המודלים (Modals) עבור קורות החיים והדיפלומה
  const modals = document.querySelectorAll('.modal');
  const modalCloses = document.querySelectorAll('.close');
  const body = document.body;

  // פתיחת המודלים
  const openResumeButton = document.getElementById('openResumeButton');
  const openDiplomaButton = document.getElementById('openDiplomaButton');
  const documentModal = document.getElementById('documentModal');
  const documentIframe = document.getElementById('documentIframe');
  const mobileDownloadLink = document.getElementById('mobileDownloadLink');

  function openModal(filePath) {
    if (documentIframe) documentIframe.src = filePath;
    if (mobileDownloadLink) mobileDownloadLink.href = filePath;
    
    documentModal.classList.remove('hidden');
    // Small timeout to allow the transition to trigger
    setTimeout(() => {
      documentModal.classList.add('active');
    }, 10);
    body.style.overflow = 'hidden';
  }

  if (openResumeButton) {
    openResumeButton.addEventListener('click', () => openModal('Documents/Resume.pdf'));
  }

  if (openDiplomaButton) {
    openDiplomaButton.addEventListener('click', () => openModal('Documents/diploma.pdf'));
  }

  // סגירת המודלים
  modalCloses.forEach((close) => {
    close.addEventListener('click', () => {
      documentModal.classList.remove('active');
      setTimeout(() => {
        documentModal.classList.add('hidden');
        if (documentIframe) documentIframe.src = ''; // Clear src when closing
      }, 500); // Match CSS transition duration
      body.style.overflow = 'auto';
    });
  });

  // סגירת המודלים בעת לחיצה מחוץ לתוכן המודל
  window.addEventListener('click', (e) => {
    if (e.target === documentModal) {
      documentModal.classList.remove('active');
      setTimeout(() => {
        documentModal.classList.add('hidden');
        if (documentIframe) documentIframe.src = ''; // Clear src when closing
      }, 500);
      body.style.overflow = 'auto';
    }
  });

  // סגירת התפריט במובייל לאחר לחיצה על קישור
  const navLinks = document.querySelectorAll('.nav-menu a');
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      const menuToggle = document.getElementById('menu-toggle');
      if (menuToggle.checked) {
        menuToggle.checked = false;
      }
    });
  });

  // Button hover scale handled by magnetic effect in v3 module (no GSAP conflict)

  // אפקט פרלקס לתוכן ה-Hero ולעיגול לפי תנועת העכבר
  const heroContent = document.querySelector('.hero-content');
  const heroCircleWrapper = document.querySelector('.hero-circle-wrapper');
  const heroInteractiveCircle = document.querySelector('.hero-interactive-circle');
  
  document.addEventListener('mousemove', (e) => {
    // פרלקס לטקסט
    const x = (window.innerWidth / 2 - e.pageX) / 50;
    const y = (window.innerHeight / 2 - e.pageY) / 50;
    if (heroContent) heroContent.style.transform = `translate(${x}px, ${y}px)`;

    // פרלקס לעיגול - בדיוק כמו בכותרת! אותם כיוונים כדי שזה ישתלב בסינכרון
    if (heroCircleWrapper) {
      heroCircleWrapper.style.transform = `translate(${x}px, ${y}px)`;
    }

    // מעקב של מיקום העכבר על פני העיגול (תמיד יזהה את מרכז העיגול כנקודת האפס)
    if (heroInteractiveCircle) {
      const rect = heroInteractiveCircle.getBoundingClientRect();
      const circleCenterX = rect.left + rect.width / 2;
      const circleCenterY = rect.top + rect.height / 2;

      // חישוב המרחק של העכבר ממרכז העיגול (כדי שיעבוד מדויק לפי המיקום הפיזי של העיגול בצד ימין)
      const deltaX = e.clientX - circleCenterX;
      const deltaY = e.clientY - circleCenterY;

      // המרת המרחק לאחוזים יחסיים לגודל העיגול (מרכז = 50%, שמאל = 0%, ימין = 100% וכו')
      const radiusX = rect.width / 2 || 1;
      const radiusY = rect.height / 2 || 1;
      
      const percentX = (deltaX / radiusX) * 50 + 50;
      const percentY = (deltaY / radiusY) * 50 + 50;

      // Update the radial gradient to follow the mouse dynamically relative to the circle's center
      heroInteractiveCircle.style.background = `radial-gradient(circle at ${percentX}% ${percentY}%, rgba(48, 92, 222, 0.5) 0%, rgba(8, 186, 141, 0.2) 50%, rgba(5, 5, 5, 0.4) 100%)`;
      
      // האייקון שבפנים יטה בעקבות העכבר עם הגבלת זווית חכמה
      const icon = heroInteractiveCircle.querySelector('i');
      if (icon) {
        // חישוב הטייה
        const rawTiltX = (percentY - 50) * -0.3; 
        const rawTiltY = (percentX - 50) * 0.3;

        // הגבלת התנועה בין מינוס 15 לפלוס 15 מעלות (כדי שלא יתהפך כשהעכבר רחוק מדי)
        const maxTilt = 15;
        const tiltX = Math.max(-maxTilt, Math.min(maxTilt, rawTiltX));
        const tiltY = Math.max(-maxTilt, Math.min(maxTilt, rawTiltY));

        icon.style.transform = `perspective(500px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(15px)`;
      }
    }
  });

  // Particles.js לאפקט על תמונת הפרופיל
  particlesJS('particles-js', {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 500 } },
      color: { value: ['#305cde', '#4169e1', '#1e3a8a'] },
      shape: { type: 'circle' },
      opacity: { value: 0.5, random: true },
      size: { value: 5, random: true },
      move: {
        enable: true,
        speed: 1,
        direction: 'none',
        random: true,
        out_mode: 'out',
      },
    },
    interactivity: {
      detect_on: 'canvas',
      events: { onhover: { enable: false }, onclick: { enable: false } },
    },
    retina_detect: true,
  });

  // אנימציה עם GSAP בעת ריחוף על התמונה
  const aboutImage = document.querySelector('.about-image img');
  // Removed immediate animation to let ScrollTrigger handle it via .fade-in class

  aboutImage.addEventListener('mouseenter', () => {
    gsap.to(aboutImage, {
      scale: 1.2,
      rotation: 10,
      duration: 0.5,
      ease: 'power2.out',
    });
  });

  aboutImage.addEventListener('mouseleave', () => {
    gsap.to(aboutImage, {
      scale: 1,
      rotation: 0,
      duration: 0.5,
      ease: 'power2.out',
    });
  });

  // פונקציה לזיהוי מכשירי מגע
  function isTouchDevice() {
    return (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    );
  }

  // הסרת המצביע המותאם אישית במכשירי מגע
  if (false) { // Disabled custom JS cursor logic to remove the purple circle and trail
    document.body.classList.add('no-cursor');

    // מימוש מצביע מותאם אישית
    const cursor = document.createElement('div');
    cursor.classList.add('cursor');
    document.body.appendChild(cursor);

    const trailLength = 40; // מספר הנקודות בזנב - הוגדל לקבלת אפקט הילה ארוך
    const cursors = [];

    for (let i = 0; i < trailLength; i++) {
      const trailDot = document.createElement('div');
      trailDot.classList.add('cursor-trail');
      // Adding dynamic scaling so the tail tapers off smoothly
      const scale = 1 - (i / trailLength);
      trailDot.style.width = `${15 * scale}px`;
      trailDot.style.height = `${15 * scale}px`;
      
      document.body.appendChild(trailDot);
      cursors.push(trailDot);
    }

    let mouseX = 0;
    let mouseY = 0;
    let isMouseDown = false;

    const positions = [];

    for (let i = 0; i < trailLength; i++) {
      positions.push({ x: 0, y: 0 });
    }

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animate() {
      positions[0].x += (mouseX - positions[0].x) * 0.2;
      positions[0].y += (mouseY - positions[0].y) * 0.2;

      for (let i = 1; i < trailLength; i++) {
        positions[i].x += (positions[i - 1].x - positions[i].x) * 0.2;
        positions[i].y += (positions[i - 1].y - positions[i].y) * 0.2;
      }

      for (let i = 0; i < trailLength; i++) {
        cursors[i].style.transform = `translate(${positions[i].x}px, ${positions[i].y}px)`;
        cursors[i].style.opacity = (trailLength - i) / trailLength;
      }

      cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;

      requestAnimationFrame(animate);
    }

    animate();

    // פונקציה לעדכון נראות הזנב
    function updateCursorTrailVisibility() {
      if (cursor.classList.contains('cursor-active') || isMouseDown) {
        // הסתרת הזנב
        cursors.forEach((trailDot) => {
          trailDot.style.display = 'none';
        });
      } else {
        // הצגת הזנב
        cursors.forEach((trailDot) => {
          trailDot.style.display = 'block';
        });
      }
    }

    // זיהוי אלמנטים לחיצים
    const clickableElements = document.querySelectorAll(
      'a, button, .btn, input, textarea, select, .clickable'
    );

    clickableElements.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-active');
        updateCursorTrailVisibility();
      });

      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-active');
        updateCursorTrailVisibility();
      });
    });

    // אירועים ללחיצה ושחרור לחיצה
    document.addEventListener('mousedown', () => {
      isMouseDown = true;
      cursor.classList.add('cursor-click');
      updateCursorTrailVisibility();
    });

    document.addEventListener('mouseup', () => {
      isMouseDown = false;
      cursor.classList.remove('cursor-click');
      updateCursorTrailVisibility();
    });

    // הסתרת המצביע המותאם אישית כאשר העכבר מעל ה-iframe של קורות החיים
    const resumeIframe = document.querySelector('#resumeModal iframe');

    if (resumeIframe) {
      resumeIframe.addEventListener('mouseenter', () => {
        // הסתרת המצביע והזנב
        cursor.style.display = 'none';
        cursors.forEach((trailDot) => {
          trailDot.style.display = 'none';
        });
      });

      resumeIframe.addEventListener('mouseleave', () => {
        // הצגת המצביע והזנב מחדש
        cursor.style.display = 'block';
        cursors.forEach((trailDot) => {
          trailDot.style.display = 'block';
        });
      });
    }
  }

  // תיקון להצגת ה-PDF במובייל
  // אם ה-iframe לא נתמך, להציג קישור להורדה
  const iframe = document.getElementById('documentIframe');

  if (iframe) {
    iframe.addEventListener('load', () => {
      // בדיקה אם ה-iframe נטען כראוי
      try {
        if (iframe.contentDocument && iframe.contentDocument.body && iframe.contentDocument.body.childElementCount === 0) {
          // הצגה של כפתור ההורדה במקרה של כשל בטעינה (למרות שכבר יש לנו כזה במובייל)
          console.log('Iframe source might not be rendering properly');
        }
      } catch (e) {
        // Cross-origin issues might occur if files are served from some CDNs, 
        // but for local files it should be fine.
      }
    });
  }
});

// Magnetic hover glow positioning
document.addEventListener('DOMContentLoaded', () => {
  const magneticElements = document.querySelectorAll(
    '.btn, .portfolio-item > div, .skills-filter, .filter-btn, .timeline-item > div, .social-icon, .about-text-content, .skill-item, .contact-card'
  );

  magneticElements.forEach((el) => {
    // Add base class dynamically so we don't need 50 HTML edits
    el.classList.add('magnetic-glow');

    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      // Pass coordinates to CSS custom properties
      el.style.setProperty('--x', `${x}px`);
      el.style.setProperty('--y', `${y}px`);
    });
  });
});

// About Me Profile Image Color Wave Tracker
document.addEventListener('DOMContentLoaded', () => {
  const aboutImage = document.querySelector('.about-image');
  if (aboutImage) {
    let maskRadius = 0;
    let maskTargetRadius = 0;
    let maskBreathing = false;
    let maskTime = 0;

    function updateMask() {
      // Smooth growth transition (lerp)
      maskRadius += (maskTargetRadius - maskRadius) * 0.1;
      
      let currentDisplayRadius = maskRadius;
      
      // If fully grown, start breathing loop visually
      if (maskBreathing && maskRadius > 118) {
        currentDisplayRadius = 120 + Math.sin(maskTime) * 8; // +/- 8px breath
        maskTime += 0.04;
      } else {
        maskTime = 0;
      }
      
      aboutImage.style.setProperty('--flashlight-size', `${currentDisplayRadius}px`);
      requestAnimationFrame(updateMask);
    }
    
    // Start animation loop
    requestAnimationFrame(updateMask);

    aboutImage.addEventListener('mousemove', (e) => {
      const rect = aboutImage.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      aboutImage.style.setProperty('--wave-x', `${x}%`);
      aboutImage.style.setProperty('--wave-y', `${y}%`);
      
      maskTargetRadius = 120;
      maskBreathing = true;
    });

    aboutImage.addEventListener('mouseleave', () => {
      maskTargetRadius = 0;
      maskBreathing = false;
    });
  }
});

// Contact Form Logic
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('portfolio-contact-form');
  const contactFormContainer = document.getElementById('contact-form-container');
  const successMessage = document.getElementById('success-message');
  const charCounter = document.getElementById('char-counter');
  const messageInput = document.getElementById('message');

  if (contactForm) {
    // Character Counter
    if (messageInput && charCounter) {
      messageInput.addEventListener('input', () => {
        const length = messageInput.value.length;
        charCounter.textContent = `${length} / 500`;
        if (length >= 500) {
          charCounter.style.color = '#ff4444';
        } else {
          charCounter.style.color = 'rgba(255, 255, 255, 0.4)';
        }
      });
    }

    // Form Submission
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnContent = submitBtn.innerHTML;
      
      // Loading State
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Sending...</span>';

      try {
        const formData = new FormData(contactForm);
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData
        });

        const result = await response.json();

        if (result.success) {
          // Success Transition
          gsap.to(contactFormContainer, {
            opacity: 0,
            y: -20,
            duration: 0.5,
            onComplete: () => {
              contactFormContainer.style.display = 'none';
              successMessage.style.display = 'flex';
              gsap.fromTo(successMessage, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 });
            }
          });
        } else {
          alert('Something went wrong. Please try again.');
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnContent;
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Connection error. Please check your internet and try again.');
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnContent;
      }
    });
  }
});

/* =================================================================
   ULTRA REDESIGN v3 — JS modules
   Ambient canvas, scroll progress, section indicators, split-text,
   counters, magnetic buttons, 3D tilt, copy-to-clipboard toast,
   back-to-top, scroll-cue auto-hide.
   ================================================================= */
(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ----- helpers ------------------------------------------------- */
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const lerp = (a, b, t) => a + (b - a) * t;
  const clamp = (v, mn, mx) => Math.max(mn, Math.min(mx, v));

  /* ============================================================
     1) AMBIENT CANVAS  —  drifting aurora blobs (mouse-reactive)
     ============================================================ */
  const initAmbient = () => {
    const c = document.getElementById('ambient-canvas');
    if (!c || reduceMotion) return;

    const ctx = c.getContext('2d', { alpha: true });
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0, H = 0;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      c.width  = W * dpr;
      c.height = H * dpr;
      c.style.width  = W + 'px';
      c.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    // Blob field
    const blobs = [
      { x: 0.18, y: 0.30, r: 320, hue: '48,92,222',  alpha: 0.30, vx:  0.02, vy:  0.015, follow: 0.10 },
      { x: 0.78, y: 0.22, r: 280, hue: '8,186,141',  alpha: 0.28, vx: -0.025, vy: 0.020,  follow: 0.06 },
      { x: 0.55, y: 0.78, r: 380, hue: '48,92,222',  alpha: 0.22, vx:  0.018, vy: -0.022, follow: 0.04 },
      { x: 0.10, y: 0.85, r: 240, hue: '8,186,141',  alpha: 0.25, vx: -0.02,  vy: -0.015, follow: 0.03 },
    ];

    const mouse = { x: 0.5, y: 0.5 };
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX / window.innerWidth;
      mouse.y = e.clientY / window.innerHeight;
    }, { passive: true });

    const render = () => {
      // Soft trail (low-alpha black wash) for smooth drifting feel
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = 'rgba(5,5,5,0.92)';
      ctx.fillRect(0, 0, W, H);

      ctx.globalCompositeOperation = 'lighter';
      blobs.forEach((b, i) => {
        // Drift
        b.x += b.vx * 0.005;
        b.y += b.vy * 0.005;
        if (b.x < -0.1 || b.x > 1.1) b.vx *= -1;
        if (b.y < -0.1 || b.y > 1.1) b.vy *= -1;
        // Subtle gravitate toward mouse
        b.x = lerp(b.x, mouse.x, b.follow * 0.012);
        b.y = lerp(b.y, mouse.y, b.follow * 0.012);

        const cx = b.x * W;
        const cy = b.y * H;
        // Slowly modulate radius
        const r = b.r + Math.sin((performance.now() / 2000) + i) * 30;
        const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        grd.addColorStop(0,   `rgba(${b.hue}, ${b.alpha})`);
        grd.addColorStop(0.5, `rgba(${b.hue}, ${b.alpha * 0.4})`);
        grd.addColorStop(1,   'rgba(0,0,0,0)');
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalCompositeOperation = 'source-over';
      requestAnimationFrame(render);
    };
    render();
  };

  /* ============================================================
     2) SCROLL PROGRESS BAR
     ============================================================ */
  const initScrollProgress = () => {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;
    const update = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      bar.style.width = pct + '%';
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
  };

  /* ============================================================
     3) SECTION INDICATORS  —  highlight current section in view
     ============================================================ */
  const initSectionIndicators = () => {
    const indicators = $$('#section-indicators a');
    if (!indicators.length) return;
    const ids = indicators.map(a => a.getAttribute('href').slice(1));
    const sections = ids.map(id => document.getElementById(id)).filter(Boolean);

    const setActive = (id) => {
      indicators.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
    };

    const observer = new IntersectionObserver((entries) => {
      // Pick the entry with the largest intersection ratio that is intersecting
      let best = null;
      entries.forEach(e => {
        if (e.isIntersecting && (!best || e.intersectionRatio > best.intersectionRatio)) best = e;
      });
      if (best) setActive(best.target.id);
    }, { threshold: [0.2, 0.4, 0.6], rootMargin: '-20% 0px -40% 0px' });

    sections.forEach(s => observer.observe(s));

    // Smooth-scroll on click + keep active state in sync
    indicators.forEach(a => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        const id = a.getAttribute('href').slice(1);
        const target = document.getElementById(id);
        if (target) {
          window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
          setActive(id);
        }
      });
    });

    // Mirror state to the top nav links too
    const navLinks = $$('header .nav-menu a');
    const setNavActive = (id) => navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
    const navObserver = new IntersectionObserver((entries) => {
      let best = null;
      entries.forEach(e => { if (e.isIntersecting && (!best || e.intersectionRatio > best.intersectionRatio)) best = e; });
      if (best) setNavActive(best.target.id);
    }, { threshold: [0.2, 0.5], rootMargin: '-20% 0px -40% 0px' });
    sections.forEach(s => navObserver.observe(s));
  };

  /* ============================================================
     4) SPLIT-TEXT  —  animate hero title char-by-char
     ============================================================ */
  const initSplitText = () => {
    const targets = $$('[data-split]');
    targets.forEach(el => {
      // Wrap text into per-char spans. If `gradient` is true, each char gets its
      // own gradient-clip — necessary because background-clip:text doesn't
      // propagate from a parent to its descendants' own text.
      const wrap = (text, baseDelay, gradient) => {
        const frag = document.createDocumentFragment();
        Array.from(text).forEach((ch, i) => {
          if (ch === ' ') { frag.appendChild(document.createTextNode(' ')); return; }
          const span = document.createElement('span');
          span.className = 'split-char' + (gradient ? ' gradient-char' : '');
          span.textContent = ch;
          span.style.animationDelay = (baseDelay + i * 0.03) + 's';
          frag.appendChild(span);
        });
        return frag;
      };

      const process = (node, base, gradient) => {
        if (node.nodeType === Node.TEXT_NODE) {
          const frag = wrap(node.textContent, base.value, gradient);
          base.value += node.textContent.length * 0.03;
          node.parentNode.replaceChild(frag, node);
        } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName !== 'BR') {
          // Detect gradient/clip-text wrappers (Tailwind: bg-clip-text)
          const isClip = node.classList.contains('bg-clip-text') || node.classList.contains('text-transparent');
          const childGradient = gradient || isClip;
          Array.from(node.childNodes).forEach(child => process(child, base, childGradient));
        }
      };

      const base = { value: 0.05 };
      Array.from(el.childNodes).forEach(n => process(n, base, false));
    });
  };

  /* ============================================================
     5) ANIMATED COUNTERS  —  hero stats
     ============================================================ */
  const initCounters = () => {
    const targets = $$('[data-count]');
    if (!targets.length) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        if (el.dataset.done === '1') return;
        el.dataset.done = '1';
        const end = parseInt(el.dataset.count, 10) || 0;
        const suffix = el.dataset.suffix || '';
        const dur = 1400;
        const start = performance.now();
        const step = (t) => {
          const p = Math.min(1, (t - start) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(end * eased) + (p === 1 ? suffix : '');
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    }, { threshold: 0.4 });
    targets.forEach(t => observer.observe(t));
  };

  /* ============================================================
     6) MAGNETIC BUTTONS  —  pull toward cursor
     ============================================================ */
  const initMagnetic = () => {
    if (reduceMotion) return;
    const els = $$('.btn, .glass-btn-premium, .filter-btn, .skills-filter');
    els.forEach(el => {
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        const mx = e.clientX - r.left;
        const my = e.clientY - r.top;
        el.style.setProperty('--bx', mx + 'px');
        el.style.setProperty('--by', my + 'px');
        // Subtle physical pull + tiny scale lift
        const dx = (mx - r.width / 2) * 0.18;
        const dy = (my - r.height / 2) * 0.18;
        el.style.transform = `translate(${dx}px, ${dy}px) scale(1.04)`;
      });
      el.addEventListener('mouseleave', () => {
        el.style.transform = '';
      });
    });
  };

  /* ============================================================
     7) 3D TILT  —  skill cards + project cards
     ============================================================ */
  const initTilt = () => {
    if (reduceMotion) return;
    // 3D tilt only on portfolio cards. Skill cards keep their original look.
    $$('.portfolio-item > div').forEach(card => {
      const max = 8; // degrees
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const mx = e.clientX - r.left;
        const my = e.clientY - r.top;
        const px = (mx / r.width)  - 0.5;
        const py = (my / r.height) - 0.5;
        const rotY = clamp(px * (max * 2),  -max, max);
        const rotX = clamp(-py * (max * 2), -max, max);
        card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(0)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  };

  /* ============================================================
     8) COPY-TO-CLIPBOARD  +  TOAST
     ============================================================ */
  const showToast = (msg, icon = 'fa-check') => {
    const stack = document.getElementById('toast-stack');
    if (!stack) return;
    const t = document.createElement('div');
    t.className = 'toast';
    t.innerHTML = `<i class="fas ${icon}"></i><span>${msg}</span>`;
    stack.appendChild(t);
    setTimeout(() => t.remove(), 3200);
  };

  const initCopyOnClick = () => {
    const email = document.querySelector('a[href^="mailto:"]');
    const phone = document.querySelector('a[href^="tel:"]');

    [email, phone].forEach(el => {
      if (!el) return;
      el.addEventListener('click', (e) => {
        // Don't interrupt the actual mailto/tel intent — but copy in parallel.
        const value = el.getAttribute('href').replace(/^(mailto:|tel:)/, '');
        if (navigator.clipboard) {
          navigator.clipboard.writeText(value).then(() => {
            showToast('Copied to clipboard', 'fa-clipboard-check');
          }).catch(() => {});
        }
      });
    });
  };

  /* ============================================================
     9) BACK-TO-TOP
     ============================================================ */
  const initBackToTop = () => {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;
    const update = () => btn.classList.toggle('visible', window.scrollY > 600);
    window.addEventListener('scroll', update, { passive: true });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    update();
  };

  /* ============================================================
     10) SCROLL CUE  —  hide once user scrolls
     ============================================================ */
  const initScrollCue = () => {
    const cue = document.querySelector('.scroll-cue');
    if (!cue) return;
    const onScroll = () => {
      cue.style.opacity = window.scrollY > 80 ? '0' : '1';
      cue.style.transition = 'opacity 0.4s ease';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
  };

  /* ============================================================
     Boot
     ============================================================ */
  document.addEventListener('DOMContentLoaded', () => {
    // Ambient canvas disabled — background stays calm/static
    initScrollProgress();
    initSectionIndicators();
    initSplitText();
    initCounters();
    initMagnetic();
    initTilt();
    initCopyOnClick();
    initBackToTop();
    initScrollCue();
  });
})();
