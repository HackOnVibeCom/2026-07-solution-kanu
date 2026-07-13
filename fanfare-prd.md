# Fanfare: Product Requirements Document

**Hackathon:** HackOnVibe, July 2026
**Theme:** Effective promotion of a newly launched mobile app
**Builder:** Winarc, solo
**Deadline:** July 13, 06:59 WAT

## 1. Problem Statement

Indie developers finish building their app and stall at the last mile. They do not have marketing copy, App Store listing text, launch social posts, or a Product Hunt draft ready, and writing all of it from scratch on launch day is the thing most likely to get postponed. Fanfare closes that gap. The person describes what they built, and Fanfare writes everything needed to announce it.

## 2. Target User

Solo and small team mobile app developers who have a working build or a store listing ready and need launch copy fast. They are not marketers, do not want to hire one, and are launching on a tight personal deadline, often the same day the app ships.

## 3. User Stories

- As a developer who just shipped, I want to enter my app name, one line description, target user, and store link, so that I do not have to write launch copy from a blank page.
- As a developer, I want App Store title, subtitle, and keyword suggestions, so that my listing is discoverable without doing ASO research myself.
- As a developer, I want ready to post copy for X, LinkedIn, and a short form video hook, so that I can announce the launch across channels without rewriting the same idea four times.
- As a developer, I want a Product Hunt style draft, so that I can post to a launch community without guessing the right format and tone.
- As a developer, I want landing page hero copy, so that my product page has a headline and subhead that matches the rest of my launch messaging.
- As a developer, I want to copy any single section with one click, so that I can paste it directly where it needs to go.
- As a developer, I want to see the output appear section by section rather than all at once, so that I trust the tool actually generated it rather than serving a static template.

## 4. Features

See the separate MVP feature list for the full Must Have, Nice to Have, and Future breakdown. Summary for this PRD:

**In scope for hackathon submission**
- Single page input form
- Live Anthropic API call generating four sections: store listing, social posts, launch post draft, landing hero copy
- Sequential reveal of each section as it completes
- Copy to clipboard per section
- Deployed, working URL

**Out of scope for hackathon submission**
- Accounts, login, saved history
- Payments or subscription enforcement
- Direct posting integrations to any platform
- Multi language output

## 5. User Flow

1. Person lands on the page and sees the input form immediately, no scrolling required.
2. Person fills in app name, one line description, target user, and store link.
3. Person selects Raise the curtain.
4. Button enters a loading state with a short label change.
5. The programme section appears below and each of the four Acts reveals in sequence as its content finishes generating.
6. Person reads a section and selects Copy on any Act to copy that section's text.
7. Person can change the form fields and submit again to regenerate a new programme for a different app.

There is no branching path. There is no auth gate. There is no multi step wizard. The entire flow is one form and one output view, which matches the no code, beginner friendly framing of the hackathon and keeps the surface area small enough to finish and demo reliably.

## 6. Data and Storage Requirements

Fanfare does not require a database for the hackathon submission.

- No user accounts, so nothing to persist per user.
- No saved history in the Must Have scope, so no rows to store between sessions.
- Form inputs and generated output live in browser memory (React state or plain JS variables) for the duration of the session only.
- If Nice to Have scope is reached, a single browser side persistence layer (for example, saving the last result so a refresh does not lose it) is sufficient. This does not require a backend database, since it can use in memory state or, if persistence across page loads is wanted without login, a lightweight client side key value store rather than a server database.

No schema is defined because there is nothing relational to model. If a future version adds accounts, the minimum schema would be a users table and a launches table with a foreign key, but that is explicitly Future scope and not part of this submission.

## 7. APIs

**External API**
- Anthropic Messages API, called directly from the frontend, following the artifact style pattern already used in this environment.
- Single request per generation, with the four sections requested as one structured call rather than four separate calls, to keep latency and cost down and to keep the sequential reveal purely a frontend animation rather than four real round trips. If real per section streaming is wanted instead, four sequential calls can be made, with the frontend revealing each Act as its individual response returns.
- No other third party API is required for the Must Have scope. No App Store API, no social platform API, no Product Hunt API. All output is copy text the person pastes manually.

**Internal API**
- None. This is a single page frontend application with no backend service to build, deploy, or maintain, which is the main reason this scope is achievable in the remaining build window.

## 8. Success Criteria

**Submission level, non negotiable**
- A working, deployed demo URL that a judge can open and use without setup.
- A short demo video showing the actual flow, not a mockup.
- A product description with target user and what was built during the hackathon window, as required by the submission format.

**Product level**
- Generation completes and displays all four Acts without manual intervention.
- Output is specific to the input, not generic filler that ignores the app name or description.
- Copy buttons work and copy the correct section text.
- The interface matches the stated design constraints: no dark mode default, no gradients, no emoji, no exclamation marks, and reads as an intentional visual system rather than a template.

**Judging criteria alignment**
- Usefulness and execution: solves a real, common last mile problem for indie developers, with a working demo end to end.
- AI and product depth: the AI is doing the actual generation work for four distinct output types, not decorating a static page.
- Business potential: clear target customer (solo and small team app developers), a stated pricing direction (free during a limited window, paid after), and a plausible first user channel (other indie hackathon builders and communities like Product Hunt or r slash SideProject).

## 9. Risks

- API latency or rate limits during the live demo. Mitigation: test the exact demo flow once fully deployed before recording the video, and keep a backup screen recording in case live generation is slow during judging.
- Judges evaluating asynchronously rather than live, meaning the video carries more weight than the live link. Mitigation: make the video the primary proof and treat the live link as a bonus, not the only path to a working demonstration.
- Scope creep into Nice to Have or Future features eating time needed for the video and submission text. Mitigation: hard stop on new features once the Must Have list is functioning end to end.
