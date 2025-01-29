import { CircleX, Pencil, SquareStack } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { updateCommand, deleteCommand } from "@/api/api";
import { toast } from "react-toastify";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const PostRowSavedCommand = ({ command, refetch }) => {
  const [commandName, setCommandName] = useState(command.postName);
  const [commandContent, setCommandContent] = useState(command.postContent);
  const [commandContentCopy, setCommandContentCopy] = useState(
    command.postContent
  );
  const [copyCount, setCopyCount] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogOpenDelete, setDialogOpenDelete] = useState(false);
  const [dialogOpenCopy, setDialogOpenCopy] = useState(false);

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(commandContentCopy);
      toast.success("Successfully copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy text.");
      console.error("Clipboard copy error:", error);
    }
  };

  const resetFields = () => {
    setCommandName(command.postName);
    setCommandContent(command.postContent);
    setCommandContentCopy(command.postContent);
    setCopyCount(1);
  };

  const handleEditCommand = async (e) => {
    e.preventDefault();
    try {
      await updateCommand({
        id: command.id,
        userId: command.userId,
        postName: commandName,
        postContent: commandContent,
      });
      toast.success("Command updated successfully!");
      setDialogOpen(false);
      refetch();
    } catch (error) {
      toast.error("Failed to update command.");
      console.error("Error updating command:", error);
    }
  };

  const handleDeleteCommand = async (e) => {
    e.preventDefault();
    try {
      await deleteCommand(command.id);
      toast.success("Command deleted successfully!");
      setDialogOpenDelete(false);
      refetch();
    } catch (error) {
      toast.error("Failed to delete command.");
      console.error("Error deleting command:", error);
    }
  };

  const copyCommand = async () => {
    const commandLines = commandContentCopy
      .split("\n")
      .filter((line) => line.trim() !== "");
    const combinedCommand = commandLines.join(" && ");

    try {
      await navigator.clipboard.writeText(combinedCommand);
      toast.success("The command to the terminal has been copied!");
    } catch (error) {
      toast.error("Failed to copy the command.");
      console.error("Copy error:", error);
    }
  };

  const handleCopyCountChange = (e) => {
    let count = e.target.value;

    if (count === "") {
      setCopyCount("");
      setCommandContentCopy("");
      return;
    }
    const numericCount = count.replace(/[^0-9]/g, "");

    if (numericCount === "") {
      setCopyCount(1);
      setCommandContentCopy(command.postContent);
      return;
    }

    let parsedCount = Number(numericCount);
    if (parsedCount <= 0) {
      parsedCount = 1;
    } else if (parsedCount > 1000) {
      parsedCount = 1000;
    }

    setCopyCount(parsedCount);
    setCommandContentCopy(Array(parsedCount).fill(commandContent).join("\n"));
  };

  const handleCommandEditChange = (e) => {
    const newCommandContent = e.target.value;
    setCommandContent(newCommandContent);

    setCommandContentCopy(Array(copyCount).fill(newCommandContent).join("\n"));
  };

  return (
    <div
      key={command.id}
      className="bg-secondary w-full h-16 lg:h-10 flex justify-between items-center mb-2 rounded"
    >
      <ScrollArea className="h-16 lg:h-6">
        <div className="flex justify-center items-center">
          <p className="ml-4">
            <span className="font-bold mr-3">{command.postName}:</span>
            <span>{command.postContent}</span>
          </p>
        </div>
      </ScrollArea>
      <div className="min-w-24 flex justify-center items-center">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  {" "}
                  <button
                    onClick={() => setDialogOpen(true)}
                    className="flex items-center justify-center"
                  >
                    <Pencil className="lg:mr-3" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Edit the command or its name</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Command</DialogTitle>
              <DialogDescription>
                Edit name and content of your command
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleEditCommand}>
              <div className="w-full">
                <div className="flex flex-col">
                  <Label htmlFor="name" className="mb-4">
                    Type the name of the command
                  </Label>
                  <Input
                    id="name"
                    className="col-span-3 mb-4 w-full"
                    value={commandName}
                    onChange={(e) => setCommandName(e.target.value)}
                  />
                  <Label htmlFor="content" className="mb-2">
                    Command content
                  </Label>
                  <Input
                    id="content"
                    className="col-span-3 mb-4 w-full"
                    value={commandContent}
                    onChange={(e) => setCommandContent(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  onClick={() => setDialogOpen(false)}
                  className="mr-2"
                  variant="outline"
                >
                  Cancel
                </Button>
                <Button type="submit">Save command</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        <Dialog open={dialogOpenCopy} onOpenChange={setDialogOpenCopy}>
          <DialogTrigger asChild>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  {" "}
                  <button
                    onClick={() => setDialogOpenCopy(true)}
                    className="flex items-center justify-center"
                  >
                    <SquareStack className="lg:mr-3" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Copy the command up to 1000 times</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </DialogTrigger>
          <DialogContent className="max-w-screen h-screen flex flex-col">
            <DialogHeader>
              <DialogTitle>Copy Command</DialogTitle>
              <DialogDescription>
                You can copy the command up to 1000 times.
              </DialogDescription>
            </DialogHeader>
            <form className="flex flex-col flex-grow">
              <div className="w-full flex flex-col flex-grow">
                <Label htmlFor="copyCount" className="mb-2">
                  How many times do you want to copy your command?
                </Label>
                <Input
                  id="copyCount"
                  className="mb-5"
                  type="number"
                  min="1"
                  max="1000"
                  value={copyCount}
                  onChange={handleCopyCountChange}
                />
                <Label htmlFor="copyCount" className="mb-2">
                  Your command (you can edit the basic command)
                </Label>
                <Input
                  id="copyCount"
                  className="mb-5"
                  type="text"
                  value={commandContent}
                  onChange={handleCommandEditChange}
                />

                <Label htmlFor="content" className="mb-2">
                  Commands content
                </Label>
                <Textarea
                  id="content"
                  className="flex-grow mb-4 w-full resize-none"
                  value={commandContentCopy}
                  onChange={(e) => setCommandContentCopy(e.target.value)}
                />
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  onClick={() => setDialogOpenCopy(false)}
                  className="mr-1"
                  variant="outline"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={resetFields}
                  className="mr-1"
                  variant="outline"
                >
                  Reset all
                </Button>

                <Button type="button" onClick={copyCommand} className="mr-1">
                  Copy to clipboard as a terminal command
                </Button>
                <Button
                  type="button"
                  onClick={handleCopyToClipboard}
                  className="mr-1"
                >
                  Copy for .txt file to clipboard
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <Dialog open={dialogOpenDelete} onOpenChange={setDialogOpenDelete}>
          <DialogTrigger asChild>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  {" "}
                  <button
                    onClick={() => setDialogOpenDelete(true)}
                    className="flex items-center justify-center"
                  >
                    <CircleX className="lg:mr-3" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete command</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Delete Row</DialogTitle>
              <DialogDescription>
                Are you sure you want to remove the command?
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleDeleteCommand}>
              <div className="w-full">
                <div className="flex justify-center">
                  <Button
                    type="button"
                    onClick={() => setDialogOpenDelete(false)}
                    className="mr-2"
                    variant="outline"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="destructive">
                    Delete row
                  </Button>
                </div>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default PostRowSavedCommand;
