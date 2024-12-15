import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const ArtistPage = () => {
    const router = useRouter();
    const { artistId } = router.query; // Obtendo o ID do artista da URL
    const [artist, setArtist] = useState(null);

    useEffect(() => {
        if (artistId) {
            const fetchArtist = async () => {
            };

            fetchArtist();
        }
    }, [artistId]);

    if (!artist) return <div>Loading...</div>;

    return (
        <div>
            <h1>{"artist.name"}</h1>
            <p>{"artist.bio"}</p>
            {/* Adicione mais informações sobre o artista aqui */}
        </div>
    );
};

export default ArtistPage;
