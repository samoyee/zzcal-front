import { IUser } from '@/auth';
import Locale from '@/pc/components/locale';
import Nav from '@/pc/components/nav';
import React from 'react';
import { Outlet, useRouteLoaderData, useSubmit } from 'react-router-dom';
import './style.less';

const FormulaLayout: React.FC = () => {
    const { user } = useRouteLoaderData('root') as { user: IUser };
    const logout = useSubmit();

    return <>
        <div className='layout-top-wrapper'>
            <div>{user?.nickname}</div>
            <Locale />
            <a onClick={() => logout(null, { action: '/logout', method: 'post' })}>登出</a>
        </div>
        <div className='layout-nav-wrapper'>
            <Nav />
        </div>
        <div className='layout-page-wrapper'>
            <Outlet />
        </div>
    </>
}

export default FormulaLayout