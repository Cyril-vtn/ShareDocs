import Header from "@/components/Header";
import AddDocumentBtn from "@/components/AddDocumentBtn";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
import { getDocuments } from "@/lib/actions/room.actions";
import Link from "next/link";
import { dateConverter } from "@/lib/utils";
import { DeleteModal } from "@/components/DeleteModal";
import Notifications from "@/components/Notifications";
import { HiDocumentText } from "react-icons/hi";
const Home = async () => {
  const clerkUser = await currentUser();
  if (!clerkUser) redirect("/sign-in");
  const roomDocuments = await getDocuments({
    email: clerkUser.emailAddresses[0].emailAddress,
  });

  return (
    <main className="home-container">
      <Header className="sticky left-0 top-0 border-b border-dark-500">
        <div className="flex items-center gap-2 lg:gap-4">
          <Notifications />
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </Header>
      {roomDocuments.data.length > 0 ? (
        <div className="document-list-container">
          <div className="document-list-title">
            <h3 className="text-28-semibold">Mes documents</h3>
            <AddDocumentBtn
              userId={clerkUser.id}
              email={clerkUser.emailAddresses[0].emailAddress}
            />
          </div>
          <ul className="document-ul">
            {roomDocuments.data.map(({ id, metadata, createdAt }: any) => (
              <li key={id} className="document-list-item">
                <Link
                  href={`/documents/${id}`}
                  className="flex flex-1 items-center gap-4"
                >
                  <div className="hidden rounded-md bg-dark-500 p-2 sm:block">
                    <HiDocumentText className="text-4xl text-orange-500" />
                  </div>
                  <div className="space-y-1">
                    <p className=" line-clamp-1 text-lg"> {metadata.title}</p>
                    <p className="text-sm font-light text-orange-100 ">
                      Créé il y a {dateConverter(createdAt)}
                    </p>
                  </div>
                </Link>
                <DeleteModal roomId={id} />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="document-list-empty">
          <HiDocumentText className="text-7xl text-orange-500" />
          <h2>Vous n&apos;avez pas de documents</h2>
          <AddDocumentBtn
            userId={clerkUser.id}
            email={clerkUser.emailAddresses[0].emailAddress}
          />
        </div>
      )}
    </main>
  );
};

export default Home;
