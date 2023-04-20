import { useDocument } from '../useDocument';

function DarkModeToggle() {
  const document = useDocument();
  function setDarkMode() {
    document?.querySelector('body')?.setAttribute('data-theme', 'dark');
  }
  function setLightMode() {
    document?.querySelector('body')?.setAttribute('data-theme', 'light');
  }

  setDarkMode();

  return (
    <>
      <button onClick={setDarkMode}>Dark</button>
      <button onClick={setLightMode}>Light</button>
    </>
  );
}

export default DarkModeToggle;
