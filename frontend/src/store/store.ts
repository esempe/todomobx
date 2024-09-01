import { makeAutoObservable, observable } from "mobx";

export type Todo = {
	id: string;
	title: string;
	completed: boolean;
};

interface addTaskDTO {
	title: string;
}

export class TodoStore {
	constructor() {
		makeAutoObservable(this);
	}

	todos: Todo[] = [{ id: "1", title: "Test", completed: false }];

	addTask({ title }: addTaskDTO) {
		const todo: Todo = {
			id: Math.random().toString(36).substr(2, 9),
			title,
			completed: false,
		};

		this.todos = [todo, ...this.todos];
	}

	removeTodo(id: string) {
		this.todos = this.todos.filter((todo) => todo.id !== id);
	}

	toggleCompleted(id: string) {
		this.todos = this.todos.map((todo) =>
			todo.id === id ? { ...todo, completed: !todo.completed } : todo
		);
	}

	get getAll() {
		return [...this.todos];
	}
}
