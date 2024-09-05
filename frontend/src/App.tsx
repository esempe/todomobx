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
		<div className="w-full flex flex-col text-2xl">
			<div className="flex flex-col items-center">
				<h1>One Piece</h1>
				<div className="">{todos.length}</div>
			</div>
			<div className=" mb-5 flex gap-2 px-3">
				<input
					className="border-2 p-2"
					type="text"
					onChange={onInputChange}
					value={value}
				/>
				<button
					onClick={addTodo}
					disabled={isLoading}
					className="disabled:opacity-50 px-4 border-2"
				>
					add
				</button>
			</div>
			<div className="flex-col justify-end w-full px-3">
				{todos.map((t) => (
					<TodoItem item={t} />
				))}
			</div>
		</div>
	);
});
