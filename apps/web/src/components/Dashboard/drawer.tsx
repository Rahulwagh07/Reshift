"use client";

import { Drawer } from "vaul";
import { useEffect, useRef, useState } from "react";
import autoAnimate from "@formkit/auto-animate";
import { PiChatDots } from "react-icons/pi";
import Chat from "./Chat";
 
const ResponsiveDrawer = ({ children }: { children: React.ReactNode }) => (
  <div className="z-10">
    <div className="md:hidden">
      <Drawer.Root preventScrollRestoration shouldScaleBackground direction="bottom">
        {children}
      </Drawer.Root>
    </div>
    <div className="hidden md:block">
      <Drawer.Root preventScrollRestoration shouldScaleBackground direction="right">
        {children}
      </Drawer.Root>
    </div>
  </div>
);

 
export function Chatbox({ taskId }: { taskId: string }) {
  const parent = useRef(null);
  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  return (
    <ResponsiveDrawer>
      <Drawer.Trigger
        className="sm:bottom-auto sm:top-5"
        asChild >
          <button>
          <PiChatDots/>
          </button>
      </Drawer.Trigger>

      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="fixed bottom-0 right-0 z-40 mt-24 flex h-[96%] w-full flex-col rounded-t-[10px] bg-white md:h-full md:w-[400px]">
          <Chat groupId={taskId}/>
        </Drawer.Content>
      </Drawer.Portal>
    </ResponsiveDrawer>
  );
}
