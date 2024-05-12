import Provider from '@/app/components/provider';
import { useGetLocale } from '@/locale';
import { Button, Popup, SafeArea } from 'antd-mobile';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './style.less';

interface ResultProps {
    open: boolean;
    getContainer: () => HTMLElement;
    onClose: () => void;
    attention?: React.ReactNode;
}

const Result: React.FC<ResultProps & PropsWithChildren> = (props) => {
    const getLocale = useGetLocale('result');
    const { getContainer, onClose } = props;
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(props.open)
    }, [props.open])

    return <Popup
        getContainer={getContainer}
        visible={open}
        onMaskClick={onClose}
    >
        <div className='result-title'>
            {getLocale('title')}
        </div>
        <div className='result-content'>
            {props.children}
        </div>
        <div className='result-footer'>
            {props.attention && <span style={{ color: 'red', marginRight: 24 }}>{props.attention}</span>}
            <Button block color='primary' onClick={onClose}>{getLocale('ok')}</Button>
            <SafeArea position="bottom" />
        </div>
    </Popup>
}

interface ShowOption {
    attention?: React.ReactNode;
}

const show = (data: React.ReactNode, options?: ShowOption) => {
    const wrapper = document.createElement('div');
    document.body.appendChild(wrapper);
    const modal = ReactDOM.createRoot(wrapper);
    function close() {
        render(false);
        setTimeout(() => {
            modal.unmount();
            wrapper.remove();
        }, 300);
    }

    function render(open: boolean) {
        modal.render(
            <Provider>
                <Result
                    open={open}
                    getContainer={() => wrapper}
                    onClose={close}
                    attention={options?.attention}
                >
                    {data}
                </Result>
            </Provider>
        )
    }

    render(true);
}

export default show;