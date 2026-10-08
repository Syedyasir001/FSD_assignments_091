function Button(props) {
  let classNames = "border rounded-full px-5 py-2 text-sm font-bold transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 flex items-center justify-center ";
  if (props.outline) {
    classNames += "border-gray-400 text-gray-300 hover:bg-white hover:text-reddit_dark ";
  } else {
    classNames += "border-white bg-white text-reddit_dark hover:bg-gray-200 ";
  }
  return (
    <button {...props} className={classNames + props.className} />
  );
}

export default Button;