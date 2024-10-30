const Breadcrumb = ({ id, title, path }) => {
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const mediatorObjectTypeId = getParam("mediatorObjectTypeId")
  const mediatorObjectRecordId = getParam("mediatorObjectRecordId")

  const cPath = window.location.hash.split('/')
  const fullPath = window.location.hash.substring(1);

  useEffect(() => {
    let item = [{
      name: title,
      path: fullPath
    }]

    if (cPath.length == 2) localStorage.clear();

    let breadcrumbItems = JSON.parse(localStorage.getItem('breadcrumbItems')) || [];

    let index = breadcrumbItems.findIndex(breadcrumb => breadcrumb.path === fullPath);
    let updatedBreadcrumbs = index !== -1 ? breadcrumbItems.slice(0, index + 1) : breadcrumbItems;

    let foundBreadcrumb = updatedBreadcrumbs.find(breadcrumb => breadcrumb.path === fullPath);

    if (!foundBreadcrumb) {
      updatedBreadcrumbs = updatedBreadcrumbs ? [...updatedBreadcrumbs, ...item] : []
    }

    setBreadcrumbs(updatedBreadcrumbs)
    localStorage.setItem('breadcrumbItems', JSON.stringify(updatedBreadcrumbs));
  }, []);

  return (
    <div className="text-xs">
      <ol className="flex flex-wrap">
        {breadcrumbs.map((breadcrumb, index) => {
          return (
            <li key={index} className="flex items-center">
              <Link
                className="capitalize"
                to={breadcrumb.path}
              >
                {breadcrumb.name}
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
