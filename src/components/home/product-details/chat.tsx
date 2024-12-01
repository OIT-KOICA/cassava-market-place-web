import { Dispatch, memo, SetStateAction, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import {
  useCreateDiscussion,
  useCreateMessage,
} from "@/domain/query/discussion-query";
import { useToast } from "@/hooks/use-toast";
import { savePhoneToCookie } from "@/lib/utils";
import { Discussion } from "@/type";
import { format } from "date-fns";
import { MessageCircle, Send } from "lucide-react";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function ProductDetailsChat({
  slug,
  discussion,
  setDiscussion,
}: {
  slug: string;
  discussion: Discussion | null;
  setDiscussion: Dispatch<SetStateAction<Discussion | null>>;
}) {
  /* Queries */
  const createDiscussion = useCreateDiscussion();
  const createMessage = useCreateMessage();

  const { toast } = useToast();

  /* State local */
  const [loading, setLoading] = useState(false);
  const [formDataDiscussion, setFormDataDiscussion] = useState({
    name: "",
    phone: "",
    slug: slug, // slug du produit passé en prop
  });
  const [formDataMessage, setFormDataMessage] = useState({
    content: "",
    senderType: "CLIENT",
    id: discussion?.id || "", // ID de la discussion passé en prop
  });

  // Met à jour l'ID dans formDataMessage chaque fois que la discussion change
  useEffect(() => {
    if (discussion?.id) {
      setFormDataMessage((prev) => ({
        ...prev,
        id: discussion.id,
      }));
    }
  }, [discussion]);

  /**
   * Schéma de validation
   *
   * 1. Valider le formulaire de création de discussion
   * 2. Valider le formulaire de création de message
   */
  const discussionSchema = z.object({
    name: z.string().min(1, "Le nom est requis"),
    phone: z
      .string()
      .regex(/^6(5|7|8|9)[0-9]{7}$/, "Numéro de téléphone invalide"),
    slug: z.string().min(1, "Slug du produit invalide"),
  });

  const messageSchema = z.object({
    content: z.string().min(4, "Le message est requis"),
    senderType: z.string().min(2, "Le type d'expéditeur est requis"),
    id: z.string().min(2, "L'ID est requis"),
  });

  /**
   * Validation de données
   *
   * 1. Validation des données de discussion
   * 2. Validation des données de message
   */

  const validateDiscussionData = (data: {
    name: string;
    phone: string;
    slug: string;
  }) => {
    try {
      discussionSchema.parse(data);
      return { isValid: true, errors: null };
    } catch (e) {
      return { isValid: false, errors: e.errors };
    }
  };

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

  /**
   * Fonctions
   *
   * 1. Changement du state lors des variations d'informations (nom, value) pour une discussion
   * 2. Changement du state lors des variations d'informations (content) pour un message
   * 3. Création d'une discussion
   * 4. Création d'un message
   * 5. Annulation d'une commande
   * 6. Validation d'une commande
   */

  const handleChangeDiscussion = (e: {
    target: { name: string; value: string };
  }) => {
    const { name, value } = e.target;
    setFormDataDiscussion((prev) => ({
      ...prev,
      [name]: value,
    }));
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

  const handleStartChat = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    setLoading(true);

    const validation = validateDiscussionData(formDataDiscussion);

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

    savePhoneToCookie(formDataDiscussion.phone);

    createDiscussion.mutate(
      {
        discussionData: {
          slug: formDataDiscussion.slug,
          name: formDataDiscussion.name,
          phone: formDataDiscussion.phone,
        },
      },
      {
        onSuccess: (data) => {
          setDiscussion(data);
        },
      }
    );

    setLoading(false);
  };

  const handleCreateMessage = async (e: { preventDefault: () => void }) => {
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
          setDiscussion(data);
        },
      }
    );

    formDataMessage.content = "";

    setLoading(false);
  };

  return (
    <Card className="mt-8 bg-white shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl font-bold text-[#2C5F2D]">
          <MessageCircle className="mr-2 size-6" />
          Discussion
        </CardTitle>
      </CardHeader>

      <CardContent>
        {discussion && discussion.messages.length > 0 && (
          <ScrollArea className="h-[300px] w-full pr-4">
            {discussion.messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 ${
                  message.senderType === "CLIENT" ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`inline-block max-w-[80%] rounded-lg p-3 ${
                    message.senderType === "CLIENT"
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
        )}
      </CardContent>
      <CardFooter>
        {discussion ? (
          <form
            className="flex w-full items-center"
            onSubmit={handleCreateMessage}
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
              <Send className="mr-2" />
              Envoyer
            </Button>
          </form>
        ) : (
          <form className="flex w-full items-center" onSubmit={handleStartChat}>
            <Input
              placeholder="Entrer votre nom ici..."
              className="mr-2 w-1/3 grow"
              name="name"
              value={formDataDiscussion.name}
              onChange={handleChangeDiscussion}
            />
            <Input
              placeholder="Entrer votre numéro de téléphone ici..."
              className="mr-2 w-1/3 grow"
              name="phone"
              value={formDataDiscussion.phone}
              onChange={handleChangeDiscussion}
            />
            <Button type="submit" disabled={loading}>
              <Send className="mr-2" />
              Envoyer
            </Button>
          </form>
        )}
      </CardFooter>
    </Card>
  );
}

export default memo(ProductDetailsChat);
