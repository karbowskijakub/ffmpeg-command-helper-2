import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const ConfirmationEmail = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center bg-gray-200">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Your email has been successfully confirmed!
      </h1>
      <Button onClick={handleLoginClick} className="px-6 py-3 text-lg">
        Go to login
      </Button>
    </div>
  );
};

export default ConfirmationEmail;
