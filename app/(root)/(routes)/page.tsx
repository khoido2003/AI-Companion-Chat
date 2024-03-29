import prismadb from "@/lib/prismadb";

import { SearchInput } from "@/components/search-input";
import { Categories } from "@/components/categories";
import { Companions } from "@/components/companions";

interface RootPageProps {
  searchParams: {
    categoryId: string;
    name: string;
  };
}

const RootPage = async ({ searchParams }: RootPageProps) => {
  const data = await prismadb.companion.findMany({
    where: {
      categoryId: searchParams.categoryId,
      name: {
        search: searchParams.name,
      },
    },
    orderBy: {
      createdAt: "desc",
    },

    include: {
      _count: {
        select: {
          message: true,
        },
      },
    },
  });

  const categories = await prismadb.category.findMany();

  return (
    <div className="h-full space-y-2 p-4">
      <SearchInput />
      <Categories data={categories} />
      <Companions data={data} />
    </div>
  );
};

export default RootPage;
