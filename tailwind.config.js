/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Chat App Custom Colors
        'chat': {
          // Background colors
          'bg-primary': '#f8f9fb',        // Main app background
          'bg-secondary': '#ffffff',      // Sidebar/card backgrounds
          'bg-tertiary': '#f5f7fa',       // Alternative light background
          
          // Blue theme colors
          'blue': {
            50: '#eff6ff',
            100: '#dbeafe',
            200: '#bfdbfe',
            300: '#93c5fd',
            400: '#60a5fa',
            500: '#3b82f6',               // Primary blue (chat bubbles, buttons)
            600: '#2563eb',               // Hover states
            700: '#1d4ed8',
            800: '#1e40af',
            900: '#1e3a8a',
          },
          
          // Purple/Violet accent colors
          'purple': {
            50: '#faf5ff',
            100: '#f3e8ff',
            200: '#e9d5ff',
            300: '#d8b4fe',
            400: '#c084fc',
            500: '#a855f7',               // Purple accent (gradients, highlights)
            600: '#9333ea',               // Purple hover
            700: '#7c3aed',
            800: '#6b21a8',
            900: '#581c87',
          },
          
          // Gray colors for text and borders
          'gray': {
            50: '#f9fafb',
            100: '#f3f4f6',               // Light borders
            200: '#e5e7eb',               // Borders
            300: '#d1d5db',
            400: '#9ca3af',               // Offline status
            500: '#6b7280',               // Secondary text
            600: '#4b5563',
            700: '#374151',               // Primary text
            800: '#1f2937',
            900: '#111827',
          },
          
          // Status colors
          'green': {
            400: '#4ade80',
            500: '#22c55e',               // Online status
            600: '#16a34a',
          },
          
          'red': {
            400: '#f87171',
            500: '#ef4444',               // Error states
            600: '#dc2626',
          },
          
          'yellow': {
            400: '#facc15',
            500: '#eab308',               // Warning states
            600: '#ca8a04',
          },
        }
      },
      
      // Custom gradients for your chat app
      backgroundImage: {
        'chat-gradient': 'linear-gradient(135deg, #3b82f6 0%, #a855f7 100%)',
        'message-gradient': 'linear-gradient(135deg, #60a5fa 0%, #c084fc 100%)',
        'sidebar-gradient': 'linear-gradient(180deg, #ffffff 0%, #f8f9fb 100%)',
      },
      
      // Custom shadows
      boxShadow: {
        'chat': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'chat-lg': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'message': '0 1px 2px 0 rgba(59, 130, 246, 0.1)',
      },
      
      // Custom border radius
      borderRadius: {
        'chat': '12px',
        'message': '18px',
      },
      
      // Custom spacing for consistent chat layout
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      }
    },
  },
  plugins: [],
};