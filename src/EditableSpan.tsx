import TextField from "@mui/material/TextField"
import React from "react"
import { ChangeEvent, useState } from "react"

type EditableSpanType = {
    value: string,
    onChange: (newTitle: string) => void
}

export const EditableSpan = React.memo(({value, onChange}:EditableSpanType ) => {
  console.log('EditableSpan called')
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(value)

    const activateEditModeHandler = () => {
        setEditMode(true)
      }

      const deactivateEditModeHandler = () => {
        setEditMode(false)
        onChange(title)
      }

      const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
      }
    
    return (
    <>
    {editMode ? 
     <TextField
     id="outlined-basic"
     label="Enter a title"
     variant="outlined"
     value={title}
     onChange={changeTitleHandler}
     onBlur={deactivateEditModeHandler}
     autoFocus
     size='small' />
    : <span onDoubleClick={activateEditModeHandler}>{value}</span>}
    
    </>)
})