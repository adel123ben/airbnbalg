"use client";

import EmptyState from "@/components/emptyState";
import { useEffect } from "react";

interface ErrorProps {
    error: Error;
}

const ErrorState: React.FC<ErrorProps> = ({
    error
}) => {

    useEffect(() => {
        console.log(error);
    }, [error]);

    return (
        <EmptyState title="Uh Oh" subtitle="Something went wrong" />
    )
};
 
export default ErrorState;