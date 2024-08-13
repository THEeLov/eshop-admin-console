import { FC, useState } from "react";
import { useCategoriesPaginated } from "../hooks/useCategories";
import CategoriesTable from "../components/CategoriesTable";
import PageTitle from "../components/ui/PageTitle";
import { Button } from "../components/ui/button";
import CreateCategoryDialog from "../components/dialogs/CreateCategoryDialog";
import TablePagination from "../components/ui/TablePagination";
import CategoriesTableLoader from "../components/CategoriesTableLoader";

const CategoriesPage: FC<{}> = () => {
  const [page, setPage] = useState(1);
  const { data: categoriesResp, isLoading } = useCategoriesPaginated(page);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false);

  const handleDialogOpen = () => setIsCreateDialogOpen(true);
  const handleDialogClose = () => setIsCreateDialogOpen(false);

  return (
    <main className="py-4">
      <section className="flex">
        <PageTitle className="grow">Categories in store</PageTitle>
        <Button onClick={handleDialogOpen}>Add category</Button>
      </section>
      {categoriesResp && !isLoading ? (
        <CategoriesTable data={categoriesResp.items} />
      ) : (
        <CategoriesTableLoader />
      )}
      {categoriesResp?.pagination && (
        <TablePagination
          pagination={categoriesResp?.pagination}
          onSelect={setPage}
        />
      )}
      {isCreateDialogOpen && (
        <CreateCategoryDialog onClose={handleDialogClose} />
      )}
    </main>
  );
};

export default CategoriesPage;
