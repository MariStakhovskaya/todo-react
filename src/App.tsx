import React, { useState } from 'react';
import './App.css';

import { v1 } from 'uuid'
import { Todolist } from './Todolist';

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    let [tasks, setTasks] =useState<TaskType[]>( [
        { id: v1(), title: 'HTML&CSS', isDone: true },
        { id: v1(), title: 'JS', isDone: true },
        { id: v1(), title: 'ReactJS', isDone: false },
      ])

      const [filter, setFilter] = useState<FilterValuesType>('all')

      let tasksForTodolist = tasks

      if (filter === 'active') {
        tasksForTodolist = tasks.filter(tasks => !tasks.isDone)
      }

      if (filter === 'completed') {
        tasksForTodolist = tasks.filter(tasks => tasks.isDone)
      }
     
     const removeTask = (taskId: string) => {
       const filteredTasks = tasks.filter((task) => {
        return task.id !== taskId
       })
       setTasks(filteredTasks)
     } 

     const addTask = (title: string) => {
      const newTask =  { id: v1(), title, isDone: false }
      const newTasks = [newTask, ...tasks]
      setTasks(newTasks)
     }
     const changeFilter = (filterValue: FilterValuesType) => {
        setFilter(filterValue)
     }

    return (
        <div className="App">
            <Todolist
             title="What to learn"
            tasks = {tasksForTodolist} 
            removeTask={removeTask} 
            changeFilter ={changeFilter}
            addTask = {addTask}
            />    
        </div>
    );
}

export default App;
