import { useState, useRef, useEffect } from 'react';
import './NavTabs.css';
import { navTabs } from '../../data/mockData';

interface NavTabsProps {
  activeTab: string;
  onChange: (tab: string) => void;
}

export default function NavTabs({ activeTab, onChange }: NavTabsProps) {
  const tabsRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const el = tabsRef.current?.querySelector('.nav-tab--active') as HTMLElement;
    if (el) {
      setIndicatorStyle({ left: el.offsetLeft, width: el.offsetWidth });
    }
  }, [activeTab]);

  return (
    <div className="nav-tabs-wrap">
      <div className="nav-tabs scroll-x" ref={tabsRef}>
        {navTabs.map(tab => (
          <button
            key={tab}
            className={`nav-tab ${activeTab === tab ? 'nav-tab--active' : ''}`}
            onClick={() => onChange(tab)}
          >
            {tab}
          </button>
        ))}
        <span
          className="nav-tabs__indicator"
          style={{ left: indicatorStyle.left, width: indicatorStyle.width }}
        />
      </div>
    </div>
  );
}
