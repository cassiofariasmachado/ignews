import Prismic from '@prismicio/client';

export function getPrismicClient(req?: unknown) {
    return Prismic.client(
        process.env.PRISMIC_URL,
        {
            req,
            accessToken: process.env.PRISMIC_ACCESS_TOKEN
        }
    );
}