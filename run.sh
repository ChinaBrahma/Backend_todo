docker compose build
docker compose run app npx prisma migrate dev --name init
docker compose up
