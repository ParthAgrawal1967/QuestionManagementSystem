Interactive Question Management Sheet
Introduction
This document outlines the design for an interactive, single-page web application that enables users
to manage a hierarchical set of questions categorized by topics and sub-topics. The application will
allow users to add new topics, sub-topics, and questions, as well as reorder these elements through a
drag-and-drop interface. The design emphasizes a clean and intuitive user interface to enhance user
experience.
Functional Requirements
1. Add Topic:Users can create/edit/delete new topics.
2. Add Sub-topic: Users can create/edit/deletesub-topics under existing topics.
3. Add Question: Users can create/edit/delete questions under specific topics and sub-topics.
4. Reorder Elements: Users can change the order of topics, sub-topics, and questions by
dragging and dropping them to the desired position.
Assumptions
● The application will be a single-page web app.
● The user interface will be clean and intuitive, focusing on ease of use.
● Developers have the liberty to design the UI, provided it meets the functional
requirements.(Reference : Codolio website)
Technical Requirements
1. Frameworks and Libraries
○ Use a modern front-end framework (e.g., React).
○ Utilise CSS frameworks or libraries (e.g., Tailwind CSS, Bootstrap) for responsive
design.
2. State Management
○ Implement proper state management for handling transactions (e.g., Zustand for
React).
3. API Integration
○ Implement basic CRUD apis, without database will work too, reference curl for data
(curl --location
'https://node.codolio.com/api/question-tracker/v1/sheet/public/get-sheet-by-slug/strive
r-sde-sheet')
Sample Data
Use this data attached as sample dataset to populate the initial state of the application : dataset
Bonus Points
Implement any improvement in the functionality of sheets which you feel currently missing on the
platform.
