import { useTheme } from '../../hooks/useTheme';
import { RiPaletteLine } from 'react-icons/ri';
import style from './ThemeSwitcher.module.css';

export default function ThemeSwitcher() {
  const { currentTheme, toggleTheme } = useTheme();

  const getThemeIcon = () => {
    switch (currentTheme) {
      case 'blue':
        return '🔵';
      case 'red':
        return '🔴';
      case 'green':
        return '🟢';
      default:
        return '🔵';
    }
  };

  return (
    <button 
      className={style.themeSwitcher}
      onClick={toggleTheme}
      title={`Mevcut tema: ${currentTheme} (Tıklayarak değiştir)`}
    >
      <RiPaletteLine className={style.icon} />
      <span className={style.themeIndicator}>{getThemeIcon()}</span>
    </button>
  );
}
