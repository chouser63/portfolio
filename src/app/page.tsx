import { ProgressClicker } from "@/components/progress-clicker";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";

export default function Home() {

  

  return (
    <div className="w-full h-full flex flex-col items-center justify-center pt-6 space-y-6">

      <div className="w-1/2">
        <ProgressClicker/>
      </div>
        
    </div>
  );
}
