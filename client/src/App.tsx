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
  const [editToDo, setEditToDo] = useState<ToDo | null>(null);
  const [editInput, setEditInput] = useState<string>("");

  useEffect(() => {
    const fetchTodos = async () => {
      const res = await fetch(`${apiUrl}/todo`, {
        headers: { "Content-Type": "application/json" },
        mode: "cors",
      });
      const fetchedToDos = await res.json();
      setToDos(fetchedToDos);
    };
    fetchTodos();
  }, []);
  const handleSubmit = async () => {
    try {
      const res = await fetch(`${apiUrl}/todo`, {
        method: "post",
        body: JSON.stringify({ title: input }),
        headers: { "Content-Type": "application/json" },
        mode: "cors",
      });
      if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
      }
      const newTodo = await res.json();
      setToDos((prev) => [...prev, newTodo]);
      setInput("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: number) => {
    setToDos((prev) => prev.filter((todo) => todo.id != id));
    console.log(`deleted ID: ${id}`);
    await fetch(`${apiUrl}/todo/${id}`, {
      method: "DELETE",
      mode: "cors",
    });
  };

  const handleEdit = async (id: number, title: string) => {
    await fetch(`${apiUrl}/todo/${id}`, {
      method: "PUT",
      mode: "cors",
      body: JSON.stringify({ title }),
      headers: { "Content-Type": "application/json" },
    });

    setToDos([
      ...toDos.map((todo) =>
        todo.id !== id ? todo : { id: id, title: title },
      ),
    ]);
  };

  return (
    <>
      <ul>
        {toDos.map((todo) => {
          return (
            <>
              <li key={todo.id}>
                {todo === editToDo ? (
                  <>
                    <input
                      value={editInput}
                      onChange={(e) => setEditInput(e.target.value)}
                    />
                    <button onClick={() => handleEdit(todo.id, editInput)}>
                      更新
                    </button>
                    <button onClick={() => setEditToDo(null)}>
                      キャンセル
                    </button>
                  </>
                ) : (
                  <>
                    <span>{todo.title}</span>
                    <button onClick={() => handleDelete(todo.id)}>削除</button>
                    <button
                      onClick={() => {
                        setEditToDo(todo), setEditInput(todo.title);
                      }}
                    >
                      編集
                    </button>
                  </>
                )}
              </li>
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
