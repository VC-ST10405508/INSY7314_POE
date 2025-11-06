export const saveToken = (token) => localStorage.setItem('pt_token', token);
export const getToken = () => localStorage.getItem('pt_token');
export const removeToken = () => localStorage.removeItem('pt_token');

export const authFetch = async (url, opts = {}) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(opts.headers || {})
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(url, {...opts, headers});
  const data = await res.json().catch(() => null);
  return { ok: res.ok, status: res.status, data };
};
