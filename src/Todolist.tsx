import React from 'react';
import { FilterValuesType, TaskType } from './App';
import { Button } from './Button';

export type TodolistType = {
title : string,
tasks: TaskType[],
removeTask: (taskId: number)=> void,
changeFilter: (filterValue: FilterValuesType) => void
}
export const Todolist = ({title, tasks, removeTask, changeFilter}: TodolistType) => {
    return (
        <div>
            <div>
                <h3>{title}</h3>
                    <div>
                        <Button title={'+'}/>
                        <input/>
                    </div>
                    {tasks.length === 0 ? (<p>Тасок нет</p>)
                        :
                        ( <ul>
                            {tasks.map((task) => {
                                return (
                                <li key={task.id}>
                                     <input type="checkbox" checked={task.isDone}/>
                                <span>{task.title}</span>
                                <Button title='x' onClick={()=>removeTask(task.id)} />
                            </li>
                         )}) }
                            </ul>
                )}
                   
                <div>
                    <Button title={'All'} onClick={() => changeFilter('all')}/>
                    <Button title={'Active'} onClick={() => changeFilter('active')} />
                    <Button title={'Completed'} onClick={() => changeFilter('completed')}/>   
                </div>
               
            </div>
        </div>
    );
}

export default Todolist;
