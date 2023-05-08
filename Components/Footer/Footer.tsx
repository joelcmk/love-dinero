import DarkModeToggle from '../DarkModeToggle/DarkModeToggle';
function Footer() {
  return (
    <div
      style={{
        backgroundColor: 'var(--footer_background_color)',
        marginTop: '40px',
        width: '100%',
        height: '100px',
        position: 'fixed',
        bottom: '0',
        left: '0',
        display: 'flex',
        padding: '20px',
      }}
    >
      <DarkModeToggle />
    </div>
  );
}

export default Footer;
