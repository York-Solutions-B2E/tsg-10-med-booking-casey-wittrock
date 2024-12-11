import { useContext } from "react";

import AppContext from "../context/Appcontext";
/**
 * Simple hook to get the application context.
 * Destructure the context to get the values.
 *
 * @example
 * const { user, handleLogin } = useAppContext();
 * @returns {object} AppContext
 */
const useAppContext = () => {
  return useContext(AppContext);
};

export default useAppContext;
