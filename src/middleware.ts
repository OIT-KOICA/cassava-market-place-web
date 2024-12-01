import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: Request) {
  const token = await getToken({ req });

  const url = req.nextUrl.clone();

  if (url.pathname.startsWith("/dashboard")) {
    // Vérifie si l'utilisateur est authentifié pour accéder aux pages auth
    if (!token) {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"], // Spécifie les pages protégées
};
