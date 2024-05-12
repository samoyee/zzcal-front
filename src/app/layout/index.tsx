import Locale from '@/app/components/locale';
import React from 'react';
import { Outlet } from 'react-router-dom';
import './style.less';

const FormulaLayout: React.FC = () => {
    // const { user } = useRouteLoaderData('root') as { user: IUser };
    // const logout = useSubmit();

    return <>
        <div className='formula-layout-top'>
            {/* <div>{user?.nickname}</div> */}
            <Locale />
            {/* <a onClick={() => logout(null, { action: '/logout', method: 'post' })}>登出</a> */}
        </div>
        <div className='formula-layout-page'>
            <Outlet />
        </div>
    </>
}

export default FormulaLayout