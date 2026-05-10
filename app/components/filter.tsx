"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

export default function Filter() {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  // سطر إضافي للـ UI فقط: عشان نعرف أنهي فلتر شغال حالياً ونديله ستايل مختلف
  const currentCategory = searchParams.get("category") || "all";

  function handleFilter(filter: string) {
    const params = new URLSearchParams(searchParams);
    params.set("category", filter);
    router.replace(`${pathName}?${params.toString()}`);
    //localhost:3000/products?category=filter
  }

  // متغيرات مجمعة للستايل عشان الكود يكون نظيف ومقروء
  const baseBtnStyle =
    "capitalize text-sm md:text-base font-semibold tracking-wide px-6 py-2.5 rounded-full transition-all duration-300";
  const activeBtnStyle = "bg-[#1a2332] text-white shadow-md scale-105"; // الكحلي الغامق للفلتر النشط
  const inactiveBtnStyle =
    "text-slate-500 hover:text-[#d84000] hover:bg-slate-100/80"; // رصاصي وبيقلب ناري في الـ Hover

  return (
    <div className="inline-flex flex-wrap items-center justify-center gap-2 bg-white/60 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-full p-2 mb-8">
      <button
        className={`${baseBtnStyle} ${currentCategory === "all" ? activeBtnStyle : inactiveBtnStyle}`}
        onClick={() => handleFilter("all")}
      >
        all
      </button>

      <button
        className={`${baseBtnStyle} ${currentCategory === "beauty" ? activeBtnStyle : inactiveBtnStyle}`}
        onClick={() => handleFilter("beauty")}
      >
        beauty
      </button>

      <button
        className={`${baseBtnStyle} ${currentCategory === "fragrances" ? activeBtnStyle : inactiveBtnStyle}`}
        onClick={() => handleFilter("fragrances")}
      >
        fragrances
      </button>

      <button
        className={`${baseBtnStyle} ${currentCategory === "furniture" ? activeBtnStyle : inactiveBtnStyle}`}
        onClick={() => handleFilter("furniture")}
      >
        furniture
      </button>
    </div>
  );
}
