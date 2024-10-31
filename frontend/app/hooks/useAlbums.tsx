import { useQuery } from '@tanstack/react-query';

export const useAlbums = () => {
    const { isLoading, error, data } = useQuery({
        queryKey: ['albumsObject'],
        queryFn: async () => {
            const response = await fetch('http://localhost:8080/getalbum')
            const albumObject =  await response.json();
            return albumObject.items.filter(album => album.album_type === 'album');
        },
    });

    return { isLoading, error, data };
};