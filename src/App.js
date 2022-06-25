import { MantineProvider, TypographyStylesProvider } from '@mantine/core';
import About from "./pages/About";
import Header from "./pages/LandingPage";

function App() {
  return (
    <MantineProvider>
      <TypographyStylesProvider>
        <Header />
        <About />
        {/* <Footer /> */}
      </TypographyStylesProvider>
    </MantineProvider>
  );
}

export default App;
