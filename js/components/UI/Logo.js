const Logo = ({ className }) => {
  const { me } = useMe();
  const [logoSrc, setLogoSrc] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const logoParam = urlParams.get("logo");

    if (logoParam && logoParam !== "null") {
      setLogoSrc(logoParam);
    } else if (
      me &&
      me.hubspotPortals &&
      me.hubspotPortals.portalSettings &&
      me.hubspotPortals.portalSettings.logo
    ) {
      setLogoSrc(me.hubspotPortals.portalSettings.logo);
    }
  }, [me]);

  return (
    <div>
      <img
        src={
          logoSrc ||
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRDxacAtn1nfrWX27HV5sDZeDXeoWgwXvGXQ&s"
        }
        alt="Logo"
        className={`h-auto ${className} rounded-md`}
      />
    </div>
  );
};
