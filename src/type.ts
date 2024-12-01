export type ProductDTO = {
  name: string;
  slug: string;
  code: string;
  type: string;
  description: string;
  category: string;
  unit: string;
  isDerivedProduct: boolean;
  basePrice: number;
  isPerishable: boolean;
  quantity: number;
  company: string;
  companyAvatar: string;
  companyPhones: string[];
  pricings: Array<{
    id: string;
    description: string;
    parameterType: string;
    price: number;
  }>;
  localisation: string;
  file: string;
  createdAt: string;
  updatedAt: string;
};

export type ProductRequest = {
  name: string;
  code: string;
  type: string;
  description: string;
  category: string;
  unit: string;
  isDerivedProduct: string;
  basePrice: string;
  isPerishable: string;
  file: File;
  pricings: Array<string>;
  localisation: string;
  quantity: string;
};

export type Filter = {
  categories: Array<string>;
  city: string;
  keyword: string;
};

export type Message = {
  id: string;
  senderType: string;
  content: string;
  createdAt: string;
};

export type Discussion = {
  id: string;
  product: string;
  user: {
    id: string;
    name: string;
    phone: string;
    createdAt: string;
  };
  messages: Array<Message>;
  createdAt: string;
  status: string;
  sellerValidated: boolean;
  clientValidated: boolean;
};

export type DiscussionRequest = {
  slug: string;
  name: string;
  phone: string;
};

export type MessageRequest = {
  id: string;
  senderType: string;
  content: string;
};

export type CompanyDTO = {
  name: string;
  email: string;
  phones: string[];
  chainValueFunctions: string[];
  localisation: string;
  serviceType: string;
  merchantCode: string;
  user: string;
  kycStatus: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
};
