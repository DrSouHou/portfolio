# Souhail HAFIDI — Engineering Portfolio & Admin CMS

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
  <img src="https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white" alt="Nginx" />
  <img src="https://img.shields.io/badge/License-MIT-0284C7?style=for-the-badge" alt="License" />
</p>

> **Personal engineering portfolio showcasing applied AI, full-stack architectures, digital health innovation, and embedded computing. Includes an in-browser client-side CMS with live editing and Docker containerization.**

---

## 🌟 Executive Summary

This repository houses the personal engineering portfolio of **Souhail HAFIDI** — second-year engineering student in **GDIAS** (*Génie Digital et Intelligence Artificielle en Santé*) at **Suptech Santé**, Morocco. 

Bridging the precision requirements of healthcare engineering with full-stack software architecture, applied machine learning, and microcontroller IoT, this single-page application demonstrates performance-first engineering, accessible interaction patterns, and zero-dependency client-side architecture.

---

## ⚡ Core Architecture & Highlights

| Capability | Technical Implementation |
| :--- | :--- |
| **Frontend Foundation** | Clean, semantic HTML5 structure with zero third-party framework overhead, accessible ARIA roles, and high-contrast typography. |
| **Design System** | Tailored color system (crisp slate-50 base, pure white surface cards, vibrant electric cyan/deep blue accents), smooth micro-interactions, and glassmorphism. |
| **Dynamic Data Engine** | Full client-side JavaScript data model with **Supabase cloud storage** persistence, dynamic DOM hydration, and real-time project filtering with animated reflows. |
| **In-Browser Super User CMS** | Built-in authentication gate (`DrSouHou` / `admin`), live `contenteditable` inline editing with dashed outline visual feedback, and real-time card CRUD. |
| **Profile Photo Customizer** | Real-time image upload (base64 `FileReader`) or remote URL input with a circular preview frame and one-click default reset. |
| **State Persistence & Backup** | One-click JSON data export (`portfolio-content.json`) to create permanent backups or migrate to external databases. |
| **Containerization** | Production-ready Alpine Nginx image with Gzip compression and security headers with a **~25MB footprint**. |

---

## 🚀 Featured Engineering Projects

### 1. [APEX DIGITAL Recruitment & Onboarding Platform](https://apexdigital.dpdns.org)
- **Role:** Head of Tech & Innovation / Lead Full-Stack Developer
- **Stack:** `Next.js` • `TypeScript` • `React` • `Tailwind CSS` • `Cloudflare Pages` • `Google Apps Script`
- **Architectural Impact:** Resolved multi-campus candidate triage bottlenecks by orchestrating a 4-level selection hierarchy with serverless webhooks, deployed with zero hosting cost on Cloudflare edge.

### 2. University Boarding Management Platform
- **Role:** Lead Backend & Full-Stack Engineer
- **Stack:** `REST APIs` • `NoSQL Modeling` • `RBAC Auth` • `CI/CD Pipelines` • `Full-Stack Architecture`
- **Architectural Impact:** Centralized residence governance, eliminated room allocation collisions, and provided real-time auditable tenant querying certified under a formal *Stage en alternance*.

### 3. [ESP32-S3 Digital Business Card & Workflow Launcher](https://github.com/DrSouHou/ESP32-S3-Digital-Card)
- **Role:** Embedded Systems Developer
- **Stack:** `C++` • `ESP32-S3 SoC` • `Embedded Sensors` • `GPIO & RGB PWM` • `USB HID`
- **Architectural Impact:** Fabricated physical computing interface providing contactless portfolio distribution and automated multi-monitor workstation desktop trigger macros.

### 4. HealthBridge AI: Multilingual Clinical Triage Framework
- **Role:** System Architect & AI Developer
- **Stack:** `FastAPI` • `React` • `Gemini API` • `XGBoost` • `SQLite` • `NLP Triage`
- **Architectural Impact:** Trilingual triage prototype (Moroccan Darija/Arabic, French, English) combining emergency rule safeguards with ML risk classification to prioritize clinical tiers.

---

## 🛠️ In-Browser Super User CMS

The portfolio includes an integrated client-side Content Management System:

1. **Trigger Access:**
   - Click the discrete **"Admin Portal"** link in the footer, or
   - Press the global keyboard shortcut: `Ctrl + Shift + A` (or `Cmd + Shift + A` on macOS).
2. **Authentication:**
   - **Username:** `DrSouHou`
   - **Password:** `admin`
3. **Live Features:**
   - ✏️ **Inline Text Editing:** Click any headline, role, or narrative to edit text directly.
   - 📷 **Change Profile Picture:** Upload a new local file or input an image URL with live circular preview.
   - ➕ **Add & Edit Projects:** Add new engineering records or edit existing ones via structured modal forms.
   - 💾 **Save Changes:** Persists live edits directly into Supabase cloud storage with automatic local caching.
   - 📥 **Export JSON:** Downloads `portfolio-content.json` containing the entire content state.
   - 🔄 **Reset to Defaults:** Restores original hardcoded data at any time.

---

## 💻 Local Setup & Deployment

### Method 1: Direct Local Preview (No Build Tools Required)

Because this application is built with vanilla web technologies, you can serve it with any static web server:

```bash
# Clone the repository
git clone https://github.com/DrSouHou/portfolio.git
cd portfolio

# Option A: Python HTTP server
python -m http.server 8080

# Option B: Node.js http-server
npx http-server -p 8080
```

Open your browser at `http://localhost:8080`.

---

### Method 2: Docker Containerization (Recommended for Production)

Run the high-performance containerized build using Docker:

```bash
# Build the Alpine Nginx Docker image (~25MB)
docker build -t drsouhou/portfolio .

# Run the container on port 8080
docker run -d -p 8080:80 --name souhail-portfolio drsouhou/portfolio
```

Navigate to `http://localhost:8080` to view the running container.

To stop and remove the container:
```bash
docker stop souhail-portfolio
docker rm souhail-portfolio
```

---

## 📁 Repository Directory Structure

```text
portfolio/
├── .dockerignore                 # Docker build exclusions
├── .gitignore                    # Git hygiene and exclusion rules
├── Dockerfile                    # Multi-stage Alpine Nginx container recipe
├── nginx.conf                    # Production server config with gzip & caching
├── index.html                    # Semantic HTML5 single-page application
├── style.css                     # Custom design tokens, layout & Light Theme
├── app.js                        # Data model, reactive CMS engine & UI logic
├── assets/
│   ├── docs/
│   │   └── Souhail_HAFIDI_CV.pdf # Official Curriculum Vitae
│   └── images/
│       └── profile.jpg           # High-resolution profile portrait
└── README.md                     # Engineering documentation
```

---

## 👨‍💻 Author & Identity

**Souhail HAFIDI** (سهيل حفيظي)  
*AI & Software Engineering Student | Digital Health Innovator*  
GDIAS Program — **Suptech Santé** (UM6SS ecosystem), Mohammedia, Morocco.

- **GitHub:** [@DrSouHou](https://github.com/DrSouHou)
- **Email:** [hafidisouhail02@gmail.com](mailto:hafidisouhail02@gmail.com)
- **Portfolio Demo:** [https://drsouhou.github.io/portfolio/](https://drsouhou.github.io/portfolio/)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) — free for personal and commercial adaptation with attribution.
