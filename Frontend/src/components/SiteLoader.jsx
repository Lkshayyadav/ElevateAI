import React, { useEffect, useState } from 'react';
import '../styles/site-loader.scss';

export default function SiteLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // If landing on an interview detail route, do not show the global loader
    const initialPath = window.location.pathname || '';
    let initialTimeout = null;
    if (initialPath.startsWith('/interview')) {
      setVisible(false);
    } else {
      // show initial loader for at least 600ms
      initialTimeout = setTimeout(() => setVisible(false), 600);
    }

    // helper to dispatch locationchange when history methods are called
    const wrapHistoryMethod = (method) => {
      const original = history[method];
      return function() {
        const result = original.apply(this, arguments);
        const event = new Event('locationchange');
        window.dispatchEvent(event);
        return result;
      };
    };

    if (!history._wrapped) {
      history.pushState = wrapHistoryMethod('pushState');
      history.replaceState = wrapHistoryMethod('replaceState');
      history._wrapped = true;
    }

    // show loader on location change
    let navTimer = null;
    const handleLocationChange = () => {
      clearTimeout(navTimer);
      const path = window.location.pathname || '';
      // Suppress global loader when navigating to interview detail pages
      if (path.startsWith('/interview')) {
        setVisible(false);
        return;
      }
      setVisible(true);
      // keep loader for at least 550ms for a smooth UX
      navTimer = setTimeout(() => setVisible(false), 650);
    };

    window.addEventListener('locationchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);

    return () => {
      clearTimeout(initialTimeout);
      clearTimeout(navTimer);
      window.removeEventListener('locationchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="site-loader" aria-hidden={!visible}>
      <div className="site-loader-card">
        <div className="site-loader-ring" />
        <div className="site-loader-text">
          <h3>Loading...</h3>
          <p>Preparing the page — one moment please.</p>
        </div>
      </div>
    </div>
  );
}
