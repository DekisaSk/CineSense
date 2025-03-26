import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
  IconButton,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";

export default function ModalWindow() {
  const [open, setOpen] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleFavourite = () => setIsFavourite((prev) => !prev);

  return (
    <>
      <div className="flex justify-center mt-4">
        <Button variant="outlined" onClick={handleClickOpen}>
          Open Modal
        </Button>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        PaperProps={{
          className: "rounded-xl p-4",
        }}
      >
        <div className="flex justify-between items-center mb-2">
          <IconButton onClick={handleFavourite}>
            {isFavourite ? <StarIcon /> : <StarBorderIcon />}
          </IconButton>
          <DialogTitle className="text-xl font-semibold text-center -ml-12">
            Avatar
          </DialogTitle>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </div>

        <Divider className="mb-4" />

        <DialogContent className="flex flex-col md:flex-row gap-6">
          <img
            src="https://storage.googleapis.com/pod_public/750/262965.jpg"
            alt="Movie Poster"
            className="w-full md:w-1/3 object-cover rounded-md shadow"
          />
          <div className="flex flex-col justify-between gap-3">
            <DialogContentText className="text-base">
              <strong>Genre:</strong> Action, Adventure
            </DialogContentText>
            <DialogContentText className="text-base">
              <strong>Rating:</strong> 8.5/10
            </DialogContentText>
            <DialogContentText className="text-base">
              <strong>Year:</strong> 2009
            </DialogContentText>
            <DialogContentText className="text-sm leading-relaxed">
              <strong>Opis:</strong> Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Modi neque quas incidunt? Amet fugiat illum
              porro eos saepe nemo cupiditate, est praesentium sunt!
            </DialogContentText>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
