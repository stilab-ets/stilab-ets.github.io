# Backend

## Development environment

1. From the root of the repository, create the virtual environment

```bash
python -m venv .venv
.\.venv\Scripts\activate # Windows
source .venv/bin/activate # Linux
pip install -r requirements.txt
pre-commit install # To install some pre-commit hooks to help with code quality
```

2. Create a `.env` file at the root of the repository. The variables needed for the backend to work are:

```yaml
DJANGO_DEBUG=True
DJANGO_LOG_LEVEL=DEBUG # Options are DEBUG, INFO, WARNING, ERROR and CRITICAL

DB_USER=admin@admin.com
DB_PASSWORD=admin123
DB_HOST=db
DB_PORT=5432
DB_NAME=postgres

EMAIL_HOST=SMTP_SERVER_HOST
EMAIL_PORT=8025
EMAIL_USE_TLS=False
EMAIL_HOST_USER=email@example.com
EMAIL_HOST_PASSWORD=CHANGE_ME
BACKEND_URL="https://www.backend.example"
FRONTEND_URL="http://localhost:5173"
```

3. Start the containers:

```bash
docker compose build
docker compose up [--build] [-d] # --build to skip the first command, -d to run in detached mode
```

4. Set up the database:

```bash
docker compose exec backend python manage.py migrate
docker compose exec backend python manage.py createsuperuser

# To create new migrations 
docker compose exec backend python manage.py makemigrations --name migration_name 

```

5. Insert Legacy data 

```bash
docker compose exec backend python manage.py insert_legacy_data 
```

6. Synchronise publications:

```bash
docker compose exec backend python manage.py getpublications [--fast | -f]
```

-   The Django admin will be available at `localhost:8000/admin` with the credentials created previously with the `createsuperuser` command
-   You can access the database with pgAdmin at `localhost:5050`. Login with the credentials:
    -   Username: `admin@admin.com`
    -   Password: `admin123`
