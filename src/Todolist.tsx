import React, { ChangeEvent, useState, KeyboardEvent } from 'react';
import { FilterValuesType, TaskType } from './App';
import { Button } from './Button';

export type TodolistType = {
title : string,
tasks: TaskType[],
removeTask: (taskId: string)=> void,
changeFilter: (todolistId:string, filterValue: FilterValuesType) => void,
addTask: (title: string) => void,
changeTaskStatus: (idTask: string, value: boolean) => void,
filter: FilterValuesType,
todolistId: string
}

export const Todolist = ({title, tasks, removeTask, changeFilter, addTask,changeTaskStatus, filter, todolistId}: TodolistType) => {
    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addTaskHandler = () => {
        if (taskTitle.trim() !== '') {
            addTask(taskTitle.trim())
            setTaskTitle('')
        } else {
            setError('Title is required')
          }
      }

      const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
      }

      const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
          addTaskHandler()
        }}

        const changeFilterTasksHandler = (filter: FilterValuesType) => {
            changeFilter(todolistId, filter)
          }


    return (
        <div>
            <div>
                <h3>{title}</h3>
                    <div>
                        <input value={taskTitle} className={error ? 'error' : ''} 
                         onChange={(e) => changeTaskTitleHandler(e)}
                         onKeyUp={e =>addTaskOnKeyUpHandler(e)} />
                        <Button title={'+'} onClick={addTaskHandler}/>
                        {error && <div className={'error-message'}>{error}</div>}
                    </div>
                    {tasks.length === 0 ? (<p>Тасок нет</p>)
                        :
                        ( <ul>
                            {tasks.map((task) => {
                                const removeTaskHandler  = () => {
                                    removeTask(task.id)  
                                }

                                const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                    const newStatusValue = e.currentTarget.checked
                                    changeTaskStatus(task.id, newStatusValue)
                                  }

                                return (
                                <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                     <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>
                                <span>{task.title}</span>
                                <Button title='x' onClick={removeTaskHandler} />
                            </li>
                         )}) }
                            </ul>
                )}
                   
                <div>
                    <Button 
                     title={'All'}
                     className={filter === 'all' ? 'active-filter': ''}
                     onClick={() => changeFilterTasksHandler('all')}/>
                    <Button 
                     title={'Active'} 
                     className={filter === 'active' ? 'active-filter': ''} 
                     onClick={() => changeFilterTasksHandler('active')} />
                    <Button
                     title={'Completed'}
                     className={filter === 'completed' ? 'active-filter': ''}
                     onClick={() => changeFilterTasksHandler('completed')}/>   
                </div>
               
            </div>
        </div>
    );
}