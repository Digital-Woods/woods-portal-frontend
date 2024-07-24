const SvgRenderer = ({ svgContent }) => {
  const [svg, setSvg] = useState(svgContent);
  const { themeMode, setThemeMode } = useTheme();

  useEffect(() => {
    const newColor1 = themeMode === "dark" ? "#FFFFFF" : "#FFFFFF";
    const newColor2 = themeMode === "dark" ? "#FFFFFF" : "#FFFFFF";

    let updatedSvg = svgContent;

    // Check if the SVG uses inline fill attributes
    if (/fill="[^"]*"/.test(svgContent)) {
      updatedSvg = svgContent.replace(/fill="[^"]*"/g, `fill="${newColor1}"`);
    }

    // Check if the SVG uses CSS class fill
    if (/\.st0{fill:[^}]*}/.test(svgContent)) {
      updatedSvg = svgContent.replace(
        /\.st0{fill:[^}]*}/g,
        `.st0{fill:${newColor2};}`
      );
    }

    setSvg(updatedSvg);
  }, [themeMode]);

  return (
    <div>
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svg)}`}
        width="20"
      />
    </div>
  );
};
