# 🧪 STIL Lab Web Platform

An interactive web platform to centralize, manage, and showcase the scientific activities of a software engineering research laboratory.

## 🎯 Project Objective

This project aims to design and develop a structured website for a research laboratory. The goal is to centralize the lab’s key information and facilitate its management and dissemination, both internally and to the scientific and industrial community.

## Installation

### Development Environment (Frontend)

1. Install the required dependencies:
```sh
npm install
```

2. Start the application:
```sh
npm run dev
```
The application will be available locally at http://localhost:5173/

3. Run unit tests with coverage:
```sh
npm run test
```

### Development Environment (Backend)

To create a containerized local development environment:

1. Install [Docker](https://www.docker.com/products/docker-desktop).

2. Create a `.env` file and add the following environment variables:

```yaml
DJANGO_DEBUG=True
DJANGO_LOG_LEVEL=DEBUG # Options are DEBUG, INFO, WARNING, ERROR and CRITICAL

DB_USER=CHANGE_ME
DB_PASSWORD=CHANGE_ME
DB_HOST=db
DB_PORT=5432
DB_NAME=postgres

EMAIL_HOST=SMTP_SERVER_HOST
EMAIL_PORT=SMTP_SERVER_PORT
EMAIL_USE_TLS=False
EMAIL_HOST_USER=email@example.com
EMAIL_HOST_PASSWORD=CHANGE_ME
BACKEND_URL="https://www.backend.example"

VITE_API_BASE_URL=http://localhost:8000
```

3. Use the command:
```sh
docker compose build
docker compose up [--build] [-d] # --build to skip the first command, -d to run in detached mode
```

The database will be available at `localhost:5432` and pgAdmin at `localhost:5050`.

pgAdmin login credentials:

User: `admin@admin.com`  
Password: `admin123`

The mailhog server to test email delivery is available at `localhost:8025`.

## Additional Information

### 🚀 Key Features (Planned)

- 🔬 Management of **research projects** (ongoing / completed) with goals, participants, etc.
- 👩‍🔬 Directory of **researchers** (professors, PhD students, interns), expertise, affiliations.
- 👤 **Authentication system** and user **profile management**.
- 📚 Administration of **scientific publications** (articles, theses, conferences, etc.).
- 📰 Posting of **news and events**: workshops, seminars, awards, recruitment.
- 🛠️ **Admin dashboard** for user and content management.
- 🧩 Scalable: students and users can propose new features.

### 🏗️ Technology Stack

| Layer            | Possible Technology                  |
| ---------------- | ------------------------------------ |
| Frontend         | VueJS + TypeScript                   |
| Backend          | Python, Django                       |
| Authentication   | JWT, OAuth, or Firebase Auth         |
| Database         | PostgreSQL                           |
| DevOps           | Docker, GitHub Actions, Render       |
| Testing          | Vitest, Playwright, ESLint           |

> A reasoned choice of technologies will be made during the project based on needs, expected performance, security, and costs.

### 📁 Planned Project Structure

```bash
src/
├─ components/
│  └─ ResearchProjects/
│      ├─ ResearchProjects.tsx
│      ├─ hooks/
│      ├─ services/
│      └─ subcomponents/
├─ modules/
├─ lib/
├─ test/
└─ resources/
```

### 🧪 Quality & DevOps

- CI/CD with GitHub Actions  
- Automated test coverage  
- Compliance with security best practices (auth, data, access)  
- Code and architecture documentation  

### 📄 License

This project is licensed under the [MIT License](LICENSE.txt).

✨ This project is evolving. Team members are encouraged to propose new ideas or features.