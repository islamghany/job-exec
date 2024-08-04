
## up: starts all containers in the background without forcing build
up:
	@echo "Starting Docker images..."
	docker compose up 
	@echo "Docker images started!"

## up-deattached: starts all containers in the background without forcing build
up-deattached:
	@echo "Starting Docker images..."
	docker compose up -d
	@echo "Docker images started!"

## logs: shows logs of all containers
logs:
	@echo "Showing logs of all containers..."
	docker compose -p infra logs -f
	@echo "Done!"

## up_build: stops docker-compose (if running), builds all projects and starts docker compose
up_build:
	@echo "Stopping docker images (if running...)"
	docker compose down
	@echo "Building (when required) and starting docker images..."
	docker compose up --build 
	@echo "Docker images built and started!"


## down: stop docker compose
down:
	@echo "Stopping docker compose..."
	docker compose down
	@echo "Done!"


