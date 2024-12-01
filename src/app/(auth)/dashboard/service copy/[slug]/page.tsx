"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";

import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetDiscussionsBySlug } from "@/domain/query/discussion-query";
import { formatPrice } from "@/lib/utils";
import useProductStore from "@/domain/store/product-store";

export default function ServiceDashboardViewPage({
  params,
}: {
  params: { slug: string };
}) {
  const { data: session, status } = useSession();
  //const { product } = useGetProduct(params.slug);
  const product = useProductStore((state) => state.activeProduct);
  const { setDiscussions, setActiveDiscussion } = useProductStore();
  const [activeTab, setActiveTab] = useState("details");
  const router = useRouter();
  const { discussions } = useGetDiscussionsBySlug({
    slug: params.slug,
    token: session?.accessToken,
  });

  useEffect(() => {
    if (
      status === "unauthenticated" ||
      (session && Math.floor(Date.now() / 1000) > (session.expiresAt as number))
    ) {
      signIn("keycloak"); // Redirige vers Keycloak si non connecté
    }
  }, [session, status]);

  useEffect(() => {
    if (discussions) setDiscussions(discussions);
  }, [discussions, setDiscussions]);

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/dashboard">Acceuil</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/dashboard/product">
                  Produits
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Détails sur le produit</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex h-screen bg-[#F7F9F4]">
        <div className="flex-1 p-8">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-[#2C5F2D]">
              {product?.name}
            </h1>
          </div>
          <div className="mb-6">
            <Button
              variant={activeTab === "details" ? "default" : "outline"}
              onClick={() => setActiveTab("details")}
              className="mr-2"
            >
              Details
            </Button>
            <Button
              variant={activeTab === "discussions" ? "default" : "outline"}
              onClick={() => setActiveTab("discussions")}
            >
              Discussions
            </Button>
          </div>
          {activeTab === "details" ? (
            <Card>
              <CardHeader>
                <CardTitle>Produit Details</CardTitle>
                <CardDescription>
                  Consulter les informations de votre produit
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Category</TableCell>
                      <TableCell>{product?.category}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Price</TableCell>
                      <TableCell>
                        {formatPrice(product?.basePrice.toFixed(2) ?? "")} /{" "}
                        {product?.unit}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Stock</TableCell>
                      <TableCell>
                        {product?.quantity} {product?.unit}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Description</TableCell>
                      <TableCell>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: product?.description ?? "",
                          }}
                          className="mb-4 text-sm text-gray-600"
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Perishable</TableCell>
                      <TableCell>
                        {product?.isPerishable ? "Yes" : "No"}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Derivative</TableCell>
                      <TableCell>
                        {product?.isDerivedProduct ? "Yes" : "No"}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Discussions</CardTitle>
                <CardDescription>
                  Discussions récentes avec des clients sur le produit
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Client</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {discussions?.map((discussion) => (
                      <TableRow key={discussion.id}>
                        <TableCell>
                          {discussion.user.name + " - " + discussion.user.phone}
                        </TableCell>
                        <TableCell>{discussion.createdAt}</TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            onClick={() => {
                              setActiveDiscussion(discussion);
                              router.push(
                                `/dashboard/product/discussion/${discussion.id}`
                              );
                            }}
                          >
                            Consulter
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </SidebarInset>
  );
}
