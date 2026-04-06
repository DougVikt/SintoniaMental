.SILENT:

# so o poetry
add:
	@echo Adcionando dependencias...
	poetry add $(dep)

up:
	@echo Atualizando dependencias...
	poetry update

info:
	@echo Listando dependencias
	poetry show

# com o django
run:
	@echo Rodando sevidor...
	poetry run python manage.py runserver

app:
	@echo Criando app...
	poetry run python manage.py startapp $(name)

makemigrations:
	poetry run python manage.py makemigrations

migrate: makemigrations
	@echo Rodando migrações
	poetry run python manage.py migrate

