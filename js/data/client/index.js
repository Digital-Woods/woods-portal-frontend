class Client {
  static authentication = {
    login: (data) => HttpClient.post(API_ENDPOINTS.USERS_LOGIN, data),
    register: (data) => HttpClient.post(API_ENDPOINTS.USERS_REGISTER, data),
    Logout: (data) => HttpClient.post(API_ENDPOINTS.USER_LOGOUT, data),
    forgetPassword: (data) =>
      HttpClient.post(API_ENDPOINTS.USERS_FORGET_PASSWORD, data),
  };

  static fetchFeatures = {
    all: HttpClient.get(API_ENDPOINTS.FEATURES),
  };

  static profile = {
    update: (data) => HttpClient.put(API_ENDPOINTS.PROFILE_UPDATE, data),
  };

  static getProfileDetails = {
    all: HttpClient.get(API_ENDPOINTS.GET_PROFILE_DETAILS),
  };

  static objects = {
    all: ({
      path,
      limit = 10,
      after = "",
      sort = "updatedAt",
      inputValue,
      hubId,
      templatename,
      ...query
    }) =>
      HttpClient.get(
        `${API_ENDPOINTS.OBJECTS}/${hubId}/${templatename}${path}`,
        {
          limit,
          sort,
          after,
          search: inputValue,
          ...query,
        }
      ),

    byObjectId: ({ path, objectId, hubId, templatename }) =>
      HttpClient.get(
        `${API_ENDPOINTS.OBJECTS_BY_ID}/${hubId}/${templatename}${path}/${objectId}`
      ),
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
