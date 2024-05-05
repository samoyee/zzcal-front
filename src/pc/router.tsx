import { auth } from "@/auth";
import FormulaLayout from "@/pc/layout";
import Page404 from "@/pc/pages/404";
import Formula from "@/pc/pages/formula";
import Login from "@/pc/pages/login";
import Register from "@/pc/pages/register";
import { redirect } from "react-router";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: '/register',
        action: async () => {
            return redirect('/formula/zziol');
        },
        loader: () => {
            if (auth.getToken()) {
                return redirect('/formula/zziol')
            }
            return null
        },
        Component: Register
    },
    {
        path: '/login',
        action: async () => {
            return redirect('/formula/zziol');
        },
        loader: () => {
            if (auth.getToken()) {
                return redirect('/formula/zziol')
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