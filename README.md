# Job Execution

Spin up a job that will resolve after a random amount of time.

## How to Setup

**Note:** You need to have docker and docker-compose installed on your machine to run the app.

### 1. Clone the repository

```bash
git clone git@github.com:islamghany/job-exec.git
```

### 2. Go to the project directory infra

```bash
cd job-exec/infra
```

### 3. Start the app

The infra folder contains a docker-compose file that will start all the services required to run the app.

If you have Make installed, you can start the app by running the following command:

```bash
make up
```

and this will start the app in current terminal.

or you can run the following command to start the app using docker-compose:

```bash
docker-compose up
```

### 4. Access the app

The frontend app will be available at http://localhost:3000

And the backend app will be available at http://localhost:8080

## 5. Stop the app

If you have Make installed, you can stop the app by running the following command:

```bash
make down
```

or you can run the following command to stop the app using docker-compose:

```bash
docker compose down
```

## if you want run the app in detached mode and show logs

If you have Make installed, you can start the app in detached mode and show logs by running the following command:

```bash
make up-detached
make logs

```

or you can run the following command to start the app in detached mode and show logs using docker-compose:

```bash
docker compose up -d
docker compose -p infra logs -f
```
