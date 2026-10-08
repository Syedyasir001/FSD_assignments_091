function Textarea (props) {
  return (
    <textarea {...props} className={"bg-reddit_dark-brighter text-reddit_text px-4 py-3 border border-reddit_border rounded-lg block focus:outline-none focus:border-gray-400 transition-colors " + props.className} />
  );
}

export default Textarea;