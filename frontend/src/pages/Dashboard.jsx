import React from "react";
import GetGraphData from "../components/Graph/GetGraphData";
import { Button, HrtLn, ProtectedRoute, Question } from "../components";
import {Task} from "../components";
import getAuth from "../utils/getAuth";
import { useState, useEffect } from "react";
import { apiBase } from "../constants";
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate()
  const [tasks, setTasks] = useState(null)
  const [questions,setQuestions] = useState(null)

  useEffect(() => {
    const fetchTodo = async () => {
      await fetch(`${apiBase}/api/todo`,{
        method:'GET',
        headers:{
          authorization: JSON.stringify(getAuth())
        }
      }).then(res => res.json()).then(data => {
        const tasks = data.slice(0,5)
        console.log(tasks)
        setTasks(tasks)
      })
    }
    const fetchLatestQuestion = async () => {
      await fetch(`${apiBase}/api/questions`,{
        method:'GET',
      }).then(res => res.json()).then(data => {
        const questions_ = data.slice(0,2)
        console.log(questions_)
        setQuestions(questions_)
      })
    }
    fetchLatestQuestion()
    fetchTodo()
  },[])

  return (
    <ProtectedRoute>
      <div className="container mt-4 px-2">
        <h2 className="text-4xl mb-2 bg-clip-text bg-gradient text-transparent w-2/12 max-xl:w-full font-[500]">Dashboard</h2>
        <HrtLn/>
        <div className="flex justify-between w-full py-6 gap-4 max-md:flex-col max-md:px-2">
          <div className="w-8/12 max-md:w-full">
            <GetGraphData />
          </div>
          <div className="w-4/12 flex flex-col max-md:w-full gap-2">
            <div className="bg-gradient rounded-xl p-[1px] flex w-full">
              <div className="bg-zinc-900 rounded-xl p-2 flex flex-col gap-2 w-full">
                <h3 className="text-[24px] bg-gradient bg-clip-text text-transparent font-[500] text-center">Recent Questions</h3>
                  {questions ? 
                    questions.map((question) => (
                      <div>
                        <Question question={question}/>
                      </div>
                    )) : (
                    <>Loading...</>
                  )}
              </div>
            </div>
            <div className="max-md:w-full bg-gradient rounded-xl p-[1px] flex w-full">
              <div className="bg-zinc-900 rounded-xl p-2 flex flex-col gap-2 w-full">
                <h3 className="text-[24px] bg-gradient bg-clip-text text-transparent font-[500] text-center">Recently Added Tasks</h3>
                  {tasks ? 
                    tasks?.map((task) => (
                      <Task key={task._id} task={task} />
                    )
                  ) : (
                    <>Loading...</>
                  )}
                <div className="p-1">
                  <Button text='Manage Todo List' variant='gradient' handleClick={() => navigate('/todo')}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
