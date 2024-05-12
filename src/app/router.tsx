import FormulaLayout from "@/app/layout";
import Page404 from "@/app/pages/404";
import Formula from "@/app/pages/formula";
import Login from "@/app/pages/login";
import Register from "@/app/pages/register";
import Welcome from "@/app/pages/welcome";
import { auth } from "@/auth";
import { redirect } from "react-router";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: '/register',
        action: async () => {
            return redirect('/formula/welcome');
        },
        loader: () => {
            if (auth.getToken()) {
                return redirect('/formula/welcome')
            }
            return null
        },
        Component: Register
    },
    {
        path: '/login',
        action: async () => {
            return redirect('/formula/welcome');
        },
        loader: () => {
            if (auth.getToken()) {
                return redirect('/formula/welcome')
            }
            return null
        },
        Component: Login
    },
    {
        path: "/logout",
        action: async () => {
            await auth.signout();
            return redirect("/login");
        }
    },
    {
        id: "root",
        path: '/',
        Component: FormulaLayout,
        loader: async () => {
            if (!auth.getToken()) {
                return redirect('/login')
            }
            await auth.getUser();
            return { user: auth.user };
        },
        children: [
            {
                path: '/formula/welcome',
                Component: Welcome,
            },
            {
                path: '/formula/:formula',
                Component: Formula,
            }
        ]
    },
    {
        path: '*',
        Component: Page404,
    }
])

export default router;