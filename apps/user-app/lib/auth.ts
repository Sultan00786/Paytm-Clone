import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { prisma } from "@repo/db/clint";

export const authOptions = {
   providers: [
      CredentialsProvider({
         name: "Credentials",
         credentials: {
            phone: {
               label: "Phone number",
               type: "text",
               placeholder: "1231231231",
            },
            password: {
               label: "Password",
               type: "password",
               placeholder: "*********",
            },
         },
         async authorize(credentials: any) {
            const hashedPassword = await bcrypt.hash(
               credentials.password,
               10
            );
            const existingUser = await prisma.user.findFirst({
               where: {
                  number: credentials.phone,
               },
            });

            if (existingUser) {
               console.log("User exists: ", existingUser);
               const passwordMatch = await bcrypt.compare(
                  credentials.password,
                  existingUser.password
               );

               if (passwordMatch) {
                  return {
                     id: existingUser.id.toString(),
                     name: existingUser.name,
                     email: existingUser.email,
                     number: existingUser.number,
                  };
               }
               console.error("Invalid credentials");
               return null;
            }

            try {
               const user = await prisma.user.create({
                  data: {
                     number: credentials.phone,
                     password: hashedPassword,
                  },
               });

               return {
                  id: user.id.toString(),
                  name: user.name,
                  email: user.email,
               };
            } catch (error) {
               console.log(error);
            }

            return null;
         },
      }),
   ],
   secret: process.env.JWT_SECRET || "secret",
   callbacks: {
      async jwt({ token, user }: any) {
         if (user) {
            token.number = user.number;
         }
         return token;
      },
      async session({ token, session }: any) {
         console.log(token.number);
         session.user.id = token.sub;
         session.user.number = token.number;
         return session;
      },
   },
};
