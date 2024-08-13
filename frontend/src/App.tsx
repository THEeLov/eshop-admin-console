import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import CategoriesPage from "./pages/CategoriesPage";
import ProductPage from "./pages/ProductsPage";

function App() {
  return (
    <div className="w-[800px] mx-auto mt-4">
      <Tabs defaultValue="products" className="w-full">
        <nav>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
          </TabsList>
        </nav>
        <TabsContent value="products">
          <ProductPage />
        </TabsContent>
        <TabsContent value="categories">
          <CategoriesPage />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default App;
