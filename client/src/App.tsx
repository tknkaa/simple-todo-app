import { useEffect, useState } from "react";
import "./App.css";

type ToDo = {
  id: number;
  title: string;
};

function App() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [toDos, setToDos] = useState<ToDo[]>([]);
  const [input, setInput] = useState<string>("");
  useEffect(() => {
    const fetchTodos = async () => {
      const res = await fetch(`${apiUrl}`, {
        headers: { "Content-Type": "application/json" },
        mode: "cors",
      });
      const fetchedToDos = await res.json();
      setToDos(fetchedToDos);
    };
    fetchTodos();
  }, []);
  const handleSubmit = async () => {
    const res = await fetch(`${apiUrl}create`, {
      method: "post",
      body: JSON.stringify({ title: input }),
      headers: { "Content-Type": "application/json" },
      mode: "cors",
    });
    const newTodo = await res.json();
    setToDos((prev) => [...prev, newTodo]);
    setInput("");
  };

  const handleDelete = async (id: number) => {
    setToDos((prev) => prev.filter((todo) => todo.id != id));
    await fetch(`${apiUrl}delete/${id}`, {
      method: "DELETE",
      mode: "cors",
    });
  };

  return (
    <>
      <ul>
        {toDos.map((todo) => {
          return (
            <>
              <li key={todo.id}>{todo.title}</li>
              <button onClick={() => handleDelete(todo.id)}>削除</button>
            </>
          );
        })}
      </ul>
      <input
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      <button onClick={handleSubmit}>追加</button>
    </>
  );
}

export default App;
