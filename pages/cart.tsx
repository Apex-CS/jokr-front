import React, { useContext } from "react";

import GlobalProvider,{TodosContext} from "@/components/contexts/GlobalProvider";

const Todos = () => {
  const { todos, addTodo } = useContext(TodosContext);

  return (
    <div>
      <div>
  {/*       {todos.map((todo, i) => (
          <div key={i}>{todo}</div>
        ))} */}
      </div>
      <button onClick={() => addTodo(1)}>add value</button>
    </div>
  );
};

export default Todos;
