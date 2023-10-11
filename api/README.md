# Ijaar Platform (API)

The Real Estate Management System, this is the backend API for the Ijaar Platform.
the frontend is located at [Ijaar Front-end]("https://github.com/aaqyaar/ijaar-platform/tree/main/web") you can find it here.

## API Reference

The current routes, types, methods and actions attached to them are:

| Domain           | Method | Route                  | Access    | Description                         |
| ---------------- | ------ | ---------------------- | --------- | ----------------------------------- |
| `localhost:8000` | `GET`  | `/`                    | `public`  | Returns the static HTML page.       |
| `localhost:8000` | `GET`  | `/api/users`           | `private` | Returns all users.                  |
| `localhost:8000` | `POST` | `/api/register`        | `private` | Registers a new user.               |
| `localhost:8000` | `POST` | `/api/login`           | `private` | Logs in a user.                     |
| `localhost:8000` | `POST` | `/api/logout`          | `private` | Logs out a user.                    |
| `localhost:8000` | `POST` | `/api/confirm-email`   | `private` | Confirms a user's email.            |
| `localhost:8000` | `POST` | `/api/resend-code`     | `private` | Resends a user's confirmation code. |
| `localhost:8000` | `POST` | `/api/forgot-password` | `private` | Sends a user a password reset link. |
| `localhost:8000` | `POST` | `/api/reset-password`  | `private` | Resets a user's password.           |

> :warning: Most of the API endpoints are **private**. Make sure to include the `Authorization` header with the `Bearer <token>` value.

## Authors

- [@abdizamedmo](https://www.github.com/aaqyaar)
- [@abdimalik](https://github.com/Abdimalik-Osman)

## Environment Variables

To run this project, copy the `.env.example` file to `.env` file and add the following environment variables to your `.env` file

```bash
cp .env.example .env
```

## Tech Stack

**Client:** Next.js, Mobx, TailwindCSS

**Server:** Node, Express, MongoDB
