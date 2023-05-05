import DarkModeToggle from '../DarkModeToggle/DarkModeToggle';
function Footer() {
  return (
    <div
      style={{
        backgroundColor: 'var(--footer_background_color)',
        marginTop: '40px',
        width: '100%',
        height: '150px',
        position: 'relative',
        bottom: '0px',
        display: 'flex',
        padding: '20px',
      }}
    >
      <DarkModeToggle />
    </div>
  );
}

export default Footer;
