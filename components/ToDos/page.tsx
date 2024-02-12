"use client"

import React, {ElementRef, useRef, useState} from 'react'
import { useAction } from '@/hooks/use-action';
import { createTodo } from '@/actions/create-todo';
import { useParams, useRouter } from 'next/navigation';
import { useOnClickOutside } from 'usehooks-ts';
import saveToDo from '@/actions/create-todo/page';
import { db } from '@/lib/db';
import dbToDos from '@/actions/create-todo/page';

interface Todo {
  id: number;
  text: string;
}

const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState<string>('');
    
    const [isEditing, setIsEditing] = useState(false)
    const router = useRouter();
    const params = useParams();
    const formRef = useRef<ElementRef<"form">>(null)
    const inputRef = useRef<ElementRef<"input">>(null)
    const enableEditing = () => {
      setIsEditing(true);
      setTimeout(() => {
        inputRef.current?.focus();
      });
    };

    const disableEditing = () => {
      setIsEditing(false);
    };
    const addTodo = () => {
      if (newTodo.trim() !== '') {
        setTodos((prevTodos) => [
          ...prevTodos,
          { id: Date.now(), text: newTodo },
        ]);
        setNewTodo('');
        

      }
    };
  
    const removeTodo = (id: number) => {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    };

    const { execute, fieldErrors } = useAction(createTodo, {
      onSuccess: (data) => {
        disableEditing();
        router.refresh();
      },
      onError: (error) => {
        console.log(error);
      },
    });
    useOnClickOutside(formRef, disableEditing);

    const onSubmit = (formData: FormData) => {
      const title = formData.get("title") as string;
      
      execute({
        title: newTodo
      });
    }
    return (
      <div className="max-w-md mx-auto mt-8">
        <h1 className="text-3xl font-semibold mb-4">Todo List</h1>
        <div className='flex mb-4'>
          <form action={saveToDo}>
            <input
            id='title'
            name='title'
            onChange={(e) => setNewTodo(e.target.value)}
            />
            <button onClick={addTodo} className="bg-green-500 text-white p-2 mt-2">
          Add Note
        </button>
          </form>
        
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={addTodo}
        className='bg-blue-500 text-black p-2 rounded-r'
        
        >Add Todo</button>
         
        
        </div>
        
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}
            className="flex justify-between items-center p-2 border-b"
            >
              {todo.text}

              
              <button onClick={() => removeTodo(todo.id)}
              className="text-red-500"
              >Remove</button>
            </li>
          ))}
        </ul>
        <div className='space-y-4'>
          
        </div>
      </div>
    );
  };
  
  export default TodoList;
