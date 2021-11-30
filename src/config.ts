import getConfig from 'next/config';

const {publicRuntimeConfig} = getConfig();

export const API_URL = publicRuntimeConfig.API_URL;
export const ACCESS_TOKEN_LIFETIME = publicRuntimeConfig.API_ACCESS_TOKEN_LIFETIME;
