export function isErrorAxios(error) {
    return (error.status !== undefined &&
        error.message !== undefined);
}
