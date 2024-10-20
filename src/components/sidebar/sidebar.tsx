"use client";
import { useState } from 'react';

interface Exposicao {
  categoria: string;
  anos?: {
    ano: number;
    titulos: string[];
  }[];
  titulos?: string[];
}

interface Artista {
  letra: string;
  nomes: string[];
}

interface SidebarProps {
  tipo: 'exposicoes' | 'artistas';
  exposicoes?: Exposicao[];
  artistas?: Artista[];
}

const Sidebar: React.FC<SidebarProps> = ({ tipo, exposicoes, artistas }) => {
  const [pesquisa, setPesquisa] = useState('');

  const handlePesquisa = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPesquisa(e.target.value);
  };

  const renderExposicoes = () => {
    return (
      <div>
        {exposicoes?.map((expo) => (
          <div key={expo.categoria} className="mb-8">
            <h2 className="text-xl font-bold">{expo.categoria}</h2>
            {expo.anos ? (
              expo.anos.map((ano) => (
                <div key={ano.ano} className="ml-4">
                  <h3 className="text-lg font-semibold">{ano.ano}</h3>
                  <ul>
                    {ano.titulos.map((titulo) => (
                      <li key={titulo} className="ml-4 border-b">
                        {titulo}
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              <ul className="ml-4">
                {expo.titulos?.map((titulo) => (
                  <li key={titulo} className="border-b">
                    {titulo}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderArtistas = () => {
    return (
      <div>
        {artistas?.map((artista) => (
          <div key={artista.letra} className="mb-8">
            <h2 className="text-xl font-bold">{artista.letra}</h2>
            <ul className="ml-4">
              {artista.nomes.map((nome) => (
                <li key={nome} className="border-b">
                  {nome}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  };

  return (
    <aside className="w-64 bg-gray-100 p-6">
      {/* Barra de Pesquisa */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Pesquisa"
          value={pesquisa}
          onChange={handlePesquisa}
          className="w-full p-2 border-b"
        />
      </div>

      {/* Conteúdo adaptável */}
      {tipo === 'exposicoes' ? renderExposicoes() : renderArtistas()}
    </aside>
  );
};

export default Sidebar;
