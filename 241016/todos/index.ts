import { IdGenerator } from "../lib";

export interface CreatedTodo {
  uuid: string;
  name: string;
  isEdit: boolean;
  isCompleted: boolean;
}

export class Todo {
  private _uuid: string;
  private _name: string;
  private _isEdit: boolean;
  private _isCompleted: boolean;

  private constructor(createdTodo: CreatedTodo) {
    this._uuid = createdTodo.uuid;
    this._name = createdTodo.name;
    this._isEdit = createdTodo.isEdit;
    this._isCompleted = createdTodo.isCompleted;
  }

  public static create(name: string) {
    return new Todo({
      uuid: IdGenerator(),
      name,
      isEdit: false,
      isCompleted: false,
    });
  }

  public static mapper(createdTodo: CreatedTodo) {
    return new Todo(createdTodo);
  }

  public get uuid() {
    return this._uuid;
  }

  public get name() {
    return this._name;
  }

  public get isEdit() {
    return this._isEdit;
  }

  public get isCompleted() {
    return this._isCompleted;
  }

  // NOTE: 수정 활성화
  public enableEdit() {
    this._isEdit = true;
    return this;
  }

  // NOTE: 수정 비활성화
  public disableEdit() {
    this._isEdit = false;
    return this;
  }

  // NOTE: 테스크 완료 표시
  public completeTask() {
    this._isCompleted = true;
    return this;
  }

  // NOTE: 테스크 미완료
  public incompleteTask() {
    this._isCompleted = false;
    return this;
  }

  // NOTE: 이름 변경
  public modifiyName(name: string) {
    this._name = name;
    return this;
  }
}

export class Todos {
  private _todos: Todo[] = [];
  private constructor(todos: Todo[]) {
    this._todos = todos;
  }

  public static mappers(todos: CreatedTodo[] = []) {
    const mapperTodos = todos.map(Todo.mapper);
    return new Todos(mapperTodos);
  }

  // NOTE: 테스크 추가
  public addTodo(name: string) {
    this._todos = [...this._todos, Todo.create(name)];
    return this;
  }

  // NOTE: 테스크 삭제
  public removeTodo(uuid: string) {
    this._todos = this._todos.filter((todo) => todo.uuid !== uuid);
    return this;
  }

  public get todos() {
    return this._todos;
  }
}

/* 
    TODOS 클래스가 Todo 상태의 상태를 관리하는 클래스
    Todo setter Method

  SOLID

  단일책임의 원칙 (확실한 느낌이 아냐)
  개방 폐쇄의 원칙
  리스코프 치환의 원칙
  인터페이스 분리 원칙
  의존성 역전의 원칙

*/
