import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import RootLayout from "./layouts/RootLayout.tsx";
import HomePage from "./pages/HomePage/HomePage.tsx";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.tsx";
import {ChakraProvider, extendTheme, ThemeConfig} from "@chakra-ui/react";
import {DirectionContextProvider} from "./context/SelectionContext.tsx";
import {UserSettingsContextProvider} from "./context/UserSettingsContext.tsx";

const router = createBrowserRouter(createRoutesFromElements(
  <Route element={<RootLayout/>}>
    <Route index element={<HomePage/>}/>
    <Route path="*" element={<NotFoundPage/>}/>
  </Route>
))

function App() {
  const config: ThemeConfig = {
    initialColorMode: 'dark', // 'dark' | 'light'
    useSystemColorMode: false,
  }

  const theme = extendTheme({config})

  return (
    <DirectionContextProvider>
      <UserSettingsContextProvider>
        <ChakraProvider theme={theme}>
          <RouterProvider router={router}/>
        </ChakraProvider>
      </UserSettingsContextProvider>
    </DirectionContextProvider>
  )
}

export default App
