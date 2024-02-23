const navbarLinks = [
    {title:"Dashboard", link: "/dashboard"},
    {title:"Ask", link: "/ask"},
    {title:"Chat", link:"/chat"}
]

const footerItems = [
    {title:"About", link:""},
    {title:"Privacy Policy", link:""},
    {title:"Contact", link:""}
]

const graphItems = ['LAC','Chemistry','BME','BCE','Graphics']

const graphItemColors = {
    LAC: "#1f72de",
    Chemistry: "#069e16",
    BME: "#cf1f1f",
    BCE: "#e0c424",
    Graphics: "#b51abd",
}

const apiBase = import.meta.env.VITE_API_URL


export {navbarLinks,apiBase,footerItems, graphItems, graphItemColors}