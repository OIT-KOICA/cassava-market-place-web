import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navLinks } from "@/lib/data";
import { Menu, Moon, Sun } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Dispatch, memo, SetStateAction } from "react";

function Navigation({
  isScrolled,
  theme,
  setTheme,
}: {
  isScrolled: boolean;
  theme: string | undefined;
  setTheme: Dispatch<SetStateAction<string>>;
}) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 shadow-md backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link href="/" className="text-2xl font-extrabold">
          Cassava Market Place
        </Link>
        <div className="hidden space-x-6 md:flex">
          {navLinks.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`font-semibold transition-colors hover:text-primary ${
                pathname === item.href ? "active" : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          {session ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push("/dashboard")}
            >
              {session.user?.name || "Se Tableau de bord"}
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => signIn("keycloak")}
            >
              Se connecter
            </Button>
          )}

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? (
              <Moon className="size-5" />
            ) : (
              <Sun className="size-5" />
            )}
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription>
                  Navigate through our platform
                </SheetDescription>
              </SheetHeader>
              <div className="mt-4 flex flex-col space-y-4">
                {navLinks.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className={`font-semibold transition-colors hover:text-primary ${
                      pathname === item.href ? "active" : ""
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

export default memo(Navigation);
