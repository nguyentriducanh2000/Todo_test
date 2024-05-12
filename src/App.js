import React, { useState, useEffect } from "react";
import {
  Button,
  CircularProgress,
  Typography,
  Container,
  Autocomplete,
  FormControl,
  TextField,
} from "@mui/material";
import { Done, Clear } from "@mui/icons-material";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";

import "./App.css";
import Title from "./Title";

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState(false);
  const [loadingMarkDone, setLoadingMarkDone] = useState(false);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const usersData = await response.json();
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchTasks = async (userId) => {
      setLoadingTasks(true);
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${userId}/todos`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }

        const tasks = await response.json();
        setTasks(tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoadingTasks(false);
      }
    };

    fetchTasks(selectedUser && selectedUser.id);
  }, [selectedUser]);

  const handleUserChange = async (_, newValue) => {
    setSelectedUser(newValue);
  };

  const setLoadingItem = (taskId, loading) => {
    setLoadingMarkDone((prevState) => ({
      ...prevState,
      [taskId]: loading,
    }));
  };

  const markTaskAsDone = async (taskId) => {
    setLoadingItem(taskId, true);

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${taskId}`,
        {
          method: "PATCH",
          body: JSON.stringify({ completed: true }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to mark task as done");
      }
      const updatedTask = await response.json();
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === taskId ? updatedTask : task))
      );
    } catch (error) {
      console.error("Error marking task as done:", error);
    } finally {
      setLoadingItem(taskId, false);
    }
  };

  const todoItemRender = (task, index) => (
    <ListItem key={task.id} className="task-board">
      <ListItemIcon>
        {task.completed ? <Done color="success" /> : <Clear color="error" />}
      </ListItemIcon>
      <ListItemText primary={task.title} />

      {!task.completed && (
        <Button
          className="mark-done-button"
          variant="contained"
          disabled={loadingMarkDone[task.id] || loadingTasks}
          onClick={() => markTaskAsDone(task.id)}
        >
          {loadingMarkDone[task.id] ? (
            <CircularProgress size={20} />
          ) : (
            "Mark done"
          )}
        </Button>
      )}
    </ListItem>
  );
  const sortedTasks = tasks.sort((a, b) =>
    a.completed === b.completed ? 0 : a.completed ? 1 : -1
  );
  const totalTasks = tasks.length;
  const doneTasks = tasks.filter((task) => task.completed).length;

  return (
    <Container className="container">
      <div className="user-componant">
        <Title title="User"></Title>
        <FormControl fullWidth>
          <Autocomplete
            options={users}
            getOptionLabel={(option) => option.name}
            value={selectedUser}
            onChange={handleUserChange}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Select user"
                InputProps={{
                  ...params.InputProps,
                  className: "search-box",
                }}
              />
            )}
          />
        </FormControl>
      </div>
      <div>
        <Title title="Tasks"></Title>
        <List className="task-list-container">
          {loadingTasks ? (
            <CircularProgress />
          ) : sortedTasks.length > 0 ? (
            sortedTasks.map(todoItemRender)
          ) : (
            <div className="no-data-container">
              <Typography className="no-data-text">No data</Typography>
            </div>
          )}
        </List>
        <div className="done-task-text">
          <Typography>
            Done {doneTasks}/{totalTasks} tasks
          </Typography>
        </div>
      </div>
    </Container>
  );
}

export default App;
