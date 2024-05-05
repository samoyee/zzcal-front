import { Layout, Menu } from "antd";
import classnames from "classnames";
import React, { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useWindowResize } from "utils/hooks";

const { Sider } = Layout;
const { ItemGroup, Item } = Menu;

function NavList({ nav, active, onChange }) {
    const intl = useIntl();
    return (
        <Menu selectedKeys={[active]} onClick={onChange} className="page-menu">
            {nav.map((item) => {
                if (item.groups)
                    return (
                        <ItemGroup key={item.title} title={intl.formatMessage({ id: item.title })}>
                            {item.groups.map((sItem) => (
                                <Item key={sItem.key} disabled={sItem.disabled}>
                                    {sItem.title}
                                </Item>
                            ))}
                        </ItemGroup>
                    );
                return (
                    <Item key={item.key} disabled={item.disabled}>
                        {item.title}
                    </Item>
                );
            })}
        </Menu>
    );
}

function InnerNav({ children }) {
    const [open, setOpen] = useState(false);
    return createPortal(
        <div className="inner-nav__wrapper">
            <div className={classnames("inner-nav", { "inner-nav__open": open })}>
                <div className="inner-nav__mask"></div>
                <div className="inner-nav__content-wrapper">
                    <div className="inner-nav__content">{children}</div>
                    <div className="inner-nav__handle" onClick={() => setOpen(!open)}>
                        <i className="inner-nav__handle-icon" />
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}

function OuterNav({ children }) {
    return <Sider width={288}>{children}</Sider>;
}

export default function Nav({ nav = [], active }) {
    const [width] = useWindowResize();
    const history = useHistory();
    const locale = useSelector((state) => state.locale);

    const onPageChange = (e) => {
        history.push(`/calc/${locale}/${e.key}`);
    }

    const Wrapper = useMemo(() => {
        return width <= 1024 ? InnerNav : OuterNav;
    }, [width]);

    return (
        nav &&
        nav.length > 0 && (
            <Wrapper>
                <NavList nav={nav} active={active} onChange={onPageChange} />
            </Wrapper>
        )
    );
}
