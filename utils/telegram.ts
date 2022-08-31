export async function sendTelegramMessage(message: string) {
	const url = `https://api.telegram.org/bot${process.env.NEXT_PUBLIC_TELEGRAM_TOKEN}/sendMessage`;

	return fetch(`${url}?chat_id=${"-680066933"}&text=${message}`, {
		method: "POST",
	});
}
