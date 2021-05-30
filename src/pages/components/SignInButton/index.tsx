import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';

import styles from './styles.module.scss';

export function SignInButton() {
  const isUserLoggedIn = false;

  if (isUserLoggedIn) {
    return (
      <button className={styles.signInButton} type="button">
        <FaGithub className={styles.githubIcon} color="#04d361" />
        Cássio Machado
        <FiX color="#737380" className={styles.closeIcon} />
      </button>
    );
  }

  return (
    <button className={styles.signInButton} type="button">
      <FaGithub className={styles.githubIcon} color="#eba417" />
      Sign in with Github
    </button>
  );
}
