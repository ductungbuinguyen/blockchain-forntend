export enum IValidateType {
	EMAIL,
	REQUIRED,
	PHONE_NUMBER,
	RE_ENTER_PASSWORD,
}

const fieldValidatorMapper = [
	{
		type: IValidateType.EMAIL,
		handler: (value: string): string | null => {
			if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value))
				return 'Invalid email address';
			return null;
		},
	},
	{
		type: IValidateType.PHONE_NUMBER,
		handler: (value: string): string | null => {
			if (!/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/i.test(value))
				return 'Invalid phone number';
			return null;
		},
	},
	{
		type: IValidateType.REQUIRED,
		handler: (value: string): string | null => {
			if (!value) return 'Required';
			return null;
		},
	},
	{
		type: IValidateType.RE_ENTER_PASSWORD,
		handler: (value: string, values: any): string | null => {
			if (values["password"] !== value) return 're-enter password must match';
			return null;
		},
	},
];

export const fieldValidator = ({
	value,
	validateTypes,
	values,
}: {
	value: string;
	validateTypes: IValidateType[];
	values?: any;
}): string | void => {
	const result = fieldValidatorMapper
		.filter(({ type }) => validateTypes.includes(type))
		.reduce<string | null>(
			(previousValue, { handler }) => previousValue || handler(value, values),
			null
		);
  if(result) return result;
};
