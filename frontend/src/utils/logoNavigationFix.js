export const logoNavigationFix = {
  handleLogoClick: (e, navigate, location) => {
    e.preventDefault();

    const isHome = location.pathname === '/';
    const hasQuery = location.search.length > 0;

    if (isHome && hasQuery) {
      navigate('/', { replace: true });
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.dispatchEvent(new CustomEvent('homeReset'));
    } else if (isHome) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  }
};
