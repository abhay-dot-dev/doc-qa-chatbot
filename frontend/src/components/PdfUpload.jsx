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
        <div className='shrink-0 p-4 flex flex-col items-center gap-2'>
            <input
                className='w-full px-3 py-1.5 text-center cursor-pointer'
                type="file"
                accept='.pdf'
                onChange={(e) => setFile(e.target.files[0])} />

            <button
                className="px-3 py-1.5 rounded-md bg-green-500 text-white cursor-pointer hover:bg-green-600 transition-colors duration-300"
                onClick={handleUpload}>Upload</button>

            <p>{message}</p>
        </div>
    )
}

export default PdfUpload