import { TodoStore } from "store/store";
import { observer } from "mobx-react-lite";
import { TodoItem } from "$components/TodoItem";
import { ChangeEvent, useEffect, useState } from "react";
import { Api } from "api/api";

const api = new Api();
export const store = new TodoStore();

export const App = observer(() => {
	const [value, setValue] = useState("");
	const isLoading = store.isLoading;
	const todos = store.todos;

	const addTodo = () => {
		store.addTask({ title: value });
		setValue("");
	};

	const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};

	return (
		<div className="w-full flex flex-col items-center">
			<h1>Mega todo</h1>
			<div className="">{todos.length}</div>
			<div className=" mb-2">
				<input
					className="border-2"
					type="text"
					onChange={onInputChange}
					value={value}
				/>
				<button
					onClick={addTodo}
					disabled={isLoading}
					className="disabled:bg-black"
				>
					add
				</button>
			</div>
			<div className="inline-flex flex-col justify-end">
				{todos.map((t) => (
					<TodoItem item={t} />
				))}
			</div>
		</div>
		// <div className=""></div>
	);
});
