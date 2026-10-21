/**
 * LUNARIS — Main Application Logic
 * Clean, lightweight, reliable execution for accordions, navigation,
 * and recruitment validation.
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

  // 3. Setup Rules Accordion Click Handlers
  setupRulesAccordion();

  // 4. Recruitment Form Logic
  setupRecruitmentForm();

  // 5. Mobile Menu Logic
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

  function setupRulesAccordion() {
    const container = document.getElementById('rules-accordion');
    if (!container) return;

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

  function setupRecruitmentForm() {
    const form = document.getElementById('recruitment-form');
    const feedbackBox = document.getElementById('form-feedback');
    const submitBtn = document.getElementById('submit-app-btn');
    if (!form || !feedbackBox || !submitBtn) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const robloxUsername = document.getElementById('roblox-username').value.trim();
      const displayName = document.getElementById('display-name').value.trim();
      const experienceLevel = document.getElementById('experience-level').value;
      const combatStrengths = document.getElementById('combat-strengths').value.trim();
      const availability = document.getElementById('availability').value.trim();
      const joinReason = document.getElementById('join-reason').value.trim();

      if (!robloxUsername || !displayName || !experienceLevel || !combatStrengths || !joinReason) {
        showFeedback('Please fill out all required fields before submitting.', 'error');
        return;
      }

      // Anti-phishing guard: Reject passwords or sensitive keywords
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

      const webhookUrl = config.recruitmentWebhookUrl;

      if (webhookUrl && webhookUrl.startsWith('https://discord.com/api/webhooks/')) {
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

    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }
});
