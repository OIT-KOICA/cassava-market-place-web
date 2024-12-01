"use client";

const SidebarSkeleton = lazy(
  () => import("@/components/dashboard/sidebar-skeleton")
);
const CreateCompanyDialog = lazy(
  () => import("@/components/dashboard/create-company-dialog")
);
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { useGetProductsByUserID } from "@/domain/query/product-query";
import { checkUser } from "@/domain/service/user-api";
import useProductStore from "@/domain/store/product-store";
import { signIn, useSession } from "next-auth/react";
import { lazy, useCallback, useEffect, useState } from "react";

export default function DashboardPage() {
  const [isNewUser, setIsNewUser] = useState<boolean>(false);
  const { data: session } = useSession();
  const { products } = useGetProductsByUserID(session?.accessToken);
  const { setProducts } = useProductStore();

  const verifyUser = useCallback(async () => {
    try {
      if (session) {
        const { isNewUser } = await checkUser(session.accessToken);
        setIsNewUser(isNewUser);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      console.error("Erreur lors de la vérification de l'utilisateur");
      signIn("keycloak");
    }
  }, [session]);

  useEffect(() => {
    verifyUser();
  }, [verifyUser]);

  useEffect(() => {
    if (products) setProducts(products);
  }, [products, setProducts]);

  return !isNewUser ? (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Accueil</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <Card className="bg-white shadow-md transition hover:shadow-lg">
            <CardHeader>
              <CardTitle>Services ou Produits créés</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-4xl font-bold">
              {products?.length}
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarInset>
  ) : (
    <CreateCompanyDialog
      isOpen={isNewUser}
      onSuccess={() => setIsNewUser(false)}
    />
  );
}
