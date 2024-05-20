# Snappr take-home ![language](https://img.shields.io/badge/language-typescript-blue.svg)

A fullstack application to use different functionalities of the OpenAI API.\
http://ec2-54-157-185-99.compute-1.amazonaws.com:3000/

## :package: Run the application locally

### Setup
First check if you have NPM installed \

## On /client
Create an .env file and create the following variables \ 

OPENAI_API_KEY={the key that you provided us} \

PORT=1337

### Run the following scripts on the server/src folder

```sh
npm install
```

```sh
npm run build
```

```sh
npm run start
```

## On /server
Create an .env file and create the following variables \ 

REACT_APP_API_URL=http://localhost:1337/trpc

### Then run the following scripts on the client/src folder

```sh
npm install
```

```sh
npm run build
```

```sh
npm install -g serve
```

Go to http://localhost:3000 and start testing the different features!

## :package: Some of the technologies used

<code><a href="https://www.typescriptlang.org/"><img height="40" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/typescript/typescript.png" alt="ts logo" /></a></code>
<code><a href="https://trpc.io/"><img height="40" src="https://trpc.io/img/logo-text-white.svg" alt="ts logo" /></a></code>
<code><a href="https://react.dev/"><img height="40" src="https://www.google.com/imgres?q=react&imgurl=https%3A%2F%2Fmiro.medium.com%2Fv2%2Fresize%3Afit%3A1400%2F1*x0d41ns8PTQZz4a3VbMrBg.png&imgrefurl=https%3A%2F%2Fmedium.com%2F%40kalanamalshan98%2Funleashing-the-power-of-react-js-real-world-benefits-and-examples-db9165aa1376&docid=7LBRqf0CW7oaoM&tbnid=SbzNfqTDPNkd2M&vet=12ahUKEwinzr_0lpuGAxU2fTABHTGcDLcQM3oECFoQAA..i&w=1400&h=788&hcb=2&ved=2ahUKEwinzr_0lpuGAxU2fTABHTGcDLcQM3oECFoQAA" alt="ts logo" /></a></code>
