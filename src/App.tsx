import { ThemeProvider } from "@/components/theme-provider";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import { router } from "./routes";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="todo-theme">
      <Toaster richColors />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
