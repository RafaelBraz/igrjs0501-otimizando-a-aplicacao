import { memo } from 'react';
import { Button } from './Button';

import '../styles/sidebar.scss';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface SideBarProps {
  genres: GenreResponseProps[];
  selectedGenreId: number;
  setSelectedGenreId(id: number): void;
}

function SideBarComponent({ genres, selectedGenreId, setSelectedGenreId }: SideBarProps) {

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <nav className="sidebar">
        <span>Watch<p>Me</p></span>

        <div className="buttons-container">
          {genres.map(genre => (
            <Button
              key={String(genre.id)}
              title={genre.title}
              iconName={genre.name}
              onClick={() => handleClickButton(genre.id)}
              selected={selectedGenreId === genre.id}
            />
          ))}
        </div>

      </nav>
  )
}

export const SideBar = memo(SideBarComponent, (prevProps, nextProps) => {
  if (prevProps.selectedGenreId !== nextProps.selectedGenreId) {
    return false
  }

  if (prevProps.genres.length !== nextProps.genres.length) {
    return false
  }

  for(let i = 0; i < prevProps.genres.length; i++) {
    if (!Object.is(prevProps.genres[i], nextProps.genres[i])) {
      return false
    }
  }

  return true
})