import { Link } from "react-router-dom"

const CommentCard = ({comment}) => {
  return (
    <div className="flex gap-2 py-2 px-4 bg-zinc-950 rounded-xl content mr-auto pr-16 items-center rounded-r-3xl">
      <Link to="">
        <img src={comment.author.profileImage} className='h-12 w-12 rounded-full no-repeat border-2 border-violet-700' alt='mig'/>
      </Link>
        <div className='flex flex-col'>
            <Link><span className='px-2 align-top text-sm font-[700]'>{comment?.author.name}</span></Link>
            <p className='w-full px-2 rounded-md whitespace-pre-wrap'>{comment?.comment}</p>
        </div>
    </div>
  )
}

export default CommentCard