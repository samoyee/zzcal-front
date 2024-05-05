import classNames from 'classnames';
import React, { PropsWithChildren } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './style.less';

const Nav: React.FC = () => {
    return <nav className='nav'>
        <h4>IOL Refractive Surgery</h4>
        <FormulaLink formula='zziol'>ZZ IOL</FormulaLink>
        <FormulaLink formula='zztoriciol'>ZZ Toric IOL</FormulaLink>
        <FormulaLink formula='zziolpro'>ZZ IOL Pro</FormulaLink>
        <h4>Refractive Surgery</h4>
        <FormulaLink formula='zzex500'>ZZ EX500</FormulaLink>
        <FormulaLink formula='zzinnoveyes'>ZZ InnovEyes</FormulaLink>
        <FormulaLink formula='zzar'>ZZ AR</FormulaLink>
        <FormulaLink formula='zzvr'>ZZ VR</FormulaLink>
        <FormulaLink formula='zzvrpro'>ZZ VR pro</FormulaLink>
        <FormulaLink formula='zzlsa'>ZZ LSA</FormulaLink>
        <FormulaLink formula='zzqd'>ZZ Q.D.</FormulaLink>
        <h4>ICL Refractive Surgery</h4>
        <FormulaLink formula='zzicl'>ZZ ICL</FormulaLink>
        <FormulaLink formula='zziclvault'>ZZ ICL Vault</FormulaLink>
        <FormulaLink formula='zzticlrotation'>ZZ TICL Rotation</FormulaLink>
        <FormulaLink formula='zzpcprl'>ZZ PC-PRL</FormulaLink>
        <h4>Tools</h4>
        <FormulaLink formula='zzsia'>ZZ SIA</FormulaLink>
        <FormulaLink formula='zzvectorsumandsub'>ZZ Vector Sum & Sub</FormulaLink>
        <FormulaLink formula='zzmeansdvector'>ZZ Mean ± SD Vector</FormulaLink>
        <FormulaLink formula='zzex500opmi'>ZZ EX500 OPMI</FormulaLink>
        <h4>Ortho-K glasses</h4>
        <FormulaLink formula='zzorthokglasses'>ZZ Ortho-K Glasses</FormulaLink>
    </nav>
}

export default Nav;

const FormulaLink: React.FC<{ formula: string; disabled?: boolean; } & PropsWithChildren> = (props) => {
    const { formula, disabled, children } = props;
    const location = useLocation()
    const navigate = useNavigate();
    return <div
        onClick={() => {
            if (disabled) return
            navigate(`/formula/${formula}`)
        }}
        className={classNames('nav-item', { active: location.pathname === `/formula/${formula}`, disabled })}>{children}</div>
}