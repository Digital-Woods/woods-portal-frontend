const Details = ({ path, objectId, id }) => {

  return (
    <div>
      {env.DATA_SOURCE_SET !== true ? (
        <ApiDetails objectId={objectId} path={path} id={id} />
      ) : (
        <ModuleDetails objectId={objectId} path={path} id={id} />
      )
      }
    </div>
  );
};
