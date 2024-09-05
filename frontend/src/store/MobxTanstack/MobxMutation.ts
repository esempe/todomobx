import {
	MutationObserver,
	MutationObserverOptions,
	QueryClient,
	DefaultError,
} from "@tanstack/query-core";
import { createAtom } from "mobx";

export class MobxMutation<
	TData = unknown,
	TError = DefaultError,
	TVariables = void,
	TContext = unknown
> {
	private atom = createAtom(
		"MobX Mutation",
		() => this.startTracking(),
		() => this.stopTracking()
	);

	private mutationObserver = new MutationObserver(
		this.queryClient,
		this.getOptions()
	);

	constructor(
		private getOptions: () => MutationObserverOptions<
			TData,
			TError,
			TVariables,
			TContext
		>,
		private queryClient: QueryClient
	) {}

	result() {
		this.atom.reportObserved();
		return this.mutationObserver.getCurrentResult();
	}

	private unsubscribe = () => {};

	startTracking() {
		this.unsubscribe = this.mutationObserver.subscribe(() => {
			this.atom.reportChanged();
		});
	}

	stopTracking() {
		this.unsubscribe();
	}

	mutate(
		variables: TVariables,
		options?: MutationObserverOptions<TData, TError, TVariables, TContext>
	) {
		return this.mutationObserver.mutate(variables, options);
	}

	reset() {
		this.mutationObserver.reset();
	}
}
