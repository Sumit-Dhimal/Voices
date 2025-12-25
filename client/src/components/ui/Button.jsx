
const Button = ({
    children, // children is whatever that is inside component
    type = "button",
    variant = "primary",
    className = "", // allows extra tailwind classes
    ...props // this collects all the remaining props that isn't destructured here
}) => {

  // default primary button
  let styles = "bg-blue-600 text-white hover:bg-blue-700";

  if(variant === "secondary") {
    styles = "bg-emerald-600 text-white hover:bg-emerald-700";
  } else if(variant === "danger") {
    styles = "bg-red-600 text-white hover:bg-red-700";
  }
    
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium transition cursor-pointer ${styles} ${className}`}
      {...props}
    >
        {children}
    </button>
  )
}

export default Button