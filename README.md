
<<<<<<< HEAD
# Project Name
=======
# Canvas
>>>>>>> ff0a0236739f8c8ef388ec9ce561d9fd9b967488

A comprehensive web application designed for image annotation and template management. This project is structured into two main components: the frontend, developed with React, and the backend, powered by Express and MongoDB. The application allows users to upload images, annotate them with rectangles, create, save, and reuse annotation templates with functionalities to scale, rotate, and move annotations.

## Project Structure

The project is organized into the following main directories:

```
project-root/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── package.json
│   └── (other backend files)
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── (other frontend files)
└── README.txt
```

### Frontend

Developed using React, the frontend features a canvas-based interface for image annotation. Users can draw, scale, rotate, and move rectangles over uploaded images, and group these annotations into templates.

### Backend

The backend is built with Express and MongoDB, providing REST APIs for CRUD operations on annotation templates. It supports template persistence, enabling users to save and retrieve their work.

## Key Features

- **Image Upload**: Users can upload images to annotate.
- **Annotation Tools**: Drawing, scaling, rotating, and moving rectangles on images.
- **Template Management**: Creating, saving, and reusing annotation templates.
- **Persistent Storage**: Backend CRUD operations for managing templates.

## Setup Instructions

### Backend

1. Navigate to the `backend` directory: `cd backend`
2. Install dependencies: `npm install`
3. Set up your MongoDB URI in `.env`
4. Start the server: `npm start`

### Frontend

1. Navigate to the `frontend` directory: `cd frontend`
2. Install dependencies: `npm install`
3. Start the React app: `npm start`
4. Access the app at `http://localhost:3000`

Ensure the backend is running before starting the frontend for full functionality.

## Contribution

Feel free to contribute to this project by submitting issues or pull requests.
