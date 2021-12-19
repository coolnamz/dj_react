# syntax = docker/dockerfile:1.2
# Dockerfile in Django root directory 

# Pull python image
FROM python:3.8.10

# container directory for django codes
WORKDIR /usr/src/app

# Node.js 설치
RUN apt-get update
RUN apt-get install nodejs

# install required packages (Django)
COPY requirements.txt ./
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
RUN pip install gunicorn
RUN pip install python-memcached

# install required packages (React)
RUN cd react
RUN npm install
RUN npm collect

# copy files to /usr/src/app
#COPY . .

# port
EXPOSE 8000

# gunicorn
#CMD ["python", "manage.py", "runserver", "0.0.0.0:5000"]
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "aaadir.wsgi:application"]
