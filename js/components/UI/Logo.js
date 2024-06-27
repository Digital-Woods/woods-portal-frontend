const Logo = ({ src, className }) => {
    return (
        <div>
      <img src={src} alt="Logo" className={`h-auto ${className}`} />

        </div>
    );
  };