import { IUser } from '@/auth';
import { useGetLocale } from '@/locale';
import Locale from '@/pc/components/locale';
import Nav from '@/pc/components/nav';
import React from 'react';
import { Outlet, useRouteLoaderData, useSubmit } from 'react-router-dom';
import './style.less';

const FormulaLayout: React.FC = () => {
    const { user } = useRouteLoaderData('root') as { user: IUser };
    const logout = useSubmit();
    const getLocale = useGetLocale('formula-layout');

    return <>
        <div className='formula-layout-top'>
            <div>{user?.nickname}</div>
            <Locale />
            <a className='formula-layout-logout' onClick={() => logout(null, { action: '/logout', method: 'post' })}>{getLocale('logout')}</a>
        </div>
        <div className='formula-layout-main'>
            <div className='formula-layout-nav'>
                <Nav />
            </div>
            <div className='formula-layout-content'>
                <Outlet />
            </div>
        </div>
    </>
}

export default FormulaLayout