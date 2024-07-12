const Logo = ({ className }) => {
  const defaultLogoSrc = "https://s3-media0.fl.yelpcdn.com/bphoto/dQaSKYTZdGzL7FNP3HcRCQ/348s.jpg";
  const [logoSrc, setLogoSrc] = useState(defaultLogoSrc);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const logoParam = urlParams.get('logo');
  
    console.log("Logo Param:", logoParam);
  
    if (logoParam === "null" || !logoParam || logoParam === "") {
      setLogoSrc(defaultLogoSrc); 
    } else {
      setLogoSrc(logoParam);
    }
  }, []);

  return (
    <div>
      <img src={logoSrc} alt="Logo" className={`h-auto ${className} rounded-md`} />
    </div>
  );
};