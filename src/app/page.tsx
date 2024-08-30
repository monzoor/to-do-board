import { headers } from "next/headers";
import { Container } from "./components";
import { Categories } from "@todo/types";

export default function Home() {
  const headerValues = headers();
  const categoriesHeader = headerValues.get("x-categories");

  // Activate SSR
  let categories: Categories = [];
  if (categoriesHeader !== null) {
    categories = JSON.parse(categoriesHeader) as Categories;
  }

  return <Container data={categories} />;
}
