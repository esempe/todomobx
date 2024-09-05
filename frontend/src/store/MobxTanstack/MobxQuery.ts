import {
	QueryObserver,
	QueryObserverOptions,
	QueryClient,
	DefaultError,
	QueryKey,
} from "@tanstack/query-core";
import { action, computed, createAtom, makeObservable, reaction } from "mobx";

export class MobxQuery<
	TQueryFnData = unknown,
	TError = DefaultError,
	TData = TQueryFnData,
	TQueryData = TQueryFnData,
	TQueryKey extends QueryKey = QueryKey
> {
	private atom = createAtom(
		"MobX Query",
		() => this.startTracking(),
		() => this.stopTracking()
	);

	private queryObserver = new QueryObserver(
		this.queryClient,
		this.defaultQueryOptions
	);

	constructor(
		private getOptions: () => QueryObserverOptions<
			TQueryFnData,
			TError,
			TData,
			TQueryData,
			TQueryKey
		>,
		private queryClient: QueryClient
	) {
		makeObservable(this, { data: computed, refetch: action });
	}

	refetch() {
		return this.queryObserver.refetch();
	}

	fetch() {
		return this.queryClient.fetchQuery(this.defaultQueryOptions);
	}

	get data(): TData {
		const data = this.result.data;
		if (!data) {
			throw this.queryObserver.fetchOptimistic(this.defaultQueryOptions);
		}
		return data;
	}

	get result() {
		debugger;
		this.atom.reportObserved();
		return this.queryObserver.getOptimisticResult(this.defaultQueryOptions);
	}

	private unsubscribe = () => {};

	startTracking() {
		this.unsubscribe = this.queryObserver.subscribe(() => {
			console.log("subscribed");
			this.atom.reportChanged();
		});
	}
	stopTracking() {
		this.unsubscribe();
	}

	private get defaultQueryOptions() {
		return this.queryClient.defaultQueryOptions(this.getOptions());
	}
}
