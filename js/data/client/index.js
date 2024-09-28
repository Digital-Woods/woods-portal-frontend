class Client {
  static authentication = {
    login: (data) => HttpClient.post(API_ENDPOINTS.USERS_LOGIN, data),
    register: (data) => HttpClient.post(API_ENDPOINTS.USERS_REGISTER, data),
    Logout: () => HttpClient.post(API_ENDPOINTS.USER_LOGOUT),
    changePassword: (data) =>
      HttpClient.post(API_ENDPOINTS.USERS_CHANGE_PASSWORD, data),
    forgetPassword: (data) =>
      HttpClient.post(API_ENDPOINTS.USERS_FORGET_PASSWORD, data),
    resetPassword: (data) =>
      HttpClient.post(API_ENDPOINTS.USER_RESET_PASSWORD, data),
    resendEmail: (data) => HttpClient.get(API_ENDPOINTS.RESEND_EMAIL, data),
  };

  static fetchAllFeatures = {
    all: () => HttpClient.get(API_ENDPOINTS.FEATURES),
  };

  static profile = {
    update: (data) => HttpClient.put(API_ENDPOINTS.PROFILE_UPDATE, data),
  };

  static getProfileDetails = {
    all: () => HttpClient.get(API_ENDPOINTS.GET_PROFILE_DETAILS),
  };

  static users = {
    me: () => HttpClient.get(API_ENDPOINTS.GET_PROFILE_DETAILS),
  };

  static files = {
    all: (me, fileId, path) => {
      const url = `${API_ENDPOINTS.ALL_FILES}/${me.hubspotPortals.templateName}${path}/${fileId}`;
      console.log("Fetching URL:", url);
      return HttpClient.get(url);
    },
  };

  static objects = {
    all: ({
      path,
      limit = 10,
      after,
      sort = "updatedAt",
      inputValue,
      page,
      me,
      ...query
    }) =>
      HttpClient.get(
        `${API_ENDPOINTS.OBJECTS}/${me.hubspotPortals.templateName}${path}`,
        {
          limit,
          sort,
          after,
          page: page,
          search: inputValue,
          ...query,
        }
      ),

    byObjectId: ({ path, objectId, me }) =>
      HttpClient.get(
        `${API_ENDPOINTS.OBJECTS_BY_ID}/${me.hubspotPortals.templateName}${path}/${objectId}`
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
