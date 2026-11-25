
# iyf-s12-communityhub-team-dennismungai55

### SQL vs. NoSQL

I would choose SQL when data has a clear relational structure—such as users, posts, comments, and roles—where strict schemas, foreign-key integrity, and multi-table joins matter. SQL is also a strong fit when ACID transactions and consistent reporting queries are central to the application. NoSQL works better when schemas evolve frequently or documents are mostly read and written as self-contained units.
=======
# CommunityHub

**A collaborative full-stack web development project by IYF WeCan Academy — Season 12.**

CommunityHub is a community platform designed to connect members through user profiles, posts and comments. It is our flagship project, developed progressively as we apply the skills learned throughout the Practical Web Development Training.

## About the Project

The project aims to build a responsive and accessible platform where users can:
- Create and manage profiles.
- Create, view and interact with posts.
- Comment on community posts.
- Register, log in and access protected features.

## Technology Stack

| Area | Technologies |
|---|---|
| Frontend | React, Vite, JavaScript |
| Styling | Tailwind CSS, CSS Modules |
| Routing | React Router |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose, SQLite |
| Authentication | JWT, bcrypt |
| Tools | Git, GitHub, VS Code, Postman |
| Deployment | Vercel / Netlify, Render / Railway |

## Development Roadmap

### Phase 3: React & Modern Frontend (Weeks 8–9)
- React components, props, state and events.
- Effects and API data fetching.
- React Router and navigation.
- Custom hooks and reusable components.
- Styling and accessibility.

**Milestone:** Complete and deploy the React frontend.

### Phase 4: Backend Development (Weeks 10–11)
- Node.js and Express server.
- REST API and CRUD operations.
- SQL and MongoDB databases.
- User registration, login and JWT authentication.
- Middleware, validation and security.

**Milestone:** Complete the CommunityHub backend.

### Phase 5: Full-Stack Integration & Deployment (Week 12)
- Connect React frontend to Express API.
- Implement authentication and full CRUD workflows.
- Configure production environment variables.
- Deploy and test the full-stack application.

**Milestone:** Launch the CommunityHub full-stack MVP.

## Getting Started

### Prerequisites
- Node.js and npm
- Git
- VS Code

### Installation

Clone the repository:

```bash
git clone https://github.com/dennismungai55/iyf-s12-communityhub-team-dennismungai55.git
```

Navigate into the project:

```bash
cd iyf-s12-communityhub-team-dennismungai55
```

Install frontend dependencies:

```bash
cd frontend
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

## Project Structure

```text
CommunityHub/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── exercises/
│   ├── package.json
│   └── vite.config.js
├── backend/          # Planned
├── CONTRIBUTORS.md
└── README.md
```

## Team Collaborators

| Name | GitHub | Role |
|---|---|---|
| Dennis Mungai | [@dennismungai55](https://github.com/dennismungai55) | Team Lead |
| Shaniz Ann Mumbua | [@Samcodex-405](https://github.com/Samcodex-405) | Team Contributor |
| Elvis Ng'ang'a Maina | [@ElvisMaina-ctr](https://github.com/ElvisMaina-ctr) | Team Contributor |

## Contribution Guidelines

We use GitHub for collaborative development.

1. Create a feature branch.
2. Implement and test your changes.
3. Commit using meaningful commit messages.
4. Push your branch to GitHub.
5. Open a Pull Request.
6. Request a teammate review.
7. Merge after approval.

## Learning Resources

- [React](https://react.dev/)
- [Vite](https://vite.dev/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)

## Acknowledgements

Special thanks to **IYF WeCan Academy** for providing the training, resources and collaborative learning environment.

**Built with collaboration, creativity and the WeCan spirit
