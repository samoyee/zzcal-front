import { auth } from "@/auth";
import FormulaLayout from "@/pc/components/formula-layout";
import WelcomeLayout from "@/pc/components/welcome-layout";
import Page404 from "@/pc/pages/404";
import Formula from "@/pc/pages/formula";
import Login from "@/pc/pages/login";
import Register from "@/pc/pages/register";
import { redirect } from "react-router";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/zzcal/logout",
        action: async () => {
            await auth.signout();
            return redirect("/zzcal/login");
        }
    },
    {
        id: 'welcome',
        Component: WelcomeLayout,
        action: async () => {
            return redirect('/zzcal/formula/zziol');
        },
        loader: () => {
            if (auth.getToken()) {
                return redirect('/zzcal/formula/zziol')
            }
            return null
        },
        children: [
            {
                path: '/zzcal/login',
                Component: Login,
            },
            {
                path: '/zzcal/register',
                Component: Register,
            }
        ]
    },
    {
        id: "root",
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
                path: '/zzcal/formula/:formula',
                Component: Formula,
            }
        ]
    },
    {
        path: '/zzcal/',
        loader: async () => {
            if (!auth.getToken()) {
                return redirect('/zzcal/login')
            }
            return redirect('/zzcal/formula/zziol')
        },
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