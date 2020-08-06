export const log = {
    error(message) {
        console.error(message);
    },

    success(message) {
        console.log(`%c${message}`, "color: green");
    },

    warning(message) {
        console.warn(message);
    },

    message(message) {
        console.log(message);
    },
}