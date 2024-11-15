# B6-FullStack-Student-Web-Application
This project implements a web server using Node.js and the Express framework to manage and serve student data for various classes organized by semester and year. The website’s frontend and UI is managed by React. The server's architecture is designed to access class information, providing users to retrieve and search for student details based on class ID, semester/year, or individual student information. The website also has integration with the backend to add, update, and delete student’s information, maintaining both backend and frontend integrity.


Directory Hierarchy
B6 Server/
│
├── client/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   ├── sjsu_background.jpg
│   │   ├── components/
│   │   │   ├── AddClassForm.js
│   │   │   ├── AddFileForm.js
│   │   │   ├── AddStudentForm.js
│   │   │   ├── ClassList.js
│   │   │   ├── DeleteStudent.js
│   │   │   ├── EditStudent.js       
│   │   │   ├── FileList.js
│   │   │   ├── SearchStudent.js
│   │   │   └── StudentList.js
│   ├── package-lock.json
│   └── package.json
│
├── data/
│   ├── DATA228/
│   │   ├── Winter2024.txt
│   │   └── Spring2025.txt
│   └── DATA236/
│       └── Spring2025.txt
│
├── server/
│   ├── server.js
│   ├── routes/
│   │   ├── classRoutes.js
│   │   ├── fileRoutes.js
│   │   └── studentRoutes.js
├── package-lock.json
└── package.json

The server directory structure contains route files of backend functionalities such as get, post, search, and delete for the backend operations as well as the server.js file to start the backend server. In classRoutes.js includes functions to get class ID, add new classes, and to get class options for the drop down menus. fileRoutes.js includes functions to get files and add new files in a subdirectory. studentRoutes.js searches, addes, deletes, gets, and updates all information concerning students.
The data directory structure consists of class ID folders (e.g., DATA236), each containing files corresponding to different semesters/years (e.g., Winter2024.txt). Each file contains records for students enrolled in that class, including their names, student IDs, and email addresses. 
The client directory structure consists of code source folders, each containing component files corresponding to different frontend operations (e.g., AddClassForm.js, DeleteStudent.js, ClassList.js). Each file the code using React as well as the functionalities to delete, read, and update using the package Axios. The client directory also contains the application files (e.g., App.js, Index.js, App.css) to control the React entry point, the main application for the components, and the styling of the main application.
Technologies
JavaScript
NodeJS
Express
React
Axios

Getting Started
Prerequisites
Before you begin, ensure you have the following installed on your system:
A modern web browser (e.g., Chrome, Firefox, Safari).
A text editor (e.g., Visual Studio Code) to modify the code if needed.
Installation of NodeJS, Express, React, and Axios
Running the Project
Instantiate the NodeJs Web Server by running node server/server.js in the terminal.
Simultaneously, In a split terminal to run the React frontend website, run npm start.
Make sure that all the downloaded files from the directory hierarchy are in the correct  directories.
Open up the backend Json output on localhost:5001 to view and test the backend functionality
Open up the webpage on the local host web server by entering localhost:3000 into the URL of the web browser. 
