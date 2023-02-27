
export function camelCase(str) {
    str = str.toLowerCase()
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
        return index == 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
}

export function fullCamelCase(str) {
    str = str.toLowerCase()
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
        return  word.toUpperCase();
    }).replace(/\s+/g, '');
}