"use client";
import React, { ReactNode } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import {
  useInboxNotifications,
  useMarkInboxNotificationAsRead,
  useUnreadInboxNotificationsCount,
} from "@liveblocks/react/suspense";
import {
  InboxNotification,
  InboxNotificationList,
  LiveblocksUIConfig,
} from "@liveblocks/react-ui";
import { Button } from "./ui/button";

const Notifications = () => {
  const { inboxNotifications } = useInboxNotifications();
  const { count } = useUnreadInboxNotificationsCount();
  const markInboxNotificationAsRead = useMarkInboxNotificationAsRead();

  const handleMarkAllInboxNotificationsAsRead = () => {
    inboxNotifications.forEach((notification) => {
      markInboxNotificationAsRead(notification.id);
    });
  };
  return (
    <Popover>
      <PopoverTrigger className="relative flex size-10 items-center justify-center rounded-full hover:bg-dark-300 transition-all">
        <Image
          src="/assets/icons/bell.svg"
          alt="inbox"
          width={24}
          height={24}
        />
        {count > 0 && (
          <div className="absolute right-2 top-2 z-20 size-2 rounded-full bg-orange-500" />
        )}
      </PopoverTrigger>
      <PopoverContent align="end" className="shad-popover">
        <LiveblocksUIConfig
          overrides={{
            locale: "fr",
            INBOX_NOTIFICATION_TEXT_MENTION: (user: ReactNode) => (
              <>{user} vous à mentionné</>
            ),
          }}
        >
          <Button
            className="w-full gradient-orange flex gap-1 shadow-md mb-3"
            onClick={handleMarkAllInboxNotificationsAsRead}
          >
            Marquer tout comme lu
          </Button>
          <InboxNotificationList>
            {inboxNotifications.length <= 0 && (
              <p className=" py-2 text-center text-dark-500">
                Pas de nouvelles notifications
              </p>
            )}
            {inboxNotifications.length > 0 &&
              inboxNotifications.map((notification) => (
                <InboxNotification
                  key={notification.id}
                  inboxNotification={notification}
                  className="bg-dark-300 text-white relative hover:bg-dark-400 rounded-md"
                  href={`/documents/${notification.roomId}`}
                  showActions={false}
                  onClick={() => markInboxNotificationAsRead(notification.id)}
                  kinds={{
                    thread: (props) => (
                      <InboxNotification.Thread
                        {...props}
                        showActions={true}
                        showRoomName={false}
                      />
                    ),
                    textMention: (props) => (
                      <InboxNotification.TextMention
                        {...props}
                        showRoomName={false}
                      />
                    ),
                    $documentAccess: (props) => (
                      <InboxNotification.Custom
                        title={props.inboxNotification.activities[0].data.title}
                        aside={
                          <InboxNotification.Icon className="bg-transparent">
                            <Image
                              src={
                                (props.inboxNotification.activities[0].data
                                  .avatar as string) || ""
                              }
                              alt="avatar"
                              width={36}
                              height={36}
                              className="rounded-full"
                            />
                          </InboxNotification.Icon>
                        }
                        {...props}
                      >
                        {props.children}
                      </InboxNotification.Custom>
                    ),
                  }}
                />
              ))}
          </InboxNotificationList>
        </LiveblocksUIConfig>
      </PopoverContent>
    </Popover>
  );
};

export default Notifications;
