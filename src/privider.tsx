import { createStore, Provider } from 'jotai';
import React, { PropsWithChildren } from "react";

export const atomStore = createStore();

const StoreProvider: React.FC<PropsWithChildren> = (props) => {
    return <Provider store={atomStore}>
        {props.children}
    </Provider>
}

export default StoreProvider;
