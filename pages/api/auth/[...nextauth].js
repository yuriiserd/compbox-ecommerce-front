import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'
import CredentialsProvider from 'next-auth/providers/credentials'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import clientPromise from '@/lib/mongodb';
import { Customer } from '@/models/Customer'
import bcrypt from 'bcryptjs'



export const authOptions = {
  secret: process.env.SECRET,
  providers: [
    // OAuth authentication providers...
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_FRONT_ID,
      clientSecret: process.env.GOOGLE_FRONT_SECRET
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "email", type: "email" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials, req) {

        const customer = await Customer.findOne({email: credentials.email});
        if (customer && await bcrypt.compare(credentials.password, customer.password)) {
          return Promise.resolve(customer)
        } else {
          throw new Error('Invalid email or password');
        }
      }
    })
  ],
  callbacks: {
    // async jwt({token, user, session}) {
    //   console.log("jwt1",token, "user1", user, session)
    //   // if (user) {
    //   //   token.id = user._id
    //   // }
    //   return token
    // },
    // async session({session, token}) {
    //   console.log("session1", session, token)
    //   // session.user.id = token.id
    //   return session
    // }
  },
  session: {
    strategy: "jwt"
  },
  adapter: MongoDBAdapter(clientPromise),
}

export default NextAuth(authOptions);