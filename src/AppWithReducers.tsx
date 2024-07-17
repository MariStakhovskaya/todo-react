import { useReducer, useState } from 'react';
import './App.css';
import { MenuButton } from './MenuButton'
import Switch from '@mui/material/Switch'
import CssBaseline from '@mui/material/CssBaseline'

import { v1 } from 'uuid'
import { Todolist } from './Todolist';
import { AddItemForm } from './AddItemForm';

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { addTodolistAC, changeFilterTodolistAC, changeTitleTodolistAC, removeTodolistAC, todolistsReducer } from './model/todolists-reducer';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from './model/tasks-reducer';


export type TodolistType = {
  id: string,
  title: string,
  filter: FilterValuesType
}

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

export type TasksStateType = {
  [key: string]: TaskType[]
}

export type FilterValuesType = 'all' | 'active' | 'completed'

type ThemeMode = 'dark' | 'light'

function AppWithReducers() {
  const [themeMode, setThemeMode] = useState<ThemeMode>('light')

  const theme = createTheme({
    palette: {
      mode: themeMode === 'light' ? 'light' : 'dark',
      primary: {
        main: '#087EA4',
      },
    },
  })




  let todolistID1 = v1()
  let todolistID2 = v1()
  
  let [todolists, dispatchTodolists] =useReducer(todolistsReducer, [
    { id: todolistID1, title: 'What to learn', filter: 'all' },
    { id: todolistID2, title: 'What to buy', filter: 'all' },
  ])

    let [tasks, dispatchTasks] =useReducer(tasksReducer, {
      [todolistID1]: [
        { id: v1(), title: 'HTML&CSS', isDone: true },
        { id: v1(), title: 'JS', isDone: true },
        { id: v1(), title: 'ReactJS', isDone: false },
      ],
      [todolistID2]: [
        { id: v1(), title: 'Rest API', isDone: true },
        { id: v1(), title: 'GraphQL', isDone: false },
      ],
    }
     )


     const removeTask = (todolistId: string, taskId: string) => {
    
     const action = removeTaskAC(taskId,todolistId)
     dispatchTasks(action)
    }

     const addTask = (todolistId: string, title: string) => {
      
     const action = addTaskAC(title, todolistId)
     dispatchTasks(action)
     }


     const changeFilter = (idTodolist: string, filterValue: FilterValuesType) => {

      const action = changeFilterTodolistAC(idTodolist, filterValue)
      dispatchTodolists(action)
     }

     const changeTaskStatus = (todolistId: string, idTask: string, taskStatus: boolean) => {

      const action = changeTaskStatusAC(idTask,taskStatus,todolistId)
      dispatchTasks(action)
     }

     const removeTodolist = (todolistId: string) => {
      const action = removeTodolistAC(todolistId)
      dispatchTasks(action)
      dispatchTodolists(action)
    }

    const addTodolist = (title: string) => {
      const action = addTodolistAC(title)
      dispatchTodolists(action)
      dispatchTasks(action)
    }

    const updateTask = (todolistId: string, taskId: string,title: string) => {
      const action = changeTaskTitleAC(taskId, title, todolistId)
      dispatchTasks(action)
    } 

    const updateTodolistTitle = (todolistId: string, title: string) => {
     const action = changeTitleTodolistAC(todolistId, title)
     dispatchTodolists(action)
    }

    const changeModeHandler = () => {
      setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }

    return (
      
      <ThemeProvider theme={theme}>
        <CssBaseline />
           
          <AppBar position="static" sx={{ mb: '30px' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
          <div>
            <MenuButton>Login</MenuButton>
            <MenuButton>Logout</MenuButton>
            <MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
            <Switch color={'default'} onChange={changeModeHandler} />
          </div>
        </Toolbar>
      </AppBar>


      <Container fixed>
        <Grid container sx={{mb: '30px'}}>
          <Grid item xs={12}>
            <Box my={4}>
              <AddItemForm addItem={addTodolist} />
            </Box>
          </Grid>

          <Grid container spacing={3}>
            {todolists.map((todolist) => {
              let tasksForTodolist = tasks[todolist.id]

              if (todolist.filter === 'active') {
                tasksForTodolist = tasks[todolist.id].filter(tasks => !tasks.isDone)
              }

              if (todolist.filter === 'completed') {
                tasksForTodolist = tasks[todolist.id].filter(tasks => tasks.isDone)
              }

              return (
                <Grid item xs={12} md={6} lg={4} key={todolist.id}>
                  <Box my={2}>
                    <Paper elevation={3} sx={{ p: '0 20px 20px 20px' }}>
                      <Box p={2}>
                        <Todolist
                          todolistId={todolist.id}
                          title={todolist.title}
                          tasks={tasksForTodolist}
                          removeTask={removeTask}
                          removeTodolist={removeTodolist}
                          changeFilter={changeFilter}
                          addTask={addTask}
                          updateTask={updateTask}
                          updateTodolistTitle={updateTodolistTitle}
                          changeTaskStatus={changeTaskStatus}
                          filter={todolist.filter}
                        />
                      </Box>
                    </Paper>
                  </Box>
                </Grid>
              )
            })}
          </Grid>
        </Grid>
      </Container>
   
    </ThemeProvider>
    
  );
}
export default AppWithReducers;