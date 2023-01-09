import { QueryClient, QueryClientProvider } from "react-query";
import Views from "./components/Views";
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Views />
      </div>
    </QueryClientProvider>
  );
}
