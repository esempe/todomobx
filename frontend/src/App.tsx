import { TodoStore } from "store/store";
import { observer } from "mobx-react-lite";
import { TodoItem } from "$components/TodoItem";
import { ChangeEvent, useState } from "react";

export const store = new TodoStore();

export const App = observer(() => {
	const [value, setValue] = useState("");

	const todos = store.getAll;

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
				<button onClick={addTodo}>add</button>
			</div>
			<div className="inline-flex flex-col justify-end">
				{todos.map((t) => (
					<TodoItem item={t} />
				))}
			</div>
		</div>
	);
});
