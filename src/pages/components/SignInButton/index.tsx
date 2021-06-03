import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import { signIn, signOut, useSession } from 'next-auth/client';

import styles from './styles.module.scss';

export function SignInButton() {
  const [session] = useSession();

  if (session) {
    return (
      <button className={styles.signInButton} type="button">
        <FaGithub
          className={styles.githubIcon}
          color="#04d361"
        />
        {session.user.name}
        <FiX
          color="#737380"
          className={styles.closeIcon}
          onClick={() => signOut()}
        />
      </button>
    );
  }

  return (
    <button
      className={styles.signInButton}
      type="button"
      onClick={() => signIn('github')}
    >
      <FaGithub
        className={styles.githubIcon}
        color="#eba417"
      />
      Sign in with Github
    </button>
  );
}
