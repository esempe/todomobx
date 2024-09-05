export class Api {
	baseUrl: string = "http://localhost:4000";
	async getTodos() {
		try {
			const response = await fetch(
				`https://jsonplaceholder.typicode.com/todos`
			);
			const data = await response.json();
			return data;
		} catch (error) {
			console.error(error);
		}
	}
}
