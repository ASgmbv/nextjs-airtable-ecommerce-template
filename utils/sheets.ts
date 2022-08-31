import Airtable from "airtable";

Airtable.configure({
	apiKey: process.env.NEXT_PUBLIC_AIRTABLE_KEY,
});

const base = Airtable.base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID as string);

export const table = base("Items");
