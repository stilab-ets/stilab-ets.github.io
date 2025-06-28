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

DB_USER=CHANGE_ME
DB_PASSWORD=CHANGE_ME
DB_HOST=db
DB_PORT=5432
DB_NAME=postgres
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

5. Synchronise publications:

```bash
docker compose exec backend python manage.py getpublications [--fast | -f]
```

-   The Django admin will be available at `localhost:8000/admin` with the credentials created previously with the `createsuperuser` command
-   You can access the database with pgAdmin at `localhost:5050`. Login with the credentials:
    -   Username: `admin@admin.com`
    -   Password: `admin123`
