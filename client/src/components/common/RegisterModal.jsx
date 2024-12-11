import React from "react";
import { Modal } from "@mui/material";

import useAppContext from "../../hooks/useAppContext";

const RegisterModal = () => {
  const { registerModalDisc } = useAppContext();
  return (
    <Modal open={registerModalDisc.isOpen} onClose={registerModalDisc.close}>
      <div>
        <h2>Register</h2>
      </div>
    </Modal>
  );
};

export default RegisterModal;
