import { ChangeEvent} from 'react';
import { filterButtonsContainerSx, getListItemSx } from './Todolist.styles'
import { FilterValuesType, TaskType } from './App';
import Button from '@mui/material/Button'
import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem'
import Box from '@mui/material/Box';

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

export const Todolist = ({title, tasks, removeTask,removeTodolist, updateTodolistTitle, changeFilter, addTask,changeTaskStatus, updateTask, filter, todolistId}: TodolistType) => {

        const changeFilterTasksHandler = (filter: FilterValuesType) => {
            changeFilter(todolistId, filter)
          }

         const removeTodolistHandler = () => {
            removeTodolist(todolistId)
         }

         const addTaskCallback = (title: string) => {
            addTask( todolistId, title)
         }

        const changeTodoTitleHandler = (title: string) => {
            updateTodolistTitle(todolistId, title)
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
                    {tasks.length === 0 ? (<p>Тасок нет</p>)
                        :
                        (  <List>
                            {tasks.map((task) => {

                                const changeTaskTitleHandler = (title: string) => {
                                  updateTask(todolistId, task.id, title)
                                 }
                                const removeTaskHandler  = () => {
                                    removeTask(todolistId,task.id)  
                                }

                                const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                    const newStatusValue = e.currentTarget.checked
                                    changeTaskStatus(todolistId, task.id, newStatusValue)
                                  }

                                return (
                                    <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
                                    <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler}/>
                                     <EditableSpan value={task.title} onChange = {changeTaskTitleHandler}/>
                                     <IconButton onClick={removeTaskHandler}>
                                        <DeleteIcon />
                                    </IconButton>
                            </ListItem>
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