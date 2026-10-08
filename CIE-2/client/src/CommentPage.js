import Comment from "./Comment";

function CommentPage(props) {

  const commentId = props.match.params.id;

  return (
    <div className="py-8 px-6 bg-reddit_dark min-h-screen">
      <div className="bg-reddit_dark-brighter p-6 rounded-2xl max-w-5xl mx-auto shadow-lg border border-reddit_border">
        <Comment id={commentId} />
      </div>
    </div>
  );
}
export default CommentPage;