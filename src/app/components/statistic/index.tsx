import React from 'react';
import './style.less';

interface StatsProps {
    title?: string;
    value: number;
    suffix?: string;
}

const Stats: React.FC<StatsProps> & { Divider: typeof Divider } = (props) => {
    return <span className="stats">
        <span>{props.value}</span>
        {props.suffix && <span className='stats-suffix'>{props.suffix}</span>}
    </span>
}

const Divider: React.FC = () => {
    return <span className='stats-divider'>X</span>
}

Stats.Divider = Divider;

export default Stats;