# weconnectu-docker

Deployment Instructions
This repository contains a PHP API, a Next.js application, and a MySQL database. These services are configured to run together using Docker Compose.

Prerequisites
Docker installed on your machine
Docker Compose installed on your machine

Build and Start the Containers
Use Docker Compose to build and start the containers:
docker-compose up --build

This command will build the Docker images for the PHP API and the Next.js application, and start all the services defined in the docker-compose.yml file.

Access the Applications
PHP API: The PHP API will be available at http://localhost:8080.
Next.js Application: The Next.js application will be available at http://localhost:3000.
