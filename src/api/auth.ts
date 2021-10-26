import axiosClient from "./axiosClient";

export const login = (username: string, password: string): Promise<any> => {
  return axiosClient.post('/auth/token/', {
    username,
    password
  });
};

export const logout = (): Promise<any> => axiosClient.get('/auth/logout/');

export const refreshToken = (): Promise<any> => axiosClient.post('/auth/token/refresh/', {});

export const verifyToken = (): Promise<any> => axiosClient.post('/auth/token/verify/', {});

export const getCurrentUser = (): Promise<any> => axiosClient.get('/users/me/');
