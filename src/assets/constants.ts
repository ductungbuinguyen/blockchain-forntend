import { AuthSelectItemProps } from "../components/FormItem/AuthSelectItem";
import { Gender } from "../generated/graphql";

export const GENDER_OPTIONS: AuthSelectItemProps["options"] = [
	{
		name: 'Nam',
		value: Gender.Male,
	},
	{
		name: 'Nữ',
		value: Gender.Female,
	},
	{
		name: 'Khác',
		value: Gender.Other,
	},
]
