import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n.use(LanguageDetector).use(initReactI18next).init({
    debug: true,
    lng: "en",
    fallbackLng: "en",
    returnObjects: true,
    resources: {
        en: {
            translation: {
                greeting: "Hello, Welcome",
                slogan: "Your ultimate farmers market!",
                languageLabel: "English",
                description: {
                    line1: "",
                    line2: ""
                },
                allCategories: "All Categories",
                search: "Search",
                selectCategory: "Select Category",
                home: "Home",
                products: "Products",
                sellers: "Sellers",
                startSelling: "Start Selling",
                featuredProducts: "Featured Products",
                categories: "Categories",
                price: "Price",
                expectedYield: "Expected Yield ()",
                sellerRating: "Seller Rating",
                latestProducts: "Latest Products",
                dontHaveAccount: "Don't Have An Account Yet?",
                applyForTraderAccount: "Apply for Trader Account",
                becomeSellerFarmer: "Become a Seller/Farmer",
                farmerLogin: "Farmer Login",
                login: "LOGIN"
            },
        },
        tl: {
            translation: {
                greeting: "Tagalog Greeting",
                slogan: "ANG IYONG PINAKA-MAGANDANG PAMILIHAN SA MAGSASAKA!",
                languageLabel: "Tagalog",
                allCategories: "Lahat ng Kategorya",
                search: "Paghahanap",
                selectCategory: "Pumili ng Kategorya",
                home: "Tahanan",
                products: "Mga Produkto",
                sellers: "Mga Nagbebenta",
                startSelling: "Magsimula ng Magbenta",
                featuredProducts: "Mga Tampok na Produkto",
                categories: "Mga Kategorya",
                price: "Presyo",
                expectedYield: "Inaasahang Kita ()",
                sellerRating: "Rating ng Nagbebenta",
                latestProducts: "Pinakabagong Produkto",
                dontHaveAccount: "Wala Ka Pang Account?",
                applyForTraderAccount: "Mag-apply para sa Trader Account",
                becomeSellerFarmer: "Maging Nagbebenta/Magsasaka",
                farmerLogin: "Mag-login bilang Magsasaka",
                login: "MAG-LOGIN"
            },
        },
        bs: {
            translation: {
                greeting: "Bisaya Greeting",
                slogan: "Ang imong pinakalabing maayo nga merkado sa mga mag-uuma!",
                languageLabel: "Bisaya",
                allCategories: "Tanan nga Kategorya",
                search: "Pangitaa",
                selectCategory: "Pili-a ang Kategorya",
                home: "Balay",
                products: "Mga Produkto",
                sellers: "Mga Magbabaligya",
                startSelling: "Pagsugod sa Pagbaligya",
                featuredProducts: "Mga Tampok nga Produkto",
                categories: "Mga Kategorya",
                price: "Presyo",
                expectedYield: "Gilauman nga Ani ()",
                sellerRating: "Rating sa Magbabaligya",
                latestProducts: "Pinakabag-ong mga Produkto",
                dontHaveAccount: "Wala pa kay Account?",
                applyForTraderAccount: "Pag-apply sa Trader Account",
                becomeSellerFarmer: "Mahimong Magbabaligya/Mag-uuma",
                farmerLogin: "Mag-login isip Mag-uuma",
                login: "LOG-IN"
            },
        },
        md: {
            translation: {
                greeting: "Mandaya Greeting",
                slogan: "Anan kawumanan ka mas kamatoongan ng merkado han mga parag-uma!",
                languageLabel: "Mandaya",
                allCategories: "Amin nga mga Kategoriya",
                search: "Pangitaa",
                selectCategory: "Pili-on an Kategorya",
                home: "Balay",
                products: "Mga Produkto",
                sellers: "Mga Magbaligya",
                startSelling: "Pagsugod sa Pagbaligya",
                featuredProducts: "Mga Tampok nga Produkto",
                categories: "Mga Kategorya",
                price: "Presyo",
                expectedYield: "Gilauman nga Pag-ani ()",
                sellerRating: "Rating han Magbaligya",
                latestProducts: "Pinakabag-o nga mga Produkto",
                dontHaveAccount: "Wala pa kay Account?",
                applyForTraderAccount: "Pag-aplikar ha Trader Account",
                becomeSellerFarmer: "Mahimo nga Magbaligya/Mag-uuma",
                farmerLogin: "Pag-login han Mag-uuma",
                login: "LOG-IN"
            },
        },
    }
});
