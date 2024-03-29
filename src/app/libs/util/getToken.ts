export const getToken = () => {
  return localStorage.getItem('token') || '';
};

export const isToken = () => {
  const token = localStorage.getItem('token');
  return !!token;
};
