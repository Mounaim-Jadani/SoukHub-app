.PHONY: test build docker-up docker-down docker-logs

test:
	npm test

build:
	npm --prefix frontend run build

docker-up:
	docker compose up --build

docker-down:
	docker compose down

docker-logs:
	docker compose logs -f
