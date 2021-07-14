import { CACHE_TIME } from "../firebase-helper";
import batchApi from "./batch";
import categoryApi from "./category";
import chapterApi, { chapterPaginate } from "./chapter";
import folderApi, { folderPaginate } from "./folder";

const responseWrapper = {
  success: (data) => ({
    isFetched: true,
    data,
  }),
  failed: (error) => ({
    isFetched: false,
    error,
  }),
};

export function apiFactory (http, baseUrl) {
  return {
    category: categoryApi(http, baseUrl, responseWrapper),
    folder: folderApi(http, baseUrl, responseWrapper),
    chapter: chapterApi(http, baseUrl, responseWrapper),
    batch: batchApi(http, baseUrl, responseWrapper),
  };
}

const api = apiFactory(null, 'http://192.168.1.150:8093');
window.api = api;
export default api;


export const queryConfig = {
  cacheTime: CACHE_TIME,
  refetchOnWindowFocus: false,
}

export const paginate = {
  chapter: chapterPaginate,
  folder: folderPaginate
}