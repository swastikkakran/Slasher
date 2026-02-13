# Product Requirements Document (PRD)

## Project: Minimal URL Shortener (Production-Oriented Learning Project)

------------------------------------------------------------------------

# 1. Overview

## 1.1 Purpose

Build a deployable URL shortener service that:

-   Accepts a long URL
-   Generates a short code
-   Redirects users to the original URL
-   Tracks basic analytics
-   Is deployed and publicly accessible

This project is designed to: - Strengthen backend fundamentals -
Introduce state management - Force clean API design - Introduce database
indexing - Prepare ground for DSA + discrete concepts later

------------------------------------------------------------------------

# 2. Technical Stack (Initial)

-   Node.js
-   Express
-   MongoDB
-   No Redis or microservices initially

------------------------------------------------------------------------

# 3. Architecture (V0.1 -- Foundation Layer)

Client → Express API → Database → Redirect

------------------------------------------------------------------------

# 4. Feature Breakdown by Layers

------------------------------------------------------------------------

# LAYER 1 --- Core Functionality (V0.1)

## Create Short URL

**Endpoint:**\
POST /shorten

**Input:** { "url": "https://example.com/very/long/link" }

**Behavior:** - Validate URL format - Generate unique short code (6--8
chars) - Store mapping in DB - Return short URL

**Response:** { "shortUrl": "https://yourdomain.com/abc123" }

------------------------------------------------------------------------

## Redirect

**Endpoint:**\
GET /:code

**Behavior:** - Lookup code in DB - If exists → redirect (302) - If not
→ return 404

------------------------------------------------------------------------

## Database Schema (Basic)

URL Model:

-   id
-   originalUrl
-   shortCode (unique index)
-   createdAt

------------------------------------------------------------------------

## Non-Functional Requirements

-   Proper error handling
-   No crashing on invalid input
-   Deployed publicly

------------------------------------------------------------------------

# LAYER 2 --- State & Mutation (V0.2)

## Click Tracking

Add field: - clicks (number, default 0)

On redirect: - Increment clicks atomically

------------------------------------------------------------------------

## Expiry Feature

Add: - expiresAt (optional date)

Redirect logic: - If expired → return 410 Gone

------------------------------------------------------------------------

## Basic Rate Limiting

-   Limit requests per IP (e.g., 20/min)
-   Middleware-based implementation

------------------------------------------------------------------------

# LAYER 3 --- Observability & Quality (V0.3)

## Logging

-   Log redirects
-   Log errors
-   Structured logs (JSON format)

------------------------------------------------------------------------

## Analytics Endpoint

GET /stats/:code

Returns: { "originalUrl": "...", "clicks": 42, "createdAt": "...",
"expiresAt": null }

------------------------------------------------------------------------

## Index Optimization

-   Ensure index on shortCode
-   Measure lookup performance before and after indexing

------------------------------------------------------------------------

# LAYER 4 --- Controlled Scaling (V0.4)

## Improve Code Generation

-   Base62 encoding
-   Collision prevention strategy

------------------------------------------------------------------------

## Basic Caching (Optional Later)

-   In-memory cache for hot URLs
-   Measure performance difference

------------------------------------------------------------------------

# Edge Cases

-   Invalid URL input
-   Duplicate submissions
-   Expired links
-   Missing code
-   DB connection failure
-   Server restart behavior

------------------------------------------------------------------------

# Deployment Requirements

-   Use environment variables
-   Secure secrets
-   Production config
-   Post-deployment testing
-   Optional CI/CD setup

------------------------------------------------------------------------

# Learning Objectives Mapping

Layer 1 → API design, routing, DB basics\
Layer 2 → State mutation, concurrency awareness\
Layer 3 → Observability, debugging discipline\
Layer 4 → Algorithmic reasoning, scaling thinking

------------------------------------------------------------------------
