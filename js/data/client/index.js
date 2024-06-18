class Client {
  static authentication = {
    login: (data) =>
      HttpClient.post(
        API_ENDPOINTS.LOGIN,
        data,
      ),
  };
  static products = {
    all: ({ categories, tags, name, shop_id, price, ...query }) =>
      HttpClient.get(API_ENDPOINTS.PRODUCTS, {
        searchJoin: "and",
        with: "shop",
        orderBy: "updated_at",
        sortedBy: "ASC",
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
    store: (data) =>
      HttpClient.post(
        API_ENDPOINTS.PRODUCTS,
        data,
      ),
  };
}
