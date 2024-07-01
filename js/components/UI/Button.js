// const { Redirect } = ReactRouterDOM;

const Button = (
  { type = "button", onClick, isLoading, href, ...props },
  ref
) => {
  // const redirect = Redirect();

  const onClickHandel = () => {
    if (href) {
      console.log("href", href);
      // redirect(href);
    } else {
      onClick;
    }
  };
  return (
    <button 
    ref={ref}
    type={type}
    onClick={onClick}
    className="text-white bg-primary hover:bg-primary focus:ring-4 focus:ring-primary  rounded-md  py-2 px-5 me-2 mb-2 dark:primary dark:hover:primary focus:outline-none dark:focus:ring-primary"  {...props} />
  );
};
