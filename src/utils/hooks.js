import { useRef, useEffect, useCallback, useState } from "react";

export const useDebounce = (fn, delay, dep = []) => {
    const { current } = useRef({ fn, timer: null });

    useEffect(
        function () {
            current.fn = fn;
        },
        [fn]
    );

    return useCallback(function (...args) {
        if (current.timer) clearTimeout(current.timer);
        current.timer = setTimeout(() => {
            current.fn.call(this, ...args);
        }, delay);
    }, dep);
};

export const useThrottle = (fn, delay, dep = []) => {
    const { current } = useRef({ fn, timer: null });

    useEffect(
        function () {
            current.fn = fn;
        },
        [fn]
    );

    return useCallback(function (...args) {
        if (!current.timer) {
            current.timer = setTimeout(() => {
                delete current.timer;
            }, delay);
            current.fn.call(this, ...args);
        }
    }, dep);
};

import addEventListener from "add-dom-event-listener";
import { debounce } from "lodash";

export const useWindowResize = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);

    const ref = useRef(null);

    useEffect(() => {
        ref.current = addEventListener(
            window,
            "resize",
            debounce((e) => {
                setWidth(window.innerWidth);
                setHeight(window.innerHeight);
            }),
            500
        );

        return () => {
            ref.current && ref.current.remove();
        };
    }, []);

    return [width, height];
};
