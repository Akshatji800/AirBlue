echo "Running Release Tasks"

echo "Running Migrations"
python manage.py migrate

echo "Creating a superuser"
python manage.py createsuperuser --noinput

echo "Done"
