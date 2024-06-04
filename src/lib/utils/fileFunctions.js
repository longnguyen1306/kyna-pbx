export const handleRecFile = (link) => {
    const newLink = link.slice(19);
    return `${import.meta.env.VITE_PBX_DOMAIN}${newLink}`;
};
