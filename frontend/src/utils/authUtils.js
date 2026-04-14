export const saveToken = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

export const saveRole = (role) => {
  localStorage.setItem("role", role);
};

export const getRole = () => {
  return localStorage.getItem("role");
};

export const removeRole = () => {
  localStorage.removeItem("role");
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
};