import React, { useEffect } from "react";
import axios from "axios";

const Fib = () => {
    const [seenIndexes, setSeenIndexes] = React.useState([]);
    const [values, setValues] = React.useState({});
    const [index, setIndex] = React.useState("");

    const fetchValues = async () => {
        try {
            const currentValues = await axios.get("/api/values/current");
            setValues(currentValues.data);
        } catch (e) {
            console.error(e);
        }
    };

    const fetchIndexes = async () => {
        const currentSeenIndexes = await axios.get("/api/values/all");
        setSeenIndexes(currentSeenIndexes.data);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await axios.post("/api/values", {
            index: index,
        });

        setIndex("");
    };

    const renderSeenIndexes = () => {
        return seenIndexes.map(({ number }) => number).join(", ");
    };

    const renderValues = () => {
        const entries = [];

        for (let key in values) {
            entries.push(
                <div key={key}>
                    For index {key} I calculated {values[key]}
                </div>
            );
        }

        return entries;
    };

    useEffect(() => {
        fetchValues();
        fetchIndexes();
    }, [index]);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Enter your index</label>
                <input
                    value={index}
                    onChange={(event) => setIndex(event.target.value)}
                />
                <button>Submit</button>
            </form>

            <h3>Indexes I have seen</h3>
            {renderSeenIndexes()}

            <h3>Calculated Values:</h3>
            {renderValues()}
        </div>
    );
};

export default Fib;
