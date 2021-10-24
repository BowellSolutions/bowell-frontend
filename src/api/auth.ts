import axiosClient from "./axiosClient";

export const login = (username: string, password: string): Promise<any> => {
  return axiosClient.post('/auth/token/', {
    username,
    password
  });
};

export const logout = (): Promise<any> => {
  return axiosClient.get('/auth/logout/');
};

export const refreshToken = (): Promise<any> => {
  return axiosClient.post('/auth/token/refresh/', {});
};

export const verifyToken = (): Promise<any> => {
  return axiosClient.post('/auth/token/verify/', {});
};
