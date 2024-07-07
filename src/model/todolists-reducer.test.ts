import { addTodolistAC, changeFilterTodolistAC, changeTitleTodolistAC, removeTodolistAC, todolistsReducer } from './todolists-reducer'
import { v1 } from 'uuid'
import { TodolistType } from '../App'

 
test('correct todolist should be removed', () => {
  let todolistId1 = v1()
  let todolistId2 = v1()
 
  // 1. Стартовый state
  const startState: TodolistType[] = [
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' },
  ]
 
  // 2. Действие
//   const action = {
//     type: 'REMOVE-TODOLIST',
//     payload: {
//       id: todolistId1,
//     } ,
//   } as const
  const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))
 
  // 3. Проверяем, что наши действия (изменения state) соответствуют ожиданию
  // в массиве останется один тудулист
  expect(endState.length).toBe(1)
  // удалится нужный тудулист, а не любой
  expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()
   
    // 1. Стартовый state
    const startState: TodolistType[] = [
      { id: todolistId1, title: 'What to learn', filter: 'all' },
      { id: todolistId2, title: 'What to buy', filter: 'all' },
    ]
   
    // 2. Действие
    const newTitle = 'new TODO'
    const endState = todolistsReducer(startState, addTodolistAC(newTitle))
   
    // 3. Проверяем, что наши действия (изменения state) соответствуют ожиданию
    // в массиве добавится один тудулист
    expect(endState.length).toBe(3)
    // тайтл будет нужный
    expect(endState[2].title).toBe("new TODO")
  })

  test('correct todolist should be change title', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()
   
    // 1. Стартовый state
    const startState: TodolistType[] = [
      { id: todolistId1, title: 'What to learn', filter: 'all' },
      { id: todolistId2, title: 'What to buy', filter: 'all' },
    ]
   
    // 2. Действие
  
    const newTitle = "change TODO" 
    const endState = todolistsReducer(startState, changeTitleTodolistAC(todolistId2,newTitle ))
   
    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTitle)
  })

  test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()
   
   
    const startState: TodolistType[] = [
      { id: todolistId1, title: 'What to learn', filter: 'all' },
      { id: todolistId2, title: 'What to buy', filter: 'all' },
    ]

    const endState = todolistsReducer(startState, changeFilterTodolistAC(todolistId2, "completed"))
   
    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe("completed")
  })