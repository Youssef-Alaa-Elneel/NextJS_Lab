// app/page.tsx
import { Product } from "@/types/Product";
import { Suspense } from "react";
import ProductList from "../components/productlist";
import Filter from "../components/filter";
// import Loading from "../loading";

async function fetchProducts(): Promise<Product[]> {
  const res = await fetch("https://dummyjson.com/products");
  const data = await res.json();
  return data.products;
}

interface Props {
  searchParams: Promise<{ category: string }>;
}

async function Home({ searchParams }: Props) {
  const products = await fetchProducts();
  const { category } = await searchParams;
  const filteredValue = category ?? "all";

  let filteredProducts = products;

  if (filteredValue == "all") filteredProducts = products;
  if (filteredValue == "beauty")
    filteredProducts = products.filter(
      (product) => product.category == "beauty",
    );
  if (filteredValue == "fragrances")
    filteredProducts = products.filter(
      (product) => product.category == "fragrances",
    );
  if (filteredValue == "furniture")
    filteredProducts = products.filter(
      (product) => product.category == "furniture",
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100/50 py-16 px-4 sm:px-8 lg:px-16 selection:bg-[#d84000] selection:text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-14 flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#1a2332] to-[#4A0E0E] mb-6 text-center tracking-tight drop-shadow-sm">
            Products
          </h1>
        </div>

        {/* Filter Section */}
        <div className="mb-12 flex justify-center">
          <Filter />
        </div>

        {/* Product List with Custom Suspense Loader */}
        <Suspense
          fallback={
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="relative w-20 h-20">
                {/* Background Ring */}
                <div className="absolute top-0 left-0 w-full h-full border-4 border-slate-200 rounded-full"></div>
                {/* Animated Ring */}
                <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-[#d84000] rounded-full animate-spin"></div>
              </div>
            </div>
          }
        >
          <ProductList products={filteredProducts} />
        </Suspense>
      </div>
    </div>
  );
}
export default Home;
