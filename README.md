# subscriptions-api
Easy to use API to manage subscriptions.

## API Documentation
### `POST /user/create`
Creates a new user and send a verification email.

![verification-mail](https://github.com/mhmdsami/subscriptions-api/assets/78439283/df179593-744f-43f5-a945-b737c9a616dc)

### `GET /user/verify`
Verifies the user's email. Used in the verification email.

### `DELETE /user/remove`
Deletes the user, used to unsubscribe from the mailing list.

### `GET /all-verified`
Returns all verified users. It is an admin route, requires `AUTH_TOKEN`.

### `DELETE /all-unverified`
Removes all unverified users. It is an admin route, requires `AUTH_TOKEN`.

### Running the app

Install the dependencies

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

### Built with

- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [drizzle-orm](https://orm.drizzle.team/)
- [Zod](https://zod.dev/)
- [drizzle-zod](https://orm.drizzle.team/docs/zod)
- [TypeScript](https://www.typescriptlang.org/)
- [react-email](https://react.email/)
- [AWS SDK](https://aws.amazon.com/sdk-for-javascript/)