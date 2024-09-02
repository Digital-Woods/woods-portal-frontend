const SvgRenderer = ({ svgContent }) => {
  const [svg, setSvg] = useState(svgContent);
  const { themeMode, setThemeMode } = useTheme();

  return (
    <div>
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svg)} `}
        width="16"
      />
    </div>
  );
};
