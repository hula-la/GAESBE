cd frontend
docker build -t frontend .
docker ps -q --filter "name=frontend" | grep -q . && docker stop frontend && docker rm frontend | true
docker run -d -p 80:80 -p 443:443 -v /home/ubuntu/certbot/conf:/etc/letsencrypt/ -v /home/ubuntu/certbot/www:/var/www/certbot --name frontend frontend
docker rmi -f $(docker images -f "dangling=true" -q) || true
