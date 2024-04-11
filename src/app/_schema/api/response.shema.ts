export type ResponseApi<Metadata> = {
	code: number;
	message: string;
	metadata: Metadata;
};
