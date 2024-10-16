import { Todos } from "./todos";

const todoApp = Todos.mappers([]);
todoApp.addTodo("집 가고 싶다");

for (const todo of todoApp.todos) {
  todo.modifiyName("잠 자고 싶다");
  todoApp.removeTodo(todo.uuid);
}
