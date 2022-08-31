import { FC } from "react";
import Image from "next/image";
import {
	Box,
	Flex,
	Icon,
	IconButton,
	Tag,
	Text,
	useToast,
} from "@chakra-ui/react";
import { useSetAtom } from "jotai";
import { addCartItemAtom } from "@/utils/state";
import { BsPlus } from "react-icons/bs";

export type ItemProps = {
	id: string;
	name: string;
	image: string;
	price: number;
	unit: string;
	inStock: boolean;
	category: string | null;
};

const Item: FC<ItemProps> = (item) => {
	const { name, image, price, unit, inStock } = item;
	const toast = useToast();
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
			<Flex flexDir="column" flex="1">
				<Box flex="1" overflow="hidden" fontSize="15px" fontWeight="medium">
					{name}
				</Box>
				<Flex justify="space-between" alignItems="flex-end">
					{inStock ? (
						<Text fontWeight="medium" fontSize="sm">
							<Text as="span" fontSize="lg">
								{price}
							</Text>
							<Text as="span" color="gray.500">
								{` сом / ${unit}`}
							</Text>
						</Text>
					) : (
						<Flex>
							<Tag size="sm" colorScheme="orange" variant="outline">
								Нет в налиции
							</Tag>
						</Flex>
					)}

					<IconButton
						colorScheme="orange"
						aria-label=""
						size="sm"
						rounded="full"
						variant="outline"
						icon={<Icon as={BsPlus} boxSize="5" />}
						isDisabled={!inStock}
						onClick={() => {
							addCartItem(item.id);
							toast({
								title: `Добавлено в корзину`,
								duration: 800,
								status: "success",
							});
						}}
					/>
				</Flex>
			</Flex>
		</Flex>
	);
};

export default Item;
