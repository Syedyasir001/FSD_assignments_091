import TimeAgo from 'timeago-react';
import Button from "./Button";
import CommentForm from "./CommentForm";
import {useState, useContext} from 'react';
import RootCommentContext from "./RootCommentContext";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import Voting from "./Voting";

function Comments(props) {
  const [showForm,setShowForm] = useState(false);
  const comments = props.comments.filter(comment => props.parentId === comment.parentId);
  const rootCommentInfo = useContext(RootCommentContext);

  return (
    <div className={'my-4 text-reddit_text'}>
      {comments.map(comment => {
        const replies = props.comments.filter(c => c.parentId === comment._id);
        return (
          <div className={'mb-4'} key={comment._id}>
            <div className="flex items-center mb-2 gap-3">
              <div className="bg-gradient-to-tr from-gray-500 to-gray-700 w-8 h-8 rounded-full shadow-sm"/>
              <div className="text-sm font-semibold text-gray-200">{comment.author}</div>
              <TimeAgo className="text-xs text-gray-500" datetime={comment.postedAt}/>
            </div>
            <div className="border-l-2 border-reddit_border pl-4 ml-4"
                 style={{marginTop: '-0.5rem'}}>
              <div className="pt-2">
                <div className="text-sm leading-relaxed text-gray-300 mb-3">
                  <ReactMarkdown remarkPlugins={[gfm]} children={comment.body} />
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <Voting commentId={comment._id} />
                  <button type={'button'}
                          onClick={() => setShowForm(comment._id)}
                          className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white transition-colors bg-transparent border-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                    </svg>
                    Reply
                  </button>
                </div>
                {comment._id === showForm && (
                  <div className="mb-4 pr-4">
                    <CommentForm
                      parentId={comment._id}
                      rootId={props.rootId}
                      onSubmit={() => {
                        setShowForm(false);
                        rootCommentInfo.refreshComments();
                      }}
                      showAuthor={false}
                      onCancel={e => setShowForm(false)}/>
                  </div>
                )}
                {replies.length > 0 && (
                  <Comments comments={props.comments} parentId={comment._id} rootId={props.rootId} />
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Comments;