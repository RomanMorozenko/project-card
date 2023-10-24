import { Provider } from "react-redux";

import { Router } from "@/router.tsx";
import { store } from "@/services/store";

export function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}
