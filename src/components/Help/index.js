import { Image, Button } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom';

function open(urls) {
    const div = document.createElement("div");
    document.body.appendChild(div);

    function render(visible) {
        ReactDOM.render(<>
            <Image.PreviewGroup preview={{ visible, onVisibleChange: (vis) => render(vis) }}>
                {urls.map(item => <Image src={item} />)}
            </Image.PreviewGroup>
        </>, div)

    }

    render(true);
}

function Help(props) {
    return <Button type='primary' onClick={() => open(props.urls)}>使用说明</Button>
}

export default Help;