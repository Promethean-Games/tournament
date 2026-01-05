# Par for the Course Tournament Registration

## Overview
A pool tournament registration and payment portal for "Par for the Course" tournament hosted at Betsy's Billiards in Austin, TX. The app features a flyer-style design with a dramatic hero image, tournament details, FAQ, and Stripe-powered registration.

## Current State
- Single-page tournament landing/registration app
- Dark theme with red accent colors
- Hero section with pool table background image
- Quick facts card with tournament details
- Registration form connected to Stripe checkout
- FAQ accordion section
- Responsive design for mobile and desktop

## Architecture

### Frontend
- React with TypeScript
- Tailwind CSS for styling
- Wouter for routing
- TanStack Query for data fetching

### Key Files
- `client/src/pages/tournament.tsx` - Main tournament registration page
- `client/src/index.css` - Custom dark theme CSS variables
- `attached_assets/generated_images/pool_table_overhead_dramatic.png` - Hero background image

### Design System
- Dark theme forced in :root (no light mode toggle)
- Primary color: Red (#d11111 / 0 85% 44% HSL)
- Good/success: Green (#22c55e)
- Warning: Amber (#f59e0b)
- Font: Inter

## Payment Integration
The registration form is designed to connect to a Netlify function at `/.netlify/functions/create-checkout-session` for Stripe checkout. This endpoint needs to be configured separately.

## User Preferences
- Flyer-style tournament layout
- Pool table hero image with dark overlay
- Traditional tournament flyer aesthetic with modern web execution
