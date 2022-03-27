import axios from 'axios';

export const loginUser = async (credentials) => {
    console.log('credentials', credentials.email);
    try {
        const res = await axios.post('https://www.mecallapi.com/api/login', { username: credentials.email, password: credentials.password });
        console.log('res', res);
        return res.status;
    } catch (err) {
        console.log(err.message);
    }
}



// export const loginUser = async (credentials) => {
//     console.log('credentials', credentials);
//     console.log('credentialDos', JSON.stringify(credentials));
//     console.log('Entro a login user');
//     return fetch('https://www.mecallapi.com/api/login', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(credentials)
//     })
//         .then(data => data.json())
// }