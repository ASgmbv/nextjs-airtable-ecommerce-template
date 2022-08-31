import type { NextPage } from "next";
import Item from "@/components/item";
import Header from "@/components/header";
import { GetStaticProps } from "next";
import { Box, Container, Divider, Heading, Stack } from "@chakra-ui/react";
import { table } from "@/utils/sheets";
import type { ItemProps } from "@/components/item";
import Head from "next/head";
import CategoryItem, { CategoryProps } from "@/components/category-item";

export const getStaticProps: GetStaticProps = async (context) => {
	const rawItems = await table.select().all();

	let items = rawItems.map(({ id, fields }) => ({
		id: id,
		name: fields.Name,
		price: fields.Price,
		unit: fields.Unit,
		image: fields.Image ? (fields.Image as any)[0].url : "/bananas.png",
		inStock: fields.InStock || false,
		category: fields.Category || null,
	})) as ItemProps[];

	// 1
	const res: { [key: string]: ItemProps } = {};

	items.forEach((i) => {
		res[i.id] = {
			...i,
		};
	});

	// 2
	const list: Array<ItemProps | CategoryProps> = [];

	items.forEach((i) => {
		if (i.category) {
			if (!list.find((el) => (el as CategoryProps).title === i.category)) {
				list.push({
					title: i.category,
					items: items.filter((el) => el.category === i.category),
				});
			}
		} else {
			list.push(i);
		}
	});

	return {
		props: {
			items: res,
			list,
		},
		revalidate: 1,
	};
};

const Home: NextPage<{
	list: Array<ItemProps | CategoryProps>;
}> = ({ list }) => {
	return (
		<>
			<Head>
				<title>Береке Маркет</title>
			</Head>
			<Header />
			<Box>
				<Container>
					<Heading fontSize={["xl", null, "2xl"]} lineHeight="10" m="4">
						Каталог
					</Heading>

					<Stack divider={<Divider />}>
						{list.map((item) => {
							if ((item as CategoryProps).title) {
								return (
									<CategoryItem
										key={(item as CategoryProps).title}
										title={(item as CategoryProps).title}
										items={(item as CategoryProps).items}
									/>
								);
							}

							return (
								<Item
									key={(item as ItemProps).id}
									{...(item as ItemProps)}
								/>
							);
						})}
					</Stack>
				</Container>
			</Box>
		</>
	);
};

export default Home;
