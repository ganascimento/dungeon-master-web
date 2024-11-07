import React, { useState } from "react";
import "./App.css";
import Routing from "./shared/router";
import LoaderContext from "./shared/context/LoaderContext";
import { Loader } from "./shared/components/Loader";
import { AdventureType } from "./@types/app.types";
import AdventureContext from "./shared/context/AdventureContext";
import LoadingContext from "./shared/context/LoadingContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [loader, setLoader] = useState(false);
  const [loading, setLoading] = useState(false);
  const [adventure, setAdventure] = useState<AdventureType>();

  return (
    <LoaderContext.Provider value={[loader, setLoader]}>
      <LoadingContext.Provider value={[loading, setLoading]}>
        <AdventureContext.Provider value={[adventure, setAdventure]}>
          <div className="App">
            <Loader loading={loader} />
            <Routing />
            <ToastContainer theme="dark" position="bottom-left" />
          </div>
        </AdventureContext.Provider>
      </LoadingContext.Provider>
    </LoaderContext.Provider>
  );
}

export default App;
