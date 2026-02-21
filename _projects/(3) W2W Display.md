---
name: W2W Display Infrastructure
tools: [NodeJS, APIs]
image: https://github.com/user-attachments/assets/ffa85785-9bb5-4e19-b80b-6a7646750483
description: LAN Facing site to fetch Shift API data and display cleanly.
---

# Project Spotlight: W2W-Display Infrastructure
**Role: Technical Lead & Developer**

## Project Overview
I architected and deployed a localized, high-availability web platform to provide real-time visibility into operational staffing. The **w2w-display** system serves as a central "command center" for high-traffic retail and event environments, pulling live scheduling data into a high-visibility dashboard.

## The Problem
In complex operational settings like Shady Brook Farm, staff schedules are dynamic and often decentralized. Relying on individual mobile logins for schedule checks created communication bottlenecks and significant administrative overhead for management. There was a critical need for a "glanceable" source of truth that remained operational even during external network instability.

## Technical Implementation
The solution is a full-stack application built with **Node.js** and **Express**, designed to run as a persistent background service on a local area network.

<img width="3760" height="1905" alt="image" src="https://github.com/user-attachments/assets/ffa85785-9bb5-4e19-b80b-6a7646750483" />

### Backend: API Orchestration & Middleware
The backend utilizes the **WhenToWork API** to pull live shift data. I implemented logic to sanitize this data and serve it via a local REST endpoint, ensuring the frontend only processes the most relevant, time-sensitive information.

```javascript
const express = require('express');
const app = express();
const path = require('path');

// Middleware to serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Local API endpoint for shift data
// This abstracts the third-party API complexity away from the client
app.get('/api/shifts', async (req, res) => {
    try {
        // Fetch logic for WhenToWork data would reside here
        const shiftData = await fetchShiftsFromAPI(); 
        res.status(200).json(shiftData);
    } catch (error) {
        console.error('Data Retrieval Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server initialized on port ${PORT}`);
});

```

### Frontend: High-Visibility UI/UX

The frontend was engineered for clarity in high-traffic environments. I utilized a combination of **JavaScript**, **CSS Flexbox**, and **HTML** to create a responsive grid that categories staff by department (e.g., Cashiers, Retail, Food).

* **Persistent Updates:** Implemented a fetch-loop to refresh shift data at regular intervals without requiring a page reload.
* **Responsive Design:** Used CSS media queries to ensure the dashboard remains readable on various display sizes, from small kiosks to large overhead monitors.

```css
/* Department-specific color coding for rapid identification */
.column-cashiers { border-top: 10px solid #ff0000; }
.column-retail { border-top: 10px solid #9b59b6; }

.shift-card {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    margin-bottom: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
}

```

## Project Management & Business Impact

* **End-to-End Ownership:** Managed the entire project lifecycle, including initial requirements gathering, software development, local network configuration, and physical hardware deployment.
* **Operational Efficiency:** Reduced "status-check" inquiries to management by providing a public-facing, real-time staffing dashboard.
* **System Resilience:** By hosting the application on a local server, I ensured that critical staffing visibility remains active even if the property's external internet connection experiences downtime.
* **Scalable Documentation:** Authored a comprehensive README and installation guide to allow for seamless maintenance and redeployment by other IT staff members.

## Core Competencies

* **Technical Stack:** Node.js, Express, JavaScript (ES6+), REST APIs, CSS Grid/Flexbox.
* **Systems:** Linux (Kali/Debian), Git/Version Control, Local Network Management.
* **Soft Skills:** Project Lifecycle Management, Requirements Analysis, Technical Documentation.

---

*full source code available at: [github.com/cgolden15/w2w-display*](https://github.com/cgolden15/w2w-display)
