class Client {
  static authentication = {
    login: (data) => HttpClient.post(API_ENDPOINTS.USERS_LOGIN, data),
    register: (data) => HttpClient.post(API_ENDPOINTS.USERS_REGISTER, data),
  };

  static fetchFeatures = {
    all: HttpClient.get(API_ENDPOINTS.FEATURES),
  };

  static objects = {
    all: ({ path, limit = 10, after = "", sort = "updatedAt", inputValue, ...query }) =>
      HttpClient.get(`/api/feature-data/333/school_management_test${path}`, {
          limit,
          sort,
          after,
          search: inputValue,
          ...query,
      }),
  
    byObjectId: ({ path, objectId }) =>
      HttpClient.get(`/api/feature-data/333/school_management_test${path}/${objectId}`),
  };

  static products = {
    all: ({ categories, tags, name, shop_id, price, page, ...query }) =>
      HttpClient.get(API_ENDPOINTS.PRODUCTS, {
        searchJoin: "and",
        with: "shop",
        orderBy: "updated_at",
        sortedBy: "ASC",
        page: page,
        ...query,
        search: HttpClient.formatSearchParams({
          categories,
          tags,
          name,
          shop_id,
          price,
          status: "publish",
        }),
      }),
    store: (data) => HttpClient.post(API_ENDPOINTS.PRODUCTS, data),
  };
}
