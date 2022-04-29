import NextAuth from "next-auth";
import { Provider } from "next-auth/providers";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import GithubProvider from "next-auth/providers/github";
import TwitterProvider from "next-auth/providers/twitter";
import Auth0Provider from "next-auth/providers/auth0";
// import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
// import clientPromise from "../../../lib/mongodb";
import { MongooseAdapter } from "../../../lib/mongoose-adapter";

import AppleProvider from "next-auth/providers/apple";
import EmailProvider from "next-auth/providers/email";

let providers: Provider[] = [];

if (process.env.GOOGLE_ID && process.env.GOOGLE_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    })
  );
}
if (process.env.EMAIL_SERVER && process.env.EMAIL_FROM) {
  providers.push(
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    })
  );
}
// if (process.env.APPLE_ID) {
//   providers.push(
//     AppleProvider({
//       clientId: process.env.APPLE_ID,
//       clientSecret: {
//         appleId: process.env.APPLE_ID,
//         teamId: process.env.APPLE_TEAM_ID,
//         privateKey: process.env.APPLE_PRIVATE_KEY,
//         keyId: process.env.APPLE_KEY_ID,
//       },
//     })
//   );
// }
if (process.env.FACEBOOK_ID && process.env.FACEBOOK_SECRET) {
  providers.push(
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    })
  );
}
if (process.env.GITHUB_ID && process.env.GITHUB_SECRET) {
  providers.push(
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    })
  );
}
if (process.env.TWITTER_ID && process.env.TWITTER_SECRET) {
  providers.push(
    TwitterProvider({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET,
    })
  );
}
if (
  process.env.AUTH0_ID &&
  process.env.AUTH0_SECRET &&
  process.env.AUTH0_ISSUER
) {
  providers.push(
    Auth0Provider({
      clientId: process.env.AUTH0_ID,
      clientSecret: process.env.AUTH0_SECRET,
      issuer: process.env.AUTH0_ISSUER,
    })
  );
}

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
  // https://next-auth.js.org/configuration/providers/oauth
  adapter: MongooseAdapter(),
  providers: providers,
  theme: {
    colorScheme: "light",
  },
  callbacks: {
    async jwt({ token }) {
      token.userRole = "admin";
      return token;
    },
    session: async ({ session, user }) => {
      session.userId = user.id;
      return Promise.resolve(session);
    },
  },
});
