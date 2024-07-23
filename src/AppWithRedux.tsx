import { useCallback, useReducer, useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import type { AppRootStateType } from './state/store'

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

function AppWithRedux() {
  const [themeMode, setThemeMode] = useState<ThemeMode>('light')

  const theme = createTheme({
    palette: {
      mode: themeMode === 'light' ? 'light' : 'dark',
      primary: {
        main: '#087EA4',
      },
    },
  })



const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
const dispatch = useDispatch()

     const removeTask = useCallback((todolistId: string, taskId: string) => {
        dispatch(removeTaskAC(taskId,todolistId))
       }, [])

     const addTask = useCallback((todolistId: string, title: string) => {
      dispatch(addTaskAC(title, todolistId))
        },[])


     const changeFilter =useCallback((idTodolist: string, filterValue: FilterValuesType) => {
      dispatch(changeFilterTodolistAC(idTodolist, filterValue))
     },[])

     const changeTaskStatus = useCallback((todolistId: string, idTask: string, taskStatus: boolean) => {
      dispatch(changeTaskStatusAC(idTask,taskStatus,todolistId))
     },[])

     const removeTodolist = useCallback((todolistId: string) => {
      dispatch(removeTodolistAC(todolistId))
    },[])

    const addTodolist = useCallback((title: string) => {
      const action = addTodolistAC(title)
      dispatch(action)
      
    }, [])

    const updateTask = useCallback((todolistId: string, taskId: string,title: string) => {
      const action = changeTaskTitleAC(taskId, title, todolistId)
      dispatch(action)
    } ,[])

    const updateTodolistTitle = useCallback((todolistId: string, title: string) => {
      const action = changeTitleTodolistAC(todolistId, title)
      dispatch(action)
     },[])

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
export default AppWithRedux;

function AppRootStateType(state: unknown): unknown {
    throw new Error('Function not implemented.');
}
