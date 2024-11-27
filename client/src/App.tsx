import { useEffect, useState } from "react";
import "./App.css";

type ToDo = {
  id: number;
  title: string;
};

function App() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [toDos, setToDos] = useState<ToDo[]>([]);
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
  return (
    <>
      <ul>
        {toDos.map((todo) => {
          return <li key={todo.id}>{todo.title}</li>;
        })}
      </ul>
    </>
  );
}

export default App;
