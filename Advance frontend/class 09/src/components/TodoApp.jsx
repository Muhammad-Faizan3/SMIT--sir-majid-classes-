import { useEffect, useState } from 'react'
import './TodoApp.css'

const TodoApp = () => {
  let [todos, setTodos] = useState(() => {
    let saved = localStorage.getItem('todos')
    return saved ? JSON.parse(saved) : []
  })
  let [input, setInput] = useState('')
  let [editId, setEditId] = useState(null)
  let [editText, setEditText] = useState('')
  let [filter, setFilter] = useState('all')

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  let addTodo = () => {
    let text = input.trim()
    if (text === '') return
    setTodos([...todos, { id: Date.now(), text: text, completed: false }])
    setInput('')
  }

  let deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  let toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  let startEdit = (todo) => {
    setEditId(todo.id)
    setEditText(todo.text)
  }

  let saveEdit = () => {
    let text = editText.trim()
    if (text === '') return
    setTodos(
      todos.map((todo) => (todo.id === editId ? { ...todo, text: text } : todo))
    )
    setEditId(null)
    setEditText('')
  }

  let cancelEdit = () => {
    setEditId(null)
    setEditText('')
  }

  let clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed))
  }

  let filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  let activeCount = todos.filter((todo) => !todo.completed).length
  let completedCount = todos.length - activeCount
  let percent = todos.length === 0 ? 0 : Math.round((completedCount / todos.length) * 100)

  return (
    <div className="todo-wrap">
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      <div className="todo-card">
        <header className="todo-head">
          <span className="badge">
            <i className="badge-dot" />
            AI Assistant
          </span>
          <h1>Todo Application</h1>
          <p>Add, edit, complete and delete your tasks</p>
        </header>

        <form
          className="todo-form"
          onSubmit={(e) => {
            e.preventDefault()
            addTodo()
          }}
        >
          <input
            className="todo-input"
            type="text"
            placeholder="What needs to be done?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="btn btn-add" type="submit">
            + Add
          </button>
        </form>

        <div className="progress-wrap">
          <div className="progress-meta">
            <span>Progress</span>
            <span>
              <b>{percent}%</b> complete
            </span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${percent}%` }} />
          </div>
        </div>

        <div className="todo-stats">
          <div className="stat">
            Total<b>{todos.length}</b>
          </div>
          <div className="stat stat-active">
            Active<b>{activeCount}</b>
          </div>
          <div className="stat stat-done">
            Done<b>{completedCount}</b>
          </div>
        </div>

        <div className="todo-filters">
          {['all', 'active', 'completed'].map((name) => (
            <button
              key={name}
              type="button"
              className={filter === name ? 'chip chip-on' : 'chip'}
              onClick={() => setFilter(name)}
            >
              {name}
            </button>
          ))}
          <button
            type="button"
            className="chip chip-clear"
            onClick={clearCompleted}
            disabled={completedCount === 0}
          >
            Clear Done
          </button>
        </div>

        <ul className="todo-list">
          {filteredTodos.map((todo) => (
            <li
              key={todo.id}
              className={todo.completed ? 'item item-done' : 'item'}
            >
              {editId === todo.id ? (
                <div className="edit-row">
                  <input
                    className="edit-input"
                    type="text"
                    value={editText}
                    autoFocus
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') saveEdit()
                      if (e.key === 'Escape') cancelEdit()
                    }}
                  />
                  <button className="btn btn-save" type="button" onClick={saveEdit}>
                    Save
                  </button>
                  <button
                    className="btn btn-cancel"
                    type="button"
                    onClick={cancelEdit}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="item-row">
                  <input
                    className="check"
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                  />
                  <span className="item-text" onDoubleClick={() => startEdit(todo)}>
                    {todo.text}
                  </span>
                  <button
                    className="icon-btn"
                    type="button"
                    onClick={() => startEdit(todo)}
                  >
                    Edit
                  </button>
                  <button
                    className="icon-btn icon-del"
                    type="button"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>

        {filteredTodos.length === 0 && (
          <p className="empty">
            <span>✦</span>
            No todos yet. Add one from the input above.
          </p>
        )}

        <p className="hint">
          Press <kbd>Enter</kbd> to add or save &nbsp;·&nbsp; <kbd>Esc</kbd> to
          cancel &nbsp;·&nbsp; Double-click text to edit
        </p>
      </div>
    </div>
  )
}

export default TodoApp
