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
 * @file: Exports recordings related functions performing HTTP calls with axiosClient
 */
import AxiosClient from "./axiosClient";
import {FileData, PaginatedResponse, Response} from "./types";
import {AxiosRequestConfig} from "axios";

/**
 Sends GET request at /api/recordings/
 **/
export const getFiles = (options?: AxiosRequestConfig): Promise<PaginatedResponse<FileData>> => {
  return AxiosClient.get('/recordings/', {...options});
};

/**
 Sends GET request at /api/recordings/[id]/
 **/
export const getFile = (fileId: string | number, options?: AxiosRequestConfig): Promise<Response<FileData>> => {
  return AxiosClient.get(`/recordings/${fileId}/`, {...options});
};

/**
 Sends DELETE request at /api/recordings/[id]/
 **/
export const deleteFile = (fileId: string | number, options?: AxiosRequestConfig): Promise<Response<{}>> => {
  return AxiosClient.delete(`/recordings/${fileId}/`, {...options});
};

/**
 Sends POST request at /api/recordings/[id]/
 **/
export const uploadFile =
  (
    data: FormData,
    progressHandler: (progressEvent: ProgressEvent) => void,
    options?: AxiosRequestConfig
  ): Promise<Response<FileData>> => {
    return AxiosClient.post(
      '/recordings/',
      data,
      {onUploadProgress: progressHandler, ...options}
    );
  };
