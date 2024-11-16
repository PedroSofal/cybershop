import useTheme from '@hooks/useTheme';
import CircleIconContainer from '@components/ui/containers/CircleIconContainer';
import SuspendedButton from '@components/ui/suspended/SuspendedButton';
import { Contrast } from '@mui/icons-material';

function ThemeToggle() {
  const { toggleLightDark } = useTheme();

  return (
    <SuspendedButton
      ariaLabel="alternar tema claro/escuro"
      onClick={toggleLightDark}
    >
      <CircleIconContainer><Contrast /></CircleIconContainer>
    </SuspendedButton>
  );
}

export default ThemeToggle;