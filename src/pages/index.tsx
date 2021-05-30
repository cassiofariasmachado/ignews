import Head from 'next/head';
import { GetStaticProps } from 'next';
import { stripe } from '../services/stripe';

import styles from '../styles/home.module.scss';
import { SubscribeButton } from './components/SubscribeButton';

interface HomeProps {
  product: {
    priceId: string,
    amount: number
  }
}

export default function Home({ product }: HomeProps) {
  const currencyFormat = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

  return (
    <>
      <Head>
        <title>Início | ig.news</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>News about the <span>React</span> world.</h1>
          <p>
            Get access to all the publications <br />
            <span>for {currencyFormat.format(product.amount)} month</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>

        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1IwquVL4ejr60dT4j443ZQVk');

  const product = {
    priceId: price.id,
    amount: price.unit_amount / 100
  };

  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24 // 24 hours
  }
};