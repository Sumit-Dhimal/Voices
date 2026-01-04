
const Modal = ({isOpen, onClose, children}) => {
  if(!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* bg-overlay */}
        <div 
            className="absolute inset-0 bg-black/50"
            onClick={onClose}
        />

        {/* modal box */}
        <div className="relative bg-white rounded-xl w-full max-w-md p-6 z-10">
            {children}
        </div>
            
    </div>
  )
}

export default Modal