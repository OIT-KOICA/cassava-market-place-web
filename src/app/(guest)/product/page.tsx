"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetProducts } from "@/domain/query/product-query";
import Link from "next/link";
import { ProductDTO } from "@/type";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useCreateAdd, useGetAdds } from "@/domain/query/configuration-query";
import { format } from "date-fns";
import { Calendar, Phone, UserRound } from "lucide-react";

const description = [
  "Une culture résiliente, transformable en produits comme la farine, l'amidon, ou le gari. Source de calories, résistance aux conditions difficiles, opportunités économiques grâce aux dérivés",
  "Une céréale polyvalente utilisée pour l'alimentation humaine, animale, et industrielle.  Base alimentaire, ingrédient clé pour l’élevage, et produit exportable.",
  "Une source de protéines populaire élevée pour sa viande et ses œufs. Protéines abordables, revenu pour les éleveurs, et contribution à l'économie circulaire avec les engrais naturels.",
];

const ads = [
  {
    type: "need",
    title: "Seeking Organic Soybeans",
    description: "Large processor looking for organic soybean suppliers",
  },
  {
    type: "training",
    title: "Sustainable Farming Workshop",
    description: "Learn eco-friendly farming techniques",
  },
  {
    type: "need",
    title: "Fruit Distributor Wanted",
    description: "Expanding our distribution network in the Southeast",
  },
];

export default function ProductsPage() {
  /* ref */
  const loaderRef = useRef(null);

  /* Query */
  const { products } = useGetProducts();
  const { adds } = useGetAdds();

  /* local state */
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("#");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("#");
  const [priceRange, setPriceRange] = useState([0, 20]);
  const [visibleProducts, setVisibleProducts] = useState(12);
  const [loading, setLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<Array<string>>([]);
  const [cities, setCities] = useState<Array<string>>([]);
  const [filteredProducts, setFilteredProducts] = useState<Array<ProductDTO>>(
    []
  );
  const createAdd = useCreateAdd();

  const filterProducts = useCallback(() => {
    if (products) {
      let filtered = products;

      if (selectedCategory != "#")
        filtered = filtered.filter(
          (product) => product.category === selectedCategory
        );

      if (selectedLocation != "#")
        filtered = filtered.filter(
          (product) => product.localisation === selectedLocation
        );

      if (searchTerm.trim() != "")
        filtered = filtered.filter(
          (product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase())
        );

      setFilteredProducts(filtered);
    }
  }, [products, searchTerm, selectedCategory, selectedLocation]);

  const loadMoreProducts = useCallback(() => {
    setLoading(true);

    if (filteredProducts && loading)
      setTimeout(() => {
        setVisibleProducts((prevVisible) =>
          Math.min(prevVisible + 10, filteredProducts.length)
        );
        setLoading(false);
      }, 1000); // Simulate network delay
  }, [loading, filteredProducts]);

  /* Chargement différé des produits */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          filteredProducts &&
          entries[0].isIntersecting &&
          !loading &&
          visibleProducts < filteredProducts.length
        ) {
          loadMoreProducts();
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [visibleProducts, loadMoreProducts, filteredProducts, loading]);

  /* Listing des catégories et des villes */
  useEffect(() => {
    if (filteredProducts.length > 0) {
      const c: string[] = [];
      const v: string[] = [];

      filteredProducts.map((p, index) => {
        if (!c.includes(p.category)) c[index] = p.category;
        if (!v.includes(p.localisation)) v[index] = p.localisation;
      });

      setCategories(c);
      setCities(v);
    }
  }, [filteredProducts]);

  /* Met à jour la liste filtrée de produits lorsque les filtres changent */
  useEffect(() => {
    if (products) filterProducts();
  }, [filterProducts, products]);

  const [formDataAdd, setFormDataAdd] = useState({
    name: "",
    phone: "",
    title: "",
    description: "",
  });

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setFormDataAdd((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateAdd = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    createAdd.mutate({
      name: formDataAdd.name,
      phone: formDataAdd.phone,
      title: formDataAdd.title,
      description: formDataAdd.description,
    });

    setOpenDialog(false);
  };

  return (
    <div className="min-h-screen bg-[#F7F9F4] p-6">
      <div className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between">
          <h1 className="mb-8 text-4xl font-bold text-[#2C5F2D]">
            Nos produits
          </h1>
          <Dialog open={openDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" onClick={() => setOpenDialog(true)}>
                Poster une demande
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Poster une demande</DialogTitle>
                <DialogDescription>
                  Poster votre besoin spécifique ici.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 items-center gap-4">
                  <Label htmlFor="name" className="block">
                    Votre nom
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    onChange={handleChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-1 items-center gap-4">
                  <Label htmlFor="phone" className="block">
                    Votre numéro de téléphone
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    onChange={handleChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-1 items-center gap-4">
                  <Label htmlFor="title" className="block">
                    Le titre de votre besoin
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    onChange={handleChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-1 items-center gap-4">
                  <Label htmlFor="description" className="block">
                    Votre besoin
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    onChange={handleChange}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setOpenDialog(false)}
                  >
                    Fermer
                  </Button>
                </DialogClose>
                <Button type="submit" onClick={handleCreateAdd}>
                  Enregistrer
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {/* Filters */}
          <div className="space-y-6 lg:col-span-1">
            <Card className="bg-white shadow-md">
              <CardHeader>
                <CardTitle className="text-[#2C5F2D]">Filtres</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="search">Recherche</Label>
                  <Input
                    id="search"
                    placeholder="Rechercher des produits..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="category">Catégorie</Label>
                  <Select
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="#">Toutes les catégories</SelectItem>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="location">Ville</Label>
                  <Select
                    value={selectedLocation}
                    onValueChange={setSelectedLocation}
                  >
                    <SelectTrigger id="location">
                      <SelectValue placeholder="Choisir une ville" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="#">Toutes les villes</SelectItem>
                      {cities.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Prix</Label>
                  <Slider
                    min={0}
                    max={20}
                    step={1}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mt-2"
                  />
                  <div className="mt-2 flex justify-between">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ads Section */}
            <Card className="bg-white shadow-md">
              <CardHeader>
                <CardTitle className="text-[#2C5F2D]">
                  Annonces du marché
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="needs">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="needs">Besoin</TabsTrigger>
                    <TabsTrigger value="training">Formation</TabsTrigger>
                  </TabsList>
                  <TabsContent value="needs">
                    {adds?.map((ad, index) => (
                      <Card key={index} className="mt-4">
                        <CardHeader>
                          <CardTitle className="font-semibold">
                            {ad.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p>{ad.description}</p>
                        </CardContent>
                        <CardFooter className="flex flex-col text-[#2C5F2D]">
                          <div className="flex w-full items-center gap-4">
                            <UserRound className="size-5" />
                            {ad.name}
                          </div>
                          <div className="flex w-full items-center gap-4">
                            <Phone className="size-5" />
                            {ad.phone}
                          </div>
                          <div className="flex w-full items-center gap-4">
                            <Calendar className="size-5" />
                            {format(ad.createdAt, "MMM d, h:mm a")}
                          </div>
                        </CardFooter>
                      </Card>
                    ))}
                  </TabsContent>
                  <TabsContent value="training">
                    {ads
                      .filter((ad) => ad.type === "training")
                      .map((ad, index) => (
                        <Card key={index} className="mt-4">
                          <CardHeader>
                            <CardTitle className="text-sm font-semibold">
                              {ad.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-xs">{ad.description}</p>
                          </CardContent>
                        </Card>
                      ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Product Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredProducts?.map((product) => (
                <Card
                  key={product.slug}
                  className="flex flex-col bg-white shadow-md transition-shadow hover:shadow-lg"
                >
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_PATH_URL}/image/${product.file}`}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="h-48 w-full object-contain"
                  />
                  <CardHeader>
                    <div className="mb-2 flex items-center justify-between">
                      <CardTitle className="text-[#2C5F2D]">
                        {product.name}
                      </CardTitle>
                      <div className="flex items-center">
                        <div className="mr-2 size-6 overflow-hidden rounded-full bg-primary/10">
                          <Image
                            src={`${process.env.NEXT_PUBLIC_API_PATH_URL}/image/${product.companyAvatar}`}
                            alt={product.name}
                            width={24}
                            height={24}
                            className="h-24 w-full rounded-full object-contain"
                          />
                        </div>
                        <span className="line-clamp-1 text-sm text-muted-foreground">
                          {product.company}
                        </span>
                      </div>
                    </div>
                    <CardDescription>
                      <Badge variant="secondary" className="font-semibold">
                        {product.category}
                      </Badge>{" "}
                      - {product.localisation}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grow">
                    <div
                      dangerouslySetInnerHTML={{ __html: product.description }}
                      className="mb-4 text-sm text-gray-600"
                    />
                    <p className="text-2xl font-bold text-[#97BC62]">
                      {formatPrice(product.basePrice.toFixed(2))}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Link href={`/product/${product.slug}`}>
                      <Button className="w-full bg-[#FFB302] text-[#2C5F2D] hover:bg-[#FFA500]">
                        Commander
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Categories Description */}
        <div className="mt-12">
          <h2 className="mb-4 text-2xl font-bold text-[#2C5F2D]">
            Catégories de produits
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Card key={category} className="bg-white shadow-md">
                <CardHeader>
                  <CardTitle className="text-[#2C5F2D]">{category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    {category === "CASSAVA"
                      ? description[0]
                      : category === "CORN"
                      ? description[1]
                      : description[2]}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
