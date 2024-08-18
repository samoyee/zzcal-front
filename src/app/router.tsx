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
        path: '/zzcal/register',
        action: async () => {
            return redirect('/zzcal/formula/welcome');
        },
        loader: () => {
            if (auth.getToken()) {
                return redirect('/zzcal/formula/welcome')
            }
            return null
        },
        Component: Register
    },
    {
        path: '/zzcal/login',
        action: async () => {
            return redirect('/zzcal/formula/welcome');
        },
        loader: () => {
            if (auth.getToken()) {
                return redirect('/zzcal/formula/welcome')
            }
            return null
        },
        Component: Login
    },
    {
        path: "/zzcal/logout",
        action: async () => {
            await auth.signout();
            return redirect("/zzcal/login");
        }
    },
    {
        id: "root",
        path: '/zzcal',
        Component: FormulaLayout,
        loader: async () => {
            if (!auth.getToken()) {
                return redirect('/zzcal/login')
            }
            await auth.getUser();
            return { user: auth.user };
        },
        children: [
            {
                path: '/zzcal/formula/welcome',
                Component: Welcome,
            },
            {
                path: '/zzcal/formula/:formula',
                Component: Formula,
            }
        ]
    },
    {
        path: '*',
        loader: async () => {
            if (!auth.getToken()) {
                return redirect('/zzcal/login')
            }
            await auth.getUser();
            return { user: auth.user };
        },
        Component: Page404,
    }
])

export default router;