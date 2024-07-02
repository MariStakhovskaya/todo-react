import { ChangeEvent} from 'react';
import { FilterValuesType, TaskType } from './App';
import { Button } from './Button';
import { AddItemForm } from './AddItemForm';

export type TodolistType = {
title : string,
tasks: TaskType[],
removeTask: (todolistId: string, taskId: string)=> void,
removeTodolist: (todolistId: string)=> void,
changeFilter: (todolistId:string, filterValue: FilterValuesType) => void,
addTask: (todolistId:string, title: string) => void,
changeTaskStatus: (todolistId:string, idTask: string, value: boolean) => void,
filter: FilterValuesType,
todolistId: string
}

export const Todolist = ({title, tasks, removeTask,removeTodolist, changeFilter, addTask,changeTaskStatus, filter, todolistId}: TodolistType) => {

        const changeFilterTasksHandler = (filter: FilterValuesType) => {
            changeFilter(todolistId, filter)
          }

         const removeTodolistHandler = () => {
            removeTodolist(todolistId)
         }

         const addTaskCallback = (title: string) => {
            addTask( todolistId, title)
         }


    return (
        <div>
            <div>
            <div className={'todolist-title-container'}>
        <h3>{title}</h3>
        <Button title={'x'} onClick={removeTodolistHandler} />
      </div>
                    <AddItemForm addItem={addTaskCallback}/>
                    {tasks.length === 0 ? (<p>Тасок нет</p>)
                        :
                        ( <ul>
                            {tasks.map((task) => {
                                const removeTaskHandler  = () => {
                                    removeTask(todolistId,task.id)  
                                }

                                const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                    const newStatusValue = e.currentTarget.checked
                                    changeTaskStatus(todolistId, task.id, newStatusValue)
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