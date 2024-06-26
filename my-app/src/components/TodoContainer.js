import { useEffect, useState } from "react";
import PropTypes from 'prop-types';

const AddTodoForm = ({ addTodo }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const title = e.target.elements.title.value.trim();
    if (title) {
      addTodo(title);
      e.target.elements.title.value = '';
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" placeholder="Enter new todo" />
      <button type="submit">Add Todo</button>
    </form>
  );
};

AddTodoForm.propTypes = {
  addTodo: PropTypes.func.isRequired,
};

const TodoList = ({ todoList, removeTodo }) => (
  <ul>
    {todoList.map(todo => (
      <li key={todo.id}>
        {todo.title}
        <button onClick={() => removeTodo(todo.id)}>Remove</button>
      </li>
    ))}
  </ul>
);

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
  removeTodo: PropTypes.func.isRequired,
};

const TodoContainer = ({ tableName }) => {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const dataFetch = async () => {
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer patnzp39me3fiKE1T.04efea600227fdd40de5b5246b29a0a1d9ffb27f2f42211aba6a8ee8c518aad2`
        }
      };

      const url = `https://api.airtable.com/v0/appMHcdE4mK1KyPJz/Default?view=Grid%20view&sort[0][field]=Title&sort[0][direction]=asc`;

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();

        data.records.sort((objectA, objectB) => {
          const titleA = objectA.fields.Title.toUpperCase();
          const titleB = objectB.fields.Title.toUpperCase();

          if (titleA < titleB) {
            return 1;
          }
          if (titleA > titleB) {
            return -1;
          }
          return 0;
        });

        const todos = data.records.map(record => ({
          id: record.id,
          title: record.fields.Title
        }));

        setTodoList(todos);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error.message);
        setIsLoading(false);
      }
    };
    dataFetch();
  }, []);

  const addTodo = async (title) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer patnzp39me3fiKE1T.04efea600227fdd40de5b5246b29a0a1d9ffb27f2f42211aba6a8ee8c518aad2`
      },
      body: JSON.stringify({
        fields: {
          Title: title
        }
      })
    };

    const url = `https://api.airtable.com/v0/appMHcdE4mK1KyPJz/Default`;

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const newTodo = await response.json();

      const newTodoItem = {
        id: newTodo.id,
        title: newTodo.fields.Title
      };

      const updatedTodoList = [...todoList, newTodoItem];

      updatedTodoList.sort((objectA, objectB) => {
        const titleA = objectA.title.toUpperCase();
        const titleB = objectB.title.toUpperCase();

        if (titleA < titleB) {
          return 1;
        }
        if (titleA > titleB) {
          return -1;
        }
        return 0;
      });

      setTodoList(updatedTodoList);
    } catch (error) {
      console.error('Error adding todo:', error.message);
    }
  };

  const removeTodo = async (id) => {
    const options = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer patnzp39me3fiKE1T.04efea600227fdd40de5b5246b29a0a1d9ffb27f2f42211aba6a8ee8c518aad2`
      }
    };

    const url = `https://api.airtable.com/v0/appMHcdE4mK1KyPJz/Default/${id}`;

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const updatedTodoList = todoList.filter(todo => todo.id !== id);
      setTodoList(updatedTodoList);
    } catch (error) {
      console.error('Error removing todo:', error.message);
    }
  };

  return (
    <div>
      <h1>{tableName}</h1>
      <AddTodoForm addTodo={addTodo} />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <TodoList todoList={todoList} removeTodo={removeTodo} />
      )}
    </div>
  );
};

TodoContainer.propTypes = {
  tableName: PropTypes.string.isRequired,
};

export default TodoContainer;
