import React, { useEffect, useState } from "react";
import { Button, Modal, TextField } from "@material-ui/core";
import web3 from "../../ethereum/web3";
import betting from "../../ethereum/betting";

const AddMargin = ({ open, setaddmarginModalOpen, poll_id }) => {
  const [margin, setMargin] = useState(0);
  const [errormsg, seterrormsg] = useState("");
  const addMargin = async () => {
    seterrormsg("");
    if (margin <= 0) {
      seterrormsg("Invalid margin amount");
    } else {
      const accounts = await web3.eth.getAccounts();
      await betting.methods
        .addMargin(parseInt(poll_id), web3.utils.toWei(`${margin}`, "ether"))
        .send({
          from: accounts[0],
          value: web3.utils.toWei(`${margin}`, "ether"),
        });
    }
  };
  return (
    <Modal
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontColor: "#F8F8FF",
      }}
      open={open}
      onClose={() => setaddmarginModalOpen(false)}
    >
      <div
        style={{
          position: "absolute",
          top: "20%",
          margin: "auto",
          backgroundColor: "#424242",
          width: "30%",
          height: "28%",
          padding: "10px",
        }}
      >
        <TextField
          required
          value={margin}
          onChange={(e) => setMargin(e.target.value)}
          variant="outlined"
          fullWidth
          label="Add Additional margin in Ether"
          error={errormsg ? true : false}
          helperText={errormsg}
          style={{ marginTop: "3.5rem" }}
        />
        <Button
          style={{
            backgroundColor: "#e94560",
            color: "#ffffff",
            fontWeight: "bold",
            marginTop: "2rem",
          }}
          onClick={addMargin}
          variant="contained"
          fullWidth
        >
          Add Margin
        </Button>
      </div>
    </Modal>
  );
};

export default AddMargin;
