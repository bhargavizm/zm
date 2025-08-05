
"use client";
import { MenuItemsContentMapping } from "@/components/sidebar/menuItemsContentMapping";
import { notFound } from "next/navigation";
import { useParams } from "next/navigation";

export default function DashboardPage() {
  const params = useParams();
  const menuItem = params?.menuItem;
  const Component = MenuItemsContentMapping[menuItem];
  if (!Component) return notFound();
  return <Component />;
}
