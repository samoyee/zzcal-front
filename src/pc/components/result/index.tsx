import { atom, useAtomValue } from 'jotai';
import React from 'react';
import './style.less';
import { atomStore } from '@/privider';

const resultAtom = atom<React.ReactNode>(null as React.ReactNode);

const Result: React.FC = () => {
    const result = useAtomValue(resultAtom);
    return <div className='formula-result'>
        {result}
    </div>
}

export default Result;

export function setResult(node: React.ReactNode) {
    atomStore.set(resultAtom, node);
}