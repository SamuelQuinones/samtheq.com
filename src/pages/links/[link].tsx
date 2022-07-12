import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import prisma from "@lib/Prisma";
import type { TLinkRedirectProps } from "@lib/Prisma/SocialLinks";
import PageLayout from "layout/Page";

export const getServerSideProps: GetServerSideProps<
  TLinkRedirectProps,
  { link: string }
> = async ({ params }) => {
  if (!params) return { notFound: true };
  const LINK = await prisma.socialLink.findFirst({
    where: {
      redirect: params.link,
      active: true,
      NOT: { redirect: null }, //? Possibly redundant
    },
    select: {
      title: true,
      description: true,
      target: true,
      redirect: true,
    },
  });
  if (LINK === null) return { notFound: true };
  return {
    props: LINK,
    redirect: {
      destination: LINK.target,
      permanent: true,
    },
  };
};

const ExternalRedirect: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ description, target, title, redirect }) => {
  return (
    <PageLayout
      title={title}
      pageUrl={`/links/${redirect}`}
      //@ts-expect-error null and undefined mean the same thing here
      description={description}
      containerClasses="flex items-center flex-col justify-around"
    >
      <h1 className="mb-8 text-center text-4xl">Redirecting to {title}</h1>
      <p>
        If not redirected automatically, <a href={target}>click here</a>.
      </p>
    </PageLayout>
  );
};

export default ExternalRedirect;
