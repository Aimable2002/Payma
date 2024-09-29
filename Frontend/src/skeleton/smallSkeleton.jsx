
import React from "react";
import {Card, Skeleton, Button} from "@nextui-org/react"

const smallSkeleton = () => {;
    
        const [isLoaded, setIsLoaded] = React.useState(false);
    
        const toggleLoad = () => {
            setIsLoaded(!isLoaded);
        };
    
      return (
            <Card className="w-full space-y-5 p-4" radius="lg">
                <Skeleton isLoaded={isLoaded} className="rounded-lg">
                    <div className="h-14 rounded-lg bg-secondary"></div>
                </Skeleton>
            </Card>
      )
    
}

export default smallSkeleton