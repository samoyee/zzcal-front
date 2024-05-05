import classnames from 'classnames';
import React from 'react';
import './style.less';
import { useLocale } from '@/locale';

const Locale: React.FC = () => {
    const [locale, setLocale] = useLocale();

    return <div className='locale' onClick={() => setLocale(locale === 'zhCN' ? "enUS" : "zhCN")}>
        <div className='locale-icon'>
            <div className={classnames('locale-icon-item', { active: locale === 'zhCN' })}>中</div>
            <div className={classnames('locale-icon-item', { active: locale === 'enUS' })}>En</div>
        </div>
    </div>
}

export default Locale;