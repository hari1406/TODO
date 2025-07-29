import React, { useState, useEffect } from 'react';
import { Container, Modal, ModalHeader, ModalBody, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import InputForm from './components/InputForm';
import Todo from './components/Todo';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [extraInput, setExtraInput] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

  useEffect(() => {
    const localTodos = localStorage.getItem("todos");
    if (localTodos) {
      setTodos(JSON.parse(localTodos));
    }
  }, []);

  const addTodos = todo => {
    setTodos([...todos, { ...todo, extra: '' }]);
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const completedFlag = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Handler for showing input
  const addExtraContent = (id) => {
    const todo = todos.find(t => t.id === id);
    setEditingId(id);
    setExtraInput(todo?.extra || '');
  };

  // Handler for saving extra content
  const saveExtraContent = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, extra: extraInput } : todo
    ));
    setEditingId(null);
    setExtraInput('');
  };

  // Handler to open modal with todo details
  const handleTodoClick = (todo) => {
    setSelectedTodo(todo);
    setModalOpen(true);
  };

  return (
    <Container type="fluid">
      <h1>My Todo App</h1>
      <InputForm addTodos={addTodos} />
      <Todo
        todos={todos}
        completedFlag={completedFlag}
        deleteTodo={deleteTodo}
        addExtraContent={addExtraContent}
        editingId={editingId}
        extraInput={extraInput}
        setExtraInput={setExtraInput}
        saveExtraContent={saveExtraContent}
        onTodoClick={handleTodoClick}
      />
      <Modal isOpen={modalOpen} toggle={() => setModalOpen(false)}>
        <ModalHeader toggle={() => setModalOpen(false)}>
          Todo Details
        </ModalHeader>
        <ModalBody>
          {selectedTodo && (
            <div>
              <strong>Task:</strong> {selectedTodo.todoVal}
              <br />
              {selectedTodo.extra && (
                <div
                  style={{
                    wordBreak: 'break-word',
                    whiteSpace: 'pre-line',
                    marginTop: '8px'
                  }}
                >
                  <strong>Description:</strong> {selectedTodo.extra}
                </div>
              )}
            </div>
          )}
        </ModalBody>
        <Button color="secondary" onClick={() => setModalOpen(false)}>Close</Button>
      </Modal>
    </Container>
  );
}

export default App;