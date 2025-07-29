import React from 'react'
import { ListGroup, ListGroupItem, Input, Button } from 'reactstrap'
import { FaCheck } from 'react-icons/fa'

const Todo = ({
  todos,
  completedFlag,
  deleteTodo,
  addExtraContent,
  editingId,
  extraInput,
  setExtraInput,
  saveExtraContent,
  onTodoClick // receive handler
}) => {
  return (
    <ListGroup className='m-5 mb-2 items'>
      {todos.map((todo) => (
        <ListGroupItem
          key={todo.id}
          style={{ cursor: 'pointer' }}
          onClick={e => {
            // Prevent modal when clicking action buttons
            if (
              e.target.tagName === 'BUTTON' ||
              e.target.tagName === 'SPAN' ||
              e.target.closest('.action-btn')
            ) return;
            onTodoClick && onTodoClick(todo);
          }}
        >
          {todo.todoVal}
          {todo.extra && (
            <div style={{ fontSize: '0.9em', color: '#555', marginTop: '4px' }}>
              Extra: {todo.extra}
            </div>
          )}
          {editingId === todo.id ? (
            <span style={{ marginLeft: '10px' }}>
              <Input
                type="text"
                value={extraInput}
                onChange={e => setExtraInput(e.target.value)}
                placeholder="Enter extra content"
                style={{ display: 'inline', width: 'auto', marginRight: '5px' }}
              />
              <Button color="success" size="sm" onClick={() => saveExtraContent(todo.id)}>
                Save
              </Button>
            </span>
          ) : (
            <span
              className='float-end action-btn'
              style={{ marginLeft: '10px', color: 'green', fontWeight: 'bold', cursor: 'pointer' }}
              onClick={() => addExtraContent(todo.id)}
              title="Add extra content"
            >
              +
            </span>
          )}
          <span
            className='float-end action-btn'
            style={{ marginLeft: '10px', color: 'red', fontWeight: 'bold', cursor: 'pointer' }}
            onClick={() => deleteTodo(todo.id)}
            title="Delete"
          >
            ×
          </span>
          <span
            className='float-end action-btn'
            style={{ cursor: 'pointer' }}
            onClick={() => completedFlag(todo.id)}
            title="Mark as completed"
          >
            <FaCheck />
          </span>
        </ListGroupItem>
      ))}
    </ListGroup>
  )
}

export default Todo