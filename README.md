# Family Tree App Development Notes

## Stack

I chose Next.js, Apollo Client, NextAuth.js, shadcn.

## Setting up Apollo Client

As per the Apollo docs, I created a file `lib/apolloClient.js` for use in RS Components, and `providers/ApolloWrapper.tsx` to allow use of hooks etc. in client components.

I found this a bit confusing, as there is some redundant code between the two files, namely the instantiation of a new `ApolloClient`. And it took me a few passes over the docs to wrap my head around the intended uses of some of the things they were describing. But I got there in the end. I followed the docs to the letter to make sure that everything works, but I think I may go ahead and try and streamline the code a bit down the road by creating one function for instantiating the `ApolloClient` and passing it to both my front-end and back-end code.

## Setting Up Auth

As per the NextAuth Docs, I created a Next.js route handler at `api/auth/[...nextauth]/route.ts` to handle all of our auth requests such as sign in, sign out.

I also created `providers/SessionWrapper.tsx` so we could use some hooks on the front end to get our session data.

I decided that for now I would only use the Google OAuth provider. I went to my Google Cloud console, created a new app for this project, and configured an OAuth 2.0 client as per the NextAuth.js docs. This required creating a few new env vars, two for my Google OAuth client ID and credentials, and one for `NEXTAUTH_URL` which NextAuth.js uses for callbacks. I don't think this last one is required for local development, but I set it anyway. I also made sure to go ahead and set these variables in my Railway deployment before I forgot to later.

## Shadcn

## Apollo Server
