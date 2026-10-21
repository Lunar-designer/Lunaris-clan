/**
 * LUNARIS — Main Application Logic
 * Renders data from clan-config.js, handles rules accordions, mobile menu,
 * and handles recruitment form validation with webhook support.
 */

document.addEventListener('DOMContentLoaded', () => {
  const config = window.CLAN_CONFIG || {};

  // 1. Dynamic Footer Year
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Setup Discord & External Links
  setupLinks();

  // 3. Render Objectives
  renderObjectives();

  // 4. Render Members Showcase
  renderMembers();

  // 5. Render Rules Accordions
  renderRules();

  // 6. Render Activities
  renderActivities();

  // 7. Render Schedule
  renderSchedule();

  // 8. Render Achievements & Statistics
  renderStatistics();

  // 9. Recruitment Form Logic
  setupRecruitmentForm();

  // 10. Mobile Menu Logic
  setupMobileMenu();

  /* -------------------------------------------------------------
   * FUNCTIONS
   * ------------------------------------------------------------- */

  function setupLinks() {
    const invite = config.discordInvite || 'https://discord.gg/ajQB3fH4rZ';
    document.querySelectorAll('.discord-link').forEach(link => {
      link.href = invite;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    });

    // Optional Roblox group link
    const groupLink = document.getElementById('roblox-group-link');
    if (groupLink) {
      if (config.robloxGroup && config.robloxGroup.trim() !== '') {
        groupLink.href = config.robloxGroup;
        groupLink.style.display = 'inline-flex';
      } else {
        groupLink.style.display = 'none';
      }
    }
  }

  function getIconSvg(name) {
    // Elegant SVG icons mapped by name
    const icons = {
      'swords': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"/><line x1="13" y1="19" x2="19" y2="13"/><line x1="16" y1="16" x2="20" y2="20"/><line x1="19" y1="21" x2="21" y2="19"/><polyline points="14.5 6.5 18 3 21 3 21 6 17.5 9.5"/><line x1="5" y1="14" x2="9" y2="18"/><line x1="7" y1="17" x2="4" y2="20"/><line x1="3" y1="19" x2="5" y2="21"/></svg>',
      'trending-up': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>',
      'shield': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
      'zap': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
      'trophy': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.45 1-1 1H8c-.55 0-1 .45-1 1v1h10v-1c0-.55-.45-1-1-1h-1c-.55 0-1-.45-1-1v-2.34"/><path d="M18 4H6v7a6 6 0 0 0 12 0V4z"/></svg>',
      'users': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
      'crosshair': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="22" y1="12" x2="18" y2="12"/><line x1="6" y1="12" x2="2" y2="12"/><line x1="12" y1="6" x2="12" y2="2"/><line x1="12" y1="22" x2="12" y2="18"/></svg>',
      'scale': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>',
      'moon': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
      'crossed-swords': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
      'handshake': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m11 17 2 2a1 1 0 0 0 1.4 0l4.3-4.3a1 1 0 0 0 0-1.4l-2.3-2.3"/><path d="m14 14 2.5 2.5a1 1 0 0 0 1.4 0l2.3-2.3a1 1 0 0 0 0-1.4L18 10.5"/><path d="m10 7-5 5a2 2 0 0 0 0 2.8l3.4 3.4a2 2 0 0 0 2.8 0l5-5"/><path d="M18 7l-2-2a2 2 0 0 0-2.8 0l-5 5"/></svg>',
      'flame': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>',
      'target': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
      'user-check': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><polyline points="17 11 19 13 23 9"/></svg>',
      'sparkles': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/></svg>'
    };
    return icons[name] || icons['moon'];
  }

  function renderObjectives() {
    const container = document.getElementById('objectives-grid');
    if (!container || !config.objectives) return;

    container.innerHTML = config.objectives.map((obj, idx) => `
      <div class="objective-card interactive-card stagger-item" style="--stagger-delay: ${idx * 0.1}s">
        <div class="card-glow-layer"></div>
        <div class="card-header-row">
          <div class="objective-icon-badge">
            ${getIconSvg(obj.icon)}
          </div>
          <span class="objective-index">0${obj.id}</span>
        </div>
        <h3 class="objective-title">${obj.title}</h3>
        <p class="objective-desc">${obj.description}</p>
        <div class="card-subtle-line"></div>
      </div>
    `).join('');
  }

  function renderMembers() {
    const container = document.getElementById('members-grid');
    if (!container || !config.members) return;

    container.innerHTML = config.members.map((m, idx) => `
      <div class="member-card interactive-card stagger-item" style="--stagger-delay: ${idx * 0.12}s">
        <div class="card-glow-layer"></div>
        <div class="member-avatar-wrap">
          <img src="${m.avatar}" alt="${m.displayName}" class="member-avatar" loading="lazy" />
          <div class="avatar-ring"></div>
        </div>
        <div class="member-info">
          <h3 class="member-display-name">${m.displayName}</h3>
          <span class="member-roblox-handle">Roblox: @${m.robloxUsername}</span>
          ${m.discordUsername ? `<span class="member-discord-tag"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg> ${m.discordUsername}</span>` : ''}
          ${m.bio ? `<p class="member-bio">${m.bio}</p>` : ''}
        </div>
      </div>
    `).join('');
  }

  function renderRules() {
    const container = document.getElementById('rules-accordion');
    if (!container || !config.rules) return;

    container.innerHTML = config.rules.map((rule, idx) => `
      <div class="rule-group stagger-item ${idx === 0 ? 'is-open' : ''}" data-rule-id="${rule.id}">
        <button class="rule-group-header" aria-expanded="${idx === 0 ? 'true' : 'false'}" aria-controls="rule-content-${rule.id}">
          <div class="rule-title-wrap">
            <span class="rule-num">0${idx + 1}</span>
            <div>
              <h3 class="rule-group-title">${rule.title}</h3>
              <p class="rule-group-subtitle">${rule.subtitle}</p>
            </div>
          </div>
          <span class="rule-chevron-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
          </span>
        </button>
        <div id="rule-content-${rule.id}" class="rule-content" style="${idx === 0 ? 'max-height: 500px;' : 'max-height: 0px;'}">
          <ul class="rule-item-list">
            ${rule.items.map(item => `
              <li class="rule-item">
                <span class="rule-bullet-moon"></span>
                <span>${item}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      </div>
    `).join('');

    // Accordion click handlers
    container.querySelectorAll('.rule-group-header').forEach(btn => {
      btn.addEventListener('click', () => {
        const group = btn.closest('.rule-group');
        const content = group.querySelector('.rule-content');
        const isOpen = group.classList.contains('is-open');

        if (isOpen) {
          group.classList.remove('is-open');
          btn.setAttribute('aria-expanded', 'false');
          content.style.maxHeight = '0px';
        } else {
          group.classList.add('is-open');
          btn.setAttribute('aria-expanded', 'true');
          content.style.maxHeight = `${content.scrollHeight + 30}px`;
        }
      });
    });
  }

  function renderActivities() {
    const container = document.getElementById('activities-grid');
    if (!container || !config.activities) return;

    container.innerHTML = config.activities.map((act, idx) => `
      <div class="activity-card interactive-card stagger-item" style="--stagger-delay: ${idx * 0.1}s">
        <div class="card-glow-layer"></div>
        <div class="activity-top-row">
          <span class="activity-tag">${act.category}</span>
          <div class="activity-icon-badge">${getIconSvg(act.icon)}</div>
        </div>
        <h3 class="activity-title">${act.title}</h3>
        <p class="activity-desc">${act.description}</p>
      </div>
    `).join('');
  }

  function renderSchedule() {
    const container = document.getElementById('schedule-list');
    if (!container || !config.sampleSchedule) return;

    container.innerHTML = config.sampleSchedule.map(item => `
      <div class="schedule-item">
        <div class="schedule-left">
          <span class="schedule-badge">${item.type}</span>
          <h4 class="schedule-event-name">${item.event}</h4>
          <span class="schedule-status">${item.status}</span>
        </div>
        <div class="schedule-right">
          <span class="schedule-day">${item.day}</span>
        </div>
      </div>
    `).join('');
  }

  function renderStatistics() {
    const container = document.getElementById('stats-grid');
    if (!container || !config.statistics) return;

    container.innerHTML = config.statistics.map((st, idx) => `
      <div class="stat-card interactive-card stagger-item" style="--stagger-delay: ${idx * 0.1}s">
        <div class="card-glow-layer"></div>
        <span class="stat-label">${st.label}</span>
        <div class="stat-value-wrap">
          <span class="stat-value ${st.isPlaceholder ? 'placeholder-val' : 'active-val'}">${st.value}</span>
        </div>
        <p class="stat-subtext">${st.subtext}</p>
      </div>
    `).join('');
  }

  function setupRecruitmentForm() {
    const form = document.getElementById('recruitment-form');
    const feedbackBox = document.getElementById('form-feedback');
    const submitBtn = document.getElementById('submit-app-btn');
    if (!form || !feedbackBox || !submitBtn) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Form values
      const robloxUsername = document.getElementById('roblox-username').value.trim();
      const displayName = document.getElementById('display-name').value.trim();
      const experienceLevel = document.getElementById('experience-level').value;
      const combatStrengths = document.getElementById('combat-strengths').value.trim();
      const availability = document.getElementById('availability').value.trim();
      const joinReason = document.getElementById('join-reason').value.trim();

      // Client-side validation
      if (!robloxUsername || !displayName || !experienceLevel || !combatStrengths || !joinReason) {
        showFeedback('Please fill out all required fields before submitting.', 'error');
        return;
      }

      // Check for security / credentials warning (Anti-phishing guard)
      const sensitiveKeywords = ['password', 'pass', 'pin', 'login', 'token', '2fa'];
      const combinedText = `${robloxUsername} ${displayName} ${combatStrengths} ${joinReason}`.toLowerCase();
      for (const kw of sensitiveKeywords) {
        if (combinedText.includes(kw)) {
          showFeedback('Security Notice: Never share passwords, pins, or sensitive account credentials.', 'error');
          return;
        }
      }

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="spinner"></span> Processing Application...';

      // Check if Discord Webhook URL is configured in clan-config.js
      const webhookUrl = config.recruitmentWebhookUrl;

      if (webhookUrl && webhookUrl.startsWith('https://discord.com/api/webhooks/')) {
        // Real submission via Discord Webhook
        try {
          const payload = {
            embeds: [{
              title: "🌙 New LUNARIS Clan Recruitment Application",
              color: 0x38bdf8,
              fields: [
                { name: "Roblox Username", value: robloxUsername, inline: true },
                { name: "Display Name", value: displayName, inline: true },
                { name: "Experience Level", value: experienceLevel, inline: true },
                { name: "Combat Strengths", value: combatStrengths, inline: false },
                { name: "Availability", value: availability || "Not specified", inline: true },
                { name: "Reason for Joining", value: joinReason, inline: false }
              ],
              footer: { text: "LUNARIS TSB Clan • Recruitment System" },
              timestamp: new Date().toISOString()
            }]
          };

          const res = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });

          if (res.ok) {
            showFeedback('Application submitted directly to LUNARIS Clan leadership! Please join our Discord server for tryout scheduling.', 'success');
            form.reset();
          } else {
            showFeedback('Submission notice: Discord webhook rejected the request. Please verify your webhook URL in js/clan-config.js.', 'warning');
          }
        } catch (err) {
          console.error(err);
          showFeedback('Network notice: Unable to contact webhook. Please join our Discord server to submit directly.', 'warning');
        }
      } else {
        // Demonstration Mode (As requested by specification)
        setTimeout(() => {
          showFeedback(
            '<strong>Demonstration Mode:</strong> Application verified successfully!<br/>' +
            '<em>Note:</em> Static hosting does not store database entries. To receive real applications in your Discord staff channel, simply add your Discord Webhook URL inside <code>js/clan-config.js</code>.',
            'info'
          );
          form.reset();
        }, 600);
      }

      submitBtn.disabled = false;
      submitBtn.innerHTML = 'SUBMIT APPLICATION';
    });

    function showFeedback(msg, type) {
      feedbackBox.className = `form-feedback-box ${type}`;
      feedbackBox.innerHTML = msg;
      feedbackBox.style.display = 'block';
      feedbackBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  function setupMobileMenu() {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-nav-menu');
    const mobileOverlay = document.getElementById('mobile-overlay');

    if (!hamburgerBtn || !mobileMenu) return;

    function toggleMenu() {
      const isOpen = mobileMenu.classList.contains('active');
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    }

    function openMenu() {
      hamburgerBtn.classList.add('open');
      hamburgerBtn.setAttribute('aria-expanded', 'true');
      mobileMenu.classList.add('active');
      if (mobileOverlay) mobileOverlay.classList.add('active');
      document.body.classList.add('no-scroll');
    }

    function closeMenu() {
      hamburgerBtn.classList.remove('open');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      mobileMenu.classList.remove('active');
      if (mobileOverlay) mobileOverlay.classList.remove('active');
      document.body.classList.remove('no-scroll');
    }

    hamburgerBtn.addEventListener('click', toggleMenu);
    if (mobileOverlay) mobileOverlay.addEventListener('click', closeMenu);

    // Close when clicking any mobile nav link
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }
});
