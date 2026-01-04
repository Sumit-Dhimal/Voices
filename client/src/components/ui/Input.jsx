

const Input = ({
    label,
    type = "text",
    placeholder,
    value,
    onChange,
    required=false,
    error,
    className = "",
    ...props
}) => {
  return (
    <div className={`flex flex-col mb-4 ${className}`}>
        {
            label && (
                <label className="mb-1 text-sm font-medium text-gray-700">
                    {label}
                </label>
            )
        }
        <input 
            type={type} 
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
            className={`text-lg px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 
            ${error ? "border-red-500 focus:ring-red-400 focus:border-red-400" : "border-gray-300"}`}
            {...props}

        />
        {error && (
            <p
                className="text-red-600 mt-1 text-sm"
            >
                {error}
            </p>
        )}
    </div>
  )
}

export default Input