# Snappr take-home ![language](https://img.shields.io/badge/language-typescript-blue.svg)

A fullstack application to use different functionalities of the OpenAI API.\
http://ec2-54-157-185-99.compute-1.amazonaws.com:3000/

## :package: Run the application locally

### Setup
First check if you have NPM installed 

### In /server
Create an .env file and define the following variables: 

OPENAI_API_KEY={the key that you provided us} 

PORT=1337

### Navigate to the /server/src folder and execute the following commands:

```sh
npm install
```

```sh
npm run build
```

```sh
npm run start
```

### In /client
Create an .env file and define the following variables:

REACT_APP_API_URL=http://localhost:1337/trpc

### Finally, navigate to the /client/src folder and execute the following commands:

```sh
npm install
```

```sh
npm run build
```

```sh
npm install -g serve
```

```sh
serve -s build -l 3000
```

Go to http://localhost:3000 and start testing the different features!

## :package: Some of the technologies used for this project

<code><a href="https://www.typescriptlang.org/"><img height="40" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/typescript/typescript.png" alt="ts logo" /></a></code>
<code><a href="https://react.dev/"><img height="40" src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*MF5V_dkybUTcfzwHFh0VSw.jpeg" alt="ts logo" /></a></code>
<code><a href="https://expressjs.com/"><img height="40" src="https://media.licdn.com/dms/image/D4E12AQEBg943ptCYpg/article-cover_image-shrink_720_1280/0/1686391647921?e=1721865600&v=beta&t=y8W2zqXTVBPtc_MIOt71Khz2PIq-Vemmmw4v_uWQZpg" alt="ts logo" /></a></code>
<code><a href="https://trpc.io/"><img height="40" src="https://trpc.io/img/logo-text-white.svg" alt="ts logo" /></a></code>
