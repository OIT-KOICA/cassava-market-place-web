import NextAuth, { NextAuthOptions } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";

export const authOptions: NextAuthOptions = {
  providers: [
    KeycloakProvider({
      clientId: `${process.env.KEYCLOAK_CLIENT_ID}`,
      clientSecret: `${process.env.KEYCLOAK_CLIENT_SECRET}`,
      issuer: `${process.env.KEYCLOAK_URL}/realms/${process.env.KEYCLOAK_REALM}`,
    }),
  ],
  session: {
    strategy: "jwt", // Utilisation des tokens JWT pour la session
    maxAge: 60 * 60, // Durée de la session en secondes (1h ici)
  },
  callbacks: {
    async jwt({ token, account }) {
      const currentTime = Math.floor(Date.now() / 1000); // Temps actuel en secondes

      // Si c'est le premier token (connexion initiale)
      if (account) {
        //token.decoded = jwt_decode(account.access_token);
        token.idToken = account.id_token;
        token.userId = account.providerAccountId;
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = currentTime + account.expires_at * 1000; // Timestamp d'expiration
      }

      // Si l'access token est expiré, rafraîchit le token
      if (currentTime > (token.expiresAt as number)) {
        // Rafraîchir le token si expiré
        return await refreshAccessToken(token);
      }

      return token;
    },

    async session({ session, token }) {
      // Ajoute les tokens à la session utilisateur
      session.user.id = token.userId;
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.expiresAt = token.expiresAt;
      return session;
    },
  },
  secret: `${process.env.NEXTAUTH_SECRET}`,
};

// Fonction de rafraîchissement du token
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function refreshAccessToken(token: any) {
  try {
    const url = `${process.env.KEYCLOAK_ISSUER!}/protocol/openid-connect/token`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: process.env.KEYCLOAK_CLIENT_ID!,
        client_secret: process.env.KEYCLOAK_CLIENT_SECRET!,
        grant_type: "refresh_token",
        refresh_token: token.refreshToken,
      }),
    });

    const refreshedTokens = await response.json();

    if (!response.ok) throw refreshedTokens;

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
      expiresAt: Date.now() + refreshedTokens.expires_at * 1000,
    };
  } catch (error) {
    console.error("Erreur lors du rafraîchissement du token", error);
    return { ...token, error: "RefreshAccessTokenError" };
  }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
