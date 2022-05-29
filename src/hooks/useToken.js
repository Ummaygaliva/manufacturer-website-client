import { useEffect, useState } from "react"
const useToken = user => {
    const [token, setToken] = useState('');
    useEffect(() => {
        const email = user?.user?.email;
        const name = user?.user?.displayName || user?.user?.name;
        const photo = user?.user?.photoURL;
        const currentUser = {
            email: email,
            user_name: name,
            photo: photo,
        };
        if (email) {
            fetch(`https://elite-toolboxes.herokuapp.com/user/${email}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(currentUser)
            })
                .then(res => res.json())
                .then(data => {
                    const accessToken = data.token;
                    localStorage.setItem('accessToken', accessToken);
                    setToken(accessToken);
                })
        }

    }, [user]);
    return [token];
}

export default useToken;