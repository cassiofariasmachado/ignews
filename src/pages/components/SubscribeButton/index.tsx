import { useSession, signIn } from 'next-auth/client';
import { api } from '../../../services/api';
import { getStripeJS } from '../../../services/stripe-client';
import styles from './styles.module.scss';

interface SubscribeButtonProps {
  priceId: string;
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const session = useSession();

  async function handleSubscribe() {
    if (!session) {
      signIn('github');
      return;
    }

    try {
      const response = await api.post('subscribes');
      const { sessionId } = response.data;

      const stripe = await getStripeJS();

      await stripe.redirectToCheckout({ sessionId });

    } catch (error) {
      alert(error?.message);
    }
  }

  return (
    <button
      type="button"
      onClick={handleSubscribe}
      className={styles.subscribeButton}
    >
      Subscribe now
    </button>
  );
}
