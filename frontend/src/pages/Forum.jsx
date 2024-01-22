import React from 'react'

const Forum = () => {
  return (
    <div className='container p-4'>

        <form className='flex flex-col justify-center items-center gap-3'>
          <h3 className='text-xl'>Ask a Question</h3>
          <input type="text" placeholder='Question title' className='w-10/12'/>
          <textarea placeholder='Detailed question' className='w-10/12'/>
          <button type="submmit">Submit</button>
        </form>

    </div>
  )
}

export default Forum