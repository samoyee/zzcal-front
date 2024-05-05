import {
    Button,
    Card,
    Col,
    Descriptions,
    Empty,
    Form,
    Input,
    message,
    Modal,
    PageHeader,
    Pagination,
    Row,
    Select,
    Spin,
    Tag
} from "antd";
import { requestSendMessage, searchFileList, updateResult } from "api/pay";
import { searchAllUser } from "api/user";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useSelector } from "react-redux";
import { useDebounce } from "utils/hooks";
import "./list.less";

const formLayout = {
    labelCol: {
        sm: { span: 10 },
    },
    wrapperCol: {
        sm: { span: 14 },
    },
};

const layout = {
    xs: 24,
    sm: 6,
};

function InputModal({ visible = true, onCancel, onOK }) {
    console.log("aaa");
    const [vis, setVisible] = useState(visible);
    const intl = useIntl();
    const [form] = Form.useForm();

    const handleCancel = useCallback(() => {
        setVisible(false);
        onCancel && onCancel();
    }, []);

    const handleSubmit = useCallback(async () => {
        const { resultContent } = await form.validateFields();
        typeof onOK === "function" && onOK(resultContent);
    }, []);

    return (
        <Modal
            title={<FormattedMessage id="btn.inputResult" />}
            centered
            destroyOnClose
            visible={vis}
            onCancel={handleCancel}
            onOk={handleSubmit}
            maskClosable={false}
        >
            <Form form={form} wrapperCol={{ span: 10, offset: 7 }}>
                <Form.Item
                    name="resultContent"
                    rules={[
                        {
                            required: true,
                            message: intl.formatMessage({ id: "form.rules.required" }),
                        },
                    ]}
                >
                    <Input autoComplete="off" />
                </Form.Item>
            </Form>
        </Modal>
    );
}

function inputModal() {
    // return new Promise((resolve) => {
    //     try {
    //         const wrapper = document.createElement("div");
    //         document.body.appendChild(wrapper);

    //         function destroyed() {
    //             let timer = setTimeout(() => {
    //                 clearTimeout(timer);
    //                 timer = null;
    //                 unmountComponentAtNode(wrapper);
    //                 wrapper.remove();
    //             }, 300);
    //         }

    //         function handleCancel() {
    //             destroyed();
    //         }

    //         function handleOk(resultContent) {
    //             destroyed();
    //             resolve(resultContent);
    //         }

    //         initApp(<InputModal visible={true} onCancel={handleCancel} onOK={handleOk} />, wrapper);
    //     } catch (e) {
    //         console.log(e);
    //     }
    // });
}

function FileItem({ data: propData }) {
    const intl = useIntl();
    const user = useSelector((state) => state.user);
    const [data, setData] = useState(propData);

    const { fileName, id, status, zzType, createDate, userId, resultContent } = data;

    const inputResult = useCallback(async () => {
        try {
            const resultContent = await inputModal().catch((e) => { });
            await updateResult({ id, resultContent });
            setData({ ...data, resultContent });
        } catch (e) {
            message.error(intl.formatMessage({ id: "text.systemError" }));
        }
    }, [id]);

    const seeResult = useCallback(() => {
        Modal.info({
            title: intl.formatMessage({ id: "btn.seeResult" }),
            content: resultContent,
        });
    }, [resultContent]);

    const sendMessage = useCallback(() => {
        Modal.confirm({
            title: intl.formatMessage({ id: "btn.sendMessage" }),
            centered: true,
            onOk: async () => {
                try {
                    await requestSendMessage({ id, type: "1" });
                } catch (e) {
                    message.error(intl.formatMessage({ id: "text.systemError" }));
                }
            },
            onCancel: () => { },
        });
    }, [id]);

    return (
        <Card
            className="file-item__card"
            title={
                <Button type="link" href={`/pay/fileDownload?id=${id}`} target="_blank">
                    {fileName}
                </Button>
            }
            extra={[
                <Tag
                    key="tag"
                    color={
                        status === "WAIT_BUYER_PAY"
                            ? "processing"
                            : status === "TRADE_SUCCESS"
                                ? "success"
                                : status === "TRADE_CLOSED"
                                    ? "default"
                                    : status === "TRADE_FINISHED"
                                        ? "default"
                                        : ""
                    }
                >
                    <FormattedMessage id={`col.status.${status}`} />
                </Tag>,
            ]}
            actions={[
                !resultContent && user.isAdmin && (
                    <Button key="inputResult" type="link" onClick={inputResult}>
                        <FormattedMessage id="btn.inputResult" />
                    </Button>
                ),
                resultContent && (
                    <Button key="seeResult" type="link" onClick={seeResult}>
                        <FormattedMessage id="btn.seeResult" />
                    </Button>
                ),
                user.isAdmin && (
                    <Button key="sendMessage" type="link" onClick={sendMessage}>
                        <FormattedMessage id="btn.sendMessage" />
                    </Button>
                ),
                <Button key="refund" type="link">
                    <FormattedMessage id="btn.applyRefund" />
                </Button>,
            ].filter((item) => !!item)}
        >
            <Descriptions size="small" colon={false} column={1}>
                <Descriptions.Item label={<FormattedMessage id="col.zzType" />}>
                    {zzType}
                </Descriptions.Item>
                <Descriptions.Item label={<FormattedMessage id="col.uploader" />}>
                    {userId}
                </Descriptions.Item>
                <Descriptions.Item label={<FormattedMessage id="col.createDate" />}>
                    {moment(createDate).format("YYYY-MM-DD HH:mm:ss")}
                </Descriptions.Item>
            </Descriptions>
        </Card>
    );
}

function renderContent(user, data, loading) {
    if (!user)
        return (
            <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={<FormattedMessage id="text.noLogin" />}
            >
                <Button type="primary">
                    <FormattedMessage id="btn.login" />
                </Button>
            </Empty>
        );
    return (
        <Spin spinning={loading}>
            {data && data.length > 0 ? (
                data.map((item, index) => <FileItem data={item} key={index} />)
            ) : (
                <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={<FormattedMessage id="text.noData" />}
                />
            )}
        </Spin>
    );
}

export default function List() {
    const user = useSelector((state) => state.user);
    const intl = useIntl();
    const [form] = Form.useForm();
    const [userOptions, setUserOptions] = useState([]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [total, setTotal] = useState(0);
    const [userId, setUserId] = useState(null);
    const [fileName, setFileName] = useState(null);

    useEffect(() => {
        async function fetchAllUsers() {
            try {
                if (user?.isAdmin) {
                    const { data } = await searchAllUser({ isAdmin: 0 });
                    setUserOptions(
                        data.map((item) => ({
                            label: item.nickname,
                            value: item.id,
                        }))
                    );
                }
            } catch (e) {
                message.error(intl.formatMessage({ id: "text.systemError" }));
            }
        }

        fetchAllUsers();
    }, [user]);

    const fetchFileList = useDebounce(async (currentPage, pageSize, userId, fileName) => {
        try {
            if (user) {
                setLoading(true);
                const { data } = await searchFileList(
                    { userId, fileName },
                    { currentPage, pageSize }
                );
                setData(data);
                setLoading(false);
                return;
            }
            setData([]);
            setLoading(false);
            message.error(intl.formatMessage({ id: "text.noLogin" }));
        } catch (e) {
            message.error(intl.formatMessage({ id: "text.systemError" }));
        }
    }, 1000);

    useEffect(() => {
        fetchFileList(currentPage, pageSize, userId, fileName);
    }, [user, currentPage, pageSize, userId, fileName]);

    const onSearch = useCallback(async () => {
        const formData = await form.validateFields();
        setFileName(formData.fileName);
        setUserId(formData.userId);
    }, []);

    const onClear = useCallback(() => {
        form.resetFields();
        setFileName(null);
        setUserId(null);
    }, []);

    const onPageSizeChange = useCallback((currentPage, pageSize) => {
        setCurrentPage(currentPage);
        setPageSize(pageSize);
    }, []);

    const onCurrentPageChange = useCallback((currentPage, pageSize) => {
        setCurrentPage(currentPage);
        setPageSize(pageSize);
    }, []);

    return (
        <div className="user-list__wrapper">
            <Form form={form} {...formLayout} colon={false} className="user-list__form">
                <Row gutter={24}>
                    <Col {...layout}>
                        <Form.Item
                            name="fileName"
                            label={<FormattedMessage id="form.field.filename" />}
                        >
                            <Input autoComplete="off" />
                        </Form.Item>
                    </Col>
                    {user?.isAdmin && (
                        <Col {...layout}>
                            <Form.Item
                                name="userId"
                                label={<FormattedMessage id="form.field.user" />}
                            >
                                <Select style={{ width: "100%" }} options={userOptions} />
                            </Form.Item>
                        </Col>
                    )}
                    <Col {...layout}>
                        <Button type="primary" onClick={onSearch}>
                            <FormattedMessage id="btn.search" />
                        </Button>
                        <Button onClick={onClear}>
                            <FormattedMessage id="btn.clear" />
                        </Button>
                    </Col>
                </Row>
            </Form>
            <div className="user-list__content-wrapper">{renderContent(user, data, loading)}</div>
            <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={total}
                showSizeChanger={true}
                showTotal={(total) => `总共${total}条`}
                style={{ textAlign: "right" }}
                onChange={onCurrentPageChange}
                onShowSizeChange={onPageSizeChange}
            />
        </div>
    );
}
