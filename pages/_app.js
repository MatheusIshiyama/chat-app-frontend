import Head from "next/head";
import "../css/styles.css";

export default function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>Chat App</title>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
            </Head>
            <Component {...pageProps} />
        </>
    );
}
