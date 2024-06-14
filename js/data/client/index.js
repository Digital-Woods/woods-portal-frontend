class Client {
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

    // get: ({ slug, language }: GetParams) =>
    //   HttpClient.get<Product>(`${API_ENDPOINTS.PRODUCTS}/${slug}`, {
    //     language,
    //     with: 'shop;tags;type',
    //     withCount: 'orders',
    //   }),
  };
}
