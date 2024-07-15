class Client {
  static authentication = {
    login: (data) => HttpClient.post(API_ENDPOINTS.USERS_LOGIN, data),
    register: (data) => HttpClient.post(API_ENDPOINTS.USERS_REGISTER, data),
  };

  // static fetchFeatures = async () => {
  //   const response = await HttpClient.get(API_ENDPOINTS.FEATURES);
  //   if (!response.ok) {
  //     throw new Error('Network response was not ok')
  //   }
  //   return response.data
  // };

  static fetchFeatures = {
    all: HttpClient.get(API_ENDPOINTS.FEATURES)
  }

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

