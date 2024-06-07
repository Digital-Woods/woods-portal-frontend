const { BrowserRouter, Route, Link, HashRouter } = ReactRouterDOM;
const { RecoilRoot } = Recoil;
// console.log("link_field", link_field);

const { QueryClientProvider, QueryClient } = ReactQuery;

ReactDOM.render(
  <RecoilRoot>
    <QueryClientProvider client={new QueryClient()}>
      <HashRouter>
        <MainLayout />
      </HashRouter>
    </QueryClientProvider>
  </RecoilRoot>,
  document.getElementById("app")
);
