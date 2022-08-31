import { FC } from "react";
import Image from "next/image";
import {
	Box,
	Divider,
	Flex,
	Icon,
	IconButton,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Stack,
	Text,
	useDisclosure,
	useToast,
} from "@chakra-ui/react";
import { BsApp } from "react-icons/bs";
import Item, { ItemProps } from "./item";

export type CategoryProps = {
	title: string;
	items: ItemProps[];
};

const CategoryItem: FC<CategoryProps> = ({ title, items }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

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
					<Image
						src={items[0].image}
						layout="fill"
						alt=""
						objectFit="contain"
					/>
				</Box>
			</Flex>
			<Flex flexDir="column" flex="1">
				<Box flex="1" overflow="hidden" fontSize="15px" fontWeight="medium">
					{title}
				</Box>
				<Flex justify="space-between" alignItems="flex-end">
					<Text fontWeight="medium" fontSize="sm" color="gray.500">
						{items.map((i) => i.name).join(", ")}
					</Text>

					<IconButton
						colorScheme="green"
						aria-label=""
						size="sm"
						variant="outline"
						icon={<Icon as={BsApp} boxSize="14px" />}
						rounded="full"
						onClick={onOpen}
					/>

					<Modal isOpen={isOpen} onClose={onClose} size="2xl">
						<ModalOverlay />
						<ModalContent>
							<ModalHeader>{title}</ModalHeader>
							<ModalCloseButton />
							<ModalBody>
								<Box mb="10">
									<Stack divider={<Divider />}>
										{items.map((item) => {
											return <Item key={item.id} {...item} />;
										})}
									</Stack>
								</Box>
							</ModalBody>
						</ModalContent>
					</Modal>
				</Flex>
			</Flex>
		</Flex>
	);
};

export default CategoryItem;
