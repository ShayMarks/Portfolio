// script.js

// המתנה לטעינת ה-DOM לפני הרצת הסקריפטים
document.addEventListener('DOMContentLoaded', () => {
  // פונקציונליות של המסך הטעינה (Preloader)
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    preloader.classList.add('fade-out');
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 1000);
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

  // Particles.js לרקע אינטראקטיבי בקטע ה-Hero
  particlesJS('hero-canvas', {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: '#ffffff' },
      shape: {
        type: 'circle',
        stroke: { width: 0, color: '#000000' },
        polygon: { nb_sides: 5 },
      },
      opacity: {
        value: 0.5,
        random: false,
        anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false },
      },
      size: {
        value: 3,
        random: true,
        anim: { enable: false, speed: 40, size_min: 0.1, sync: false },
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: '#ffffff',
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 6,
        direction: 'none',
        random: false,
        straight: false,
        out_mode: 'out',
        bounce: false,
        attract: { enable: false, rotateX: 600, rotateY: 1200 },
      },
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: { enable: true, mode: 'grab' },
        onclick: { enable: true, mode: 'push' },
        resize: true,
      },
      modes: {
        grab: { distance: 140, line_linked: { opacity: 1 } },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: 8,
          speed: 3,
        },
        repulse: { distance: 200, duration: 0.4 },
        push: { particles_nb: 4 },
        remove: { particles_nb: 2 },
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
        start: 'top 95%',
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
        start: 'top 95%',
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

  // אפקט ריחוף לכפתורים
  document.querySelectorAll('.btn').forEach((button) => {
    button.addEventListener('mouseenter', () => {
      gsap.to(button, {
        scale: 1.05,
        duration: 0.3,
        ease: 'power2.out',
      });
    });
    button.addEventListener('mouseleave', () => {
      gsap.to(button, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    });
  });

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
      heroInteractiveCircle.style.background = `radial-gradient(circle at ${percentX}% ${percentY}%, rgba(188, 19, 254, 0.5) 0%, rgba(8, 186, 141, 0.2) 50%, rgba(5, 5, 5, 0.4) 100%)`;
      
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
      color: { value: ['#bc13fe', '#4713fe', '#1355fe'] },
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
