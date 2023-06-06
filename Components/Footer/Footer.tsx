import DarkModeToggle from '../DarkModeToggle/DarkModeToggle';
function Footer() {
  return (
    <div
      style={{
        backgroundColor: 'var(--footer_background_color)',
        width: '100%',
        height: '50px',
        top: 'calc(100vh - 50px)',
        display: 'flex',
        position: 'absolute',
        alignItems: 'center',
        paddingLeft: '1em',
      }}
    >
      <DarkModeToggle />
    </div>
  );
}

export default Footer;
