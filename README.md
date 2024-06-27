# Bitespeed Backend Task

##### Installation

```bash
npm ci
```

Fill in the environment variables in the `.env` file, refer to the `.env.example` file for the required variables.

```bash
cp .env.example .env
```

##### Usage `(in development mode)`

After Postgres is running for development environment, start the Express Server

```bash
npm run dev
```

> Make sure all the ticks are green in the terminal.

---

##### Usage `(in production mode)`
```bash
npm start
```

##### Development Guidelines

- ###### Code Formatting

  - Add files to the staging area
  - Use `npm run format` to run the eslint and prettier checks on the staged files manually

---

##### API Documentation

[![Run in Postman](https://run.pstmn.io/button.svg)](https://documenter.getpostman.com/view/20772277/2sA3dsntwd)
