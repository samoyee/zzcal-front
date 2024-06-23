import { getLocale } from "./locale";
import { post } from "./service";

interface ILoginUser {
    username: string;
    password: string;
}

interface IRegisterUser {
    username: string;
    password: string;
    email: string;
    phone: string;
    firstname: string;
    lastname: string;
    country: string;
    institution: string;
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
    token: string | null;
    signin(user: ILoginUser): Promise<void>;
    register(user: IRegisterUser): Promise<void>;
    signout(): Promise<void>;
    getToken(): string | null;
    getUser(): Promise<void>;
}

export const auth: AuthProvider = {
    user: null,
    token: null,
    async signin(user: ILoginUser) {
        try {
            const token = await post<string>({
                url: '/userInfo/login',
                data: {
                    ...user
                },
            });
            auth.token = token
            localStorage.setItem('token', token);
        } catch (err) {
            if (err instanceof Error) throw err;
            throw new Error(getLocale('login')('loginFail'))
        }
    },
    async register(user: IRegisterUser) {
        try {
            const token = await post<string>({
                url: '/userInfo/register',
                data: {
                    ...user
                },
            });
            auth.token = token;
            localStorage.setItem('token', token);
        } catch (err) {
            if (err instanceof Error) throw err;
            throw new Error(getLocale('register')('registerFail'))
        }
    },
    async signout() {
        await post({
            url: '/userInfo/logout',
            headers: {
                'X-USER-TOKEN': auth.token || '',
            }
        })
        localStorage.removeItem('token')
    },
    getToken() {
        const token = localStorage.getItem('token');
        auth.token = token;
        return token;
    },
    async getUser() {
        try {
            const user = await post({
                url: '/userInfo/isLogin',
                headers: {
                    'X-USER-TOKEN': auth.token || '',
                }
            });
            if (user)
                this.user = user as IUser;
        } catch (err) {
            localStorage.removeItem('token')
        }
    }
};