import Image from "next/image";
import React, { useState } from "react";
import UserTypeSelector from "./UserTypeSelector";
import { Button } from "./ui/button";
import {
  removeCollaborator,
  updateDocumentAccess,
} from "@/lib/actions/room.actions";

const Collaborator = ({
  roomId,
  email,
  collaborator,
  creatorId,
  user,
}: CollaboratorProps) => {
  const [userType, setUserType] = useState<UserType>(
    collaborator.userType || "viewer"
  );
  const [loading, setLoading] = useState(false);

  const shareDocumentHandler = async (type: string) => {
    setLoading(true);
    await updateDocumentAccess({
      roomId,
      email: collaborator.email,
      userType: type as UserType,
      updatedBy: user,
    });
    setLoading(false);
  };
  const removeCollaboratorHandler = async (email: string) => {
    setLoading(true);
    await removeCollaborator({ roomId, email });
    setLoading(false);
  };

  return (
    <li className="flex items-center justify-between gap-2 py-3">
      <div className="flex gap-2 ">
        <Image
          src={collaborator.avatar}
          width={36}
          height={36}
          alt={collaborator.name}
          className="size-9 rounded-full"
        />
        <div>
          <p className="line-clamp-1 text-sm font-semibold leading-4 text-white">
            {collaborator.name}
            <span className="text-10-regular pl-2 text-orange-100">
              {loading && "Mise à jour..."}
            </span>
          </p>
          <p className="text-sm font-light text-orange-100">
            {collaborator.email}
          </p>
        </div>
      </div>

      {creatorId === collaborator.id ? (
        <p className="text-sm text-orange-100">Createur</p>
      ) : (
        <div className="flex items-center">
          <UserTypeSelector
            userType={userType}
            setUserType={setUserType || "viewer"}
            onClickHandler={shareDocumentHandler}
          />
          <Button
            type="button"
            variant="destructive"
            onClick={() => removeCollaboratorHandler(collaborator.email)}
          >
            Supprimer
          </Button>
        </div>
      )}
    </li>
  );
};

export default Collaborator;
