export const getValue = id => (
    document.getElementById(id).value
);

export const cleanFields = ids => {
    ids.forEach((id) => {
        document.getElementById(id).value = '';
    });
}