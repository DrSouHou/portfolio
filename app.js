/**
 * Souhail HAFIDI — Personal Engineering Portfolio
 * Architecture: Clean Vanilla JavaScript & In-Browser CMS Engine
 * Features:
 * - Dynamic data hydration from localStorage or default fallback
 * - Live on-page content editing (contenteditable)
 * - Super User Admin authentication (DrSouHou / admin)
 * - Dynamic project card rendering, filtering, adding, editing, deleting
 * - JSON data export & backup
 * - Reset to defaults
 * - Responsive navigation, scroll-spy, email clipboard copy, reveal animations
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     1. Portfolio Data Model & Default Fallback
     ========================================================================== */
  const defaultPortfolioData = {
    hero: {
      profileImg: 'assets/images/profile.jpg',
      statusBadge: '📍 Morocco • Open to PFA Engineering Internships (Summer 2027)',
      name: 'Souhail HAFIDI',
      rolePrimary: 'AI & Software Engineering Student',
      roleSecondary: 'Digital Health Innovator',
      headline: 'Engineering Intelligent Systems at the Intersection of <span class="gradient-text">AI, Software & Healthcare</span>.',
      subtext: 'Second-year engineering student in GDIAS (<em>Génie Digital et Intelligence Artificielle en Santé</em>) at Suptech Santé, Morocco. Combining healthcare domain precision, full-stack software architecture, and applied machine learning to build dependable, high-impact digital solutions.',
      baselineQuote: '"An emerging AI and software engineer combining healthcare-oriented engineering, full-stack development, technical leadership, and business awareness to build practical, intelligent digital solutions."'
    },
    about: {
      heading: 'Engineering Grounded in Real-World Medical Rigor',
      p1: 'My pathway into computer science and digital health is rooted in an unconventional, highly complementary background: <strong>dental prosthetics</strong>. In dental technology, error margins are calculated in fractions of a millimeter. A patient\'s outcome hinges directly on material mechanics, biocompatibility, strict protocols, and zero tolerance for functional failure.',
      p2: 'Transitioning into the <strong>GDIAS program (Génie Digital et Intelligence Artificielle en Santé)</strong> at <strong>Suptech Santé</strong>, I ported that foundational obsession with exactness into software architecture and applied artificial intelligence. I don\'t treat healthcare datasets as abstract tensors; I understand the clinical workflows, practitioner pressure points, and patient vulnerabilities behind the numbers.',
      p3: 'As an emerging engineer, my focus is not on claiming seniority, but on demonstrating <strong>rigorous initiative, proactive problem definition, and end-to-end execution</strong>. Whether orchestrating campus-scale cloud deployments, building responsive micro-services, or programming ESP32-S3 microcontrollers with custom sensory inputs, I engineer systems that are dependable, maintainable, and aligned with practical human needs.',
      quote: '"Software in healthcare cannot be built purely in the abstract. Real impact requires understanding both the code compiler and the clinical reality."'
    },
    projects: [
      {
        id: 'project-apex',
        title: 'APEX DIGITAL Recruitment & Onboarding Platform',
        category: 'fullstack',
        categoryTag: 'Full-Stack Platform',
        statusText: 'Live Production',
        statusType: 'live',
        role: 'Head of Tech & Innovation / Lead Full-Stack Developer',
        bottleneck: 'Student recruitment across multiple campuses and academic programs was severely throttled by manual Google Sheet triage, loss of candidate traceability, and disconnected evaluation scoring.',
        solution: 'Designed and deployed a unified multi-campus portal with a rigorous 4-level selection hierarchy. Engineered an automated serverless backend via Google Apps Script webhooks for real-time validation and dispatched the frontend globally on Cloudflare Pages edge network with zero hosting overhead.',
        techStack: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS', 'Cloudflare Pages', 'Google Apps Script'],
        actionUrl: 'https://apexdigital.dpdns.org',
        actionLabel: 'Visit Live Platform',
        isGithub: false,
        metaNote: 'Multi-Campus Deployment'
      },
      {
        id: 'project-boarding',
        title: 'University Boarding Management Platform',
        category: 'fullstack',
        categoryTag: 'Backend & Architecture',
        statusText: 'Academic Validation',
        statusType: 'completed',
        role: 'Lead Backend & Full-Stack Engineer',
        bottleneck: 'Decentralized student housing records caused double-allocation conflicts, untracked check-in/out statuses, and lack of real-time auditability for administrative staff.',
        solution: 'Engineered a centralized student residency governance platform. Structured modular REST API microservices, role-based access control (RBAC), and document-based NoSQL data modeling for rapid tenant querying, validated through a formal Stage en alternance certification.',
        techStack: ['REST APIs', 'NoSQL Modeling', 'Auth / RBAC', 'CI/CD Pipelines', 'Full-Stack Architecture'],
        actionUrl: '',
        actionLabel: '',
        isGithub: false,
        metaNote: 'Academic & Enterprise Validation',
        credentialBadge: 'Stage en alternance Certified'
      },
      {
        id: 'project-esp32',
        title: 'ESP32-S3 Digital Business Card & Workflow Launcher',
        category: 'hardware',
        categoryTag: 'Embedded IoT',
        statusText: 'Hardware Prototype',
        statusType: 'prototype',
        role: 'Embedded Systems Developer',
        bottleneck: 'Inefficient friction during in-person professional networking and repetitive manual launch sequences for multi-monitor developer workstation environments.',
        solution: 'Fabricated a physical-to-digital hardware interface running on an ESP32-S3 SoC. Implemented custom C++ firmware that drives programmable GPIO addressable RGB feedback, automated USB HID desktop workstation trigger macros, and instantaneous contactless portfolio distribution.',
        techStack: ['C++', 'ESP32-S3 SoC', 'Embedded Sensors', 'GPIO & RGB PWM', 'Hardware Automation'],
        actionUrl: 'https://github.com/DrSouHou/ESP32-S3-Digital-Card',
        actionLabel: 'DrSouHou / ESP32-S3-Digital-Card',
        isGithub: true,
        metaNote: 'Physical Computing'
      },
      {
        id: 'project-healthbridge',
        title: 'HealthBridge AI: Multilingual Clinical Triage Framework',
        category: 'ai-health',
        categoryTag: 'Digital Health AI',
        statusText: 'Concept MVP',
        statusType: 'concept',
        role: 'System Architect & AI Developer',
        bottleneck: 'Critical emergency room bottlenecking and patient intake confusion in bilingual and dialectal healthcare settings (Moroccan Darija/Arabic, French, English), leading to delayed clinical risk prioritization.',
        solution: 'Architected a preliminary triage and orientation framework combining rule-based emergency safeguards with Gemini API NLP extraction and an XGBoost severity categorization model. Provides structured patient orientation to primary, secondary, or immediate tertiary medical care tiers.',
        techStack: ['FastAPI', 'React', 'Gemini API', 'XGBoost', 'SQLite', 'NLP Triage'],
        actionUrl: '',
        actionLabel: '',
        isGithub: false,
        metaNote: 'GDIAS Innovation Concept',
        multilingualTags: ['Arabic / Darija', 'Français', 'English']
      }
    ]
  };

  const STORAGE_KEY = 'portfolio_data';
  const AUTH_KEY = 'isAdminLoggedIn';
  const ADMIN_USER = 'DrSouHou';
  const ADMIN_PASS = 'admin';

  /* ==========================================================================
     2. Storage & Hydration Utilities
     ========================================================================== */
  function loadStoredData() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        return {
          hero: { ...defaultPortfolioData.hero, ...(parsed.hero || {}) },
          about: { ...defaultPortfolioData.about, ...(parsed.about || {}) },
          projects: Array.isArray(parsed.projects) && parsed.projects.length > 0
            ? parsed.projects
            : defaultPortfolioData.projects
        };
      }
    } catch (err) {
      console.warn('Failed to parse portfolio_data from localStorage:', err);
    }
    return JSON.parse(JSON.stringify(defaultPortfolioData));
  }

  function saveStoredData(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (err) {
      console.error('Failed to save to localStorage:', err);
    }
  }

  let portfolioData = loadStoredData();

  function getNestedValue(obj, path) {
    return path.split('.').reduce((prev, curr) => (prev ? prev[curr] : undefined), obj);
  }

  function setNestedValue(obj, path, value) {
    const keys = path.split('.');
    const lastKey = keys.pop();
    const target = keys.reduce((prev, curr) => {
      if (!prev[curr]) prev[curr] = {};
      return prev[curr];
    }, obj);
    target[lastKey] = value;
  }

  function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  const heroProfileImg = document.getElementById('hero-profile-img');
  const avatarFallback = document.getElementById('avatar-fallback');

  function updateProfileImage(imgSrc) {
    if (!heroProfileImg) return;
    const finalSrc = imgSrc || 'assets/images/profile.jpg';
    heroProfileImg.src = finalSrc;
    heroProfileImg.classList.remove('img-hidden');
    if (avatarFallback) avatarFallback.classList.add('fallback-hidden');
  }

  function hydrateContentElements(data) {
    const elements = document.querySelectorAll('[data-cms-key]');
    elements.forEach(el => {
      const key = el.getAttribute('data-cms-key');
      const val = getNestedValue(data, key);
      if (val !== undefined) {
        el.innerHTML = val;
      }
    });
    if (data.hero && data.hero.profileImg) {
      updateProfileImage(data.hero.profileImg);
    }
  }

  function harvestContentElements(data) {
    const elements = document.querySelectorAll('[data-cms-key]');
    elements.forEach(el => {
      const key = el.getAttribute('data-cms-key');
      setNestedValue(data, key, el.innerHTML.trim());
    });
  }

  /* ==========================================================================
     3. Authentication & Admin Mode State
     ========================================================================== */
  function isAdmin() {
    return sessionStorage.getItem(AUTH_KEY) === 'true';
  }

  const adminBar = document.getElementById('admin-bar');
  const adminToast = document.getElementById('admin-toast');
  const toastMsg = document.getElementById('toast-message');
  let toastTimeout = null;

  function showToast(message, icon = '⚡', duration = 3000) {
    if (!adminToast || !toastMsg) return;
    toastMsg.textContent = message;
    const iconEl = adminToast.querySelector('.toast-icon');
    if (iconEl) iconEl.textContent = icon;
    adminToast.classList.remove('hidden');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      adminToast.classList.add('hidden');
    }, duration);
  }

  function setAdminMode(active) {
    const avatarEditBtn = document.getElementById('avatar-edit-btn');
    if (active) {
      document.body.classList.add('admin-mode-active');
      if (adminBar) adminBar.classList.remove('hidden');
      if (avatarEditBtn) avatarEditBtn.classList.remove('hidden');
      document.querySelectorAll('[data-cms-key]').forEach(el => {
        el.setAttribute('contenteditable', 'true');
        el.setAttribute('title', 'Click to edit text directly');
      });
    } else {
      document.body.classList.remove('admin-mode-active');
      if (adminBar) adminBar.classList.add('hidden');
      if (avatarEditBtn) avatarEditBtn.classList.add('hidden');
      document.querySelectorAll('[data-cms-key]').forEach(el => {
        el.removeAttribute('contenteditable');
        el.removeAttribute('title');
      });
    }
    renderProjects();
  }

  /* ==========================================================================
     4. Dynamic Project Cards Rendering & Category Counts
     ========================================================================== */
  const projectsGrid = document.getElementById('projects-grid');
  let currentFilter = 'all';

  function updateCategoryCounts() {
    const allCount = portfolioData.projects.length;
    const fullstackCount = portfolioData.projects.filter(p => p.category === 'fullstack').length;
    const aiHealthCount = portfolioData.projects.filter(p => p.category === 'ai-health').length;
    const hardwareCount = portfolioData.projects.filter(p => p.category === 'hardware').length;

    const countAllEl = document.getElementById('count-all');
    const countFullstackEl = document.getElementById('count-fullstack');
    const countAiHealthEl = document.getElementById('count-ai-health');
    const countHardwareEl = document.getElementById('count-hardware');

    if (countAllEl) countAllEl.textContent = allCount;
    if (countFullstackEl) countFullstackEl.textContent = fullstackCount;
    if (countAiHealthEl) countAiHealthEl.textContent = aiHealthCount;
    if (countHardwareEl) countHardwareEl.textContent = hardwareCount;
  }

  function renderProjects() {
    if (!projectsGrid) return;
    updateCategoryCounts();

    const adminActive = isAdmin();
    projectsGrid.innerHTML = '';

    portfolioData.projects.forEach((project, idx) => {
      const card = document.createElement('article');
      card.className = 'project-card card';
      card.setAttribute('data-category', project.category);
      card.id = project.id || `project-${idx}`;

      // Check filter
      if (currentFilter !== 'all' && project.category !== currentFilter) {
        card.classList.add('filtered-out');
      }

      // Tech tags HTML
      const techTagsHtml = (project.techStack || [])
        .map(t => `<span class="tech-tag">${escapeHtml(t)}</span>`)
        .join('');

      // Action / badge footer HTML
      let footerActionHtml = '';
      if (project.actionUrl) {
        const isGit = project.isGithub || project.actionUrl.includes('github.com');
        footerActionHtml = `
          <a href="${escapeHtml(project.actionUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-sm ${isGit ? 'btn-outline' : 'btn-primary'} project-action-btn" aria-label="${escapeHtml(project.actionLabel || 'Visit project')}">
            ${isGit ? `
              <svg class="icon icon-github" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            ` : ''}
            <span>${escapeHtml(project.actionLabel || (isGit ? 'View Repository' : 'Visit Platform'))}</span>
            ${!isGit ? `
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            ` : ''}
          </a>
        `;
      } else if (project.credentialBadge) {
        footerActionHtml = `
          <span class="credential-badge">
            <svg class="icon icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M12 15l-2 5l9-11h-7l2-5l-9 11h7z"></path>
            </svg>
            ${escapeHtml(project.credentialBadge)}
          </span>
        `;
      } else if (project.multilingualTags && project.multilingualTags.length > 0) {
        footerActionHtml = `
          <div class="multilingual-badge">
            ${project.multilingualTags.map(tag => `<span class="lang-tag">${escapeHtml(tag)}</span>`).join('')}
          </div>
        `;
      } else {
        footerActionHtml = '<span></span>';
      }

      // Admin Controls on Card
      const adminControlsHtml = adminActive ? `
        <div class="card-admin-actions">
          <button type="button" class="btn-card-admin btn-card-edit" data-id="${escapeHtml(project.id)}" title="Edit project details">
            <svg class="icon icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            <span>Edit</span>
          </button>
          <button type="button" class="btn-card-admin btn-card-delete" data-id="${escapeHtml(project.id)}" title="Delete project">
            <svg class="icon icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            <span>Delete</span>
          </button>
        </div>
      ` : '';

      card.innerHTML = `
        ${adminControlsHtml}
        <div class="project-header">
          <div class="status-badge-row">
            <span class="status-pill status-${escapeHtml(project.statusType || 'live')}">
              <span class="status-dot"></span> ${escapeHtml(project.statusText || 'Active')}
            </span>
            <span class="category-tag">${escapeHtml(project.categoryTag || 'Platform')}</span>
          </div>
          <h3 class="project-title">${escapeHtml(project.title)}</h3>
          <div class="role-tag">
            <svg class="icon icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span>Role: ${escapeHtml(project.role || 'Contributor')}</span>
          </div>
        </div>

        <div class="project-body">
          <div class="project-section">
            <h4 class="subhead">Operational Bottleneck</h4>
            <p class="project-text">${escapeHtml(project.bottleneck)}</p>
          </div>

          <div class="project-section">
            <h4 class="subhead">Architectural Solution</h4>
            <p class="project-text">${escapeHtml(project.solution)}</p>
          </div>

          <div class="project-tech-stack" aria-label="Technology stack used">
            ${techTagsHtml}
          </div>
        </div>

        <div class="project-footer">
          ${footerActionHtml}
          ${project.metaNote ? `<span class="project-meta-note">${escapeHtml(project.metaNote)}</span>` : ''}
        </div>
      `;

      projectsGrid.appendChild(card);
    });

    // Rebind project card admin buttons
    if (adminActive) {
      document.querySelectorAll('.btn-card-edit').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const projId = btn.getAttribute('data-id');
          openProjectEditor(projId);
        });
      });

      document.querySelectorAll('.btn-card-delete').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const projId = btn.getAttribute('data-id');
          deleteProject(projId);
        });
      });
    }
  }

  /* ==========================================================================
     5. Project Filtering Logic
     ========================================================================== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      currentFilter = btn.getAttribute('data-filter') || 'all';
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cards = document.querySelectorAll('.project-card');
      cards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (currentFilter === 'all' || cat === currentFilter) {
          card.classList.remove('filtered-out');
          card.style.opacity = '0';
          card.style.transform = 'translateY(14px)';
          requestAnimationFrame(() => {
            setTimeout(() => {
              card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 30);
          });
        } else {
          card.classList.add('filtered-out');
        }
      });
    });
  });

  /* ==========================================================================
     6. Admin Modal Controls: Login & Project Editor
     ========================================================================== */
  const loginModal = document.getElementById('admin-login-modal');
  const loginForm = document.getElementById('admin-login-form');
  const usernameInput = document.getElementById('admin-username');
  const passwordInput = document.getElementById('admin-password');
  const loginCloseBtn = document.getElementById('login-modal-close');
  const loginCancelBtn = document.getElementById('login-cancel-btn');
  const loginErrorMsg = document.getElementById('login-error-msg');
  const adminPortalTrigger = document.getElementById('admin-portal-trigger');

  function openLoginModal() {
    if (!loginModal) return;
    loginModal.classList.remove('hidden');
    if (loginErrorMsg) loginErrorMsg.classList.add('hidden');
    if (usernameInput) {
      usernameInput.value = '';
      setTimeout(() => usernameInput.focus(), 80);
    }
    if (passwordInput) passwordInput.value = '';
  }

  function closeLoginModal() {
    if (!loginModal) return;
    loginModal.classList.add('hidden');
  }

  if (adminPortalTrigger) {
    adminPortalTrigger.addEventListener('click', () => {
      if (isAdmin()) {
        showToast('Super User CMS mode is already active!', '⚡');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        openLoginModal();
      }
    });
  }

  if (loginCloseBtn) loginCloseBtn.addEventListener('click', closeLoginModal);
  if (loginCancelBtn) loginCancelBtn.addEventListener('click', closeLoginModal);
  if (loginModal) {
    loginModal.addEventListener('click', (e) => {
      if (e.target === loginModal) closeLoginModal();
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const user = (usernameInput ? usernameInput.value : '').trim();
      const pass = (passwordInput ? passwordInput.value : '').trim();

      if (user.toLowerCase() === ADMIN_USER.toLowerCase() && pass === ADMIN_PASS) {
        sessionStorage.setItem(AUTH_KEY, 'true');
        setAdminMode(true);
        closeLoginModal();
        loginForm.reset();
        showToast('Super User CMS unlocked! Live edit mode active.', '⚡');
      } else {
        if (loginErrorMsg) {
          loginErrorMsg.textContent = 'Invalid credentials. Demo: DrSouHou / admin';
          loginErrorMsg.classList.remove('hidden');
        }
      }
    });
  }

  // Keyboard shortcut: Ctrl + Shift + A / Cmd + Shift + A
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'a' || e.key === 'A')) {
      e.preventDefault();
      if (isAdmin()) {
        showToast('Super User CMS is active. Use the top bar or edit on page!', '⚡');
      } else {
        openLoginModal();
      }
    }
    if (e.key === 'Escape') {
      closeLoginModal();
      closeProjectEditor();
      closePhotoEditor();
    }
  });

  /* ==========================================================================
     7. Project Add, Edit & Delete Modal
     ========================================================================== */
  const editorModal = document.getElementById('project-editor-modal');
  const editorForm = document.getElementById('project-editor-form');
  const editorCloseBtn = document.getElementById('editor-modal-close');
  const editorCancelBtn = document.getElementById('editor-cancel-btn');
  const editorModalTitle = document.getElementById('editor-modal-title');
  const editProjectId = document.getElementById('edit-project-id');
  const editProjectTitle = document.getElementById('edit-project-title');
  const editProjectCategory = document.getElementById('edit-project-category');
  const editCategoryTag = document.getElementById('edit-category-tag');
  const editStatusBadge = document.getElementById('edit-status-badge');
  const editStatusType = document.getElementById('edit-status-type');
  const editRoleTag = document.getElementById('edit-role-tag');
  const editBottleneck = document.getElementById('edit-bottleneck');
  const editSolution = document.getElementById('edit-solution');
  const editTechStack = document.getElementById('edit-tech-stack');
  const editActionUrl = document.getElementById('edit-action-url');
  const editActionLabel = document.getElementById('edit-action-label');
  const editMetaNote = document.getElementById('edit-meta-note');

  function openProjectEditor(projectId = null) {
    if (!editorModal) return;
    editorModal.classList.remove('hidden');

    if (projectId) {
      const proj = portfolioData.projects.find(p => p.id === projectId);
      if (!proj) return;
      if (editorModalTitle) editorModalTitle.textContent = 'Edit Engineering Project';
      editProjectId.value = proj.id;
      editProjectTitle.value = proj.title || '';
      editProjectCategory.value = proj.category || 'fullstack';
      editCategoryTag.value = proj.categoryTag || '';
      editStatusBadge.value = proj.statusText || '';
      editStatusType.value = proj.statusType || 'live';
      editRoleTag.value = proj.role || '';
      editBottleneck.value = proj.bottleneck || '';
      editSolution.value = proj.solution || '';
      editTechStack.value = (proj.techStack || []).join(', ');
      editActionUrl.value = proj.actionUrl || '';
      editActionLabel.value = proj.actionLabel || '';
      editMetaNote.value = proj.metaNote || '';
    } else {
      if (editorModalTitle) editorModalTitle.textContent = 'Add New Engineering Project';
      editProjectId.value = '';
      editProjectTitle.value = '';
      editProjectCategory.value = 'fullstack';
      editCategoryTag.value = 'Full-Stack Platform';
      editStatusBadge.value = 'Prototype';
      editStatusType.value = 'prototype';
      editRoleTag.value = 'Lead Engineer';
      editBottleneck.value = '';
      editSolution.value = '';
      editTechStack.value = 'TypeScript, React, Python';
      editActionUrl.value = '';
      editActionLabel.value = '';
      editMetaNote.value = 'GDIAS Innovation Project';
    }

    setTimeout(() => {
      if (editProjectTitle) editProjectTitle.focus();
    }, 80);
  }

  function closeProjectEditor() {
    if (!editorModal) return;
    editorModal.classList.add('hidden');
  }

  if (editorCloseBtn) editorCloseBtn.addEventListener('click', closeProjectEditor);
  if (editorCancelBtn) editorCancelBtn.addEventListener('click', closeProjectEditor);
  if (editorModal) {
    editorModal.addEventListener('click', (e) => {
      if (e.target === editorModal) closeProjectEditor();
    });
  }

  if (editorForm) {
    editorForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = editProjectId.value.trim();
      const title = editProjectTitle.value.trim();
      const category = editProjectCategory.value;
      const categoryTag = editCategoryTag.value.trim();
      const statusText = editStatusBadge.value.trim();
      const statusType = editStatusType.value;
      const role = editRoleTag.value.trim();
      const bottleneck = editBottleneck.value.trim();
      const solution = editSolution.value.trim();
      const techStack = editTechStack.value
        .split(',')
        .map(t => t.trim())
        .filter(Boolean);
      const actionUrl = editActionUrl.value.trim();
      const actionLabel = editActionLabel.value.trim();
      const metaNote = editMetaNote.value.trim();

      if (id) {
        // Update existing project
        const index = portfolioData.projects.findIndex(p => p.id === id);
        if (index !== -1) {
          portfolioData.projects[index] = {
            ...portfolioData.projects[index],
            title,
            category,
            categoryTag,
            statusText,
            statusType,
            role,
            bottleneck,
            solution,
            techStack,
            actionUrl,
            actionLabel,
            metaNote
          };
          showToast(`Updated "${title}"`, '✏️');
        }
      } else {
        // Add new project
        const newProj = {
          id: 'project-' + Date.now(),
          title,
          category,
          categoryTag,
          statusText,
          statusType,
          role,
          bottleneck,
          solution,
          techStack,
          actionUrl,
          actionLabel,
          metaNote
        };
        portfolioData.projects.unshift(newProj);
        showToast(`Created new project "${title}"`, '🚀');
      }

      saveStoredData(portfolioData);
      renderProjects();
      closeProjectEditor();
    });
  }

  function deleteProject(projectId) {
    const proj = portfolioData.projects.find(p => p.id === projectId);
    const title = proj ? proj.title : 'this project';
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      portfolioData.projects = portfolioData.projects.filter(p => p.id !== projectId);
      saveStoredData(portfolioData);
      renderProjects();
      showToast(`Deleted "${title}"`, '🗑️');
    }
  }

  /* ==========================================================================
     8. Top Admin Bar Action Buttons
     ========================================================================== */
  const adminAddProjectBtn = document.getElementById('admin-add-project-btn');
  const adminPhotoBtn = document.getElementById('admin-photo-btn');
  const adminSaveBtn = document.getElementById('admin-save-btn');
  const adminExportBtn = document.getElementById('admin-export-btn');
  const adminResetBtn = document.getElementById('admin-reset-btn');
  const adminLogoutBtn = document.getElementById('admin-logout-btn');

  if (adminAddProjectBtn) {
    adminAddProjectBtn.addEventListener('click', () => {
      openProjectEditor();
    });
  }

  if (adminPhotoBtn) {
    adminPhotoBtn.addEventListener('click', () => {
      openPhotoEditor();
    });
  }

  if (adminSaveBtn) {
    adminSaveBtn.addEventListener('click', () => {
      harvestContentElements(portfolioData);
      saveStoredData(portfolioData);
      showToast('All on-page changes saved to localStorage!', '💾');
    });
  }

  if (adminExportBtn) {
    adminExportBtn.addEventListener('click', () => {
      harvestContentElements(portfolioData);
      const jsonStr = JSON.stringify(portfolioData, null, 2);
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const downloadLink = document.createElement('a');
      downloadLink.href = url;
      downloadLink.download = 'portfolio-content.json';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(url);
      showToast('Exported backup as portfolio-content.json', '📥');
    });
  }

  if (adminResetBtn) {
    adminResetBtn.addEventListener('click', () => {
      if (confirm('Reset all content and projects to initial defaults? Custom edits will be overwritten.')) {
        localStorage.removeItem(STORAGE_KEY);
        portfolioData = JSON.parse(JSON.stringify(defaultPortfolioData));
        hydrateContentElements(portfolioData);
        renderProjects();
        showToast('Portfolio restored to initial defaults.', '🔄');
      }
    });
  }

  if (adminLogoutBtn) {
    adminLogoutBtn.addEventListener('click', () => {
      sessionStorage.removeItem(AUTH_KEY);
      setAdminMode(false);
      showToast('Logged out of Super User mode.', '🚪');
    });
  }

  /* ==========================================================================
     8.5 Profile Photo Editor Modal
     ========================================================================== */
  const photoEditorModal = document.getElementById('photo-editor-modal');
  const photoEditorForm = document.getElementById('photo-editor-form');
  const photoCloseBtn = document.getElementById('photo-modal-close');
  const photoCancelBtn = document.getElementById('photo-cancel-btn');
  const photoResetBtn = document.getElementById('photo-reset-btn');
  const photoFileInput = document.getElementById('photo-file-input');
  const photoFileNameDisplay = document.getElementById('photo-file-name-display');
  const photoUrlInput = document.getElementById('photo-url-input');
  const photoPreviewImg = document.getElementById('photo-preview-img');
  const avatarEditBtn = document.getElementById('avatar-edit-btn');

  function openPhotoEditor() {
    if (!photoEditorModal) return;
    photoEditorModal.classList.remove('hidden');
    const currentSrc = (portfolioData.hero && portfolioData.hero.profileImg) || 'assets/images/profile.jpg';
    if (photoPreviewImg) photoPreviewImg.src = currentSrc;
    if (photoUrlInput) {
      photoUrlInput.value = currentSrc.startsWith('data:') ? '' : (currentSrc !== 'assets/images/profile.jpg' ? currentSrc : '');
    }
    if (photoFileNameDisplay) photoFileNameDisplay.textContent = 'Choose image file from device...';
    if (photoFileInput) photoFileInput.value = '';
  }

  function closePhotoEditor() {
    if (!photoEditorModal) return;
    photoEditorModal.classList.add('hidden');
  }

  if (avatarEditBtn) avatarEditBtn.addEventListener('click', openPhotoEditor);
  if (photoCloseBtn) photoCloseBtn.addEventListener('click', closePhotoEditor);
  if (photoCancelBtn) photoCancelBtn.addEventListener('click', closePhotoEditor);
  if (photoEditorModal) {
    photoEditorModal.addEventListener('click', (e) => {
      if (e.target === photoEditorModal) closePhotoEditor();
    });
  }

  if (photoFileInput) {
    photoFileInput.addEventListener('change', () => {
      const file = photoFileInput.files[0];
      if (file) {
        if (photoFileNameDisplay) photoFileNameDisplay.textContent = file.name;
        const reader = new FileReader();
        reader.onload = (e) => {
          if (photoPreviewImg) photoPreviewImg.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  }

  if (photoUrlInput) {
    photoUrlInput.addEventListener('input', () => {
      const url = photoUrlInput.value.trim();
      if (url && photoPreviewImg) {
        photoPreviewImg.src = url;
      }
    });
  }

  if (photoResetBtn) {
    photoResetBtn.addEventListener('click', () => {
      const defaultSrc = 'assets/images/profile.jpg';
      if (!portfolioData.hero) portfolioData.hero = {};
      portfolioData.hero.profileImg = defaultSrc;
      updateProfileImage(defaultSrc);
      saveStoredData(portfolioData);
      if (photoPreviewImg) photoPreviewImg.src = defaultSrc;
      closePhotoEditor();
      showToast('Profile photo reset to default.', '🔄');
    });
  }

  if (photoEditorForm) {
    photoEditorForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const newSrc = photoPreviewImg ? photoPreviewImg.src : '';
      if (newSrc) {
        if (!portfolioData.hero) portfolioData.hero = {};
        portfolioData.hero.profileImg = newSrc;
        updateProfileImage(newSrc);
        saveStoredData(portfolioData);
        showToast('Profile picture updated successfully!', '📷');
      }
      closePhotoEditor();
    });
  }

  /* ==========================================================================
     9. Initial Hydration & State Setup
     ========================================================================== */
  hydrateContentElements(portfolioData);
  renderProjects();
  if (isAdmin()) {
    setAdminMode(true);
  }

  /* ==========================================================================
     10. Mobile Navigation Drawer
     ========================================================================== */
  const header = document.getElementById('header');
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileClose = document.getElementById('mobile-close');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link, .mobile-drawer-cta');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id], footer[id]');

  function openMobileDrawer() {
    if (!mobileDrawer || !mobileToggle) return;
    mobileDrawer.classList.add('open');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    mobileToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileDrawer() {
    if (!mobileDrawer || !mobileToggle) return;
    mobileDrawer.classList.remove('open');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = mobileDrawer.classList.contains('open');
      if (isOpen) {
        closeMobileDrawer();
      } else {
        openMobileDrawer();
      }
    });
  }

  if (mobileClose) mobileClose.addEventListener('click', closeMobileDrawer);
  if (mobileDrawer) {
    mobileDrawer.addEventListener('click', (e) => {
      if (e.target === mobileDrawer) closeMobileDrawer();
    });
  }
  mobileNavLinks.forEach(link => link.addEventListener('click', closeMobileDrawer));

  /* ==========================================================================
     11. Smooth Anchor Scrolling with Header Offset
     ========================================================================== */
  const internalAnchors = document.querySelectorAll('a[href^="#"]');
  internalAnchors.forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerHeight = header ? header.offsetHeight : 74;
        const adminOffset = isAdmin() ? 54 : 0;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - (headerHeight + adminOffset + 12);

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  /* ==========================================================================
     12. Scroll Spy Navigation Highlight
     ========================================================================== */
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}` || link.dataset.section === id) {
            link.classList.add('active');
          }
        });
      }
    });
  }, {
    root: null,
    rootMargin: '-20% 0px -65% 0px',
    threshold: 0
  });

  sections.forEach(sec => sectionObserver.observe(sec));

  /* ==========================================================================
     13. Copy Email to Clipboard
     ========================================================================== */
  const copyBtn = document.getElementById('copy-email-btn');
  const emailInput = document.getElementById('email-address-field');
  const copyBtnText = document.getElementById('copy-btn-text');
  const copyIcon = document.getElementById('copy-icon');
  const checkIcon = document.getElementById('check-icon');
  const copyFeedback = document.getElementById('copy-feedback');

  if (copyBtn && emailInput) {
    let copyEmailTimeout = null;

    copyBtn.addEventListener('click', async () => {
      const emailToCopy = emailInput.value.trim();
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(emailToCopy);
        } else {
          emailInput.select();
          document.execCommand('copy');
        }

        if (copyIcon && checkIcon && copyBtnText) {
          copyIcon.classList.add('hidden');
          checkIcon.classList.remove('hidden');
          copyBtnText.textContent = 'Copied!';
          copyBtn.style.background = 'linear-gradient(135deg, #059669 0%, #10b981 100%)';
          copyBtn.style.boxShadow = '0 4px 18px rgba(16, 185, 129, 0.4)';
        }

        if (copyFeedback) {
          copyFeedback.textContent = '✓ Email copied to clipboard: ' + emailToCopy;
          copyFeedback.className = 'copy-feedback-msg success';
        }

        clearTimeout(copyEmailTimeout);
        copyEmailTimeout = setTimeout(() => {
          if (copyIcon && checkIcon && copyBtnText) {
            copyIcon.classList.remove('hidden');
            checkIcon.classList.add('hidden');
            copyBtnText.textContent = 'Copy Email';
            copyBtn.style.background = '';
            copyBtn.style.boxShadow = '';
          }
          if (copyFeedback) {
            copyFeedback.textContent = '';
          }
        }, 2200);

      } catch (err) {
        console.error('Failed to copy email:', err);
        if (copyFeedback) {
          copyFeedback.textContent = 'Please copy manually: ' + emailToCopy;
          copyFeedback.className = 'copy-feedback-msg';
        }
      }
    });
  }

  /* ==========================================================================
     14. Scroll Reveal Animations
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = entry.target.getAttribute('data-delay') || 0;
          setTimeout(() => {
            entry.target.classList.add('active');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('active'));
  }

  /* ==========================================================================
     15. Header Elevation on Scroll
     ========================================================================== */
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.style.backgroundColor = 'rgba(255, 255, 255, 0.96)';
      header.style.boxShadow = '0 4px 20px rgba(15, 23, 42, 0.08)';
    } else {
      header.style.backgroundColor = 'var(--bg-glass)';
      header.style.boxShadow = 'none';
    }
  }, { passive: true });
});
