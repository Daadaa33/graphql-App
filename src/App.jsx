import { Outlet } from "react-router-dom";
import Header from "./component/Header";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="max-w-4xl mx-auto  px-2">
        <Header />
        <Outlet />
      </div>
    </>
  );
}

export default App;
