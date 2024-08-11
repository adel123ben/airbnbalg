"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


interface AvatarComponetsProps {
  src: string | null | undefined;
}
const AvatarComponets: React.FC<AvatarComponetsProps> = ({
    src
}) => {
    return ( 
        <Avatar>
        <AvatarImage  src={src || "https://github.com/shadcn.png"} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
     );
}
 
export default AvatarComponets;