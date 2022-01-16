/**
 * @author: Adam Lisichin
 * @file: File with API_URL, ACCESS_TOKEN_LIFETIME, WS_SCHEME and API_HOST constants used globally
 **/

import getConfig from 'next/config';

const {publicRuntimeConfig} = getConfig();

export const API_URL = publicRuntimeConfig.API_URL;
export const ACCESS_TOKEN_LIFETIME = publicRuntimeConfig.API_ACCESS_TOKEN_LIFETIME;

const API_URL_OBJECT = new URL(API_URL);

export const WS_SCHEME = API_URL_OBJECT.protocol === "https:" ? 'wss' : 'ws';
export const API_HOST = process.env.NODE_ENV === "production" ? API_URL_OBJECT.host : '127.0.0.1:8000';
