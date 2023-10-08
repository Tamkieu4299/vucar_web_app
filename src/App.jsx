import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import AppRoutes from "./configs/route.config";
import { Provider } from "react-redux";
import store from "./stores/store";
import "react-toastify/dist/ReactToastify.css";

import AppModal from "./components/Modal/AppModal";
import { ToastContainer } from "react-toastify";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
        refetchOnWindowFocus: false,
      },
      mutations: {
        // mutation options
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <AppRoutes />
        <AppModal />
        <ToastContainer
          autoClose={3000}
          closeOnClick
          pauseOnFocusLoss={false}
          pauseOnHover={false}
        />
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
