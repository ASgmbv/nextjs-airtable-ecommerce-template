import { cartItemsAtom, getTotalAtom } from "@/utils/state";
import { sendTelegramMessage } from "@/utils/telegram";
import {
	Box,
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
} from "@chakra-ui/react";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";

type FormType = {
	name: string;
	phone: string;
};

const Checkout: FC = () => {
	const [cartItems, setCartItems] = useAtom(cartItemsAtom);
	const [total] = useAtom(getTotalAtom);
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<FormType>();

	async function onSubmit(data: FormType) {
		try {
			setLoading(true);

			const msg = Object.entries(cartItems).reduce((msg, [, i]) => {
				return (
					msg +
					`${i.quantity} x ${i.name}  -  ${i.price * i.quantity} сом %0A`
				);
			}, "");

			await sendTelegramMessage(
				`Имя: ${data.name} %0A` +
					`Тел: ${data.phone} %0A%0A` +
					msg +
					`%0AСумма: ${total} сом`
			);

			setCartItems({});
			setLoading(false);
			router.push("/success");
		} catch (error) {
			setLoading(false);
			console.log({ error });
		}
	}

	return (
		<Box>
			<Box>
				<Box as="form" onSubmit={handleSubmit(onSubmit)} pb="10" pt="4">
					<FormControl isInvalid={!!errors.name} mb="6">
						<FormLabel htmlFor="name">Имя</FormLabel>
						<Input
							id="name"
							{...register("name", {
								required: "Заполните имя",
							})}
						/>
						<FormErrorMessage>
							{errors.name && errors.name.message}
						</FormErrorMessage>
					</FormControl>
					<FormControl isInvalid={!!errors.phone} mb="10">
						<FormLabel htmlFor="phone">Телефон</FormLabel>
						<Input
							id="phone"
							{...register("phone", {
								required: "Заполните телефон",
							})}
						/>
						<FormErrorMessage>
							{errors.phone && errors.phone.message}
						</FormErrorMessage>
					</FormControl>
					<Button
						w="full"
						type="submit"
						size="lg"
						colorScheme="green"
						isLoading={loading}
						loadingText="Заказать"
					>
						Заказать
					</Button>
				</Box>
			</Box>
		</Box>
	);
};

export default Checkout;
