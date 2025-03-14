# Address Manager

A modern web application for managing addresses built with Next.js, React, and TypeScript.
Live demo: https://address-manager-five.vercel.app/ (it might take time to load in as backend might start cold)

## Features

- View and manage addresses in a responsive interface
- Select addresses to view detailed information
- Delete addresses
- Infinite scrolling for address lists
- Toast notifications for user feedback

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **UI Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **State Management**: [TanStack Query](https://tanstack.com/query/latest) (React Query)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Theme**: [next-themes](https://github.com/pacocoursey/next-themes)

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/address-manager.git
   cd address-manager
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check for code issues

## Project Structure

- `/app` - Next.js app directory containing routes and layouts
- `/components` - Reusable React components
- `/hooks` - Custom React hooks (including `useAddresses`)
- `/public` - Static assets
