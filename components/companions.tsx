import Link from "next/link";
import Image from "next/image";

import { Companion } from "@prisma/client";

import { Card, CardFooter, CardHeader } from "./ui/card";

import { MessageSquare } from "lucide-react";

interface CompanionProps {
  data: (Companion & {
    _count: {
      message: number;
    };
  })[];
}

export const Companions = ({ data }: CompanionProps) => {
  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center space-y-3 pt-10">
        <div className="relative h-80 w-80">
          <Image fill className="" alt="Empty" src="/empty.png" />
        </div>

        <p className="text-sm text-muted-foreground">No companions found!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-2 pb-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {data.map((item) => {
        return (
          <Card
            key={item.id}
            className="cursor-pointer rounded-xl border-0 bg-primary/10 transition hover:opacity-75"
          >
            <Link href={`/chat/${item.id}`}>
              <CardHeader className="flex items-center justify-center text-center text-muted-foreground">
                <div className="relative h-32 w-32">
                  <Image
                    src={item.src}
                    fill
                    className="rounded-xl object-cover"
                    alt="Companion"
                  />
                </div>
                <p className="font-bold">{item.name}</p>
                <p className="text-xs">{item.description}</p>
              </CardHeader>
              <CardFooter className="flex items-center justify-between text-xs text-muted-foreground">
                <p className="lowercase">@{item.userName}</p>
                <div className="flex items-center">
                  <MessageSquare className="mr-1 h-3 w-3" />
                  {item._count.message}
                </div>
              </CardFooter>
            </Link>
          </Card>
        );
      })}
    </div>
  );
};
