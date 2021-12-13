import React, { useContext } from "react";
import {TodosContext} from "@/components/contexts/GlobalProvider";

const Todos = () => {
  const { todos, addTodo } = useContext(TodosContext);

  return (
    <div>
      <div>
        {todos}
      </div>
      <button onClick={() => addTodo(1)}>add value</button>
    </div>
  );
};

export default Todos;
