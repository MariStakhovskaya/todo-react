import { ChangeEvent, KeyboardEvent, useState } from 'react'
import TextField from '@mui/material/TextField'
import AddBoxIcon from '@mui/icons-material/AddBox'
import IconButton from '@mui/material/IconButton'
import React from 'react'

type AddItemFormType = { 
    addItem: (taskTitle: string,) => void, 
}

export const AddItemForm =React.memo(({ addItem }:AddItemFormType ) => {
  console.log('Add item ')
      const [title, setTitle] = useState('')
      const [error, setError] = useState<string | null>(null)
  
      const addItemHandler = () => {
          if (title.trim() !== '') {
            addItem(title.trim())
            setTitle('')
          } else {
            setError('Title is required')
          }
        }
  
        const changeItemHandler = (event: ChangeEvent<HTMLInputElement>) => {
          setTitle(event.currentTarget.value)
        }
       
        const addItemOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
          if (error !==null) {
            setError(null)
          }
         
          if (event.key === 'Enter') {
            addItemHandler()
          }
        }
       
  
      return (
          <div>
                          
              <TextField
                  error={!!error}
                  helperText={error}
                  id="outlined-basic"
                  label="Enter a title"
                  variant="outlined"
                  value={title}
                  onChange={changeItemHandler}
                  onKeyUp={addItemOnKeyUpHandler}
                  size='small' />
  
  <IconButton onClick={addItemHandler} color={'primary'}>
          <AddBoxIcon />
        </IconButton>
          </div>
      )
  }) 