import { cn } from "@/lib/utils";
import { useIsThreadActive } from "@liveblocks/react-lexical";
import { Composer, Thread } from "@liveblocks/react-ui";
import { useThreads } from "@liveblocks/react/suspense";
import React from "react";

const ThreadWrapper = ({ thread }: ThreadWrapperProps) => {
  const isActive = useIsThreadActive(thread.id);
  return (
    <Thread
      overrides={{
        THREAD_RESOLVE: "Résolu",
        THREAD_UNRESOLVE: "Non résolu",
        THREAD_COMPOSER_SEND: "Répondre",
        THREAD_COMPOSER_PLACEHOLDER: "Répondre à la discussion",
        THREAD_NEW_INDICATOR: "Nouveau",
        THREAD_NEW_INDICATOR_DESCRIPTION: "Nouveau commentaire",
        COMMENT_EDIT: "Modifier",
        COMMENT_EDIT_COMPOSER_PLACEHOLDER: "Modifier le commentaire",
        COMMENT_MORE: "Plus",
        COMMENT_ADD_REACTION: "Ajouter une réaction",
        COMPOSER_PLACEHOLDER: "Répondre à la discussion",
        COMMENT_EDIT_COMPOSER_SAVE: "Enregistrer",
        COMMENT_EDIT_COMPOSER_CANCEL: "Annuler",
        COMPOSER_INSERT_MENTION: "Mentionner",
        COMPOSER_INSERT_EMOJI: "Emoji",
        COMMENT_DELETE: "Supprimer",
      }}
      thread={thread}
      data-state={isActive ? "active" : null}
      className={cn(
        "comment-thread border",
        isActive && "border-orange-500 shadow-md",
        thread.resolved && "opacity-40"
      )}
    />
  );
};

const Comments = () => {
  const { threads } = useThreads();
  return (
    <div className="comments-container">
      <Composer
        className="comment-composer"
        overrides={{
          COMPOSER_PLACEHOLDER: "Répondre à la discussion",
          COMPOSER_SEND: "Répondre",
          COMPOSER_INSERT_MENTION: "Mentionner",
          COMPOSER_INSERT_EMOJI: "Emoji",
        }}
      />
      {threads.map((thread) => (
        <ThreadWrapper key={thread.id} thread={thread} />
      ))}
    </div>
  );
};

export default Comments;
