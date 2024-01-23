const getAuth = () => {
    const auth = localStorage.getItem('auth')

    if (auth) {
        return JSON.stringify(auth)
    } else {return auth}
}

export default getAuth