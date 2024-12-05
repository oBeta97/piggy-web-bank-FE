

export const getJwtToken: () => string | null = () => localStorage.getItem("PWB_Token");