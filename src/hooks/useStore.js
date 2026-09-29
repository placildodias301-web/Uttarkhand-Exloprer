import { useEffect, useState } from "react";

// Subscribes the calling component to a createStore() instance so it
// re-renders whenever that store's state changes, anywhere in the app.
export function useStore(store) {
  const [state, setLocalState] = useState(store.getState());

  useEffect(() => {
    setLocalState(store.getState());
    return store.subscribe(setLocalState);
  }, [store]);

  return state;
}
