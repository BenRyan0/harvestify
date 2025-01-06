import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector'
import {initReactI18next} from 'react-i18next'


i18n.use(LanguageDetector).use(initReactI18next).init({
    debug: true,
    lng: "tl",
    fallbackLng: "en",
    returnObjects: true,
    resources:{
        en:{
            translation:{
                greeting :"Hello, Welcome",
                slogan: "Your ultimate farmers market!",
                languageLabel: "English",
                description:{
                    line1: "",
                    line2:""
                }
            },

        },
        tl:{
            translation:{
                greeting :"Tagalog Greeting",
                slogan: "Ang iyong pinakamagandang pamilihan ng mga magsasaka!",
                languageLabel: "Tagalog"
            },


        },
        bs:{
            translation:{
                greeting :"Bisaya Greeting ",
                slogan: "Ang imong pinakalabing maayo nga merkado sa mga mag-uuma!",
                languageLabel: "Bisaya"
            },


        },
        md:{
            translation:{
                greeting :"Mandaya Greeting",
                slogan: "Anan kawumanan ka mas kamatoongan ng merkado han mga parag-uma!",
                languageLabel: "Mandaya"
            },

        },
    }
})