import { FC, useState } from "react";
import PageTitle from "../components/ui/PageTitle";
import { useProducts } from "../hooks/useProducts";
import { Button } from "../components/ui/button";
import ProductsTable from "../components/ProductsTable";
import CreateProductDialog from "../components/dialogs/CreateProductDialog";
import TablePagination from "../components/ui/TablePagination";
import ProductsTableLoader from "../components/ProductsTableLoader";

const ProductsPage: FC<{}> = () => {
  const [page, setPage] = useState(1);
  const { data: productsResp, isLoading } = useProducts(page);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false);

  const handleDialogOpen = () => setIsCreateDialogOpen(true);
  const handleDialogClose = () => setIsCreateDialogOpen(false);

  return (
    <main className="py-4">
      <section className="flex">
        <PageTitle className="grow">Products in store</PageTitle>
        <Button onClick={handleDialogOpen}>Add product</Button>
      </section>
      {productsResp && !isLoading ? (
        <ProductsTable data={productsResp.items} />
      ) : (
        <ProductsTableLoader />
      )}
      {productsResp?.pagination && (
        <TablePagination
          pagination={productsResp?.pagination}
          onSelect={setPage}
        />
      )}
      {isCreateDialogOpen && (
        <CreateProductDialog onClose={handleDialogClose} />
      )}
    </main>
  );
};

export default ProductsPage;
