"use client";

import { useEffect, useState } from "react";

import { AlertTriangleIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPanel,
  DialogPopup,
  DialogTitle,
} from "@/components/ui/dialog";

export function DevelopmentDialog() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem("devDialogShown");
    if (!hasVisited) {
      setIsOpen(true);
      localStorage.setItem("devDialogShown", "true");
    }
  }, []);

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogPopup className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900/20">
              <AlertTriangleIcon className="h-5 w-5 text-yellow-600 dark:text-yellow-500" />
            </div>
            <DialogTitle>Under Development</DialogTitle>
          </div>
          <DialogDescription className="pt-2">
            This project is currently in active development. Some features may
            be incomplete, unstable, or subject to change. Use at your own risk
            and always review generated scripts before running them on
            production servers.
          </DialogDescription>
        </DialogHeader>
        <DialogPanel className="space-y-3">
          <div className="rounded-md bg-muted p-3 text-sm">
            <p className="mb-1 font-medium">⚠️ Important Notes:</p>
            <ul className="list-inside list-disc space-y-1 text-muted-foreground">
              <li>Always test scripts in a safe environment first</li>
              <li>Review generated code before execution</li>
              <li>Backup your data before running setup scripts</li>
              <li>Some distributions may not be fully supported yet</li>
            </ul>
          </div>
        </DialogPanel>
        <DialogFooter>
          <DialogClose render={<Button className="w-full" />}>
            I Understand
          </DialogClose>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  );
}
