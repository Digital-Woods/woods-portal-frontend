const classNames = window.classNames;

const Avatar = ({ src, alt='avatar', type='rounded-full', className }, ref) => {

  const avatarType = () => {
    switch (type) {
      case 'red':
        return 'rounded';
        break;
      case 'bordered':
        return 'rounded-full ring-2 ring-gray-300 dark:ring-gray-500';
        break;
      default:
        return 'rounded-full';
    }
  }
  return (
    <img ref={ref} class={classNames("w-10 h-10", className, avatarType())} alt={alt} src={src} />
  );
};
