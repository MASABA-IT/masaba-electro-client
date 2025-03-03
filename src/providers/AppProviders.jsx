import { createContext } from "react";

const AppContext = createContext();
const AppProvider = ({ children }) => {
  const appInfo = {};
  return <AppContext.Provider value={appInfo}>{children}</AppContext.Provider>;
};
export { AppProvider, AppContext };
