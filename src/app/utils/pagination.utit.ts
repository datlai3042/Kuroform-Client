import { SetStateAction } from "react";

type TProps = {
	max_show_page: number;
	page: number;
	cb: React.Dispatch<SetStateAction<number[]>>;
};

export const renderPageArrayNormal = (props: TProps) => {
	const { page, max_show_page, cb } = props;

	let newArrayStart: number[] = [];
	let newArrayEnd: number[] = [];
	newArrayStart = Array(page)
		.fill(page)
		.map((_, i) => {
			const page_prev = page - i;
			return page_prev;
		});
	newArrayEnd = Array(max_show_page - page)
		.fill(page)
		.map((_, i) => {
			const page_next = page + (i + 1);
			return page_next;
		});

	cb([...newArrayStart, ...newArrayEnd].sort((a, b) => a - b));
	return;
};

export const renderPageArrayMiddle = (props: TProps) => {
	const { max_show_page, page, cb } = props;
	let newArrayStart: number[] = [];
	let newArrayEnd: number[] = [];
	const many_loop_start = max_show_page - page;
	const many_loop_end = max_show_page - many_loop_start;
	newArrayStart = Array(4)
		.fill(page)
		.map((_, i, b) => {
			const page_previous = page - (i + 1);
			return page_previous;
		});
	newArrayEnd = Array(6)
		.fill(page)
		.map((_, i, b) => {
			const page_next = page + i;
			return page_next;
		});

	cb([...newArrayStart, ...newArrayEnd].sort((a, b) => a - b));
	return;
};

export const renderPageArrayLast = (props: TProps & { total_page: number }) => {
	const { max_show_page, page, total_page, cb } = props;
	let newArrayStart: number[] = [];
	let newArrayEnd: number[] = [];

	const many_loop_end = total_page - page + 1;
	const many_loop_start = max_show_page - many_loop_end;

	newArrayStart = Array(many_loop_start)
		.fill(page)
		.map((_, i) => {
			const page_prev = page - (i + 1);
			return page_prev;
		});

	newArrayEnd = Array(many_loop_end)
		.fill(page)
		.map((_, i) => {
			const page_next = page + i;
			return page_next;
		});

	return cb([...newArrayStart, ...newArrayEnd].sort((a, b) => a - b));
};
