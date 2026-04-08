# Calendar Task & Notes App

A simple and interactive calendar-based web application built using Next.js and React.  
Users can select a date, add notes, manage tasks, and select date ranges.

---

##  Features

-  Monthly calendar view starting from Monday
-  Add and edit notes for each day
-  Create, update, and delete tasks
-  Mark tasks as completed
-  Select date ranges visually
-  Persistent storage using localStorage

---

## Tech Stack

- Next.js (App Router)
- React (Hooks)
- TypeScript
- Tailwind CSS

---

## Design Decisions

- **State Management:**  
  Used React `useState` for managing local UI state like selected day, tasks, and notes.

- **Persistent Storage:**  
  Data is stored in `localStorage` to ensure persistence across page reloads without requiring a backend.

- **Lazy Initialization:**  
  The calendar data is initialized using a function inside `useState` to avoid unnecessary re-renders and ensure efficient loading.

- **Component-Based Architecture:**  
  The app is modularized into reusable components like:
  - Tabs
  - Notes
  - Task
  - Selector
  - Dates

- **Separation of Concerns:**  
  Utility functions like `getCurrentMonthDays` and `getDaysToFirstMonday` are separated into utility files.

  ##  How to Run Locally

  ###  Clone the repository

  ```bash
  git clone https://github.com/rishavsanjan/tuft-test
  cd tuft-test
  npm install
  npm run dev
  ```

  
---

