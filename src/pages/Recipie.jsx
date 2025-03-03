import { useState, useEffect } from 'react';
import axios from 'axios';

const Recipie = () => { // ✅ Component function starts here
    const [data, setData] = useState(null);

    // ✅ Define fetchRecipie function inside the component
    const fetchRecipie = async () => {
        try {
            const response = await axios.get('');
            setData(response.data);
        } catch (error) {
            console.error("Error fetching recipe:", error);
        }
    };

    useEffect(() => {
        fetchRecipie();
    }, []);

    // ✅ Ensure return statement is inside the function
    return (
        <div>
            <h1>Recipe Page</h1>
            {data ? <p>{data.title}</p> : <p>Loading...</p>}
        </div>
    );
}; // ✅ Component function ends here

export default Recipie;
