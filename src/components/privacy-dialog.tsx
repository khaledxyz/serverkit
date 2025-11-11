import { HatGlassesIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tooltip, TooltipPopup, TooltipTrigger } from "@/components/ui/tooltip";

export default function PrivacyDialog() {
  return (
    <Dialog>
      <DialogTrigger>
        <Tooltip>
          <TooltipTrigger
            render={
              <Button size="icon" variant="ghost">
                <HatGlassesIcon />
              </Button>
            }
          />
          <TooltipPopup side="right">Privacy</TooltipPopup>
        </Tooltip>
      </DialogTrigger>
      <DialogPopup>
        <DialogHeader>
          <DialogTitle>Privacy Policy</DialogTitle>
          <DialogDescription className="mt-5 space-y-5">
            <p>
              Serverkit generates scripts entirely on your device. We do not
              collect, store, or share any personal information or script data.
              All processing happens locally.
            </p>
            <p>
              We use <strong>cookie-less analytics</strong> to anonymously track
              usage patterns, helping us improve the app without identifying any
              user.
            </p>
            <p>
              No third-party services receive your data, and we do not use
              advertising or tracking cookies. Your privacy is fully respected.
            </p>
            <p>
              View the{" "}
              <a
                className="underline"
                href="https://github.com/khaledxyz/serverkit"
                rel="noopener noreferrer"
                target="_blank"
              >
                source code
              </a>{" "}
              on github
            </p>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="ghost" />}>Close</DialogClose>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  );
}
