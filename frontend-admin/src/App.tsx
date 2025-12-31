import { Route, Routes } from "react-router-dom";
// import { useCounterStore } from "./stores/useCounterStore";
import NotfoundPage from "./pages/notfound";
import LoginPage from "./pages/auth/login";
import { ToastContainer } from "react-toastify";

function App() {
  // const { count, increase, decrease } = useCounterStore();

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route path="*" element={<NotfoundPage />} />
      </Routes>
      <ToastContainer />
      {/* <div>
        <h1>{count}</h1>
        <button onClick={increase}>+1</button>
        <button onClick={decrease}>-1</button>
      </div> */}
    </>
  );
}

export default App;
