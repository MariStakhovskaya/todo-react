import { useState } from 'react';
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

function App() {
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
  
  let [todolists, setTodolists] =useState<TodolistType[]>( [
    { id: todolistID1, title: 'What to learn', filter: 'all' },
    { id: todolistID2, title: 'What to buy', filter: 'all' },
  ])

    let [tasks, setTasks] =useState<TasksStateType>( {
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
      const todolistTasks = tasks[todolistId]
      const newTodolistTasks = todolistTasks.filter(t => t.id !== taskId)
      tasks[todolistId] = newTodolistTasks
      setTasks({ ...tasks, newTodolistTasks })

      // const newTodolistTasks = {
      //   ...tasks,
      //   [todolistId]: tasks[todolistId].filter(t => t.id !== taskId),
      // }
      // setTasks(newTodolistTasks)
    }

     const addTask = (todolistId: string, title: string) => {
      const newTask =  { id: v1(), title, isDone: false }
      const todolistTasks = tasks[todolistId]
      tasks[todolistId] = [newTask, ...todolistTasks]
      // setTasks({ ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] })
      setTasks({...tasks})
     }
     const changeFilter = (idTodolist: string, filterValue: FilterValuesType) => {
      const newTodolists  = todolists.map((todolist) => todolist.id === idTodolist ? {...todolist, filter:filterValue} : todolist )
      setTodolists(newTodolists)
     }

     const changeTaskStatus = (todolistId: string, idTask: string, taskStatus: boolean) => {
      const todolistTasks = tasks[todolistId]
      const newTodolistTasks = todolistTasks.map((task) => task.id === idTask ? {...task, isDone:taskStatus} : task )
      tasks[todolistId] = newTodolistTasks
      setTasks({ ...tasks })
     }

     const removeTodolist = (todolistId: string) => {
      const newTodolists = todolists.filter(tl => tl.id !== todolistId)
      setTodolists(newTodolists)
      delete tasks[todolistId]
      setTasks({ ...tasks})
    }

    const addTodolist = (title: string) => {
      const todolistId = v1()
      const newTodo:TodolistType ={ id: todolistId, title: title, filter: 'all' }
      setTodolists([newTodo, ...todolists ])
      setTasks({...tasks, [todolistId]: []})
    }

    const updateTask = (todolistId: string, taskId: string,title: string) => {
      const newTodolistTasks = {
        ...tasks,
        [todolistId]: tasks[todolistId].map(t => (t.id === taskId ? { ...t, title } : t)),
      }
      setTasks(newTodolistTasks)
    } 
    const updateTodolistTitle = (todolistId: string, title: string) => {
      const newTodo = todolists.map(t => t.id === todolistId ? {...t, title}: t)
      
      setTodolists(newTodo)
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
export default App;
