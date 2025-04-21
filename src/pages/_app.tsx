import "@/styles/globals.css";
import type { AppProps } from "next/app";
import DismissableToast from "@/components/animated/ToastContainer";


export default function App({ Component, pageProps }: AppProps) {
  return (
    <main>
      <Component {...pageProps} />
      <DismissableToast />

    </main>
  )
}
