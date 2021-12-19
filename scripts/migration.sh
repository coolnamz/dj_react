sudo docker exec -i web bash -c "chmod -R 777 /usr/src/static && chmod -R 777 /root"
sudo docker exec -i web bash -c "cd /usr/src/app/react && npm install && npm run collect"
sudo docker-compose exec web python manage.py collectstatic --no-input
sudo docker-compose exec web python manage.py makemigrations
sudo docker-compose exec web python manage.py migrate
sudo docker-compose exec nginx chmod -R 755 /static
sudo docker-compose exec web python manage.py createsuperuser