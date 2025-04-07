import connectDB from '@/config/database';
import User from '@/models/User';
import CredentialsProvider from 'next-auth/providers/credentials';


const mockUsers = [
    { id: 1, username: 'pu1', password: 'pu1', email: 'pu1@gmail.com', fullname: 'pu1' },
    { id: 2, username: 'pu2', password: 'pu2', email: 'pu2@gmail.com', fullname: 'pu2' },
    { id: 3, username: 'pu3', password: 'pu3', email: 'pu3@gmail.com', fullname: 'pu3' },
    { id: 4, username: 'pu4', password: 'pu4', email: 'pu4@gmail.com', fullname: 'pu4' },
    { id: 5, username: 'pu5', password: 'pu5', email: 'pu5@gmail.com', fullname: 'pu5' },
]

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "Enter your username" },
                password: { label: "Password", type: "password", placeholder: "Enter your password" },
                email: { label: "Email", type: "text", placeholder: "Enter your Email" },
                fullname: { label: "fullname", type: "text", placeholder: "Enter your fullname" },
            },
            async authorize(credentials) {
                // Simulate a delay for API call
                await new Promise(resolve => setTimeout(resolve, 500));

                // Check for a user with matching credentials
                const user = mockUsers.find(user =>
                    user.username === credentials.username && user.password === credentials.password
                );

                // console.log(" authen-user ", JSON.stringify(user, null, 4))

                if (user) {
                    return user; // Successful login
                } else {
                    return false; // Failed login
                }
            },

        })
    ],
    pages: {
        signIn: '/login', // Custom sign-in page
    },
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        // Invoked on successful sign in
        async signIn({ user }) {
            // console.log(" Callback signIn User object ", JSON.stringify(user, null, 4))
            // // 1. Connect to the database
            await connectDB();

            // // 2. Check if user exists
            const userExists = await User.findOne({ email: user.email })

            // // 3. if not, create user
            if (!userExists) {
                // Truncate username if too long
                const username = user.email;
                await User.create({
                    fullname: username,
                    email: user.email,
                    username,
                    image: ''
                })
            } else {
                console.log(" Callback signIn don't create new ")
            }
            // 4. Return true to allow sign in
            return true;
        },
        // Session Callback function that modifies the session object
        async session({ session, token }) {
            // 1. Get user from database
            const user = await User.findOne({ email: session.user.email });

            // 2. Assign user id from the session
            session.user = token.user;
            session.user.id = user._id.toString();
            // session.user.token = token;


            // 3. Return Session 
            return session;
            // return true
        }, async jwt({ user, token }) {
            //   update token from user
            // console.log(" auth option jwt ", JSON.stringify(token, null, 2))
            if (user) {
                token.user = user;
            }
            //   return final_token
            return token;
        },
    },
    secret: process.env.NEXTAUTH_SECRET, // Define your secret in .env
}