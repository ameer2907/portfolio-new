

# 🚌 Interactive Journey Portfolio — "From Zero to AI Engineer"

## Overview
A visually stunning, scroll-driven storytelling portfolio for **K. Ameer Malik Bahad** where the user experiences a bus journey through career milestones. Dark navy theme with cyan accents, glassmorphism cards, and smooth scroll animations.

---

## Design System
- **Theme**: Dark navy (#0a0f1e) background with cyan/electric blue (#00d4ff) accents
- **Cards**: Glassmorphism style (semi-transparent backgrounds, blur, soft borders)
- **Typography**: Clean, modern with gradient text highlights
- **Animations**: CSS scroll-triggered fade-ins, scale effects, and a moving bus/road progress indicator

---

## Sections (Journey Stops)

### 🏁 Hero / Start Point — Bus Depot
- Full-screen landing with name "K. Ameer Malik Bahad"
- Title: "B.Tech CSE – Data Science & AI"
- Tagline: "Turning Ideas into Interfaces"
- Professional summary from resume
- Animated bus illustration (CSS/SVG) starting its journey
- "Start the Journey" CTA button that smooth-scrolls down
- Download Resume button

### 🛤️ Journey Progress Bar
- Fixed progress indicator showing scroll percentage as a road/journey tracker
- Small bus icon that moves along the progress bar as user scrolls
- Shows current "stop" name

### 📚 Stop 1 — Education
- Milestone card with college, degree, CGPA (7.43)
- Dr. M.G.R Educational and Research Institute, 2022–Present
- Timeline-style animation with fade-in

### 🛠️ Stop 2 — Technical Skills
- Categorized skill display with icons and hover effects:
  - Programming: Python, Java, SQL
  - Web: HTML, CSS, JavaScript
  - Data & AI: Data Structures, DBMS, AI/ML, Business Intelligence
  - Tools: Git, GitHub
  - Soft Skills: Collaboration, Time Management, Creativity, Adaptability
- Animated skill badges with glow effects

### 📜 Stop 3 — Certifications
- Glassmorphism cards with hover animations for all 10 certifications:
  - Google Gen AI Studio, IBM Data Science, IBM Analytics, Deloitte Simulation, ThingBator ML, Python for Data Analysis, Power BI, Microsoft Azure, NASSCOM Cybersecurity, NPTEL HCI

### 🚀 Stop 4 — Projects
- Interactive project cards with descriptions, tech stack tags, and GitHub/live link buttons:
  1. AI-Driven Predictive Waste Management (IoT) — In Progress
  2. Advanced Traffic Management System
  3. E-Commerce Website
  4. Portfolio Website
- Each card has hover animations and icon/visual representation

### 💼 Stop 5 — Experience
- Timeline showing ML Internship at Thirumoolar IT Solutions (Mar–Apr 2025)
- Key responsibilities: ML techniques, data preprocessing, feature engineering
- Additional learning journey: courses, self-learning, practice projects

### 🎯 Final Destination — Future Vision
- Animated glowing destination bus stop
- Message: "My Goal: To become an AI Engineer building real-world intelligent systems for smart cities and sustainability."
- Inspiring visual with particle/glow effects

### 📬 Contact Section
- Phone: 9087223978
- Email: ameermalikbahad07@gmail.com
- LinkedIn & GitHub buttons
- Simple contact form (name, email, message) with validation
- Languages: Tamil (Native), English (Intermediate)

---

## Interactive Features
- Dark/Light theme toggle in navbar
- Scroll progress indicator with bus animation
- Animated road line connecting all sections
- Section fade-in animations on scroll (Intersection Observer)
- Smooth scroll navigation from navbar
- Download Resume button

---

## Component Structure
- **Navbar** — Fixed top navigation with section links + theme toggle
- **HeroSection** — Landing with bus animation
- **JourneyProgress** — Fixed scroll progress bar
- **JourneyStop** — Reusable section wrapper with road connector
- **SkillBadge** — Individual skill with icon and hover effect
- **CertificationCard** — Glassmorphism card for certifications
- **ProjectCard** — Interactive project display card
- **Timeline** — Experience/education timeline component
- **ContactForm** — Form with validation
- **Footer** — Links and credits

