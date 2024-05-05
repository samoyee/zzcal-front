import { useGetLocale } from '@/locale';
import { Button, Modal } from 'antd';
import React, { PropsWithChildren } from 'react';
import ReactDOM from 'react-dom';
import './style.less';

interface ResultProps {
    open: boolean;
    getContainer: () => HTMLElement;
    onClose: () => void;
    attention?: React.ReactNode;
}

const Result: React.FC<ResultProps & PropsWithChildren> = (props) => {
    const getLocale = useGetLocale('result');
    const { open, getContainer, onClose } = props;
    return <Modal
        width={800}
        closable={false}
        title={getLocale('title')}
        open={open}
        getContainer={getContainer}
        onCancel={onClose}
        footer={
            <>
                {props.attention && <span style={{ color: 'red', marginRight: 24 }}>{props.attention}</span>}
                <Button type='primary' onClick={onClose}>知道了</Button>
            </>
        }
    >
        {props.children}
    </Modal>
}

interface ShowOption {
    attention?: React.ReactNode;
}

const show = (data: React.ReactNode, options?: ShowOption) => {
    const wrapper = document.createElement('div');
    document.body.appendChild(wrapper);

    function close() {
        render(false);
        setTimeout(() => {
            ReactDOM.unmountComponentAtNode(wrapper);
            wrapper.remove();
        }, 300);
    }

    function render(open: boolean) {
        ReactDOM.render(
            <Result
                open={open}
                getContainer={() => wrapper}
                onClose={close}
                attention={options?.attention}
            >
                {data}
            </Result>
            ,
            wrapper
        )
    }

    render(true);
}

export default show;