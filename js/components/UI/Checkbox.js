const Checkbox = ({
    label,
    checked,
    onChange,
    labelClassName = '',
    checkboxClassName = '',
    containerClassName = ''
  }) => {
    return (
      <div className={`flex items-center ${containerClassName}`}>
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className={`form-checkbox h-5 w-5 text-blue-600 ${checkboxClassName}`}
        />
        {label && <label className={`ml-2 ${labelClassName}`}>{label}</label>}
      </div>
    );
  };