import React from "react";

export async function recitersApi(){
   const res = await fetch('https://api.mp3quran.net/reciters/_arabic.json');
   return await res.json();
}

export async function surasName(){
   const res = await fetch('https://api.mp3quran.net/reciters/_arabic_sura.json');
   return await res.json();
}