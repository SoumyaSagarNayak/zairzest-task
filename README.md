# Zairza Technical Society Website

A modern, responsive website for Zairza Technical Society, built using HTML, CSS, and JavaScript. The site features a login page, a landing page with information about the society, and a dark/light mode toggle. It is optimized for deployment on Vercel as a static site.

## Features
- **Responsive Design**: Optimized for mobile, tablet, and desktop.
- **Dark/Light Mode**: Smooth theme toggle with local storage persistence.
- **Login/Logout**: Basic authentication with local storage.
- **Language Dropdown**: Placeholder options for English, Hindi, and Odia.
- **Landing Page**: Highlights Zairza’s three wings (Robotics, Software, Design), history, and location with a Google Maps iframe.
- **Smooth Animations**: CSS transitions for hover states, theme toggle, and hamburger menu.

## Project Structure
- `index.html`: Login page.
- `landing.html`: Main content page after login.
- `style.css`: Global styles with responsive design and dark/light mode support.
- `scripts/script.js`: JavaScript for login/logout, theme toggle, and hamburger menu.
- `assets/logo.png`: Zairza logo.

## Getting Started
1. Clone the repository.
2. Install dependencies: `npm install`.
3. Run locally: `npm start` (uses `serve` to host the static site).
4. Deploy to Vercel: Push to a Git repository and link to Vercel for automatic deployment.

## Deployment
The site is a static HTML/CSS/JS project, making it ideal for Vercel deployment. Ensure all files are in the root directory or properly referenced in `/assets` and `/scripts`.

## Color Palette
- **Primary**: #1E3A8A, #3B82F6
- **Secondary**: #F59E0B, #10B981
- **Neutrals**: #F3F4F6 to #111827
- **Semantic**: Success (#10B981), Error (#EF4444)

## Typography
- **Headings**: Poppins, bold and modern.
- **Body**: Inter, clean and readable.
- **Type Scale**: Responsive with `clamp()` for fluid typography.

## License
© 2025 Zairza Technical Society. All rights reserved.
