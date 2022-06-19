import React from 'react'
import axios from 'axios';

export async function Reciters() {
    const res = await axios.post('https://api.mp3quran.net/reciters/_arabic.json');
    return res;
}