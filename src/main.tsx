import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { ColorModeProvider } from "./components/ui/color-mode";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { CookiesProvider } from "react-cookie";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <CookiesProvider>
      <ChakraProvider value={defaultSystem}>
        <ColorModeProvider>
          <App />
        </ColorModeProvider>
      </ChakraProvider>
    </CookiesProvider>
  </Provider>,
);
