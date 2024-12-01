"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Textarea } from "@/components/ui/textarea";
import { useCreateMessage } from "@/domain/query/discussion-query";
import useProductStore from "@/domain/store/product-store";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { format } from "date-fns";

export default function DashboardDisccusionPage({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  params,
}: {
  params: { id: string };
}) {
  const discussion = useProductStore((state) => state.activeDiscussion);
  const { setActiveDiscussion } = useProductStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const createMessage = useCreateMessage();

  const { toast } = useToast();

  const [formDataMessage, setFormDataMessage] = useState({
    content: "",
    senderType: "SELLER",
    id: discussion?.id || "", // ID de la discussion passé en prop
  });

  useEffect(() => {
    if (discussion?.id) {
      setFormDataMessage((prev) => ({
        ...prev,
        id: discussion.id,
      }));
    }
  }, [discussion]);

  const messageSchema = z.object({
    content: z.string().min(4, "Le message est requis"),
    senderType: z.string().min(2, "Le type d'expéditeur est requis"),
    id: z.string().min(2, "L'ID est requis"),
  });

  const validateMessageData = (data: {
    content: string;
    senderType: string;
    id: string;
  }) => {
    try {
      messageSchema.parse(data);
      return { isValid: true, errors: null };
    } catch (e) {
      return { isValid: false, errors: e.errors };
    }
  };

  const handleChangeMessage = (e: {
    target: { name: string; value: string };
  }) => {
    const { name, value } = e.target;
    setFormDataMessage((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    const validation = validateMessageData(formDataMessage);

    if (!validation.isValid) {
      toast({
        variant: "destructive",
        title: "Uh oh! Un problème est survenu.",
        description: validation.errors.map(
          (error: { message: unknown }) => error.message
        ),
      });

      setLoading(false);
      return;
    }

    createMessage.mutate(
      {
        messageData: {
          id: formDataMessage.id,
          senderType: formDataMessage.senderType,
          content: formDataMessage.content,
        },
      },
      {
        onSuccess: (data) => {
          setActiveDiscussion(data);
        },
      }
    );

    formDataMessage.content = "";

    setLoading(false);
  };
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
                <BreadcrumbLink href="/dashboard/service">
                  Services
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Discussion sur le service</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex h-screen bg-[#F7F9F4]">
        <div className="flex flex-1 flex-col p-8">
          <div className="mb-6 flex items-center">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="mr-4"
            >
              <ArrowLeft className="mr-2 size-4" />
              Retour
            </Button>
            <h1 className="text-3xl font-bold text-[#2C5F2D]">
              Discussion avec {discussion?.user.name}
            </h1>
          </div>
          <Card className="flex flex-1 flex-col">
            <CardHeader>
              <CardTitle>Service : {discussion?.product}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col">
              <ScrollArea className="flex-1 pr-4">
                {discussion?.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`mb-4 ${
                      message.senderType === "SELLER"
                        ? "text-right"
                        : "text-left"
                    }`}
                  >
                    <div
                      className={`inline-block max-w-[70%] rounded-lg p-3 ${
                        message.senderType === "SELLER"
                          ? "bg-[#E8F1D8] text-[#2C5F2D]"
                          : "bg-[#2C5F2D] text-white"
                      }`}
                    >
                      <p>{message.content}</p>
                      <small className="mt-1 block opacity-70">
                        {format(message.createdAt, "MMM d, h:mm a")}
                      </small>
                    </div>
                  </div>
                ))}
              </ScrollArea>
              <form
                onSubmit={handleSendMessage}
                className="mt-4 flex space-x-2"
              >
                {/* Champ caché pour l'ID de la discussion */}
                <input type="hidden" name="id" value={formDataMessage.id} />
                <Textarea
                  placeholder="Ecrire votre message ici..."
                  className="mr-2 w-2/3 grow"
                  name="content"
                  value={formDataMessage.content}
                  onChange={handleChangeMessage}
                />
                <Button type="submit" disabled={loading}>
                  <Send className="mr-2 size-4" />
                  Envoyer
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarInset>
  );
}
