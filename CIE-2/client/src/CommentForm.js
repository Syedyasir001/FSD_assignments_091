import {useContext, useState} from "react";
import UserContext from "./UserContext";
import Textarea from "./Textarea";
import Button from "./Button";
import axios from "axios";

function CommentForm (props) {
  const userInfo = useContext(UserContext);
  const [commentBody,setCommentBody] = useState('');
  function postComment(e) {
    e.preventDefault();
    const data = {body:commentBody, parentId:props.parentId,rootId:props.rootId,};
    axios.post('http://localhost:4000/comments', data, {withCredentials:true})
      .then(response => {
        setCommentBody('');
        if (props.onSubmit) {
          props.onSubmit();
        }
      });
  }
  return (
    <div className={'text-reddit_text'}>
      {userInfo.username && props.showAuthor && (
        <div className="mb-2 text-sm text-gray-400">
          Comment as <span className="font-semibold text-gray-200">{userInfo.username}</span>
        </div>
      )}

      <form onSubmit={e => postComment(e)}>
        <Textarea className="w-full mb-3 min-h-[120px] resize-y bg-reddit_dark-brightest border border-reddit_border focus:border-gray-500 rounded-xl"
                  onChange={e => setCommentBody(e.target.value)}
                  value={commentBody}
                  placeholder={'What are your thoughts?'} />
        <div className="flex justify-end gap-3 mt-2">
          {!!props.onCancel && (
            <Button outline type="button"
                    className="px-6 py-2"
                    onClick={e => props.onCancel()}>Cancel</Button>
          )}
          <Button type="submit" className="px-6 py-2 bg-reddit_text text-reddit_dark hover:bg-white font-bold">Comment</Button>
        </div>
      </form>
    </div>
  );
}

export default CommentForm;