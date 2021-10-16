FROM python:3.9
WORKDIR /app
COPY requirements.txt /app/requirements.txt
RUN pip install -r requirements.txt
COPY . /app
RUN python manage.py migrate
CMD gunicorn --timeout 120 --workers=3 -b 0.0.0.0:8000 airblue.wsgi
