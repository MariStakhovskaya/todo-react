import { Button } from './Button'
import { ChangeEvent, KeyboardEvent, useState } from 'react'

type AddItemFormType = { 
    addItem: (taskTitle: string,) => void, 
}

export const AddItemForm = ({ addItem }:AddItemFormType ) => {

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
        setError(null)
        if (event.key === 'Enter') {
          addItemHandler()
        }
      }
     

    return (
        <div>
                        <input value={title} className={error ? 'error' : ''} 
                         onChange={(e) => changeItemHandler(e)}
                         onKeyUp={e =>addItemOnKeyUpHandler(e)} />
                        <Button title={'+'} onClick={addItemHandler}/>
                        {error && <div className={'error-message'}>{error}</div>}
                    </div>
    )
}