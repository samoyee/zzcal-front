import Locale from '@/pc/components/locale';
import React from 'react';
import { Outlet } from 'react-router-dom';
import './style.less';

const FormulaLayout: React.FC = () => {
    return <div className='welcome-layout'>
        <Locale />
        <div className='welcome-layout-banner'></div>
        <div className='welcome-layout-main'>
            <Outlet />
        </div>
        <div className='welcome-layout-copyright'>
            <a href='https://beian.miit.gov.cn/?spm=a21bo.2017.1997523009.42.5af911d9dARMWo#/Integrated/recordQuery' target='_blank'>浙ICP备 18028241号-3</a>
            <img src="/images/police.png" />
            <a href='http://www.beian.gov.cn/portal/registerSystemInfo?spm=a21bo.2017.1997523009.45.5af911d9dARMWo&recordcode=33010302003623'>浙公网安备 33010302003623号</a>
        </div>
    </div>
}

export default FormulaLayout