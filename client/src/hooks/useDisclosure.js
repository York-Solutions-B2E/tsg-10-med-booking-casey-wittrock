import { useState } from "react";

/**
 * Hook to handle the state of a modal or dropdown.
 *
 * This is very useful when you need to manage the state of a modal or dropdown
 * from somewhere else in your component or application.
 *
 * @example
 * const loginModalDisc = useDisclosure();
 *
 * <button onClick={loginModalDisc.open}>Open Login Modal</button>
 *
 * <Modal isOpen={loginModalDisc.isOpen} onClose={loginModalDisc.close} />
 *
 *
 * @param {Boolean} initialVal
 * @returns {Object} { isOpen, open, close }
 */
const useDisclosure = (initialVal = false) => {
  const [isOpen, setIsOpen] = useState(initialVal);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return { isOpen, open, close };
};

export default useDisclosure;
