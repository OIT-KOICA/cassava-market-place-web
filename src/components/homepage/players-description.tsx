import { memo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Droplets } from "lucide-react";
import { players } from "@/lib/data";

function PlayersDescription() {
  return (
    <section className="bg-[#E8F1D8] py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-4 text-center text-3xl font-bold text-[#2C5F2D]">
          Notre écosystème prospère
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-[#4A6741]">
          Rencontrez les différents acteurs qui contribuent au dynamisme de
          notre marché agricole, chacun jouant un rôle crucial dans notre
          réussite collective.
        </p>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {players.map((category, index) => (
            <Card
              key={index}
              className="border-none shadow-lg transition-shadow duration-300 hover:shadow-xl"
            >
              <CardHeader className="bg-[#97BC62] text-white">
                <CardTitle className="flex items-center">
                  <category.icon className="mr-2 size-6" />
                  {category.category}
                </CardTitle>
              </CardHeader>
              <CardContent className="bg-white">
                <ul className="list-none space-y-2">
                  {category.items.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="flex items-center text-[#4A6741]"
                    >
                      <Droplets className="mr-2 size-4 text-[#97BC62]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(PlayersDescription);
