import { Link } from "react-router-dom"

const Question = ({question}) => {
  return (
    <div className="flex gap-2 p-4 bg-gray-300 rounded-md flex-col">
      <Link to={`/question/${question._id}`}>
        <p className="underline underline-offset-2">{question.question}</p>
      </Link>
      <div className="flex justify-between">
        <span className="text-sm">Asked by : <span className="font-[700]">{question?.author?.username}</span></span>
        <apsn className="text-sm"><span className="font-[700]">{question?.comments?.length}</span> comment(s)</apsn>
      </div>
    </div>
  )
}

export default Question