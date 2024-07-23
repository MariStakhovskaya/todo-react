import { ChangeEvent, useCallback } from "react"
import Checkbox from '@mui/material/Checkbox';
import ListItem from '@mui/material/ListItem'

import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import { EditableSpan } from "./EditableSpan";
import { getListItemSx } from "./Todolist.styles";

type TaskType = {
task: any,
todolistId:string,
changeTaskStatus: (todolistId:string, taskId: string, value: boolean) => void,
changeTaskTitle: (todolistId:string, taskId: string, title: string) => void,
removeTask: (todolistId:string, taskId: string) => void
}

export const Task = (props:TaskType ) => {


    const changeTaskTitleHandler = (title: string) => {
        props.changeTaskTitle(props.todolistId, props.task.id, title)
       }
      const removeTaskHandler  = () => {
          props.removeTask(props.todolistId,props.task.id)  
      }

      const changeTaskStatusHandler =useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const newStatusValue = e.currentTarget.checked
        props.changeTaskStatus(props.todolistId, props.task.id, newStatusValue)
      },[props.todolistId, props.task.id,props.changeTaskStatus]) 
 
    return <ListItem key={props.task.id} sx={getListItemSx(props.task.isDone)}>
                                        <Checkbox checked={props.task.isDone} onChange={changeTaskStatusHandler}/>
                                         <EditableSpan value={props.task.title} onChange = {changeTaskTitleHandler}/>
                                         <IconButton onClick={removeTaskHandler}>
                                            <DeleteIcon />
                                        </IconButton>
                                </ListItem>
}