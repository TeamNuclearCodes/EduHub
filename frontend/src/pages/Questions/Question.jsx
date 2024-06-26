import { CommentCard, Button, HrtLn } from "../../components";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import { apiBase } from "../../constants";
import { MdOutlineLibraryAdd } from "react-icons/md";
import { Link } from "react-router-dom";
import axios from "axios";

const Question = () => {
  const [question, setQuestion] = useState({
    question: "",
    tags: [],
    comments: [],
    author: [],
  });
  const [comment, setComment] = useState({ comment: "" });
  const { slug } = useParams();
  const { auth } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestBody = { comment: comment.comment };
    await axios.patch(`${apiBase}/api/questions/${slug}`,requestBody, {
      headers: {
        authorization: auth.token
      }
    }).then((res) => {
        setQuestion({ ...question, comments: res.data.comments });
    });
  };

  useEffect(() => {
    const fetchQuestion = async() => {
      await axios.get(`${apiBase}/api/questions/${slug}`, {
        headers: {
          authorization: auth.token
        }
      }).then(res => setQuestion(res.data))
    }
    fetchQuestion();
  }, [slug]);

  return (
    <div className="container p-4">
      <div className="bg-zinc-950 p-2 rounded-md w-full flex gap-3 flex-col">
        <h3 className="text-xl">Question</h3>
        <div className="bg-gradient p-[1px] rounded-lg">
          <p className="whitespace-pre-wrap bg-zinc-950 p-2 rounded-lg">
            {question.question}
          </p>
        </div>
        <div className="flex gap-1">
          {question.tags.map((tag) => (
            <span className="text-sm bg-zinc-600 rounded-lg px-1.5 py-0.5 font-[500]">
              #{tag}
            </span>
          ))}
        </div>
        <span className="text-sm">
          Asked by :{" "}
          <Link to={`/p/${question?.author.username}`}>
            <span className="font-[700]">{question?.author?.name}</span>
          </Link>
        </span>
      </div>
      <form className="flex py-4 flex-col gap-3" onSubmit={handleSubmit}>
        <h4 className="text-md">Add a comment</h4>
        <textarea
          placeholder="Type your comment here..."
          className="form__input inputdata bg-zinc-950 w-full h-40 whitespace-pre-wrap"
          onChange={(e) =>
            setComment({ ...comment, comment: e.target.value })
          }
          value={comment.comment}
        />
        <Button
          type="submit"
          text="Add comment"
          variant="gradient"
          extraClasses="max-sm:w-full"
          leftIcon={<MdOutlineLibraryAdd />}
        />
      </form>
      <HrtLn />
      <div className="py-4 px-2 flex flex-col gap-2">
        {question.comments.length != 0 ? (
          question.comments.map((comment) => (
            <CommentCard key={comment.comment} comment={comment} />
          ))
        ) : (
          <h5 className="text-md">No comments yet</h5>
        )}
      </div>
    </div>
  );
};

export default Question;
