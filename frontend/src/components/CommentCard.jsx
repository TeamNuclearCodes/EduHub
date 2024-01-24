import personImg from '../assets/person.jpg'

const CommentCard = ({comment}) => {
  return (
    <div className="flex gap-2 p-4 bg-gray-300 rounded-md">
        <img src={personImg} className='h-8 w-8 rounded-full no-repeat' alt='mig'/>
        <div className='flex flex-col w-full gap-1'>
            <span className='align-top text-sm font-[700]'>{comment?.author.username}</span>
            <p className='bg-gray-200 w-full px-2 py-1 rounded-md whitespace-pre-wrap'>{comment?.comment}</p>
        </div>
    </div>
  )
}

export default CommentCard