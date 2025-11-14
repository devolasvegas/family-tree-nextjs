"use client";

import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";

import userImagePlaceholder from "@/public/user-image-placeholder.svg";

const AuthButton = () => {
  const { data: session } = useSession();

  if (session?.user) {
    return (
      <div className="flex flex-row gap-4 items-center">
        <div title={`Signed in as ${session.user.email}`}>
          <Image
            src={session.user.image || userImagePlaceholder}
            alt="User Avatar"
            width={32}
            height={32}
            className="rounded-full"
          />
        </div>
        <Button
          variant={"secondary"}
          className="bg-inchworm"
          onClick={() => signOut()}
        >
          Sign Out
        </Button>
      </div>
    );
  }
  return (
    <>
      <Button
        variant={"secondary"}
        className="bg-inchworm"
        onClick={() => signIn()}
      >
        Sign In
      </Button>
    </>
  );
};

export default AuthButton;
