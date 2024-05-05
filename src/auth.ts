import { post } from "./service";

interface ILoginUser {
    username: string;
    password: string;
}

interface IRegisterUser {
    username: string;
    password: string;
    confirmPassword: string;
    nickname: string;
    email: string;
    phone: string;
}

export interface IUser {
    id: number;
    username: string;
    nickname: string;
    email: string;
    phone: string;
    isAdmin: 1 | 0;
}

interface AuthProvider {
    user: IUser | null;
    signin(user: ILoginUser): Promise<void>;
    register(user: IRegisterUser): Promise<void>;
    signout(): Promise<void>;
    getToken(): number | null;
    getUser(): Promise<void>;
}


export const auth: AuthProvider = {
    user: null,
    async signin(user: ILoginUser) {
        const data = await post({
            url: '/userInfo/login',
            data: {
                ...user
            },
        }) as IUser;
        auth.user = data;
        localStorage.setItem('token', `${data.id}`);
    },
    async register(user: IRegisterUser) {
        const data = await post({
            url: '/userInfo/add',
            data: {
                ...user
            },
        }) as IUser;
        auth.user = data;
        localStorage.setItem('token', `${data.id}`);
    },
    async signout() {
        await new Promise((r) => setTimeout(r, 500));
        localStorage.removeItem('token')
    },
    getToken() {
        const token = localStorage.getItem('token');
        return token ? Number(token) : null;
    },
    async getUser() {
        const user = await post({
            url: '/userInfo/isLogin',
        });
        if (user)
            this.user = user as IUser;
        else
            localStorage.removeItem('token')
    }
};