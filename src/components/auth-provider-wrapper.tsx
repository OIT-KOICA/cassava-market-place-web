"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { redirect, usePathname } from "next/navigation";
import { LoaderCircle } from "lucide-react";

const AuthProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  const { status } = useSession();
  const pathname = usePathname();

  useEffect(() => {
    // Vérifie si le token est expiré ou si l'utilisateur n'est pas authentifié
    if (status === "unauthenticated" && pathname.startsWith("/dashboard")) {
      console.log("Session expirée, redirection en cours...");
      redirect("/"); // Redirige vers Keycloak
    }
  }, [pathname, status]);

  if (status === "loading") {
    // Afficher un loader pendant que la session est en cours de chargement
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <LoaderCircle />
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthProviderWrapper;
