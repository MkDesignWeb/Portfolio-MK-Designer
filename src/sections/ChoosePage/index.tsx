'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './styles.module.scss';

import LogoW from '../../../assets/logo/Logo MK Dev.svg';
import LogoG from '../../../assets/logo/Logo MK.svg';
import Image from 'next/image';
import ShineSVG from '../../../assets/SVG/shine-initial.svg';
import ShineMobileSVG from '../../../assets/SVG/shine-initial-mobile.svg';

export const ChoosePage = () => {
  const router = useRouter();
  const [progress, setProgress] = useState({ left: 0, right: 0 });
  const [activeTimer, setActiveTimer] = useState<NodeJS.Timeout | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detecta se é mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= parseInt("769px"));
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleInteraction = (side: 'left' | 'right', isStart: boolean) => {
    if (!isMobile) {
      // No desktop, redireciona imediatamente
      if (isStart) {
        router.push(side === 'left' ? '/frontend' : '/design');
      }
      return;
    }

    // Comportamento mobile com barra de progresso
    if (isStart) {
      const timer = setInterval(() => {
        setProgress(prev => ({
          ...prev,
          [side]: Math.min(prev[side] + 1, 100)
        }));
      }, 30);
      setActiveTimer(timer);
    } else {
      if (activeTimer) {
        clearInterval(activeTimer);
        setActiveTimer(null);
        setProgress({ left: 0, right: 0 });
      }
    }
  };

  useEffect(() => {
    if (isMobile) {
      if (progress.left >= 100) {
        router.push('/frontend');
      } else if (progress.right >= 100) {
        router.push('/design');
      }
    }
  }, [progress, router, isMobile]);

  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <div 
          className={styles.side}
          onMouseDown={() => handleInteraction('left', true)}
          onMouseUp={() => handleInteraction('left', false)}
          onMouseLeave={() => handleInteraction('left', false)}
          onTouchStart={() => handleInteraction('left', true)}
          onTouchEnd={() => handleInteraction('left', false)}
        >
          <Image className={`${styles.shine} ${styles.desktop}`} src={ShineSVG} alt="" />
          <Image className={`${styles.shine} ${styles.mobile}`} src={ShineMobileSVG} alt="" />

          <div className={styles.holdHere}>
            <span>Segure aqui <br />para escolher</span>
          </div>

          <div className={styles.text}>
            <h2>FRONT-END</h2>
            <p>
              De uma olhada nas minhas especificações em desenvolvimento de sites.
            </p>
          </div>
          <Image src={LogoW} alt="Logo MK Dev" />
          <div 
            className={styles.progressBar} 
            style={{ 
              '--progress-width': `${progress.left}%` 
            } as React.CSSProperties} 
          />
        </div>

        <div className={styles.divider}>
          <span className={styles.line} />
          <span>choose <br /> your destiny</span>
          <span className={styles.line} />
        </div>

        <div 
          className={styles.side}
          onMouseDown={() => handleInteraction('right', true)}
          onMouseUp={() => handleInteraction('right', false)}
          onMouseLeave={() => handleInteraction('right', false)}
          onTouchStart={() => handleInteraction('right', true)}
          onTouchEnd={() => handleInteraction('right', false)}
        >
          <Image className={`${styles.shine} ${styles.desktop}`} src={ShineSVG} alt="" />
          <Image className={`${styles.shine} ${styles.mobile}`} src={ShineMobileSVG} alt="" />

          <div className={styles.holdHere}>
            <span>Segure aqui <br />para escolher</span>
          </div>

          <div className={styles.text}>
            <h2>D. GRÁFICO</h2>
            <p>
              De uma olhada nas minhas especificações em design gráfico para web.
            </p>
          </div>
          <Image src={LogoG} alt="Logo MK Design" />
          <div 
            className={styles.progressBar} 
            style={{ 
              '--progress-width': `${progress.right}%` 
            } as React.CSSProperties} 
          />
        </div>
      </div>
    </section>
  );
};
