import { useState } from "react"; // Import useState for managing state
import { Button } from "./ui/button";
import { CommandFieldProps } from "@/interfaces/Console";
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
import { getAllCommands, postCommand } from "@/api/api";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

const CommandField = ({ watchedFields }: CommandFieldProps) => {

  const {  refetch } = useQuery({
    queryKey: ["commands"],
    queryFn: getAllCommands,
  });

  const {
    FilePathInput,
    FilePathOutput,
    InputFileFormat,
    OutputFileFormat,
    videoCodec,
    audioCodec,
    frameRate,
    bitRateAudio,
    bitRateVideo,
    resolution,
    duration,
    fromCut,
    toCut
  } = watchedFields;

  const ffmpegCommand = `ffmpeg ${
    InputFileFormat ? `-f ${InputFileFormat}` : ""
  } -i ${FilePathInput} ${OutputFileFormat ? `-f ${OutputFileFormat}` : ""} ${
    videoCodec ? `-vcodec ${videoCodec}` : ""
  } ${audioCodec ? `-acodec ${audioCodec}` : ""} 
  ${bitRateVideo ? `-b:v ${bitRateVideo}k` : ""} 
  ${bitRateAudio ? `-b:a ${bitRateAudio}k` : ""} 
  ${duration ? `-t ${duration}` : ""} 
  ${frameRate ? `-r ${frameRate}` : ""} 
  ${resolution ? `-s ${resolution}` : ""} 
  ${fromCut ? `-ss ${fromCut}` : ""} 
  ${toCut ? `-to ${toCut} -c copy` : ""} 
  ${FilePathOutput}`;

  function sanitizeInput(input) {
    return input.replace(/\s+/g, ' ').trim(); 
  }
  

  const [commandName, setCommandName] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!commandName.trim()) {
      toast.error("Command name cannot be empty."); 
      return; 
    }
  
    const sanitizedFfmpegCommand = sanitizeInput(ffmpegCommand);
  
    try {
      await postCommand({ postName: commandName, postContent: sanitizedFfmpegCommand });
      toast.success("Command saved successfully!");
      setDialogOpen(false);
      refetch();
    } catch (error) {
      toast.error("Failed to save command.");
      console.error("Error saving command:", error);
    }
  };

  const handleCopy = () => {
    const formattedCommand = ffmpegCommand
      .replace(/\s+/g, ' ') 
      .trim(); 
  
    navigator.clipboard.writeText(formattedCommand)
      .then(() => {
        toast.success("Command copied to clipboard!");
      })
      .catch((err) => {
        toast.error("Failed to copy command.");
        console.error("Copy error:", err);
      });
  };

  return (
    <>
      <div className="w-full h-full lg:h-16 bg-primary rounded p-5 flex justify-between items-center flex-col lg:flex-row">
        <p className="text-primary-foreground font-bold text-xl">
          {ffmpegCommand}
        </p>
        <div className="min-w-64 mt-4 lg:mt-0 flex justify-center lg:justify-end">
          <Button className="mr-3" variant="secondary" onClick={handleCopy} >
            Copy
          </Button>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="secondary">Generate</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Generate command</DialogTitle>
                <DialogDescription>
                  Save your command to the database.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} > 
                <div className="w-full ">
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
                    <Label htmlFor="commandPreview" className="mb-2">
                      Command preview
                    </Label>
                    <p>{ffmpegCommand}</p>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save command</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        
        </div>
      </div>
    </>
  );
};

export default CommandField;