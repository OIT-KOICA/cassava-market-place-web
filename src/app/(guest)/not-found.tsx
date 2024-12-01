import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <Search className="mx-auto mb-4 size-12 text-muted-foreground" />
        <h1 className="mb-2 text-3xl font-bold">Page Non Trouvé</h1>
        <p className="mb-4 text-muted-foreground">
          Désolé, nous n&apos;arrivons pas à trouver la page que vous
          recherchez.
        </p>
        <div className="space-x-4">
          <Button asChild>
            <Link href="/">Retour à l&apost;accueil</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/products">Parcourir les produits</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
