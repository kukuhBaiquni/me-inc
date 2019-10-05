import axios from 'axios';

const _getData =() => {
    try {
        const response = await axios(config);
        return response;
    } catch(error) {
        
    }
}