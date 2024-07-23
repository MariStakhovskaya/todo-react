import { useCallback} from 'react';
import { filterButtonsContainerSx } from './Todolist.styles'
import { FilterValuesType, TaskType } from './App';
import Button from '@mui/material/Button'
import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import React from 'react';
import { Task } from './Task';

export type TodolistType = {
title : string,
tasks: TaskType[],
removeTask: (todolistId: string, taskId: string)=> void,
removeTodolist: (todolistId: string)=> void,
changeFilter: (todolistId:string, filterValue: FilterValuesType) => void,
addTask: (todolistId:string, title: string) => void,
changeTaskStatus: (todolistId:string, idTask: string, value: boolean) => void,
filter: FilterValuesType,
todolistId: string,
updateTask: (todolistId:string, taskId: string, title: string) => void
updateTodolistTitle: (todolistId:string, title: string ) => void
}

export const Todolist = React.memo(
    ({title, tasks, removeTask,removeTodolist, updateTodolistTitle, changeFilter, addTask,changeTaskStatus, updateTask, filter, todolistId}: TodolistType) => {
        console.log("Todolist called") 
            const changeFilterTasksHandler = (filter: FilterValuesType) => {
                changeFilter(todolistId, filter)
              }
    
             const removeTodolistHandler = () => {
                removeTodolist(todolistId)
             }
    
             const addTaskCallback =useCallback((title: string) => {
                addTask( todolistId, title)
             }, [addTask,todolistId]) 
    
            const changeTodoTitleHandler = (title: string) => {
                updateTodolistTitle(todolistId, title)
            }
            let tasksForTodolist = tasks
            if (filter === 'active') {
                tasksForTodolist = tasks.filter(tasks => !tasks.isDone)
              }

              if (filter === 'completed') {
                tasksForTodolist = tasks.filter(tasks => tasks.isDone)
              }
        return (
            <div>
                <div>
                <div className={'todolist-title-container'}>
            <h3><EditableSpan value={title} onChange={changeTodoTitleHandler} /></h3>
            <IconButton onClick={removeTodolistHandler}>
              <DeleteIcon />
            </IconButton>
          </div>
                        <AddItemForm addItem={addTaskCallback}/>
                        {tasksForTodolist.length === 0 ? (<p>Тасок нет</p>)
                            :
                            (  <List>
                                {tasksForTodolist.map((task) => {
    
                                    return (<Task 
                                        task={task}
                                        todolistId={todolistId}
                                        key={task.id}
                                        changeTaskStatus={changeTaskStatus}
                                        changeTaskTitle={updateTask}
                                        removeTask={removeTask}
                                         />
                            
                             )}) }
                                </List>
                    )}
                       
                    <div>
                    <Box sx={filterButtonsContainerSx}>
                    <Button
                     variant={filter === 'all' ? 'outlined' : 'text'}
                     color={'inherit'}
                     onClick={() => changeFilterTasksHandler('all')}
                    >
                     All
                    </Button>
                    <Button
                         variant={filter === 'active' ? 'outlined' : 'text'}
                         color={'primary'}
                          onClick={() => changeFilterTasksHandler('active')}
                         >
                      Active
                    </Button>
                    <Button
                        variant={filter === 'completed' ? 'outlined' : 'text'}
                        color={'secondary'}
                        onClick={() => changeFilterTasksHandler('completed')}
                    >
                        Completed
                    </Button>
                    </Box>
                    </div>
                   
                </div>
            </div>
        );
    }
)