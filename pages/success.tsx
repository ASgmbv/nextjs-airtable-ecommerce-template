import { Button, Container, Flex, Heading, Icon } from "@chakra-ui/react";
import { FC } from "react";
import { BsCheck2Circle } from "react-icons/bs";
import Link from "next/link";

const Success: FC = () => {
	return (
		<Flex h="100vh" bg="blue.50" alignItems="center" justifyContent="center">
			<Container>
				<Flex
					bg="white"
					padding={[4, null, 10]}
					rounded="xl"
					textAlign="center"
					flexDir="column"
					alignItems="center"
				>
					<Icon
						as={BsCheck2Circle}
						boxSize="80px"
						color="green.300"
						mb="4"
					/>
					<Heading size="lg" width="full" mb="6">
						Мы приняли вашу заявку
					</Heading>
					<Link href="/" passHref>
						<Button as="a">На главную</Button>
					</Link>
				</Flex>
			</Container>
		</Flex>
	);
};

export default Success;
