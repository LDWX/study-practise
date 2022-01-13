export function phoneFormat(phone: string) {
    if (!phone) {
        return '';
    }
    return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
}

export function appendPrefix(value: string, prefix: string) {
    return prefix + value;
}