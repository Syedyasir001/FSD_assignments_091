import PostContent from "./PostContent";
import {useEffect, useState} from "react";
import axios from "axios";
import ClickOutHandler from 'react-clickout-handler';
import CommentForm from "./CommentForm";
import Comments from "./Comments";
import RootCommentContext from "./RootCommentContext";
import Comment from "./Comment";

function CommentModal(props) {

  const [comment,setComment] = useState({});

  const visibleClass = props.open ? 'block' : 'hidden';

  useEffect(() => {
    axios.get('http://localhost:4000/comments/'+props.id)
      .then(response => {
        setComment(response.data);
      });
  }, [props.id]);

  function close() {
    setComment({});
    props.onClickOut();
  }

  return (
    <div className={"w-screen h-screen fixed top-0 left-0 z-50 flex justify-center transition-opacity duration-300 "+visibleClass} style={{backgroundColor:'rgba(0,0,0,.8)', backdropFilter: 'blur(5px)'}}>
      <div className="w-full max-w-5xl h-full overflow-y-auto py-8 px-4">
        <ClickOutHandler onClickOut={() => close()}>
          <div className="border border-reddit_border w-full bg-reddit_dark-brighter text-reddit_text self-center p-6 mx-auto rounded-2xl shadow-2xl relative">
            <button onClick={() => close()} className="absolute top-4 right-4 text-gray-400 hover:text-white bg-reddit_dark-brightest p-2 rounded-full shadow-md transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="mt-4">
              <Comment comment={comment} id={props.id} />
            </div>
          </div>
        </ClickOutHandler>
      </div>
    </div>
  );
}

export default CommentModal;