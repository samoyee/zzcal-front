import { Input, InputProps, List, Popup, SearchBar } from 'antd-mobile';
import ReactDOM from 'react-dom/client';
import React, { useMemo, useState } from 'react';
import './style.less';

type Value = string | number | boolean;

type Option = unknown;

interface SelectProps extends Omit<InputProps, 'value'> {
  fieldNames?: {
    label: string;
    value: string;
  };
  value?: Value;
  onChange?: (value?: Value) => void;
  options?: Option[];
  filterOption?: (input: string, option: Option) => boolean
}

const Select: React.FC<SelectProps> = (props) => {
  const { options, fieldNames, value, onChange, filterOption, ...restProps } = props;

  const selectedOption = options?.find(option => (option as any)[fieldNames?.value || 'value'] === value);

  return (
    <div
      onClick={() => {
        SelectPopup.show({
          value,
          options,
          filterOption,
          onChange(option) {
            onChange?.((option as any)[fieldNames?.value || 'value']);
          },
          renderItem: (option) => (option as any)[fieldNames?.label || 'label']
        })
      }}>
      <Input {...restProps} readOnly value={(selectedOption as any)?.[fieldNames?.label || 'label']} />
    </div>
  )
}

export default Select;

interface SelectPopupProps {
  open?: boolean;
  onClose?: () => void;
  afterClose?: () => void;
  getContainer?: () => HTMLElement;
  options?: Option[];
  value?: Option;
  onChange?: (value: Option) => void;
  filterOption?: (input: string, option: Option) => boolean;
  renderItem: (option: Option) => React.ReactNode;
}

const SelectPopup: React.FC<SelectPopupProps> & { show: typeof show } = (props) => {
  const { open, onClose, afterClose, getContainer, filterOption, onChange, renderItem } = props;
  const [keyword, setKeyword] = useState('');

  const options = useMemo(() =>
    props.options
      ?.filter(item =>
        typeof filterOption === 'function' ?
          filterOption(keyword, item) : true) || [],
    [props.options, filterOption, keyword]
  );

  return (
    <Popup
      position="bottom"
      visible={open}
      onClose={onClose}
      afterClose={afterClose}
      getContainer={getContainer}
      closeOnMaskClick
      destroyOnClose>
      <SearchBar className='select-popup-search' onChange={setKeyword} placeholder='请输入查询国家' />
      <List>
        {
          options?.map((option, index) =>
            <List.Item
              clickable={false}
              key={index}
              onClick={() => {
                onChange?.(option);
                onClose?.();
              }}>
              {renderItem(option)}
            </List.Item>)
        }
      </List>
    </Popup>
  )
}

function show(props: Omit<SelectPopupProps, 'open' | 'onClose' | 'afterClose' | 'getContainer'>) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('select-popup');
  document.body.appendChild(wrapper);
  const app = ReactDOM.createRoot(wrapper);

  function close() {
    render(false);
  }

  function destroy() {
    app.unmount();
    wrapper.remove();
  }

  function render(open: boolean) {
    app.render(<SelectPopup {...props} getContainer={() => wrapper} open={open} onClose={close} afterClose={destroy} />)
  }

  render(true);
}

SelectPopup.show = show;