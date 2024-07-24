"use client";

import Image from "next/image";
import { useState } from "react";

import { deleteDocument } from "@/lib/actions/room.actions";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "./ui/button";

export const DeleteModal = ({ roomId }: DeleteModalProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const deleteDocumentHandler = async () => {
    setLoading(true);

    try {
      await deleteDocument(roomId);
      setOpen(false);
    } catch (error) {
      console.log("Error notif:", error);
    }

    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-transparent w-fit h-fit transition-all hover:bg-dark-400 rounded-full p-1 my-1">
          <Image
            src="/assets/icons/delete.svg"
            alt="delete"
            width={18}
            height={18}
          />
        </Button>
      </DialogTrigger>
      <DialogContent className="shad-dialog">
        <DialogHeader>
          <Image
            src="/assets/icons/delete-modal.svg"
            alt="delete"
            width={48}
            height={48}
            className="mb-4"
          />
          <DialogTitle>Supprimer le document</DialogTitle>
          <DialogDescription>
            Etes-vous sûr de vouloir supprimer ce document ?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-5">
          <DialogClose asChild className="w-full bg-dark-400 text-white">
            Annuler
          </DialogClose>

          <Button
            variant="destructive"
            onClick={deleteDocumentHandler}
            className="gradient-red w-full"
          >
            {loading ? "Suppression..." : "Supprimer"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
