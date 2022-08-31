import { ItemProps } from "@/components/item";
import produce from "immer";
import { atom } from "jotai";

export const itemsAtom = atom<{ [key: string]: ItemProps }>({});

export const cartItemsAtom = atom<{
	[key: string]: ItemProps & { quantity: number };
}>({});

export const addCartItemAtom = atom(null, (get, set, id: string) => {
	set(cartItemsAtom, (prev) =>
		produce(prev, (items) => {
			const item = items[id];

			if (item) {
				item.quantity =
					item.unit === "шт" ? item.quantity + 1 : item.quantity + 0.5;
			} else {
				items[id] = {
					...get(itemsAtom)[id],
					quantity: 1,
				};
			}
		})
	);
});

export const deleteCartItemAtom = atom(null, (_, set, id: string) => {
	set(cartItemsAtom, (prev) =>
		produce(prev, (items) => {
			delete items[id];
		})
	);
});

export const removeCartItemAtom = atom(null, (get, set, id: string) => {
	set(cartItemsAtom, (prev) =>
		produce(prev, (items) => {
			const item = items[id];

			if (
				(item.unit === "шт" && item.quantity === 1) ||
				(item.unit === "кг" && item.quantity === 0.5)
			) {
				delete items[id];
			} else {
				items[id] = {
					...item,
					quantity:
						item.unit === "шт" ? item.quantity - 1 : item.quantity - 0.5,
				};
			}
		})
	);
});

export const getTotalAtom = atom((get) => {
	const items = get(cartItemsAtom);
	return Object.entries(items).reduce(
		(total, [, i]) => total + i.price * i.quantity,
		0
	);
});
