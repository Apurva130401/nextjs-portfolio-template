# Professional Portfolio Template with Leads Capture

<div align="center">
  <br />
    <a href="https://apurva-mishra.syncflo.xyz" target="_blank">
      <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExazFqZmdxcHhuN3dhOG54aWJ6YmhmaG12anU0ZzR3dGZ5bm1tb285YiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/L1R1TVThqceztWz78p/giphy.gif" alt="Click Here" width="50">
      <br/>
      <img src="https://img.shields.io/badge/LIVE_DEMO-Click_Here-FF0000?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Preview" height="50">
    </a>
  <br />
  <br />
</div>

A high-performance, aesthetically crafted portfolio website built for developers, agencies, and consultants. Designed to convert visitors into clients with a seamless inquiry flow and premium animations.

## ✨ Key Features

### 🎨 Cinematic & Premium Design
![Cinematic Design](./public/screenshots/hero-design.png)
-   **Glassmorphism Layouts**: Modern, frosted-glass UI elements that provide depth and sophistication.
-   **Smooth Animations**: Seamless page transitions and micro-interactions powered by `framer-motion`.
-   **Responsive Mobile-First**: Flawless experience across all devices, from ultra-wide monitors to mobile phones.

### 💼 Professional Inquiry System
![Hire Me Page](./public/screenshots/inquiry-form.png)
-   **Distraction-Free "Hire Me" Page**: A dedicated conversion funnel designed to capture high-quality leads.
-   **Smart Form Validation**: Real-time feedback ensures clients provide necessary details (Budget, Timeline, etc.).
-   **State Management**: Professional button states ("Sending...", "Success") with a polished confetti celebration on completion.

### 📧 Intelligent Contact Actions
-   **Dual-Channel Submission**:
    -   **Web3Forms**: Instant email notifications sent directly to your inbox (Free Plan friendly).
    -   **Google Sheets Database**: Automatic backup of every lead to a private spreadsheet for CRM-like tracking.
-   **Smart "Copy-to-Clipboard"**: The email button detects if a user can't open a mail client and automatically copies your address to their clipboard with visual feedback.

### 🖱️ Advanced Interactions
![Command Palette](./public/screenshots/command-palette.png)
-   **Immersive Command Center**: Replaces the standard browser context menu with a custom interface.
    -   **Desktop**: Right-click to trigger a stunning, glassmorphic command palette.
    -   **Mobile/Tablet**: Long-press to reveal the same premium experience.
-   **Smooth Scrolling**: Integrated `Lenis` for buttery smooth scroll physics that feels native yet refined.
-   **Magnetic Custom Cursor**: A custom mouse follower that adapts to interactive elements, providing tactical feedback.

### ⚡ Performance & SEO
-   **Next.js 16 App Router**: Built on the latest React architecture for blazing fast load times.
-   **SEO Optimized**: Dynamic metadata, OpenGraph tags, and semantic HTML structure for maximum visibility.
-   **Zero-Bloat**: No heavy UI libraries; just pure TailwindCSS and optimized assets.

## 🚨 LEGAL WARNING (READ CAREFULLY)
**This code is for PERSONAL USE ONLY.**

**Strictly Prohibited:**
-   Selling this template as a digital product.
-   Using this codebase to build websites for paying clients (Agency work).
-   Removing the attribution or license file.

**Consequences:**
Any unauthorized commercial use discovered will result in:
1.  **Immediate DMCA Takedown** of your repository/website.
2.  **Legal Action** for copyright infringement.
3.  **Public shaming** on developer communities.

**Don't steal. Build.**


## 🛠️ Tech Stack

-   **Framework**: Next.js 16 (React 19)
-   **Styling**: TailwindCSS v4
-   **Animations**: Framer Motion + Canvas Confetti
-   **Forms**: Web3Forms + Google Apps Script
-   **Icons**: Lucide React

## 📦 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
npm install
```

### 2. Set Up Environment Variables
Create a `.env.local` file in the root directory and add your keys:

```env
# Get this from https://web3forms.com (Free)
NEXT_PUBLIC_WEB3_FORM_ACCESS_KEY=your-web3forms-access-key

# Get this from deploying your Google Sheet script (See 'Google Sheets Setup' below)
NEXT_PUBLIC_GOOGLE_SHEET_URL=your-google-script-webapp-url
```

### 3. Run the Development Server (For Public Deployment 
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to see your new portfolio!
Note: This is local server, For Public Deployment  [CLICK HERE](https://github.com/Apurva130401/nextjs-portfolio-template/blob/main/README.md#-deployment) or scroll down )

## 📊 Google Sheets Setup (Free Database)
1.  Create a new Google Sheet.
2.  Go to **Extensions > Apps Script**.
3.  Columns to add (according to the code below, you can change as per your wish)
    ```
         A1        B1       C1       D1          E1          F1                 G1               H1
    Created At	  Name	  Email	  Business	   Service	 Project Budget	  Project Timeline	  Description
     ```
5.  Paste the following code:
    ```javascript
    function doPost(e) {
      const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
      const data = e.parameter;
      sheet.appendRow([new Date(), data.name, data.email, data.business, data.service, data.budget, data.timeline, data.message]);
      return ContentService.createTextOutput(JSON.stringify({result:"success"})).setMimeType(ContentService.MimeType.JSON);
    }
    ```
6.  **Deploy > New Deployment > Web App**.
7.  Set **Who has access** to **Anyone**.
8.  Copy the URL and paste it into your `.env.local` file.

## 🚀 Deployment

The easiest way to deploy this Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

1.  Push your code to a GitHub repository.
2.  Go to **Vercel** and sign up with GitHub.
3.  Click **"Add New Project"** and import your repository.
4.  **Environment Variables:**
    -   Go to **Settings > Environment Variables** on your Vercel dashboard.
    -   Add `NEXT_PUBLIC_WEB3_FORM_ACCESS_KEY` and `NEXT_PUBLIC_GOOGLE_SHEET_URL`.
5.  Click **Deploy**.

Your site is now live! 🌐

## 🎨 Customization

### 1. Personal Information & SEO
Update the metadata and personal details in `src/app/layout.tsx`. This controls how your site appears in Google/Twitter.

### 2. Profile Picture
1.  Add your photo to the `public/` folder (e.g., `me.jpg`).
2.  Open `src/components/About.tsx`.
3.  Change the image source: `src="/me.jpg"`.

### 3. Content
-   **Hero Text**: Edit `src/components/Hero.tsx`.
-   **Experience**: Update the array in `src/components/Experience.tsx`.
-   **Projects**: Update the array in `src/components/Projects.tsx`.


## 📄 License
**Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)**

You are free to:
-   **Share** — Copy and redistribute the material in any medium or format.
-   **Adapt** — Remix, transform, and build upon the material.

**Under the following terms:**
-   **Attribution** — You must give appropriate credit.
-   **NonCommercial** — You may NOT use the material for commercial purposes (e.g., selling this template or using it to build client sites for a fee).

## ⚠️ Issues

For specific questions regarding the codebase or guidance on modifications, please submit a request via the [𝙄𝙨𝙨𝙪𝙚𝙨](https://github.com/Apurva130401/nextjs-portfolio-template/issues) tab

All tickets will be addressed within 24 hours.

*Created by [Apurva Mishra](https://twitter.com/apurvamishra)*


## 🤝 Support & Connect

If you found this template helpful, please consider giving it a ⭐ star!

<div align="center">
  <a href="https://github.com/apurva130401">
    <img src="https://img.shields.io/github/followers/apurva130401?style=social" alt="GitHub Follow">
  </a>
  &nbsp;
  <a href="https://twitter.com/apurva_1304">
    <img src="https://img.shields.io/twitter/follow/apurvamishra?style=social" alt="Twitter Follow">
  </a>
  &nbsp;
  <a href="https://github.com/Apurva130401/nextjs-portfolio-template">
    <img src="https://img.shields.io/github/stars/Apurva130401/nextjs-portfolio-template?style=social" alt="GitHub Repo stars">
  </a>
  <br />
  <br />
  <a href="https://www.buymeacoffee.com/apurvamishra" target="_blank">
    <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height="40" width="145">
  </a>
</div>
