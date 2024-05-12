import React, { useState, useEffect } from 'react';
import {
  Button,
  CircularProgress,
  Typography,
  Container,
  Autocomplete,
  FormControl,
  TextField,
} from '@mui/material';
import { Done, Clear } from '@mui/icons-material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

import './App.css';
import Title from './Title';

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState(false);
  const [loadingMarkDone, setLoadingMarkDone] = useState(false);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const usersData = await response.json();
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchTasks = async (userId) => {
      setLoadingTasks(true);
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/todos`);
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }
        const tasksData = await response.json();
        const sortedTasks = tasksData.sort((a, b) => (a.completed === b.completed ? 0 : a.completed ? 1 : -1));
        setTasks(sortedTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setLoadingTasks(false);
      }
    };
  
    fetchTasks(selectedUser && selectedUser.id) 
  }, [selectedUser]);

  const handleUserChange = async (event, newValue) => {
    setSelectedUser(newValue);
  };


  const markTaskAsDone = async (taskId) => {
    setLoadingMarkDone(prevState => ({
      ...prevState,
      [taskId]: true 
    }));
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${taskId}`, {
        method: 'PATCH',
        body: JSON.stringify({ completed: true }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Failed to mark task as done');
      }
      const updatedTasks = tasks.map(task => {
        if (task.id === taskId) {
          return { ...task, completed: true };
        }
        return task;
      }).sort((a, b) => (a.completed === b.completed ? 0 : a.completed ? 1 : -1));
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error marking task as done:', error);
    } finally {
      setLoadingMarkDone(prevState => ({
        ...prevState,
        [taskId]: false 
      }));
    }
  };

  const totalTasks = tasks.length;
  const doneTasks = tasks.filter(task => task.completed).length;

  return (
    <Container>
      <div>
        <Title title = "User"></Title>
        <FormControl fullWidth>
          <Autocomplete
              options={users}
              getOptionLabel={(option) => option.name}
              value={selectedUser}
              onChange={handleUserChange}
              renderInput={(params) => (
                  <TextField
                  {...params}
                  label="Select user" />
              )}
          />
        </FormControl>
      </div>

      <div>
        <Title title = "Task"></Title>
        <Divider className="MuiDivider-root" />
        <div className='task-list-container'>
          {loadingTasks && <CircularProgress />}
          {tasks.map(task => (
            <React.Fragment key={task.id}>
              <ListItem>
                <ListItemText>
                  <Typography>
                    {task.completed ? <Done color="success" /> : <Clear color="error" />} {task.title}
                  </Typography>
                </ListItemText>
                {!task.completed && (
                  <List>
                    <Button
                      className="mark-done-button"
                      variant="contained"
                      disabled={loadingMarkDone[task.id] || loadingTasks}
                      onClick={() => markTaskAsDone(task.id)}
                    >
                      {loadingMarkDone[task.id] ? <CircularProgress size={12} /> : 'Mark Done'}
                    </Button>
                  </List>
                )}
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </div>
        <Typography>Done {doneTasks}/{totalTasks} tasks</Typography>   
      </div>
      
    </Container>
  );
}

export default App;



