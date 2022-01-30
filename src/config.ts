/**
 * @license MIT
 * Copyright (c) 2022 Adam Lisichin, Gustaw Daczkowski, Hubert Decyusz, Wojciech Nowicki
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:

 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE
 *
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
