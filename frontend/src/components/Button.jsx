const Button = ({type,text,variant,extraClasses, handleClick}) => {
  const styles = {
    black: "bg-black text-white hover:bg-zinc-900 hover:text-white",
    gradient: "transition-all duration-400 bg-gradient text-black hover:from-fuchsia-800 hover:to-purple-800 hover:text-white"
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