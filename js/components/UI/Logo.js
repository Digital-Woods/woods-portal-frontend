const Logo = ({ className }) => {
  const [personalInfo] = useRecoilState(profileState);
  const [logoSrc, setLogoSrc] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const logoParam = urlParams.get("logo");

    if (logoParam && logoParam !== "null") {
      setLogoSrc(logoParam);
    } else if (personalInfo.logo) {
      setLogoSrc(personalInfo.logo);
    }
  }, [personalInfo.logo]);

  return (
    <div>
      <img
        src={logoSrc || ""}
        alt="Logo"
        className={`h-auto ${className} rounded-md`}
      />
    </div>
  );
};
