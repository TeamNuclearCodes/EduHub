const Button = ({type,text,variant,extraClasses, handleClick}) => {
  const styles = {
    black: "bg-black text-white hover:bg-[#777] hover:text-black",
    white: "bg-white text-black hover:bg-black hover:text-white"
  }

  return (
    <div className="flex justify-center items-center">
      <button type={type} 
        className={`py-2 px-4 rounded-md ${styles[variant]} ${extraClasses}`}
        onClick={handleClick}
      >
        {text}
      </button>
    </div>
  )
}

export default Button