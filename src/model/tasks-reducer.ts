import { v1 } from "uuid"
import { TasksStateType } from "../App"
import { AddTodolistActionType, RemoveTodolistActionType } from "./todolists-reducer"

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    payload: {
      taskId: string,
      todolistId: string
    }
  }

  export type AddTaskActionType = {
    type: 'ADD-TASK'
    payload: {
      title: string,
      todolistId: string
    }
  }

  export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    payload: {
      taskId: string,
      isDone: boolean,
      todolistId: string
    }
  }

  export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    payload: {
      taskId: string,
      title: string,
      todolistId: string
    }
  }

  type ActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType
  | AddTodolistActionType
  | RemoveTodolistActionType


  const initialState: TasksStateType = {}

export const tasksReducer = (state:TasksStateType  = initialState , action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state};
            const todolistTasks = state[action.payload.todolistId]
            const newTodolistTasks = todolistTasks.filter(t => t.id !== action.payload.taskId)
            stateCopy[action.payload.todolistId] = newTodolistTasks
          return stateCopy
        }
        case 'ADD-TASK': {
            const stateCopy = {...state};
            const newTask =  { id: v1(), title: action.payload.title, isDone: false }
            const todolistTasks = stateCopy[action.payload.todolistId]
            const newTasks = [newTask, ...todolistTasks];
            stateCopy[action.payload.todolistId] = newTasks;
          return stateCopy
        }
        case 'CHANGE-TASK-STATUS': {
            const stateCopy = {...state};
            const todolistTasks = stateCopy[action.payload.todolistId]
            const newTodolistTasks = todolistTasks.map((task) => task.id === action.payload.taskId ? {...task, isDone:action.payload.isDone} : task )
            stateCopy[action.payload.todolistId] = [...newTodolistTasks]
   
          return stateCopy
        }

        case 'CHANGE-TASK-TITLE': {
            const stateCopy = {...state};
            const todolistTasks = stateCopy[action.payload.todolistId]
            const newTodolistTasks = todolistTasks.map((task) => task.id === action.payload.taskId ? {...task, title:action.payload.title} : task )
            stateCopy[action.payload.todolistId] = [...newTodolistTasks]
   
          return stateCopy
        }
        case 'ADD-TODOLIST': {
            const stateCopy = {...state};

            stateCopy[action.payload.todolistId] = [];

            return stateCopy;
        }
       
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state};

            delete stateCopy[action.payload.id] ;

            return stateCopy;
        }
        default:
          return state
      }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return { type: 'REMOVE-TASK', payload: { taskId: taskId, todolistId: todolistId,  } } as const
  }

export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return { type: 'ADD-TASK', payload: { title, todolistId  } } as const
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return { type: 'CHANGE-TASK-STATUS', payload: { taskId, isDone,  todolistId  } } as const
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return { type: 'CHANGE-TASK-TITLE', payload: { taskId, title,  todolistId  } } as const
}



// export const addTodolistAC = ( title: string): AddTodolistACActionType => {
//     return { type: 'ADD-TODOLIST', payload: { title } } as const
// }
