import React from 'react';
import Image from 'next/image';
import { Body, Heading3 } from '../headings/headings';

interface ExhibitionItem {
    title: string;
    description: string;
    artists: string;
    dates: string;
    imageUrl: string;
}

interface ArtistItem {
    name: string;
    bio: string;
    imageUrl: string;
    artworks: string[]; // lista de URLs das imagens para o carrossel
}

type SectionProps = {
    exhibitionItem?: ExhibitionItem;
    artistItem?: ArtistItem;
};

const Section: React.FC<SectionProps> = ({ exhibitionItem, artistItem }) => {
    return (
        <div className="flex flex-col space-y-8">
            {/* Badge Condicional */}
            {exhibitionItem && (
                <div className="inline-flex h-auto w-fit px-4 py-2.5 rounded-3xl border border-[#2b2b2b]">
                    <div className="text-[#2b2b2b] text-base font-extrabold font-['Neue Haas Unica']">
                        ✴ Coleção / Série X
                    </div>
                </div>
            )}

            <div className="flex flex-row justify-between">
                <div className="flex flex-col space-y-4 w-1/2">
                    {/* Título e Descrição */}
                    <Heading3 className="text-gray-900">
                        {exhibitionItem ? exhibitionItem.title : artistItem?.name}
                    </Heading3>
                    <Body className="text-gray-600">
                        {exhibitionItem ? exhibitionItem.description : artistItem?.bio}
                    </Body>

                    <div className="border-t border-gray-300 my-6" />

                    {/* Artistas e Datas (para Exposição) */}
                    {exhibitionItem && (
                        <>
                            <Body className="text-gray-800 font-medium">
                                {exhibitionItem.artists}
                            </Body>
                            <Body className="text-gray-500">
                                {exhibitionItem.dates}
                            </Body>
                        </>
                    )}

                    <div className="border-t border-gray-300 my-6" />

                    {/* Links Condicionais */}
                    <div className="flex space-x-8">
                        {exhibitionItem ? (
                            <>
                                <a href="#" className="flex items-center text-gray-800 hover:text-black">
                                    Sobre os Artistas <span className="ml-2">→</span>
                                </a>
                                <a href="#" className="flex items-center text-gray-800 hover:text-black">
                                    Obras da Exposição <span className="ml-2">→</span>
                                </a>
                            </>
                        ) : (
                            <>
                                <a href="#" className="flex items-center text-gray-800 hover:text-black">
                                    Sobre a Artista <span className="ml-2">→</span>
                                </a>
                                <a href="#" className="flex items-center text-gray-800 hover:text-black">
                                    Ver Exposições <span className="ml-2">→</span>
                                </a>
                            </>
                        )}
                    </div>
                </div>

                {/* Imagem Principal ou Carrossel */}
                <div className="sm:w-1/3 w-full">
                    {exhibitionItem ? (
                        <Image
                            src={exhibitionItem.imageUrl}
                            alt={exhibitionItem.title}
                            width={400}
                            height={400}
                            className="rounded object-cover"
                        />
                    ) : (
                        <div className="flex overflow-x-scroll space-x-4">
                            {artistItem?.artworks.map((artwork, index) => (
                                <Image
                                    key={index}
                                    src={artwork}
                                    alt={`${artistItem?.name} Artwork ${index + 1}`}
                                    width={150}
                                    height={150}
                                    className="rounded object-cover"
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Section;
