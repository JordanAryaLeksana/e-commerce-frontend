import "@/styles/globals.css";
import type { AppProps } from "next/app";
import DismissableToast from "@/components/animated/ToastContainer";
import { Provider } from "react-redux";
import { store } from "@/store/store";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <main>
      <Provider store={store}>
        <Component {...pageProps} />
        <DismissableToast />
      </Provider>
    </main>
  )
}
