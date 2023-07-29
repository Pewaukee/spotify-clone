import { useState } from "react";
import axios from "axios";

export default function usePicture() {
    const [picture, setPicture] = useState<any>(null);
    const [pictureError, setPictureError] = useState(null);
    const [pictureLoading, setPictureLoading] = useState(false);

    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    const fetchPicture = async () => {
        setPictureLoading(true);
        try {
            const response = await axios.get(`${baseUrl}/api/picture/picture`);

            console.log(response.data);
            setPicture(response.data);
            setPictureLoading(false);
        } catch (error: any) {
            console.error(error);
            setPictureError(error);
        }
    }

    return { picture, pictureError, pictureLoading, fetchPicture };
}