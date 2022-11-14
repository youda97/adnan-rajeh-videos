import React from "react";
import { useSelector } from "react-redux";
import { Topic } from "./Topic";
interface Props {}

export const Search = ({}: Props) => {
    const search = useSelector((state: any) => state.search);

    return <Topic state={search} />;
};
