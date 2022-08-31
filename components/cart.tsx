import { cartItemsAtom, getTotalAtom } from "@/utils/state";
import {
	Box,
	Button,
	Divider,
	Flex,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Stack,
	Text,
	useDisclosure,
} from "@chakra-ui/react";
import { useAtom } from "jotai";
import { FC } from "react";
import CartItem from "./cart-item";
import Checkout from "./checkout";

const Cart: FC = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [items] = useAtom(cartItemsAtom);
	const [total] = useAtom(getTotalAtom);

	return (
		<Box>
			<Stack divider={<Divider />}>
				{Object.entries(items).map(([, item]) => (
					<CartItem key={item.id} {...item} />
				))}
			</Stack>
			<Divider mb="8" />
			<Flex justifyContent="space-between" mb="8" alignItems="center">
				<Text as="span">Сумма</Text>
				<Text as="span" fontWeight="semibold" fontSize="xl">
					{total} сом
				</Text>
			</Flex>
			<Button
				width="full"
				size="lg"
				colorScheme="green"
				onClick={onOpen}
				isDisabled={!Object.entries(items).length}
			>
				Оформить
			</Button>
			<Modal isOpen={isOpen} onClose={onClose} size="2xl">
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Оформление заказа</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Checkout />
					</ModalBody>
				</ModalContent>
			</Modal>
		</Box>
	);
};

export default Cart;
