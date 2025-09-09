import { ConnectionTypes } from "@/lib/types";
import React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

type Props = {
  type: ConnectionTypes;
  icon: string;
  title: ConnectionTypes;
  description: string;
  callback?: () => void;
  // connected?: Record<ConnectionTypes, boolean>
};

const ConnectionCard = ({
  description,
  type,
  icon,
  title,
  callback,
  // connected,
}: Props) => {
  return (
    <Card className="flex flex-col md:flex-row items-center justify-between p-4 md:p-6 gap-4 md:gap-6 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-gray-900">
      {/* Icon + Info */}
      <CardHeader className="flex flex-row items-center gap-4 flex-1">
        <div className="relative h-12 w-12 flex-shrink-0 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
          <Image src={icon} alt={title} fill className="object-contain" />
          <span className="absolute text-gray-400 dark:text-gray-500 font-bold text-sm">
            {title.charAt(0)}
          </span>
        </div>
        <div className="flex flex-col">
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {title}
          </CardTitle>
          <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
            {description}
          </CardDescription>
        </div>
      </CardHeader>

      {/* Connect Button */}
      <div className="flex items-center justify-end">
        <Link
          href="#"
          className="rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-2 text-white font-semibold shadow hover:from-blue-600 hover:to-blue-700 transition-all duration-200"
        >
          Connect
        </Link>

        {/* Example for connected state (commented) */}
        {/* {connected?.[type] ? (
          <div className="rounded-lg border-2 border-green-500 px-4 py-2 font-bold text-green-600">
            Connected
          </div>
        ) : (
          <Link
            href="#"
            className="rounded-lg bg-blue-600 px-4 py-2 text-white font-semibold hover:bg-blue-700 transition-all duration-200"
          >
            Connect
          </Link>
        )} */}
      </div>
    </Card>
  );
};

export default ConnectionCard;
