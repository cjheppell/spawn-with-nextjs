This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

The code contained within this repository was created by following the excellent blog post [Create a Next.js App with a MySQL Database That Builds and Deploys with Vercel](https://vercel.com/guides/deploying-next-and-mysql-with-vercel). Some tweaks were made whilst following along.

The application requires a connection to a MySQL database. To enable this in development, we use [Spawn](https://spawn.cc) to instantly provision a development environment without needing to install or set up a database instance anywhere.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

This will provision a database through [Spawn](https://spawn.cc) and update the `.env.local` file with the connection details of the provisioned database. This will then be used by NextJS when an API request requires data.

Once complete, open [http://localhost:3000](http://localhost:3000) with your browser to see the result.