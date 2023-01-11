import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Form } from './components/Form'
import { TaskList } from './components/TaskList'

export const App = () => {
  const initialState = [
    {
      id: uuidv4(),
      title: 'Obtener cinturon negro Python',
      completed: false
    }
  ]
  const [tasks, setTasks] = useState(
		JSON.parse(localStorage.getItem('tasks')) || initialState
  )
  const [taskValue, setTaskValue] = useState('')
  const handleAddTask = e => {
    e.preventDefault()
    if(taskValue.length === 0) return alert('El campo no puede quedar vacio')
    setTasks([
      ...tasks,
      {
        id: uuidv4(),
        title: taskValue,
        completed: false
      }
    ])
    setTaskValue('')
  }
  const handleDeleteTask = id => {
    const tasksArr = tasks.filter(item => item.id !== id)
    saveToLocalStorage('tasks', tasksArr)
    setTasks(tasksArr)
  }

  const handleCompletedTask = (id) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        return {
          ...task,
          completed: !task.completed
        }
      }
      return task
    }))
  }

  const saveToLocalStorage = (key, value) => localStorage.setItem(key, JSON.stringify(value))

  useEffect(() => {
    saveToLocalStorage('tasks',tasks)
  }, [tasks, setTasks])
  return (
		<div className='grid place-items-center mt-12'>
			<h1 className='text-3xl font-bold'>Lista de quehaceres</h1>
			<div className='my-4 w-96'>
				<Form handleAddTask={handleAddTask} taskValue={taskValue} setTaskValue={setTaskValue} />
				<TaskList tasks={tasks} handleCompletedTask={handleCompletedTask} handleDeleteTask={handleDeleteTask} />
			</div>
		</div>
	)
}
