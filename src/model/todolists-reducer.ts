import { FilterValuesType, TodolistType } from '../App'
import { v1 } from 'uuid'

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    payload: {
      id: string
    }
  }

  export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    payload: {
      title: string,
      todolistId: string
    }
  }

  export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    payload: {
      id: string,
      title: string
    }
  }

  export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    payload: {
      id: string,
      filter: FilterValuesType
    }
  }

  type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType



let todolistID1 = v1()
let todolistID2 = v1()

const initialState: TodolistType[] = [
    { id: todolistID1, title: 'What to learn', filter: 'all' },
    { id: todolistID2, title: 'What to buy', filter: 'all' },
  ]

export const todolistsReducer = (state:TodolistType[] = initialState , action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
          return state.filter(tl => tl.id !== action.payload.id)
        }
        case 'ADD-TODOLIST': {
           
      const newTodo:TodolistType ={ id: action.payload.todolistId, title: action.payload.title, filter: 'all' }
          return [...state, newTodo] 
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const newState = state.map((tl) => tl.id === action.payload.id ? {...tl, title: action.payload.title}: tl)
          return newState
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const newState = state.map((tl) => tl.id === action.payload.id ? {...tl, filter: action.payload.filter}: tl)
          return newState
        }
        default:
          throw new Error("I don't understand this type")
      }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return { type: 'REMOVE-TODOLIST', payload: { id: todolistId } } as const
  }

export const addTodolistAC = (title: string): AddTodolistActionType => {
    return { type: 'ADD-TODOLIST', payload: { title, todolistId: v1() } } as const
  }

  export const changeTitleTodolistAC = (todolistId: string, title: string): ChangeTodolistTitleActionType => {
    return { type: 'CHANGE-TODOLIST-TITLE', payload: { id: todolistId, title } } as const
  }
  
  export const changeFilterTodolistAC = (todolistId: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER', payload: { id: todolistId, filter: filter} } as const
  }  