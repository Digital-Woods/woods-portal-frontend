const Logo = ({ className }) => {
  const { me } = useMe();
  const [logoSrc, setLogoSrc] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const logoParam = urlParams.get("logo");

    if (logoParam && logoParam !== "null" && isValidUrl(logoParam)) {
      setLogoSrc(logoParam);
    } else if (
      me &&
      me.hubspotPortals &&
      me.hubspotPortals.portalSettings &&
      me.hubspotPortals.portalSettings.logo &&
      isValidUrl(me.hubspotPortals.portalSettings.logo)
    ) {
      setLogoSrc(me.hubspotPortals.portalSettings.logo);
    } else {
      setLogoSrc("");
    }
  }, [me]);

  const logoToDisplay =
    logoSrc ||
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6VUACD-UCfCix84c3iUXMvU0N7ewxBtDKvg&s";

  return (
    <div>
      <img
        src={logoToDisplay}
        alt="Logo"
        className={`h-auto ${className} rounded-md`}
      />
    </div>
  );
};

const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};
