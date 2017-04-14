let _api = null;

export function storeApi(rawApi) {
  _api = rawApi;
}

export function getApi() {
  return _api;
}
