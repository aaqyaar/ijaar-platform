# JPC - Jamhuriya CIT Placement Cell

Jamhuriya Placement Cell is system that admin can manage skillers, teachers, course and all other stuff

## API Reference

#### Get Static HTML Page

```http
  GET /
```

#### Users & Auth API's

- prefix all `/api`

```http
  GET /users
```

```http
  POST /register
```

```http
  POST /login
```

```http
  POST /logout
```

```http
  POST /confirm-email
```

```http
  POST /resend-code
```

```http
  POST /reset-password
```

```http
  POST /forgot-password
```

## Authors

- [@abdizamedmo](https://www.github.com/aaqyaar)
- [@badrudiin](https://github.com/Badrudin-cloud)
- [@abdimalik](https://github.com/Abdimalik-Osman)
- [@zacky](https://github.com/zacky-abdalla)

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`
`MONGO_URI`
`SMTP_SERVER`
`SMTP_PORT`
`SMTP_USER`
`SMTP_PASS` app password

## Tech Stack

**Client:** React, Context, TailwindCSS

**Server:** Node, Express, MongoDB

## Run Locally

Clone the project

```bash
  git clone https://github.com/JUST-CIT-Placement-Cell/jpc-server
```

Go to the project directory

```bash
  cd jpc-server
```

Install dependencies using yarn or npm package managers

- yarn preffered

```bash
  npm install or yarn install
```

Start the server on development

```bash
  npm run dev or yarn dev
```
