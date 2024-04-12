import { Link } from "react-router-dom"

const CommentCard = ({comment}) => {
  return (
    <div className="flex gap-2 p-4 bg-zinc-950 rounded-md">
      <Link to="">
        <img src={comment.author.profileImage} className='h-12 w-12 rounded-full no-repeat border-2 border-violet-700' alt='mig'/>
      </Link>
        <div className='flex flex-col w-full gap-1'>
            <Link><span className='align-top text-sm font-[700]'>{comment?.author.name}</span></Link>
            <p className='bg-neutral-900 w-full px-2 py-1 rounded-md whitespace-pre-wrap'>{comment?.comment}</p>
        </div>
    </div>
  )
}

export default CommentCard