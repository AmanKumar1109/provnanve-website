# 🌌 PROVENANCE 6.0 - Official Techno-Cultural Fest Platform

Welcome to the official repository for **PROVENANCE 6.0**, the premier Techno-Cultural Fest of RVS College of Engineering and Technology (RVSCET), Jamshedpur. 

This repository houses the entire frontend architecture and backend integration logic for the festival's digital platform. Designed with a highly interactive, cyberpunk-inspired neon aesthetic, the application provides a seamless, immersive experience for students to explore events, discover organizing committees, and register for various competitions securely.

---

## 📑 Table of Contents
1. [Executive Summary](#-executive-summary)
2. [Technical Stack Architecture](#-technical-stack-architecture)
3. [Deep Dive: Core Features & Logic](#-deep-dive-core-features--logic)
4. [Project Directory Structure](#-project-directory-structure)
5. [Component Architecture Details](#-component-architecture-details)
6. [Data Flow & State Management](#-data-flow--state-management)
7. [Database Schema (Firestore)](#-database-schema-firestore)
8. [Setup & Installation Guide](#-setup--installation-guide)
9. [Animation & Scroll Engine](#-animation--scroll-engine)
10. [Known Technical Limitations & Bugs](#-known-technical-limitations--bugs)
11. [Future Roadmap & Refactoring Plan](#-future-roadmap--refactoring-plan)

---

## 🚀 Executive Summary

PROVENANCE 6.0 is built as a Single Page Application (SPA) utilizing React 19. The application heavily prioritizes UI/UX by combining fluid scroll-hijacking (Lenis), physics-based animations (Framer Motion), and scroll-triggered DOM manipulations (GSAP). It integrates directly with Firebase for user authentication and NoSQL data storage, serving as the central hub for thousands of participants to register for events spanning Tech, AI, Cultural, Media, Sports, and IoT domains.

---

## 🛠 Technical Stack Architecture

The application is built on a modern, high-performance web stack:

### 1. Frontend Core
*   **React 19.2.5**: Utilized for its robust component lifecycle and hooks.
*   **Vite 8.0**: Chosen over CRA/Webpack for instantaneous HMR (Hot Module Replacement) and optimized Rollup production builds.
*   **React Router DOM 7.14**: Client-side routing enabling SPA navigation without page reloads, essential for maintaining the continuous smooth-scroll context.

### 2. Styling Engine & UI
*   **Tailwind CSS 4.2**: Utility-first CSS framework configured for JIT compilation. Extensive use of arbitrary values for glassmorphism (`bg-white/5`, `backdrop-blur`) and complex neon box-shadows.
*   **Lucide React**: Lightweight, customizable SVG icons used consistently across forms, footers, and modal indicators.
*   **Vanilla CSS (`index.css`)**: Houses custom `@keyframes` (like `theme-glow`, `pulse`, `shine`) and utility classes (`.theme-bar`, `.scrollbar-hide`) that are too complex for inline Tailwind utilities.

### 3. Motion & Physics Engine
*   **Lenis (`lenis/react`)**: Implements virtual scrolling mathematics to detach scroll events from the native browser thread, creating a buttery-smooth interpolation (lerp: 0.06) across the entire DOM.
*   **GSAP (GreenSock) 3 & `@gsap/react`**: Powers heavy, timeline-based animations. Specifically, `ScrollTrigger` is used to map DOM element properties (like scale, transform, width) to the user's scroll position.
*   **Framer Motion 12**: Handles React-level lifecycle animations, such as `AnimatePresence` for modal unmounting, route transitions (`PageTransition.jsx`), and interactive hover states.

### 4. Backend & Database (BaaS)
*   **Firebase Authentication**: Manages user identities via `createUserWithEmailAndPassword`.
*   **Firebase Firestore**: Cloud-hosted NoSQL database. Utilized to store comprehensive registration payloads.

---

## 🧠 Deep Dive: Core Features & Logic

### 1. Advanced Registration System (`Register.jsx`)
The registration form is highly dynamic and state-driven. 
*   **Conditional Rendering**: If a user selects "Within College", they are prompted for a `Roll Number`. If "Outside College" is selected, they must input their `College Name`.
*   **Payment Verification Simulation**: Users select their payment app (GPay, PhonePe, Paytm, etc.). If "Other" is selected, an additional text input mounts. Users are required to provide a Transaction ID. A help modal provides instructions on locating Transaction IDs based on the chosen app.
*   **Image Upload Handling**: The form includes a drag-and-drop/click file input that strictly validates MIME types (`image/jpeg`, `image/png`) and generates a local blob URL (`URL.createObjectURL`) for instant UI preview.

### 2. Tabbed Event Catalog (`EventSection.jsx`)
*   **Data Structure**: Events are mapped from a static JSON array containing categories (HELIX, TARANGINI, XPECTRA, PANTHERS, CIRCUITORN).
*   **Interaction**: Selecting a tab filters the horizontally-scrolling event deck. 
*   **3D Tilt Mathematics**: Event cards utilize custom mouse-tracking logic. `onMouseMove` calculates the cursor's X/Y coordinates relative to the card's bounding client rect to calculate `rotateX` and `rotateY` degrees, creating a realistic 3D parallax tilt.
*   **Dynamic Modals**: Clicking an event mounts a detailed `EventModal` containing dynamically colored accents matching the organizing club's theme.

### 3. Global Scroll Progress Tracker (`ScrollProgress.jsx`)
*   Detached from Framer Motion/GSAP dependencies to avoid conflicts with Lenis. It utilizes a raw React `useEffect` listening to `window.addEventListener('scroll')`, calculating the exact percentage of the document scrolled, and mapping it to the `width` of a fixed DOM node (`.theme-bar`).

---

## 📂 Project Directory Structure

```text
provnanve-website/
├── src/
│   ├── assets/                 # High-res static media
│   │   ├── hero.mp4            # Parallax background video
│   │   └── PROVENANCE_WHITE_TEXT_LOGO_PURPLE_GLOW.png
│   │
│   ├── components/             # Modular UI Building Blocks
│   │   ├── About.jsx           # Mission statement & typography animations
│   │   ├── ClubSection.jsx     # Organizing committees (Bento-style glowing cards)
│   │   ├── CustomCursor.jsx    # Follows mouse coords via framer-motion useMotionValue
│   │   ├── EventSection.jsx    # Complex tabbed layout + 3D tilt cards + Modals
│   │   ├── Footer.jsx          # Dynamic routing, scrollTo ID logic, Social SVGs
│   │   ├── GallerySection.jsx  # Asymmetrical photo grid
│   │   ├── Hero.jsx            # GSAP ScrollTrigger parallax video background
│   │   ├── Navbar.jsx          # Mobile-responsive hamburger menu & sticky nav
│   │   ├── PageTransition.jsx  # Route wrapper masking DOM paints with animations
│   │   └── ScrollProgress.jsx  # React-native scroll percentage calculator
│   │
│   ├── contexts/               
│   │   └── AuthContext.jsx     # Global Provider for User Session State
│   │
│   ├── Pages/                  # Route Entry Points
│   │   ├── Dashboard.jsx       # Protected route for authenticated users
│   │   ├── Home.jsx            # Assembles all section components
│   │   ├── Login.jsx           # Firebase auth entry
│   │   ├── Register.jsx        # Complex 20+ field registration logic
│   │   └── Signup.jsx          # Account creation interface
│   │
│   ├── App.jsx                 # Lenis Provider, AuthProvider, and Routes configuration
│   ├── firebase.js             # Firebase App initialization and SDK exports
│   ├── index.css               # Tailwind directives, keyframes, scrollbar hiding logic
│   └── main.jsx                # React 19 createRoot entry point
│
├── package.json                # NPM Dependency tree and scripts
├── eslint.config.js            # Linting rules for React Hooks
└── vite.config.js              # Vite compiler configuration
```

---

## 🔄 Data Flow & State Management

### Context API (`AuthContext.jsx`)
The application currently bypasses standard state management libraries (Redux/Zustand) in favor of React's native Context API.
*   **State**: Exposes `isLoggedIn` (boolean) and `user` (object).
*   **Hydration**: Upon mounting, `useEffect` checks `localStorage` for pre-existing session data to hydrate the application state immediately, preventing flashes of unauthenticated content.
*   **Methods**: Exposes `login(userData)` and `logout()` functions which update React state and synchronously update `localStorage`.

### Routing Flow
Clicking a navigation link inside `Navbar.jsx` or `Footer.jsx` triggers a custom `handleLinkClick` method. 
*   If the target is a page (`/register`), it executes `navigate()`.
*   If the target is an ID (`#events`), it executes `document.getElementById().scrollIntoView()`. 

---

## 🗄 Database Schema (Firestore)

Upon successful execution of `handleSubmit` in `Register.jsx`, a document is written to the `users` collection. The schema is strictly defined by the frontend payload:

**Collection**: `users`
**Document ID**: `{firebase_uid}`

| Field | Type | Description |
| :--- | :--- | :--- |
| `uid` | String | Firebase Authentication User ID |
| `name` | String | Participant's full name |
| `email` | String | Registered email address |
| `mobile` | String | Contact number |
| `collegeType` | String | ENUM: `"within"` \| `"outside"` |
| `rollNumber` | String | Only populated if `collegeType` is "within" |
| `collegeName` | String | Populated if "outside", defaults to "RVSCET" if "within" |
| `branch` | String | Engineering branch (cse, ece, ee, me, ce) |
| `tshirtSize` | String | ENUM: `"s"`, `"m"`, `"l"`, `"xl"`, `"xxl"` |
| `paymentApp` | String | App used for payment (gpay, phonepe, etc.) |
| `transactionId` | String | Unique UPI transaction reference |
| `paymentStatus` | String | Defaults to `"pending"` upon creation |
| `registeredAt` | Timestamp | Server-side timestamp generated by `serverTimestamp()` |

*(Note: The `paymentScreenshot` binary file is currently captured in React State but is NOT uploaded to Firebase Storage due to missing implementation.)*

---

## ⚙️ Setup & Installation Guide

### Prerequisites
*   **Node.js**: Version 18.x or higher
*   **Git**: For version control
*   **Firebase Account**: You need an active Firebase project with Authentication (Email/Password) and Firestore enabled.

### 1. Clone & Install
```bash
git clone https://github.com/AmanKumar1109/provnanve-website.git
cd provnanve-website
npm install
```

### 2. Configure Firebase
Currently, Firebase credentials are hardcoded. You must replace the credentials in `src/firebase.js` with your own Firebase Project Config.

### 3. Run Development Server
```bash
npm run dev
```
Vite will instantly start the HMR server at `http://localhost:5173`.

### 4. Production Build
```bash
npm run build
```
This generates a highly optimized, minified bundle in the `/dist` folder ready for deployment to Vercel, Netlify, or Firebase Hosting.

---

## 🎥 Animation & Scroll Engine Details

*   **Parallax Hero (`Hero.jsx`)**: Uses `useLayoutEffect` to bind a GSAP `ScrollTrigger` to the background `<video>`. As the user scrolls down, the video's `yPercent` translates by 30%, creating a pseudo-3D depth effect against the foreground text.
*   **Lenis Integration (`App.jsx`)**: `<ReactLenis root>` is configured with `syncTouch: true` and `smoothTouch: true` to ensure that mobile users experience the exact same fluid interpolation as desktop mouse-wheel users.
*   **Hardware Acceleration**: Intensive animations (like the `.theme-bar` and 3D event cards) utilize `transform: translateZ(0)` and `will-change: transform` to force the browser to offload rendering to the GPU, maintaining 60FPS.

---

## 🛑 Known Technical Limitations & Bugs

This section explicitly documents architectural flaws and missing implementations based strictly on the current codebase:

1.  **Critical Security Risk - Hardcoded Firebase Config**: The `src/firebase.js` file exposes the `apiKey`, `projectId`, and `appId` in plain text. While Firebase API keys are technically safe to expose if Security Rules are strict, hardcoding them prevents environment-specific deployments (Dev vs. Prod).
2.  **Missing File Upload Implementation**: In `Register.jsx`, the user can select an image for `paymentScreenshot`. The UI displays a local blob preview. However, the `handleSubmit` function **completely ignores** the file. It writes text data to Firestore but fails to implement `firebase/storage` to upload the image and secure a download URL.
3.  **Flawed Authentication State Sync**: `AuthContext.jsx` manually sets `localStorage.setItem('isLoggedIn', 'true')`. It **does not** utilize Firebase's `onAuthStateChanged` listener. If a user's Firebase session expires or is revoked server-side, the frontend will incorrectly assume the user is still authenticated until local storage is manually cleared.
4.  **GSAP Strict Mode Double-Mounting**: In React 19 Strict Mode, components mount, unmount, and remount instantly. GSAP ScrollTriggers attached to `useLayoutEffect` without proper `gsap.context()` cleanup can cause duplicate triggers or layout thrashing. Most components use `@gsap/react`, but manual implementations need auditing.

---

## 🔭 Future Roadmap & Refactoring Plan

If you are a developer taking over this project, prioritize the following refactors:

### Phase 1: Security & Auth Refactor
1.  Migrate all `firebaseConfig` values to `.env.local` using Vite's `import.meta.env.VITE_FIREBASE_*` syntax.
2.  Rewrite `AuthContext.jsx` to wrap `auth.onAuthStateChanged((user) => setUser(user))`, completely eliminating `localStorage` reliance for session validation.

### Phase 2: Storage Integration
1.  Import `getStorage, ref, uploadBytes, getDownloadURL` from `firebase/storage`.
2.  In `Register.jsx`, intercept the form submission, upload `form.paymentScreenshot` to `storageRef(storage, 'payments/' + user.uid)`, await the download URL, and inject that URL into the Firestore document payload.

### Phase 3: UX/UI Polish
1.  Implement a dedicated `/schedule` route component (currently missing, though referenced in the Footer).
2.  Add debounce logic to the 3D tilt calculations in `EventSection.jsx` to reduce main-thread calculations on low-end devices.

---

*Documentation generated through deep architectural analysis of the PROVENANCE 6.0 codebase.*
