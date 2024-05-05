import http from "utils/http";

export const isLogin = http("/userInfo/isLogin").post;

export const logout = http("/userInfo/logout").post;

export const login = http("/userInfo/login").post;

export const register = http("/userInfo/register").post;

export const searchAllUser = http("/userInfo/list").post;
