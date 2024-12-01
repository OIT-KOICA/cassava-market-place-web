import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Cookies from "js-cookie";

export const savePhoneToCookie = (phone: string) => {
  Cookies.set("userPhone", phone, {
    expires: 7,
    secure: true,
    sameSite: "Strict",
  });
};

export const getPhoneFromCookie = () => {
  return Cookies.get("userPhone");
};

export const formatPrice = (price: string) => {
  return price + " FCFA";
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
