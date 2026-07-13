# Fanfare: Architecture

## A note before the detail

The PRD already established that the hackathon submission needs no backend, no database, and no authentication. This document explains why, gives the actual architecture being built tonight, and then answers the fuller brief by describing what each of those layers would look like if Fanfare grew past the hackathon. Treat the second half as roadmap, not tonight's build list.

## 1. Hackathon architecture, what is actually running

**Frontend**
- React with Vite, single page, no routing library needed since there is only one screen.
- All application state (form fields, loading state, generated output) lives in React state, in memory, for the duration of the browser session.
- Styling is plain CSS using the token system already defined: paper background with a lavender cast, orange and lavender accents, Fraunces, Inter, and IBM Plex Mono typography.
- The ticket stub visual, the programme reveal animation, and the copy to clipboard buttons are all client side only, no server round trip involved beyond the one API call.

**Backend**
- None. There is no server process to write, run, or deploy. The frontend calls the Anthropic API directly from the browser, the same pattern already used for the artifact prototype.
- This removes an entire category of hackathon risk: no server to crash, no environment variables to misconfigure on a host, no CORS issue between a frontend origin and a backend origin, which is exactly the kind of problem that cost time on the Dispatch submission.

**Database**
- None. Nothing needs to persist between sessions. Form inputs and generated output exist only while the tab is open. A page refresh clears everything, which is an accepted tradeoff for the submission scope.

**Authentication**
- None. There is no login, no account, and no per user data to protect, so there is nothing for authentication to gate.

**APIs**
- One external API: the Anthropic Messages API, called directly from the browser with the four sections (store listing, social posts, launch post draft, landing hero copy) requested in a single structured call.
- No other external API is required. There is no App Store Connect API call, no social platform API call, and no Product Hunt API call. All output is text the person copies and pastes manually into those platforms themselves.

**Deployment**
- Vercel, matching the pattern already used for the CROO submission's frontend. The build is a static site plus the client side API call, so there is nothing else to deploy.
- One environment, one URL, no staging or production split needed for a hackathon submission.

## 2. Why this shape is correct for tonight

Every layer that is missing here is missing on purpose. A backend, a database, and authentication all add failure surface and configuration time without adding anything a judge can see in a two minute demo. The judging criteria reward a working demo, real AI depth, and a credible business case, none of which require a persistence layer. Adding one now would trade build time you do not have for a capability nobody asked for.

## 3. What a scaled, post hackathon version would look like

This section answers the fuller architecture brief directly, on the understanding that none of it gets built before the deadline.

**Scaled frontend**
- Same React foundation, but split into an authenticated app shell and the existing single page generator, with routing added once there is more than one screen.
- State moves from purely local React state to a mix of local UI state and server fetched data for anything that needs to survive a refresh, such as saved launch history.

**Scaled backend**
- A thin API layer (Node with Express, matching the stack already used on Dispatch) sitting between the frontend and the Anthropic API. Its job is to hold the API key server side instead of exposing it in the browser, handle rate limiting per user, and log usage for the pricing model.
- This backend is the first thing that becomes necessary the moment there is a paid tier, since a client side only API call cannot enforce a request limit or protect an API key.

**Scaled database**
- A relational database (Postgres) with two core tables to start:
  - `users`: id, email, plan tier, created at.
  - `launches`: id, user id (foreign key to users), app name, one liner, target user, store link, generated output stored as structured text, created at.
- This is intentionally small. It supports saved history and a pricing tier without over building a schema for features that do not exist yet.

**Scaled authentication**
- Email based auth or a third party provider (Google sign in is the common low friction choice for indie tools like this). Authentication becomes necessary the moment `launches` needs a `user id` to belong to.
- No authentication is needed before that point, so this stays explicitly out of scope until saved history or paid tiers are actually being built.

**Scaled APIs**
- Same Anthropic API call, now proxied through the backend instead of called directly from the browser.
- Optionally, a Stripe integration once a paid tier exists, since pricing was named in the PRD's business case (free during a limited window, nine dollars a month after).
- Direct posting integrations (X, Product Hunt) remain future scope, listed in the MVP feature list under Future Features, and are not assumed here either.

**Scaled deployment**
- Frontend stays on Vercel. Backend deploys to a separate service (Render, matching the pattern already used for Dispatch's backend and cap service) with its own environment variables for the Anthropic API key and database connection string.
- Database hosted on a managed Postgres provider rather than self managed, to avoid spending build time on infrastructure that is not the product.

## 4. Summary

Tonight: frontend only, one API call, static deployment, nothing else. That is not a simplified version of the real architecture, it is the correct architecture for what is being judged. The scaled version above exists so the roadmap question is answered honestly if a judge asks what comes next, not because any of it needs to exist before the deadline.
