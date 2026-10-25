
# B14-A6-Fit Log

FitLog is a responsive workout library and gym companion that helps users explore exercises, view workout details, build a daily workout plan, and save workouts for later.

## Live Demo

Add your deployed website URL here after deployment.

## Project Description

FitLog provides a simple and modern interface for discovering workouts and managing a personal exercise plan. Users can browse workout information, view exercise instructions, sort their plan, and track completed workouts.

## Technologies Used

- Next.js
- React
- JavaScript
- Tailwind CSS
- Next.js App Router
- Context API
- Browser Local Storage
- FitLog Workout API

## Key Features

1. **Responsive Design:** Layout adapts to mobile, tablet, and desktop screens.
2. **Workout Library:** Browse workouts with exercise information and key statistics.
3. **Workout Details:** View exercise details, equipment, difficulty, sets, reps, and instructions.
4. **Today's Plan:** Add workouts to a daily plan and manage the selected exercises.
5. **Save for Later:** Save workouts for quick access later.
6. **Workout Tracking:** Mark workouts as completed or remove them from the plan.
7. **Sorting:** Sort workouts by duration, calories, or rating.
8. **Notifications:** Receive feedback when performing workout actions.
9. **Persistent Data:** Plan and saved workouts are stored in browser Local Storage.
10. **Navigation:** Navigate between the workout library, workout details, and My Plan pages.

## API

The project uses the FitLog workout API.

- Workout list: https://api.abcz.workers.dev/api/fitlog
- Workout details: https://api.abcz.workers.dev/api/fitlog/:id

Alternative API host:
https://api.api-store.workers.dev/api/fitlog

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

Clone the repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Open the project directory:

```bash
cd fitlog
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

### Production Build

To create a production build:

```bash
npm run build
```

To start the production server after building:

```bash
npm run start
```

## Project Routes

- `/` — Workout library and home page
- `/workout/[id]` — Workout details
- `/my-plan` — Today's Plan and saved workouts

## Deployment

This Next.js application can be deployed using Vercel.

Add the final deployed website URL to the Live Demo section after deployment.

## License

This project was created as part of a programming course assignment.
