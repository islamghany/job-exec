# Job Execution

Spin up a job that will resolve after a random amount of time.

## How to Setup

**Note:** You need to have docker and docker-compose installed on your machine to run the app.

### 1. Clone the repository

```bash
git clone <repo-url>
```

### 2. Go to the project directory infra

```bash
cd <project-directory>/infra
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
