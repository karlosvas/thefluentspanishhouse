import Main from "./pages/Main";
import { useTranslation } from "react-i18next";
import { Route, Routes } from "react-router-dom";
import Publications from "./pages/Publications";
import { Error } from "./pages/404";
import Account from "./pages/Account";

function App() {
  const [t] = useTranslation();

  return (
    <>
      <Routes>
        <Route path="/" element={<Main translation={t} />} />
        <Route
          path="/publication/:id"
          element={<Publications translation={t} />}
        />
        <Route path="/account" element={<Account translation={t} />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
