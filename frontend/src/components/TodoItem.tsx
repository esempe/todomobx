import { store } from "App";
import { observer } from "mobx-react-lite";
import { Todo } from "store/store";

export const TodoItem = ({ item }: { item: Todo }) => {
	const { id, title, completed } = item;
	const toggleCompleted = () => {
		store.toggleCompleted(id);
	};

	return (
		<button
			className="inline-flex border-2 gap-2 px-2 py-3"
			onClick={toggleCompleted}
		>
			{completed ? "[+]" : `${"[ "}${" "} ${" ]"}`}

			<div className="">{title}</div>
		</button>
	);
};
