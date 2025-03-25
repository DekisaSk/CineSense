import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
} from "@mui/material";

export default function ModalWindow() {
  const [open, setOpen] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleFavourite = () => {
    setIsFavourite(!isFavourite);
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open modal
      </Button>
      <Dialog open={open} onClose={handleClose} scroll="paper" fullWidth="90vw">
        <Button
          className="setFavourite"
          onClick={handleFavourite}
          variant="contained"
        >
          *
        </Button>
        <DialogTitle>{"Avatar"}</DialogTitle>
        <DialogContent>
          <img
            src="https://storage.googleapis.com/pod_public/750/262965.jpg"
            alt="placeholder"
          />
          <DialogContentText>
            <p className="genre">Genre</p>
            <p className="rating">Rating</p>
            <p className="year">Year</p>
            <p className="description">
              Opis: Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Modi neque quas incidunt? Amet fugiat illum porro eos saepe nemo
              cupiditate, est praesentium sunt! Sunt iste quia, dignissimos quos
              tenetur cum? Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Eius porro voluptates est ullam eveniet, perferendis, quas
              praesentium ut tempore nihil dolorem? Quibusdam inventore impedit
              eos nobis beatae ex, unde similique?
            </p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>x</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
