const SvgRenderer = ({ svg }) => {
  return (
    <div>
      <img src={`data:image/svg+xml;utf8,${encodeURIComponent(svg)}`} width='20' />
    </div>
  );
};
