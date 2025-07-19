import React, { useState } from 'react';
import { supabase } from './supabaseClient';

export default function Upload() {
  const [title, setTitle] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [location, setLocation] = useState('');
  const [coords, setCoords] = useState({ lat: null, lng: null });

  const handleUpload = async () => {
    if (!imageFile) return;

    const { data: imageData, error: uploadError } = await supabase.storage
      .from('garbage-uploads')
      .upload(`uploads/${Date.now()}_${imageFile.name}`, imageFile);

    if (uploadError) return alert("Image Upload Failed");

    const imageUrl = supabase.storage
      .from('garbage-uploads')
      .getPublicUrl(imageData.path).publicUrl;

    await supabase.from('reports').insert([
      {
        title,
        image_url: imageUrl,
        location,
        lat: coords.lat,
        lng: coords.lng
      }
    ]);

    alert("Uploaded!");
  };

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setCoords({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      });
    });
  };

  return (
    <div>
      <h2>Upload Garbage Spot</h2>
      <input placeholder="Title" onChange={e => setTitle(e.target.value)} />
      <input placeholder="Location Description" onChange={e => setLocation(e.target.value)} />
      <input type="file" onChange={e => setImageFile(e.target.files[0])} />
      <button onClick={getCurrentLocation}>Get My Location</button>
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}
