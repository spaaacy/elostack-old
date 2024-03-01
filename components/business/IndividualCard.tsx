import { Individual } from "@/types/Individual";
import Link from "next/link";
import React, { FC } from "react";

interface IndividualCardProps {
  individual: Individual;
}

const IndividualCard: FC<IndividualCardProps> = ({ individual }) => {
  return (
    <Link href={""}>
      <div>
        <h3>{individual.first_name}</h3>
      </div>
    </Link>
  );
};

export default IndividualCard;
