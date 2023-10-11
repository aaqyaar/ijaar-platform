# Ijaar Platform (API)

The Real Estate Management System, this is the backend API for the Ijaar Platform.
the frontend is located at [Ijaar Front-end]("https://github.com/aaqyaar/ijaar-platform/tree/main/web") you can find it here.

## API Reference

The current routes, types, methods and actions attached to them are:

| Domain           | Method | Route                  | Access   | Description                         |
| ---------------- | ------ | ---------------------- | -------- | ----------------------------------- |
| `localhost:3000` | `GET`  | `/`                    | `public` | Returns the static HTML page.       |
| `localhost:3000` | `GET`  | `/api/users`           | `public` | Returns all users.                  |
| `localhost:3000` | `POST` | `/api/register`        | `public` | Registers a new user.               |
| `localhost:3000` | `POST` | `/api/login`           | `public` | Logs in a user.                     |
| `localhost:3000` | `POST` | `/api/logout`          | `public` | Logs out a user.                    |
| `localhost:3000` | `POST` | `/api/confirm-email`   | `public` | Confirms a user's email.            |
| `localhost:3000` | `POST` | `/api/resend-code`     | `public` | Resends a user's confirmation code. |
| `localhost:3000` | `POST` | `/api/forgot-password` | `public` | Sends a user a password reset link. |
| `localhost:3000` | `POST` | `/api/reset-password`  | `public` | Resets a user's password.           |

> :warning: All API endpoints are **private**. Make sure to include the `Authorization` header with the `Bearer <token>` value.

## Authors

- [@abdizamedmo](https://www.github.com/aaqyaar)
- [@abdimalik](https://github.com/Abdimalik-Osman)

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`
`MONGO_URI`
`SMTP_SERVER`
`SMTP_PORT`
`SMTP_USER`
`SMTP_PASS` app password

## Tech Stack

**Client:** Next.js, Mobx, TailwindCSS

**Server:** Node, Express, MongoDB