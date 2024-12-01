export const checkUser = async (
  token: string
): Promise<{ isNewUser: boolean }> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_PATH_URL}/user/check-user`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!res.ok)
    throw new Error("Erreur lors de la vérification de l'utilisateur");

  return res.json();
};
