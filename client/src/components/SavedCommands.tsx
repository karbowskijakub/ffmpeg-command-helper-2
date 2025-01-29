import { useQuery } from "@tanstack/react-query";
import { postLogout, getAllCommands, downloadPosts, getUserData } from "@/api/api";
import { useNavigate } from "react-router-dom";
import PostRowSavedCommand from "./PostRowSavedCommand";
import { CommandPost } from "@/interfaces/CommandPost";
import { FileDown } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "react-toastify";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const SavedCommands = () => {
  const navigate = useNavigate();

  const { data: commands, error, isLoading, refetch } = useQuery({
    queryKey: ["commands"],
    queryFn: getAllCommands,
  });

  const { data: userData, isLoading: isUserLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUserData,
  });

  const handleLoginClick = () => {
    postLogout();
    navigate("/login");
  };

  const handleDownloadClick = async () => {
    try {
      await downloadPosts();
      toast.success("Commands downloaded successfully!");
    } catch (error) {
      toast.error("Error downloading commands");
      console.error("Error downloading commands:", error);
    }
  };

  if (isLoading || isUserLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading commands: {error.message}</div>;
  }

  return (
    <div className="w-full flex flex-col lg:flex-row">
      <div className="w-full lg:w-[85%] h-[420px] lg:h-[130px] xxl:min-h-[350px] bg-customGrey rounded lg:mt-10">
        <ScrollArea className="h-[420px] lg:h-[140px] xxl:h-[350px]">
          <div className="p-5">
            {commands.map((command: CommandPost) => (
              <PostRowSavedCommand
                key={command.id}
                command={command}
                refetch={refetch}
              />
            ))}
          </div>
        </ScrollArea>
      </div>
      <div className="w-full lg:w-[15%] lg:min-h-[130px] xxl:min-h-[350px] h-full bg-customGrey rounded p-4 mt-10 lg:ml-3 flex flex-row xxl:flex-col justify-between items-center">
        <h1 className="font-bold text-primary-foreground text-xl text-center">
          Hello, {userData.firstName}
        </h1>
        <div className="flex justify-center items-center flex-col">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <button onClick={handleDownloadClick}>
                  <FileDown className="mb-4 text-primary-foreground" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Download all commands as commands.txt</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Button variant="secondary" onClick={handleLoginClick}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SavedCommands;
