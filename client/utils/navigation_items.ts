interface INavigationItems {
    id: number,
    text: string,
    link: string
}

export const naviagtion_items: INavigationItems[] = [
    {
        id: 0,
        text: "Home",
        link: "/"
    },
    {
        id: 1,
        text: "Help",
        link: "/help"
    },
]