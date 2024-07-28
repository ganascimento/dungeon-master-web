import React, { useState } from "react";
import "./App.css";
import Routing from "./shared/router";
import LoadingContext from "./shared/context/LoaderContext";
import { Loader } from "./shared/components/Loader";
import { AdventureType, CharacterType, ChatType } from "./@types/app.types";
import AdventureContext from "./shared/context/AdventureContext";
import CharacterContext from "./shared/context/CharacterContext";
import ChatContext from "./shared/context/ChatContext";

function App() {
  const [loading, setLoading] = useState(false);
  const [adventure, setAdventure] = useState<AdventureType>();
  const [character, setCharacter] = useState<CharacterType>();
  const [chat, setChat] = useState<ChatType>();

  return (
    <LoadingContext.Provider value={[loading, setLoading]}>
      <AdventureContext.Provider value={[adventure, setAdventure]}>
        <CharacterContext.Provider value={[character, setCharacter]}>
          <ChatContext.Provider value={[chat, setChat]}>
            <div className="App">
              <Loader loading={loading} />
              <Routing />
            </div>
          </ChatContext.Provider>
        </CharacterContext.Provider>
      </AdventureContext.Provider>
    </LoadingContext.Provider>
  );
}

export default App;
