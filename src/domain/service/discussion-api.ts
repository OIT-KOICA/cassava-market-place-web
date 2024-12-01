import { Discussion, DiscussionRequest, MessageRequest } from "@/type";

/**
 * Récupère toutes les discussions.
 * @returns {Promise<Discussion[]>} Les produits.
 */
export const getDiscussions = async (): Promise<Discussion[]> => {
  const res: Response = await fetch(
    `${process.env.NEXT_PUBLIC_API_PATH_URL}/guest/discussions`
  );

  if (res) {
    return await res.json();
  }

  throw new Error("Erreur lors du chargement des discussions");
};

/**
 * Récupère par le slug de son produit et le numéro de téléphone du client.
 * @param {string} slug - Le slug du produit.
 * @param {string} phone - Le numéro de téléphone du client.
 * @returns {Promise<Discussion> } La discussion correspondante.
 */
export const getDiscussion = async ({
  slug,
  phone,
}: {
  slug: string;
  phone: string;
}): Promise<Discussion> => {
  const res: Response = await fetch(
    `${process.env.NEXT_PUBLIC_API_PATH_URL}/guest/discussion/${phone}/${slug}`
  );

  if (res) {
    return await res.json();
  }

  throw new Error("Erreur lors de la récupération de la discussion");
};

export const getDiscussionsBySlug = async ({
  slug,
  token,
}: {
  slug: string;
  token: string;
}): Promise<Array<Discussion>> => {
  const res: Response = await fetch(
    `${process.env.NEXT_PUBLIC_API_PATH_URL}/product/${slug}/discussion`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (res) {
    return await res.json();
  }

  throw new Error("Erreur lors de la récupération de la discussion");
};

export const getDiscussionById = async ({
  id,
  token,
}: {
  id: string;
  token: string;
}): Promise<Discussion> => {
  const res: Response = await fetch(
    `${process.env.NEXT_PUBLIC_API_PATH_URL}/product/discussion/${id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (res) {
    return await res.json();
  }

  throw new Error("Erreur lors de la récupération de la discussion");
};

/**
 * Crée une nouvelle discussion.
 * @param {object} discussionData - Les données de la discussion à créer.
 * @returns {Promise<Discussion>} La discussion créé.
 */
export const createDiscussion = async (
  discussionData: DiscussionRequest
): Promise<Discussion> => {
  const res: Response = await fetch(
    `${process.env.NEXT_PUBLIC_API_PATH_URL}/guest/discussion/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(discussionData),
    }
  );

  if (res) {
    return res.json();
  }

  throw new Error("Echec lors de la création de la discussion");
};

/**
 * Crée une nouveau message.
 * @param {object} messageData - Les données du message à créer.
 * @returns {Promise<Discussion>} La discussion concernée.
 */
export const createMessage = async (
  messageData: MessageRequest
): Promise<Discussion> => {
  const res: Response = await fetch(
    `${process.env.NEXT_PUBLIC_API_PATH_URL}/guest/discussion/create/message`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageData),
    }
  );

  if (res) {
    return res.json();
  }

  throw new Error("Echec lors de la création du message");
};

/**
 * Supprime la discussion par son id.
 * @param {string} id - L'ID de la discussion à supprimer.
 * @returns {Promise<string>} Le message de confirmation de la discussion supprimée.
 */
export const deleteDiscussion = async (id: string): Promise<string> => {
  const res: Response = await fetch(
    `${process.env.NEXT_PUBLIC_API_PATH_URL}/guest/discussion/${id}`,
    {
      method: "DELETE",
    }
  );

  if (res) {
    return await res.json();
  }

  throw new Error("Echec lors de la suppression de la discussion");
};

/**
 * Valide la commande par un des parties.
 * @param {string} id - L'ID de la discussion.
 * @param {boolean} isSeller - Détermine s'il s'agit du vendeur ou pas.
 * @returns {Promise<Discussion>} La discussion concernée.
 */
export const validateDiscussion = async ({
  id,
  isSeller,
}: {
  id: string;
  isSeller: boolean;
}): Promise<Discussion> => {
  const res: Response = await fetch(
    `${process.env.NEXT_PUBLIC_API_PATH_URL}/guest/discussion/${id}/validate`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isSeller }),
    }
  );

  if (res) {
    return res.json();
  }

  throw new Error("Echec lors de la validation de la discussion");
};

/**
 * Annule la commande par un des parties.
 * @param {string} id - L'ID de la discussion.
 * @returns {Promise<Discussion>} La discussion concernée.
 */
export const cancelDiscussion = async ({
  id,
}: {
  id: string;
}): Promise<Discussion> => {
  const res: Response = await fetch(
    `${process.env.NEXT_PUBLIC_API_PATH_URL}/guest/discussion/${id}/cancel`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (res) {
    return res.json();
  }

  throw new Error("Echec lors de l'annulation de la discussion");
};
