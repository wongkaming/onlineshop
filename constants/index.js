export const navLinks = [
    {
        id: "/shop",
        title: "Shop",
    },
    {
        id: "/event",
        title: "Event",
    },
    {
        id: "/newin",
        title: "New in",
    },
    {
        id: "/accessories",
        title: "Accessories",
    },
];

import { CiFaceSmile, CiReceipt, CiMoneyCheck1, CiMapPin, CiMaximize1, CiLogin, CiPalette } from "react-icons/ci";

 
export const profileNavLinks = [
    {
        id: "/account",
        title: "My Account",
        icon: <CiFaceSmile className="w-[20px] h-[20px]  mr-2" />,
    },
    {
        id: "/order",
        title: "Orders",
        icon: <CiReceipt className="w-[20px] h-[20px]  mr-2" />,
    },
    {
        id: "/coupon",
        title: "Coupons",
        icon: <CiMoneyCheck1 className="w-[20px] h-[20px]  mr-2" />,
    },
    {
        id: "/address",
        title: "Address Book",
        icon: <CiMapPin className="w-[20px] h-[20px]  mr-2" />,
    },
];

export const loginNavLinks = [
    {
        id: "/login",
        title: "Login",
        icon: <CiLogin className="w-[20px] h-[20px]  mr-2" />,
    },
    {
        id: "/register",
        title: "Register",
        icon: <CiPalette className="w-[20px] h-[20px]  mr-2" />,
    },
];


export const windowIcon = [
    {
        icon: <CiMaximize1 className="w-[20px] h-[20px]" />,
    },
];


export const CategoryList = [
    {
        subtitle: "Categories",
        title: ['Tops', 'Dresses', 'Bottoms', 'Matching sets', 'Outerwear', 'Knitwear', 'Jumpsuits', 'Denim', 'Activewear', 'Bags', 'Accessories', 'Home']
    },
    {
        subtitle: "Tags",
        title: ['Bestsellers', 'Sales', 'New']
    },
    {
        subtitle: "Styles",
        title: ['Cool', 'Cute', 'Dreamy', 'Elegant', 'Festive', 'Romantic', 'Free', 'Grunge', 'Minimalist', 'Nostalgic', 'Sexy']
    },
];


  
  