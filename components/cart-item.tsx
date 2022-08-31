import { Box, Flex, Icon, IconButton, Input, Text } from "@chakra-ui/react";
import { FC } from "react";
import Image from "next/image";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { useAtom, useSetAtom } from "jotai";
import {
	addCartItemAtom,
	cartItemsAtom,
	deleteCartItemAtom,
	removeCartItemAtom,
} from "@/utils/state";
import { AiOutlineDelete } from "react-icons/ai";
import { ItemProps } from "./item";

const CartItem: FC<ItemProps & { quantity: number }> = (item) => {
	const { name, image, price, quantity, unit } = item;
	const removeCartItem = useSetAtom(removeCartItemAtom);
	const deleteCartItem = useSetAtom(deleteCartItemAtom);
	const addCartItem = useSetAtom(addCartItemAtom);

	return (
		<Flex py="4">
			<Flex
				bg="gray.50"
				padding="3"
				mr={[4, null, 6]}
				alignItems="center"
				justifyContent="center"
				rounded="sm"
			>
				<Box boxSize={["50px"]} position="relative">
					<Image src={image} layout="fill" alt="" objectFit="contain" />
				</Box>
			</Flex>
			<Flex flexDir="column" flex="1" overflow="hidden">
				<Flex justify="space-between" mb="2" flex="1">
					<Box
						fontWeight="medium"
						fontSize="sm"
						flex="1"
						overflow="hidden"
						mr="2"
					>
						<Box>{name}</Box>
					</Box>
					<IconButton
						aria-label=""
						icon={
							<Icon as={AiOutlineDelete} boxSize="5" color="gray.500" />
						}
						variant="unstyled"
						size="xs"
						onClick={() => {
							deleteCartItem(item.id);
						}}
					/>
				</Flex>

				<Flex justify="space-between" alignItems="flex-end">
					<Flex alignItems="center">
						<IconButton
							colorScheme="green"
							aria-label=""
							size="sm"
							icon={<MinusIcon boxSize="12px" />}
							variant="unstyled"
							onClick={() => {
								removeCartItem(item.id);
							}}
						/>
						<label>
							<Input
								width="3rem"
								appearance="textfield"
								textAlign="center"
								height="auto"
								p="0"
								mx="1"
								type="number"
								readOnly
								max={99}
								min={0}
								value={quantity}
							/>
						</label>
						<IconButton
							colorScheme="green"
							aria-label=""
							size="sm"
							variant="unstyled"
							icon={<AddIcon boxSize="12px" />}
							onClick={() => {
								addCartItem(item.id);
							}}
						/>
					</Flex>

					<Text fontWeight="medium" fontSize="sm">
						<Text as="span" fontSize="md">
							{price * quantity} сом
						</Text>
					</Text>
				</Flex>
			</Flex>
		</Flex>
	);
};

export default CartItem;
