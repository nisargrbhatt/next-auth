import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {},
      type: "credentials",
      async authorize(credentials, req) {
        const payload = {
          email: credentials.email,
          password: credentials.password,
        };
        console.log(payload);
        const res = await axios.post(
          "http://localhost:3001/login",

          payload,

          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const user = res.data;
        console.log("User: ", user);
        if (res.status !== 200) {
          throw new Error(user.exception);
        }
        // If no error and we have user data, return it
        if (res.status === 200 && user) {
          return user;
        }

        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  session: {
    jwt: true,
  },

  secret: "GOODSECRET",
  callbacks: {
    async jwt({ token, user, account }) {
      console.log("Token: ", token);
      console.log("User: ", user);
      console.log("Account: ", account);
      if (account && user) {
        return {
          user: user.data,
          accessToken: user.token,
        };
      }

      return token;
    },

    async session({ session, token }) {
      console.log("Session in session: ", session);
      console.log("Token in session: ", token);
      session.user.accessToken = token.accessToken;
      session.user.accessTokenExpires = token.accessTokenExpires;
      session.user.details = token.user;
      return session;
    },

    // async signIn({ user, account, profile, email, credentials }) {
    //   console.log(user);
    //   return true;
    // },
    // async redirect({ url, baseUrl }) {
    //   return baseUrl;
    // },
    //   async session({ session, user, token }) {
    //     return session
    //   },
    //   async jwt({ token, user, account, profile, isNewUser }) {
    //     return token
    //   }
  },
  debug: true,
});
