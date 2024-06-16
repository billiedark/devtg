export const truncate = (text, maxLength) => {
    if (text.length > maxLength) {
        return text.slice(0, maxLength - 2) + '..';
    }
    return text;
};
