/**
 * LUNARIS — Canvas Starfield & Cosmic Dust Engine
 * High-performance, lightweight ambient cosmic background
 */

(function () {
  const canvas = document.getElementById('lunar-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let stars = [];
  let dustParticles = [];
  let mouseX = 0, mouseY = 0;
  let targetMouseX = 0, targetMouseY = 0;
  let animationFrameId;

  // Respect user's motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initParticles();
  }

  function initParticles() {
    stars = [];
    dustParticles = [];

    // Scale particle count based on screen area to ensure smooth 60fps on mobile
    const starCount = Math.min(140, Math.floor((width * height) / 10000));
    const dustCount = Math.min(35, Math.floor((width * height) / 40000));

    // Deep field stars
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.2 + 0.4,
        alpha: Math.random() * 0.7 + 0.2,
        twinkleSpeed: (Math.random() * 0.015 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
        layer: Math.random() * 0.5 + 0.2 // Depth factor for parallax
      });
    }

    // Floating lunar dust
    for (let i = 0; i < dustCount; i++) {
      dustParticles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.2 + 1,
        color: Math.random() > 0.5 ? 'rgba(56, 189, 248, ' : 'rgba(203, 213, 225, ',
        alpha: Math.random() * 0.35 + 0.1,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.01
      });
    }
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Smooth mouse parallax easing
    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;

    // Draw twinkling stars
    for (let i = 0; i < stars.length; i++) {
      const s = stars[i];

      if (!prefersReducedMotion) {
        s.alpha += s.twinkleSpeed;
        if (s.alpha > 0.95 || s.alpha < 0.15) {
          s.twinkleSpeed = -s.twinkleSpeed;
        }
      }

      const renderX = s.x + mouseX * s.layer * 20;
      const renderY = s.y + mouseY * s.layer * 20;

      ctx.beginPath();
      ctx.arc(renderX, renderY, s.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(241, 245, 249, ${Math.max(0.1, Math.min(1, s.alpha))})`;
      ctx.shadowBlur = s.radius > 1 ? 4 : 0;
      ctx.shadowColor = 'rgba(186, 230, 253, 0.6)';
      ctx.fill();
    }
    ctx.shadowBlur = 0;

    // Draw floating cosmic dust
    for (let i = 0; i < dustParticles.length; i++) {
      const p = dustParticles[i];

      if (!prefersReducedMotion) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
      }

      ctx.beginPath();
      ctx.arc(p.x + mouseX * 35, p.y + mouseY * 35, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `${p.color}${p.alpha})`;
      ctx.fill();
    }

    if (!prefersReducedMotion) {
      animationFrameId = requestAnimationFrame(render);
    }
  }

  // Mouse move handler for gentle interactive depth
  window.addEventListener('mousemove', (e) => {
    if (prefersReducedMotion) return;
    targetMouseX = (e.clientX / width - 0.5);
    targetMouseY = (e.clientY / height - 0.5);
  }, { passive: true });

  window.addEventListener('resize', () => {
    resize();
    if (prefersReducedMotion) render();
  });

  // Init
  resize();
  render();
})();
