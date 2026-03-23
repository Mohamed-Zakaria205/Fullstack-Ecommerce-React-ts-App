import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { ColorModeProvider } from "./components/ui/color-mode";
import { Provider } from "react-redux";
import { store, persistor } from "./app/store";
import { CookiesProvider } from "react-cookie";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <CookiesProvider>
      <ChakraProvider value={defaultSystem}>
        <ColorModeProvider>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </ColorModeProvider>
      </ChakraProvider>
    </CookiesProvider>
  </Provider>,
);
