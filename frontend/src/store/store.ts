import { Api } from "api/api";
import { makeAutoObservable, runInAction } from "mobx";
import { MobxQuery } from "./MobxTanstack/MobxQuery";
import { QueryClient } from "@tanstack/react-query";
import { MobxMutation } from "./MobxTanstack/MobxMutation";

export type Todo = {
	id: string;
	title: string;
	completed: boolean;
};

interface addTaskDTO {
	title: string;
}

export class TodoStore {
	queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				refetchInterval: false,
				refetchOnWindowFocus: false,
			},
		},
	});
	isLoading: boolean;

	constructor() {
		makeAutoObservable(this);
		this.fetchTodos();
	}

	todos: Todo[] = [];

	fetchTodos = async () => {
		this.isLoading = true;
		try {
			const fetchedTodos = await this.todosQuery.fetch();
			runInAction(() => {
				this.todos = fetchedTodos;
			});
		} catch (error) {
			runInAction(() => {
				this.isLoading = false;
			});
		}
	};

	todosQuery = new MobxQuery(
		() => ({
			queryKey: ["todos"],
			queryFn: async () => {
				console.log("fetching");
				const res = await fetch("http://localhost:4000/todo");
				this.isLoading = false;
				return res.json() as Promise<any>;
			},
		}),
		this.queryClient
	);

	addTodoMutation = new MobxMutation(
		() => ({
			mutationKey: ["add-todo"],
			mutationFn: async (title: string) => {
				const res = await fetch("http://localhost:4000/todo", {
					method: "POST",
					body: JSON.stringify({ title }),
					headers: { "Content-Type": "application/json" },
				});
				return res.json();
			},
			onSuccess: (res) => {
				this.fetchTodos();
			},
		}),
		this.queryClient
	);

	editTodoMutation = new MobxMutation(
		() => ({
			mutationKey: ["edit-todo"],
			mutationFn: async ({
				id,
				title,
				completed,
			}: {
				id: string;
				title: string;
				completed: boolean;
			}) => {
				const res = await fetch(`http://localhost:4000/todo/${id}`, {
					method: "PATCH",
					body: JSON.stringify({ title, completed }),
					headers: { "Content-Type": "application/json" },
				});
				return res.json();
			},
			onSuccess: (res) => {
				this.fetchTodos();
			},
		}),
		this.queryClient
	);

	removeTodoMutation = new MobxMutation(
		() => ({
			mutationKey: ["edit-todo"],
			mutationFn: async ({ id }: { id: string }) => {
				const res = await fetch(`http://localhost:4000/todo/${id}`, {
					method: "DELETE",
					headers: { "Content-Type": "application/json" },
				});
				return res;
			},
			onSuccess: async (res) => {
				this.fetchTodos();
			},
		}),
		this.queryClient
	);

	addTask({ title }: addTaskDTO) {
		this.addTodoMutation.mutate(title);
	}

	removeTask(id: string) {
		this.removeTodoMutation.mutate({ id });
		// this.todos = this.todos.filter((todo) => todo.id !== id);
	}

	toggleCompleted(id: string) {
		const { title, completed } = this.todos.find((todo) => todo.id === id);
		this.editTodoMutation.mutate({ title, completed: !completed, id });
	}
}
