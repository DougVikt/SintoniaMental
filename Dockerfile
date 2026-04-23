FROM python:3.13-slim

WORKDIR /app

RUN pip install poetry

COPY pyproject.toml poetry.lock* ./

RUN poetry config virtualenvs.create false

RUN poetry install --only main

COPY . .

EXPOSE 8000

CMD ["sh" ,"-c","poetry run python manage.py collectstatic --noinput && poetry run python manage.py migrate && poetry run gunicorn ProjectSintonia.wsgi:application --bind 0.0.0.0:8000"]