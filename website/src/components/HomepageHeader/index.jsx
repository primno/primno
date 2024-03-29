import React from 'react';
import ReactPlayer from 'react-player';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './index.module.css';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import HomeMovieUrl from '@site/static/mov/home.mp4';

export default function HomepageHeader() {
    const { siteConfig } = useDocusaurusContext();
    return (
      <header className={clsx('hero', styles.heroBanner, styles.hero)}>
        <div className="container">
          <div className='row' style={{ alignItems: 'center' }}>
            <div className='col col--6'>
              <h1 className="hero__title">Customize with Primno{/*siteConfig.title*/}</h1>
              <p className={clsx(styles.hero_subtitle)}>{siteConfig.tagline}</p>
              <div className={styles.buttons}>
                <Link
                  className={clsx("button button--secondary button--lg", styles.button)}
                  to="/docs/intro">
                  Get started
                </Link>
                <Link
                  className={clsx("button button--secondary button--outline button--lg", styles.button, styles.buttonLearnMore)}
                  to="/features">
                  Learn more
                </Link>
              </div>
            </div>
            <div className={clsx("col col--6", styles.hero_image)}>
              <ReactPlayer url={HomeMovieUrl} muted={true} height={480} width={640} controls={true} />
            </div>
          </div>
        </div>
      </header>
    );
  }