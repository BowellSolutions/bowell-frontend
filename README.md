<div align="center" style="padding-bottom: 20px">
    <h1>Bowell Frontend</h1>
    <img src="https://img.shields.io/badge/Next.js-%23000000.svg?&style=for-the-badge&logo=next.js&logoColor=white" alt=""/>
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt=""/>
    <img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white" alt=""/>    
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt=""/>
    <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" alt=""/>    
    <img src="https://img.shields.io/badge/Chakra--UI-319795?style=for-the-badge&logo=chakra-ui&logoColor=white" alt=""/>
    <img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white" alt=""/>
    <img src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white" alt=""/>    
    <img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white" alt=""/>
    <img src="https://img.shields.io/badge/Cypress-17202C?style=for-the-badge&logo=cypress&logoColor=white" alt=""/>
</div>

## Tools, libraries, frameworks:

This setup uses Node 14 and yarn.

### Frontend

- Next JS with Typescript
- `axios` - HTTP client
- `redux`, `redux-thunk` - (global) state management
- `sass` - Scss support
- `chakra-ui`, `emotion`, `framer-motion` - UI libraries
- `jest` + dependencies - unit tests
- `cypress` + dependencies - E2E testing

## Development setup

Environmental variables in .env.local

```
API_URL=http://127.0.0.1:8000/api
API_ACCESS_TOKEN_LIFETIME=3600
```

### Without Docker

Install dependencies

```shell
yarn install
```

Run development server

```shell
yarn dev
```

#### Running tests:

Jest (unit tests)

```shell
yarn test
```

Cypress (e2e tests)

```shell
yarn e2e
```

### With Docker

Make sure Docker Engine is running.

While in root directory, build docker images and run them with docker-compose. This might take up to few minutes.
Rebuilding image is crucial after installing new packages via yarn/npm.

```shell script
docker-compose up --build
```

Client application should be up and running at `127.0.0.1:3000`.

If docker images are installed and **no additional packages have been installed**, just run to start containers:

```shell script
docker-compose up
```

Bringing down containers

```shell script
docker-compose down
```

To run commands in an active container:

```shell script
docker exec -it frontend <command>
```
