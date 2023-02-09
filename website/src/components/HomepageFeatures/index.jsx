import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Component-based architecture',
    Svg: require('@site/static/img/features/cba.svg').default,
    description: (
      <>
        Create components and apply them to your entities (form and grid).
      </>
    ),
  },
  {
    title: 'Save & See',
    Svg: require('@site/static/img/features/reload.svg').default,
    description: (
      <>
        Develop your project locally, save and see immediately what you have done.
      </>
    ),
  },
  {
    title: 'Subscribe to events',
    Svg: require('@site/static/img/features/event.svg').default,
    description: (
      <>
        Set events that you need in your code, they will be automatically subscribed to D365.
      </>
    ),
  },
  {
    title: 'Fast and easy to deploy',
    Svg: require('@site/static/img/features/deploy.svg').default,
    description: (
      <>
        Deploy your project to Dynamics 365 in one command line.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--3')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
