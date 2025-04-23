"use client"

import type React from "react"

import { useState } from "react"
import { Check, Pencil, Plus, Trash2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

type Todo = {
  id: number
  text: string
  completed: boolean
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState("")
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editText, setEditText] = useState("")

  // Add a new todo
  const addTodo = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTodo.trim() === "") return

    const newTask: Todo = {
      id: Date.now(),
      text: newTodo,
      completed: false,
    }

    setTodos([...todos, newTask])
    setNewTodo("")
  }

  // Toggle todo completion status
  const toggleComplete = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  // Start editing a todo
  const startEdit = (todo: Todo) => {
    setEditingId(todo.id)
    setEditText(todo.text)
  }

  // Save edited todo
  const saveEdit = () => {
    if (editText.trim() === "") return

    setTodos(todos.map((todo) => (todo.id === editingId ? { ...todo, text: editText } : todo)))
    setEditingId(null)
  }

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null)
  }

  // Delete a todo
  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Full-width header */}
      <header className="w-full bg-slate-100 border-b py-4">
        <div className="container mx-auto">
          <h1 className="text-center text-xl font-bold">My Todo List</h1>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <Card className="w-full max-w-md mx-auto">
            <CardContent className="p-4">
              <form onSubmit={addTodo} className="flex gap-2 mb-4">
                <Input
                  type="text"
                  placeholder="Add a new task..."
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" size="icon">
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Add task</span>
                </Button>
              </form>

              <div className="space-y-2">
                {todos.length === 0 ? (
                  <p className="text-center text-muted-foreground py-4">No tasks yet. Add one above!</p>
                ) : (
                  todos.map((todo) => (
                    <div key={todo.id} className="flex items-center justify-between p-3 border rounded-md">
                      {editingId === todo.id ? (
                        <div className="flex items-center gap-2 flex-1">
                          <Input
                            type="text"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            className="flex-1"
                            autoFocus
                          />
                          <Button size="icon" variant="ghost" onClick={saveEdit}>
                            <Check className="h-4 w-4" />
                            <span className="sr-only">Save</span>
                          </Button>
                          <Button size="icon" variant="ghost" onClick={cancelEdit}>
                            <X className="h-4 w-4" />
                            <span className="sr-only">Cancel</span>
                          </Button>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center gap-2 flex-1">
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => toggleComplete(todo.id)}
                              className={todo.completed ? "text-green-500" : ""}
                            >
                              <Check className="h-4 w-4" />
                              <span className="sr-only">
                                {todo.completed ? "Mark as incomplete" : "Mark as complete"}
                              </span>
                            </Button>
                            <span className={`flex-1 ${todo.completed ? "line-through text-muted-foreground" : ""}`}>
                              {todo.text}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Button size="icon" variant="ghost" onClick={() => startEdit(todo)}>
                              <Pencil className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="text-red-500"
                              onClick={() => deleteTodo(todo.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Full-width footer */}
      <footer className="w-full bg-slate-100 border-t py-4">
        <div className="container mx-auto">
          <p className="text-center text-sm text-muted-foreground">
            {todos.length} task{todos.length !== 1 ? "s" : ""} • {todos.filter((t) => t.completed).length} completed
          </p>
        </div>
      </footer>
    </div>
  )
}
