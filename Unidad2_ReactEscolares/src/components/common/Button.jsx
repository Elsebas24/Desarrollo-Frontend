const Button = ({ children, onClick, type = 'button', variant = 'primary', fullWidth = false }) => {
  const classes = `btn btn-${variant} ${fullWidth ? 'btn-full' : ''}`;
  return (
    <button className={classes} type={type} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
