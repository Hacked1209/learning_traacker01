# Progress Tracking Dashboard

## Overview

This is a collaborative progress tracking dashboard designed for two users (Chayan and Divyam) to manage and track learning topics. The application allows users to create topics with subtopics, assign them to specific individuals, track completion status, and visualize progress through interactive cards and progress indicators. Built with a modern tech stack, it emphasizes clean design inspired by Linear and Notion aesthetics.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18 with TypeScript, using functional components and hooks

**Routing**: Wouter for lightweight client-side routing

**State Management**: 
- TanStack Query (React Query) for server state management with optimistic updates
- React hooks (useState, useEffect) for local component state
- No global state management library - leveraging React Query's caching capabilities

**UI Component Library**: 
- Radix UI primitives for accessible, unstyled components
- shadcn/ui component system built on top of Radix UI
- Custom theme system with CSS variables for light/dark mode support

**Styling Approach**:
- Tailwind CSS for utility-first styling
- Custom design system defined in `design_guidelines.md`
- Inter font from Google Fonts CDN
- System-based design with emphasis on spacing primitives, subtle elevation, and micro-interactions

**Build System**: Vite for fast development and optimized production builds

### Backend Architecture

**Framework**: Express.js with TypeScript

**API Design**: RESTful API with the following endpoints:
- `GET /api/topics` - Retrieve all topics
- `GET /api/topics/:id` - Retrieve single topic
- `POST /api/topics` - Create new topic
- `PUT /api/topics/:id` - Update existing topic
- `DELETE /api/topics/:id` - Delete topic

**Development vs Production**:
- Development mode uses Vite middleware for hot module replacement
- Production mode serves static assets from the build directory
- Separate entry points (`index-dev.ts` and `index-prod.ts`)

**Storage Layer**: 
- Abstracted storage interface (`IStorage`) supporting both in-memory and database implementations
- `MemStorage` class for development/testing
- Database storage implementation using Drizzle ORM

**Request Validation**: Zod schemas for runtime type checking and validation of API requests

### Data Storage

**ORM**: Drizzle ORM for type-safe database operations

**Database**: PostgreSQL via Neon serverless driver

**Schema Design**:
- `users` table: User authentication and management
- `topics` table: Main data structure with columns for title, description, subtopics (JSONB), status, and assignedTo fields

**Type Safety**: 
- Database schema defined in TypeScript using Drizzle's schema builder
- Zod schemas generated from Drizzle schemas for validation
- Full type inference from database to frontend

**Migrations**: Drizzle Kit for schema migrations stored in `/migrations` directory

### Authentication & Authorization

**Current State**: Basic user schema exists but authentication endpoints are not yet implemented in the routes

**Planned Approach**: Username/password authentication with session management using `connect-pg-simple` for PostgreSQL-backed sessions

### External Dependencies

**Core UI Components**:
- @radix-ui/* - Comprehensive suite of accessible, unstyled UI primitives (accordion, dialog, dropdown-menu, popover, progress, select, tabs, toast, etc.)
- Lucide React - Icon library for consistent iconography
- class-variance-authority - Utility for managing component variants
- tailwind-merge & clsx - Utility functions for conditional Tailwind classes

**Data Fetching & Forms**:
- @tanstack/react-query - Server state management with caching and optimistic updates
- @hookform/resolvers - Form validation integration
- react-hook-form - Performant form handling (implied by resolvers dependency)
- zod - Schema validation for both client and server
- drizzle-zod - Generate Zod schemas from Drizzle database schemas

**Date Handling**:
- date-fns - Modern date utility library

**Database & Backend**:
- @neondatabase/serverless - Neon PostgreSQL serverless driver
- drizzle-orm - Type-safe ORM for PostgreSQL
- drizzle-kit - Schema migrations and database tooling
- connect-pg-simple - PostgreSQL session store for Express

**Development Tools**:
- Vite plugins for Replit integration (@replit/vite-plugin-runtime-error-modal, @replit/vite-plugin-cartographer, @replit/vite-plugin-dev-banner)
- tsx - TypeScript execution for development server
- esbuild - Fast JavaScript bundler for production builds

**Carousel/Embla**:
- embla-carousel-react - Carousel/slider functionality

**Additional UI Libraries**:
- cmdk - Command palette component
- vaul - Drawer component (implied from drawer.tsx)
- react-day-picker - Calendar/date picker functionality
- input-otp - OTP input component
- react-resizable-panels - Resizable panel layouts