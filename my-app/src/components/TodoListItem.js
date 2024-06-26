import React from "react";
import PropTypes from "prop-types";

const TodoListItem = ({ todo, onRemoveTodo }) => (
  <li>
    {todo.title}
    <button onClick={() => onRemoveTodo(todo.id)}>Remove</button>
  </li>
);

TodoListItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
};

export default TodoListItem;
