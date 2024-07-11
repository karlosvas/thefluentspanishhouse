import Main from "./pages/Main";
import { useTranslation } from "react-i18next";
import { Route, Routes } from "react-router-dom";
import Publications from "./pages/Publications";

function App() {
  const [t] = useTranslation("global");

  return (
    <>
      <Routes>
        <Route path="*" element={<Main translation={t} />} />
        <Route
          path="/publication/:id"
          element={<Publications translation={t} />}
        />
      </Routes>
    </>
  );
}

export default App;
