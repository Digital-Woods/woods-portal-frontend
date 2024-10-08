const Details = ({ path, id }) => {

  return (
    <div>
      {env.DATA_SOURCE_SET !== true ? (
        <ApiDetails path={path} id={id} />
      ) : (
        <ModuleDetails path={path} id={id} />
      )
      }
    </div>
  );
};
