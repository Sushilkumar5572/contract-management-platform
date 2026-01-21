**Contract Management Platform (Frontend Only)**

*Overview*

A frontend-only Contract Management Platform built using React (JavaScript).
The application allows users to create reusable contract blueprints, generate contracts, manage contract lifecycle states, and fill contract fields — all without a backend.

Focus areas: clean architecture, controlled lifecycle transitions, and usability.

*Deployment*

Live URL:
https://chic-melomakarona-2e8b7d.netlify.app/

*Tech Stack*

React (JavaScript)

React Router

localStorage (mock persistence)

No backend

*Setup*

Clone the repository

Run npm install

Run npm start

Open http://localhost:3000

*Features*

Blueprint creation with configurable fields
(Text, Date, Signature, Checkbox)

Contract creation from blueprints

Strict contract lifecycle:
Created → Approved → Sent → Signed → Locked
Revoked allowed at valid stages

Contract dashboard with status filters

Contract view with field filling
(Editing disabled for Locked / Revoked contracts)

*Architecture*

Component-based React structure

Business rules isolated in utility files

localStorage abstraction for persistence

No global state library

*Assumptions & Limitations*

Single-user system

No authentication or backend

Basic UI styling

No automated tests

*Evaluation Focus*

Lifecycle correctness

Clean, readable code

Proper state management

Usable UI without overdesign
