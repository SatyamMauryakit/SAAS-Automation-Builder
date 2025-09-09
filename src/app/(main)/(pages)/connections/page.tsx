import { CONNECTIONS } from "@/lib/constant";
import React from "react";
import ConnectionCard from "./_components/connection-card";

type Props = {
  searchParams?: { [key: string]: string | undefined };
};

const Page = ({ searchParams }: Props) => {
  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <h1 className="sticky top-0 z-10 flex items-center justify-between border-b bg-background/50 p-6 text-4xl font-bold backdrop-blur-lg">
        Connections
      </h1>

      {/* Page Description */}
      <p className="px-6 text-muted-foreground">
        Connect all your apps directly from here. You may need to reconnect
        these apps regularly to refresh verification.
      </p>

      {/* Connection Cards */}
      <section className="flex flex-col gap-4 p-6">
        {CONNECTIONS.length > 0 ? (
          CONNECTIONS.map((connection) => (
            <ConnectionCard
              key={connection.title}
              description={connection.description}
              title={connection.title}
              icon={connection.image}
              type={connection.title}
              // connected={connections} // Uncomment when passing connected state
            />
          ))
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            No connections available
          </div>
        )}
      </section>
    </div>
  );
};

export default Page;
