import { Button } from "@/components/ui/button";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { CheckIcon, CopyIcon } from "lucide-react";
import { useState } from "react";

interface Props {
  text: string;
}

export function CopyButton({ text }: Props) {
  const [copied, setCopied] = useState<boolean>(false);
  const [, copy] = useCopyToClipboard();

  function handleCopy() {
    copy(text);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <Button size="icon" variant="outline" onClick={handleCopy}>
      {copied ? <CheckIcon /> : <CopyIcon />}
      <span className="sr-only">Copy Script</span>
    </Button>
  );
}
