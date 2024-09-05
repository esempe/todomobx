import { store } from "App";
import { observer } from "mobx-react-lite";
import { Todo } from "store/store";

export const TodoItem = ({ item }: { item: Todo }) => {
	const { id, title, completed } = item;
	const toggleCompleted = () => {
		store.toggleCompleted(id);
	};
	const removeTodo = () => {
		store.removeTask(id);
	};
	return (
		<div className="flex w-full">
			<button
				className="flex border-2 gap-2 px-2 py-3 w-full"
				onClick={toggleCompleted}
			>
				{/* {completed ? "[+]" : `${"[ "}${" "} ${" ]"}`} */}
				<div className={`${completed ? "line-through" : ""}`}>
					{title} {completed ? "[+]" : `${"[ "}${" "} ${" ]"}`}
				</div>
			</button>
			<button className="border-2 px-2" onClick={removeTodo}>
				Удалить
			</button>
		</div>
	);
};
