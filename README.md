# Todo-Test
## Requirements & solution
- **Requirements:** Design a web UI including:
+ Displays and allows selection of users.
+ The table displays job information corresponding to the selected user, indicating completed/incomplete jobs and allowing job completion.
+ Display the number of completed tasks/total tasks.
-> Design frontend UI based on the above requirements, call APIs to fetch data from the backend (already available).
- **Technology/tools selection:**
+ ReactJS: 
    * Real-time interaction: Add features like adding, editing, deleting tasks without page reload.
    * Re-use: reuse components many times and flexibly
    * State Management: Use state and props to manage and change the state -> Change UI based on the state.
    * Virtual DOM: Optimize DOM, update quickly without affecting other DOM elements.
    * User-friendly, easy to use, with many libraries...
+ Material-UI: Popular UI library, provides pre-designed UI components for use and customization
+ Fetch API: Commonly used, simple and effective.

## Installation:
- **Requirements**: Install Node.js and npm.
- **Installation**:
+ Install the necessary libraries
```
    npm install
```
+ Start the project.
```
    npm start
```
+ The interface will be displayed on the browser with the URL http://localhost:3000.