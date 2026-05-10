// components/ProductList.tsx
import { Product } from "@/types/Product";
import Image from "next/image";

interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="group relative bg-white/60 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-3xl p-5 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
        >
          {/* Image Container with subtle background */}
          <div className="relative w-full h-56 mb-6 rounded-2xl bg-slate-50/50 flex items-center justify-center p-4 overflow-hidden">
            <Image
              src={product.thumbnail}
              alt={product.title}
              width={300}
              height={300}
              className="object-contain w-full h-full group-hover:scale-110 transition-transform duration-700 ease-in-out"
              loading="lazy"
            />
          </div>

          <div className="flex flex-col gap-3">
            {/* Title */}
            <h2 className="font-bold text-xl text-[#1a2332] line-clamp-1 group-hover:text-[#4A0E0E] transition-colors duration-300">
              {product.title}
            </h2>

            {/* Description */}
            <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">
              {product.description}
            </p>

            {/* Price & Divider */}
            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-5">
              <p className="text-2xl font-black text-[#d84000]">
                ${product.price}
              </p>

              {/* Decorative badge to enhance the premium look */}
              <span className="text-xs font-bold tracking-wider text-[#1a2332] uppercase bg-slate-100/80 px-4 py-2 rounded-full">
                View
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
