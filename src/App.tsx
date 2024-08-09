import React, { useState } from "react";
import "./App.css";
import Routing from "./shared/router";
import LoaderContext from "./shared/context/LoaderContext";
import { Loader } from "./shared/components/Loader";
import { AdventureType, ChatType } from "./@types/app.types";
import AdventureContext from "./shared/context/AdventureContext";
import ChatContext from "./shared/context/ChatContext";
import LoadingContext from "./shared/context/LoadingContext";

function App() {
  const [loader, setLoader] = useState(false);
  const [loading, setLoading] = useState(false);
  const [adventure, setAdventure] = useState<AdventureType>();
  const [chat, setChat] = useState<ChatType>();

  return (
    <LoaderContext.Provider value={[loader, setLoader]}>
      <LoadingContext.Provider value={[loading, setLoading]}>
        <AdventureContext.Provider value={[adventure, setAdventure]}>
          <ChatContext.Provider value={[chat, setChat]}>
            <div className="App">
              <Loader loading={loader} />
              <Routing />
            </div>
          </ChatContext.Provider>
        </AdventureContext.Provider>
      </LoadingContext.Provider>
    </LoaderContext.Provider>
  );
}

export default App;
