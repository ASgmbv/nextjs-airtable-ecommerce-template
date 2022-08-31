import {
	Box,
	Circle,
	Container,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	Flex,
	Icon,
	IconButton,
	useDisclosure,
	Link,
} from "@chakra-ui/react";
import { FC, useRef } from "react";
import { FiShoppingBag } from "react-icons/fi";
import { useAtom } from "jotai";
import { cartItemsAtom } from "@/utils/state";
import Cart from "./cart";
import NextLink from "next/link";

const Header: FC = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [items] = useAtom(cartItemsAtom);
	const btnRef = useRef<any>();

	return (
		<Box
			ref={btnRef}
			as="header"
			paddingY="4"
			borderBottom="1px solid"
			borderBottomColor="gray.200"
			boxShadow="0 1px 2px 0 rgb(0 0 0 / 5%)"
			position="sticky"
			left="0"
			right="0"
			top="0"
			bg="white"
			zIndex="2"
		>
			<Container maxW="container.lg">
				<Flex justifyContent="space-between" alignItems="center">
					<Box>
						<NextLink href="/">
							<Link
								color="green.500"
								fontSize="2xl"
								fontWeight="medium"
								letterSpacing="wide"
							>
								Bereke
							</Link>
						</NextLink>
					</Box>

					<IconButton
						aria-label="cart"
						variant="unstyled"
						icon={
							<Box position="relative">
								<Icon as={FiShoppingBag} boxSize="6" />
								<Circle
									size="18px"
									bg="green.400"
									color="white"
									fontSize="xs"
									fontWeight="semibold"
									position="absolute"
									bottom="0"
									left="0"
								>
									{Object.entries(items).length}
								</Circle>
							</Box>
						}
						onClick={onOpen}
					/>
					<Drawer
						isOpen={isOpen}
						onClose={onClose}
						finalFocusRef={btnRef}
						size={["full", null, "sm"]}
					>
						<DrawerOverlay />
						<DrawerContent>
							<DrawerCloseButton />
							<DrawerHeader>Ваша корзина</DrawerHeader>
							<DrawerBody>
								<Cart />
							</DrawerBody>
						</DrawerContent>
					</Drawer>
				</Flex>
			</Container>
		</Box>
	);
};

export default Header;
