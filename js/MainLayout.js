const MainLayout = () => {
  return (
    <div className="bg-light dark:bg-slate-900">
      <ul role="nav">
        <li>
          <Link className="text-dark dark:text-light" to="/home">
            Home
          </Link>
        </li>
        <li>
          <Link className="text-dark dark:text-light" to="/recoil-js">
            Recoil js
          </Link>
        </li>
        <li>
          <Link className="text-dark dark:text-light" to="/tanstack-query">
            Tnstack Query
          </Link>
        </li>
        <li>
          <Link className="text-dark dark:text-light" to="/react-form">
            React Form
          </Link>
        </li>
        <li>
          <ThemeSwitcher />
        </li>
      </ul>

      <div>
        <Route path="/home" component={Home} />
        <Route path="/recoil-js" component={Recoiljs} />
        <Route path="/tanstack-query" component={TnstackQuery} />
        <Route path="/react-form" component={ReactForm} />
      </div>
    </div>
  );
};
