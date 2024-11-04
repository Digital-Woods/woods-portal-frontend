const Breadcrumb = ({ id, title, path }) => {
  const { breadcrumbs, setBreadcrumbs } = useBreadcrumb();

  const cPath = window.location.hash.split('/')
  const fullPath = window.location.hash.substring(1);
  const routeName = window.location.hash.split('?')[0].replace('#', '');
  const mainPath = `/${routeName.split("/")[1]}`;

  const convertToBase64 = (str = []) => {
    const base64 = btoa(str);
    return base64;
  }

  const decodeToBase64 = (base64) => {
    const decodedStr = atob(base64);
    return decodedStr;
  }

  useEffect(() => {
    let item = [{
      name: title,
      path: fullPath,
      routeName: routeName
    }]

    if (cPath.length == 2) localStorage.clear();

    let breadcrumb = getParam("breadcrumb")

    let breadcrumbItems = breadcrumb ? JSON.parse(decodeToBase64(breadcrumb)) : breadcrumbs;

    let index = breadcrumbItems.findIndex(breadcrumb => breadcrumb.routeName === routeName);


    let updatedBreadcrumbs = index !== -1 ? breadcrumbItems.slice(0, index + 1) : breadcrumbItems;

    let foundBreadcrumb = updatedBreadcrumbs.find(breadcrumb => breadcrumb.routeName === routeName);

    if (!foundBreadcrumb) {
      updatedBreadcrumbs = updatedBreadcrumbs ? [...updatedBreadcrumbs, ...item] : []
    }

    if(mainPath === routeName) {
      const base64 = convertToBase64(JSON.stringify(item))
      setParam("breadcrumb", base64)
      setBreadcrumbs(item)
    } else {
      const base64 = convertToBase64(JSON.stringify(updatedBreadcrumbs))
      setParam("breadcrumb", base64)
      setBreadcrumbs(updatedBreadcrumbs)
    }
  }, []);

  return (
    <div className="text-xs">
      <ol className="flex dark:text-white flex-wrap">
        {breadcrumbs.map((breadcrumb, index) => {
          return (
            <li key={index} className="flex items-center">
              <Link
                className="capitalize"
                to={breadcrumb.path}
              >
                {getParamHash(formatCustomObjectLabel(breadcrumb.name))}
              </Link>
              {index < breadcrumbs.length - 1 && (
                <span className="mx-1">/</span>
              )}
            </li>
          );

        })
        }
      </ol>
    </div>
  )
};
