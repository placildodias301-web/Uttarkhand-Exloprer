// A tiny, generic, localStorage-backed store. Each domain (inquiries, blogs,
// gallery submissions, etc.) creates one of these instead of writing its own
// localStorage read/write/subscribe boilerplate.
//
// This is intentionally framework-agnostic: it doesn't know about React.
// src/hooks/useStore.js is the thin React wrapper around it. Swapping this
// for a real API later means changing the functions inside each service
// file (src/services/*.js) — components that call those functions don't
// need to change.
export function createStore(key, initialValue) {
  const listeners = new Set();

  function read() {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initialValue;
    } catch {
      return initialValue;
    }
  }

  let state = read();

  function setState(next) {
    state = typeof next === "function" ? next(state) : next;
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch {
      // localStorage can fail (private browsing, quota) — state still
      // updates in memory for this session even if it won't persist.
    }
    listeners.forEach((listener) => listener(state));
  }

  function getState() {
    return state;
  }

  function subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }

  return { getState, setState, subscribe };
}
