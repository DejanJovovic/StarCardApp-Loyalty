import icons from "./icons";
import images from "@/constants/images";

export const rootData = [
    {image: images.rootImage1, description: "Loyalty cards"},
    {image: images.rootImage2, description: "Innovation"},
    {image: images.rootImage3, description: "Revolution"},
]

export const profile = [
    {
        title: "My Cards",
        icon: icons.card,
    },
    {
        title: "Payments",
        icon: icons.wallet,
    },
    {
        title: "Profile",
        icon: icons.person,
    },
    {
        title: "Notifications",
        icon: icons.bell,
    },
    {
        title: "Security",
        icon: icons.shield,
    },
    {
        title: "Language",
        icon: icons.language,
    },
    {
        title: "Help Center",
        icon: icons.info,
    },
    {
        title: "Invite Friends",
        icon: icons.people,
    },
];

export const cardData = [
    { title: "Works \nperfectly", description: "with both iPhone \nand Android", icon: icons.checkMark,},
    { title: "No app \nrequired", description: "to share your profile \nwith other people", icon: require("../assets/images/close-menu.png") },
    { title: "Easy to \nupdate", description: "all your infos \nas it changes", icon: icons.twoArrows },
];

export const howItWorksData = [
    {image: images.howItWorks1, step: "Step 1", title: "Sign up to your \nnew account", description: "and personalize your \ndigital business card.\nAdd all of your contact \ninformation."},
    {image: images.howItWorks2, step: "Step 2", title: "Activating your \nSTARcard", description: "is made simple so you can \nget to connecting faster \nthen ever before."},
    {image: images.howItWorks3, step: "Step 3", title: "Share your digital \ninformation", description: "with a single tap. You'll \nbe able to transfer your \nprofile in a second."},
]