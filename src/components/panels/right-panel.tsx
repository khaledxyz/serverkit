import { Button } from "@/components/ui/button";
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
import { ResizablePanel } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePasteUpload } from "@/hooks/use-paste-upload";
import { useScript } from "@/stores/script-store";
import {
  BracesIcon,
  CheckCheckIcon,
  DownloadIcon,
  Loader2Icon,
} from "lucide-react";
import { CopyButton } from "../copy-button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export function RightPanel() {
  const script = useScript();

  const handleDownloadScript = () => {
    const blob = new Blob([script], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "setup-script.sh";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <ResizablePanel>
      <div className="h-full bg-background flex flex-col">
        <div className="flex items-center justify-between p-4 pb-2 border-b">
          <div className="flex items-center gap-2">
            <div className="size-2 bg-green-500 rounded-full animate-pulse"></div>
            <h2 className="text-lg font-semibold">Right Panel</h2>
          </div>

          <div className="flex items-center gap-2">
            <CurlDialog />
            <Button
              size="icon"
              variant="outline"
              title="Download Script"
              onClick={handleDownloadScript}
            >
              <DownloadIcon />
              <span className="sr-only">Download Script</span>
            </Button>
            <CopyButton text="script" />
          </div>
        </div>
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <code>
              <pre className="p-4">{script}</pre>
            </code>
          </ScrollArea>
        </div>
      </div>
    </ResizablePanel>
  );
}

function CurlDialog() {
  const script = useScript();

  const { isUploading, uploadedUrl, uploadScript, reset } = usePasteUpload();

  async function handleUpload() {
    console.log(script);

    await uploadScript(script);
    console.log(uploadScript);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" title="Curl Script">
          <BracesIcon />
          Use Curl
        </Button>
      </DialogTrigger>
      {uploadedUrl ? (
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="inline-flex items-center gap-2">
              <CheckCheckIcon /> Success!
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            <div>
              <Label className="text-xs font-medium">Raw URL:</Label>
              <div className="flex items-center gap-2 mt-1">
                <Input className="font-mono" value={uploadedUrl} readOnly />
                <CopyButton text={uploadedUrl} />
              </div>
            </div>

            <div>
              <Label className="text-xs font-medium">cURL Command:</Label>
              <div className="flex items-center gap-2 mt-1">
                <Input
                  className="font-mono"
                  value={`curl -sSL ${uploadedUrl} | bash`}
                  readOnly
                />
                <CopyButton text={`curl -sSL ${uploadedUrl} | bash`} />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={reset} variant="destructive">
              Reset
            </Button>
          </DialogFooter>
        </DialogContent>
      ) : (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Script via dpaste.com</DialogTitle>
            <DialogDescription>
              Are you sure you want to upload your script to dpaste.com? This
              will make it easier to curl into your machine, but it will be
              publicly accessible and cannot be deleted manually. It will be
              removed automatically after 24 hours.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={handleUpload}
              disabled={isUploading}
              variant="destructive"
            >
              {isUploading ? <Loader2Icon className="animate-spin" /> : null}
              {isUploading ? "Uploading" : "Upload to dpaste.com"}
            </Button>
            <DialogClose asChild>
              <Button disabled={isUploading}>Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
}
