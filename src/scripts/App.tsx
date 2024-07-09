import Header from "../layouts/Header";
import Main from "../layouts/Main";
import Footer from "../layouts/Footer";
import { useTranslation } from "react-i18next";
import { Route, Routes } from "react-router-dom";
import Publications from "../pages/Publications";

function App() {
  const [t] = useTranslation("global");

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header translation={t} />
              <Main translation={t} />
              <Footer />
            </>
          }
        />
        <Route
          path="/publication/:id"
          element={<Publications translation={t} />}
        />
      </Routes>
    </>
  );
}

export default App;
