import React, { useState } from 'react'
import { apiRequest } from '../services/api';

const PdfUpload = () => {

    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");

    async function handleUpload() {
        try {
            if (file) {

                // preparing FormData
                const formData = new FormData();
                formData.append("file", file);

                 // calling API
                const response = await apiRequest("/upload", {
                    method: "POST",
                    body: formData
                });

                // success message on UI
                setMessage(response.message);
            }
        } catch (error) {
            // catching and setting the error message
            setMessage(error.message);
        }
    }

    return (
        <div>
            <input
                type="file"
                accept='.pdf'
                onChange={(e) => setFile(e.target.files[0])} />

            <button onClick={handleUpload}>Upload</button>

            <p>{message}</p>
        </div>
    )
}

export default PdfUpload