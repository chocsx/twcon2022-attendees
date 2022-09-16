import type { GetServerSideProps } from "next";
import { prisma } from "@/backend/utils/prisma";
import { AsyncReturnType } from "@/utils/ts-bs";

const getStreamers = async () => {
  return await prisma.streamer.findMany({
    select: {
      id: true,
      name: true,
      avatar: true,
      url: true,
    }
  });
};

type StreamerQueryResult = AsyncReturnType<typeof getStreamers>;

const StreamerListing: React.FC<{ streamer: StreamerQueryResult[number] }> = ({
  streamer,
}) => {

  return (
    <div className="w-full bg-white border-2 rounded-lg md:min-h-[9rem] dark:border-none group text-twitch-purple">
      <div className="relative p-4 overflow-hidden rounded-md md:p-8 dark:bg-twitch-black/90 group-hover:bg-twitch-purple">
        <div className="flex flex-row h-full">
          <div className="mr-4">
            <div
              className="w-20 h-20 overflow-hidden rounded-full bg-twitch-zero">
              <img className="object-cover aspect-square" src={streamer.avatar} />
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-start text-3xl">
              <div className="mr-1 shrink-0"><svg className="w-6 h-6 mt-1 fill-twitch-purple" width="24"
                height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd"
                  d="M11.9999 2.39999l7.2 2.4L21.5999 12l-2.4 7.2-7.2 2.4-7.2-2.4-2.4-7.2 2.4-7.20001 7.2-2.4zM10.6666 16.3638l6.5151-6.51519-1.697-1.69705-4.8181 4.81814-2.41814-2.4181-1.69704 1.697 4.11518 4.1152z">
                </path>
              </svg>
              </div>
              <div>
                <div className="max-w-[12rem] md:max-w-[8rem]" >{streamer.name}</div>
              </div>
              <div className="ml-1 shrink-0 arrow-↗ group-hover:after:animate-[ne-arrow_.4s_ease-in_forwards]">
              </div>
            </div>
            <div className="text-black text-md dark:text-white group-hover:text-white"></div>
          </div>
          <a
            className="absolute inset-0"
            href={streamer.url}></a>
        </div>
      </div>
    </div >
  );
};

const IndexPage: React.FC<{
  streamer: StreamerQueryResult;
}> = (props) => {
  return (
    <div className="flex flex-col flex-1 w-full h-full mx-auto xl:max-w-screen-2xl">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 w-800">
        {props.streamer && props.streamer.map((currentStreamer, index) => {
          return <StreamerListing streamer={currentStreamer} key={index} />;
        })}
      </div>
    </div>
  );
};

export default IndexPage;

export const getStaticProps: GetServerSideProps = async () => {
  const streamerOrdered = await getStreamers();
  const DAY_IN_SECONDS = 60 * 60 * 24;
  return { props: { streamer: streamerOrdered }, revalidate: DAY_IN_SECONDS };
};