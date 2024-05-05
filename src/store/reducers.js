export default {
    locale(state = "en", { type, locale }) {
        switch (type) {
            case "@Locale/CHANGE":
                return locale;
            default:
                return state;
        }
    },
    user(state = {
        visible: false,
        data: null,
    }, { type, user }) {
        switch (type) {
            case "@User/OPEN_DIALOG":
                return {
                    ...state,
                    visible: true
                };
            case "@User/CLOSE_DIALOG":
                return {
                    ...state,
                    visible: false
                };
            case "@User/LOGIN":
                return {
                    ...state,
                    data: user
                };
            case "@User/LOGOUT":
                return {
                    ...state,
                    data: null
                };
            default:
                return state;
        }
    },
    pay(state = {
        loading: false,
    }, { type }) {
        switch (type) {
            case '@Pay/PAYING':
                return {
                    ...state,
                    loading: true
                };
            case '@Pay/PAY_SUCCESS':
                return {
                    ...state,
                    loading: false
                };
            default:
                return state
        }
    }
};
