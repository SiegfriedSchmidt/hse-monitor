import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import RootLayout from "./layouts/RootLayout.tsx";
import HomePage from "./pages/HomePage/HomePage.tsx";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.tsx";
import {ChakraProvider} from "@chakra-ui/react";
import {DirectionContextProvider} from "./context/DirectionContext.tsx";

const router = createBrowserRouter(createRoutesFromElements(
  <Route element={<RootLayout/>}>
    <Route index element={<HomePage/>}/>
    <Route path="*" element={<NotFoundPage/>}/>
  </Route>
))

function App() {
  return (
    <DirectionContextProvider>
      <ChakraProvider>
        <RouterProvider router={router}/>
      </ChakraProvider>
    </DirectionContextProvider>
  )
}

export default App
