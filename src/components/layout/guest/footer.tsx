import Link from "next/link";
import React, { memo } from "react";

function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-4 text-lg font-semibold">
              A propos de Cassava Market Place
            </h3>
            <p className="text-sm">
              Mettre en relation les agriculteurs locaux et les consommateurs de
              produits frais et durables.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Liens Rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/product" className="text-sm hover:underline">
                  Nos produits
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm hover:underline">
                  A propos de nous
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm hover:underline">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm hover:underline">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm hover:underline">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Suivez nous</h3>
            <div className="flex space-x-4">
              {/* Add social media icons here */}
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-secondary-foreground/10 pt-8 text-center text-sm">
          © {new Date().getFullYear()} Cassava Market Place. Tous droits
          réservés.
        </div>
      </div>
    </footer>
  );
}

export default memo(Footer);
