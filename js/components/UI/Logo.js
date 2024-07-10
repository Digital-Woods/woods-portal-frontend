const Logo = ({ className }) => {
  const [logoSrc, setLogoSrc] = useState("https://s3-media0.fl.yelpcdn.com/bphoto/dQaSKYTZdGzL7FNP3HcRCQ/348s.jpg");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const logoParam = urlParams.get('logo');
  
    console.log("Logo Param:", logoParam);
  
    if (logoParam) {
      setLogoSrc(logoParam);
    } else {
      setLogoSrc("https://s3-media0.fl.yelpcdn.com/bphoto/dQaSKYTZdGzL7FNP3HcRCQ/348s.jpg");
    }
  }, []);

  return (
    <div>
      <img src={logoSrc} alt="Logo" className={`h-auto ${className} rounded-md`} />
    </div>
  );
};