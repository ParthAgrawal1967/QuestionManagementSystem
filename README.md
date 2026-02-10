📘 Question Management Sheet — DSA Tracker

A fully interactive DSA Sheet Tracker built with React + Zustand + TailwindCSS that allows users to organize, manage, and track coding problems in a structured hierarchy of Topics → Subtopics → Questions.

The application fetches the public Striver SDE Sheet and converts it into an editable learning workspace where users can track their preparation progress.

🚀 Live Features
🧩 Hierarchical Structure

Topics

Sub-topics

Questions

Each level is expandable and editable.

✏️ CRUD Management

You can:

Add topics

Edit topics

Delete topics

Add sub-topics

Edit sub-topics

Delete sub-topics

Add questions

Edit questions

Delete questions

Inline editing is supported — no page reload required.

✅ Progress Tracking

Mark a question as completed

Progress automatically saved

Restores progress after refresh or reopening browser

Persistence is implemented using LocalStorage.

🔎 Smart Search

Search works across:

Question Name

Difficulty

Platform

When searching:

Relevant topics auto expand

Only matching questions are shown

🔁 Drag & Drop Reordering

You can reorder:

Topics

Sub-topics

Questions

The drag system is custom built (no drag libraries used).

🌐 API Integration

The sheet loads from a public endpoint:

Striver SDE Sheet API


The app dynamically converts API response into UI structure.

Reload data anytime using Reload Data button.

💾 Offline Persistence

Your changes are not lost after refresh:

Completed questions saved

Custom edits saved

New topics/subtopics saved

🧠 Tech Stack
Technology	Purpose
React	Frontend UI
Zustand	Global State Management
TailwindCSS	Styling
React Router	SPA Navigation
Lucide Icons	Icons
LocalStorage	Persistence Layer
🏗 Architecture

The application uses a centralized store:

Zustand Store
   ↓
Topics
   ↓
SubTopics
   ↓
Questions


The API data is normalized into this structure using a transformation function.

📂 Folder Structure
src/
│
├── components/
│   ├── ui/
│   └── AppIcon.jsx
│
├── pages/
│   └── QuestionManagementSheet/
│       ├── TopicItem.jsx
│       ├── SubTopicItem.jsx
│       └── QuestionItem.jsx
│
├── store/
│   └── questionStore.js
│
├── utils/
│   └── progressStorage.js
│
└── App.jsx

⚙️ Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/YOUR_USERNAME/dsa-sheet-tracker.git
cd dsa-sheet-tracker

2️⃣ Install dependencies
npm install

3️⃣ Start the development server
npm run dev


Open in browser:

http://localhost:5173

🎯 Key Functionalities Implemented

Global state management

Nested data updates

Immutable updates

Custom drag & drop

Search filtering

API transformation

Persistent storage

Expandable UI system

Error handling UI

Loading state UI

📸 Screenshots

(You can add later — GitHub will show them nicely)

Example:

/screenshots/home.png
/screenshots/search.png
/screenshots/dragdrop.png

📈 Learning Outcomes

This project demonstrates:

Complex state management in React

Handling deeply nested data

Designing scalable UI architecture

Building a productivity tool

Persisting application state

Implementing drag & drop without libraries

🎓 Use Case

Helps students track DSA preparation in a structured and organized way similar to paid preparation platforms.

👨‍💻 Author

Parth Agrawal

B.Tech CSE
Competitive Programmer
Machine Learning & Web Development Enthusiast

⭐ Future Improvements

User authentication

Cloud sync

Notes per question

Progress analytics dashboard

Difficulty heatmap

📜 License

This project is open-source and available for educational use.

If you want, next I’ll also write a perfect resume project description (very important for placements — 2 lines but high impact).