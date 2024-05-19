import React, { useState } from 'react';
import './App.css';

import { v1 } from 'uuid'
import { Todolist } from './Todolist';

export type TodolistType = {
  id: string,
  title: string,
  filter: FilterValuesType
}

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

  let [todolists, setTodolists] =useState<TodolistType[]>( [
    { id: v1(), title: 'What to learn', filter: 'all' },
    { id: v1(), title: 'What to buy', filter: 'all' },
  ])

    let [tasks, setTasks] =useState<TaskType[]>( [
        { id: v1(), title: 'HTML&CSS', isDone: true },
        { id: v1(), title: 'JS', isDone: true },
        { id: v1(), title: 'ReactJS', isDone: false },
      ])


     
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
     const changeFilter = (idTodolist: string, filterValue: FilterValuesType) => {
      const newTodolists  = todolists.map((todolist) => todolist.id === idTodolist ? {...todolist, filter:filterValue} : todolist )
      setTodolists(newTodolists)
     }

     const changeTaskStatus = (idTask: string, taskStatus: boolean) => {
      // const  task = tasks.find((task) => task.id === idTask)
      // if (task) {
      //   task.isDone = taskStatus
      // }
      // setTasks([...tasks])
     
      const newState = tasks.map((task) => task.id === idTask ? {...task, isDone:taskStatus} : task )
      setTasks(newState)
     }

    return (
        <div className="App">
          {todolists.map((todolist)=> {
            let tasksForTodolist = tasks

            if (todolist.filter === 'active') {
              tasksForTodolist = tasks.filter(tasks => !tasks.isDone)
            }
      
            if (todolist.filter === 'completed') {
              tasksForTodolist = tasks.filter(tasks => tasks.isDone)
            }
           return <Todolist
                  key={todolist.id}
                  todolistId={todolist.id}
                  title={todolist.title}
                  tasks = {tasksForTodolist} 
                  removeTask={removeTask} 
                  changeFilter ={changeFilter}
                  addTask = {addTask}
                  changeTaskStatus = {changeTaskStatus}
                  filter={todolist.filter}
/>    
          })}
           
        </div>
    );
}

export default App;
