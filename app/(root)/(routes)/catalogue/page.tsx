"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Catalogue = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("https://swarnimpublication.com.np/document/1/download");
    setTimeout(() => {
      router.push("/");
    }, 5000);
  }, []);
  return <div></div>;
};

export default Catalogue;
