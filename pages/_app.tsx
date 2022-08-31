import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@/utils/theme";
import { useHydrateAtoms } from "jotai/utils";
import { itemsAtom } from "@/utils/state";

function MyApp({ Component, pageProps }: AppProps) {
	const { items } = pageProps;
	useHydrateAtoms(items ? ([[itemsAtom, items]] as const) : []);

	return (
		<ChakraProvider theme={theme}>
			<Component {...pageProps} />
		</ChakraProvider>
	);
}

export default MyApp;
