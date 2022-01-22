import Head from 'next/head';
import Image from 'next/image';

export default function Discord() {
  return (
    <div className='App'>
      <Head>
        <title>The Dungeon Run</title>
        <meta name='description' content='The Dungeon Runs Unofficial Fan Site' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <div className='img-container'>
          <Image src='/dungeon_run.jpeg' layout='fill' alt='The Dungeon Run' />
        </div>

        <div className='actions'>
          <a href='https://discord.gg/thedungeonrun'>Join Discord</a>
        </div>
      </main>

      <footer>
        <a
          href='https://github.com/dandrewgarvin'
          target='_blank'
          rel='noopener noreferrer'
        >
          Sponsored by <strong>Andrew Garvin</strong>
        </a>
      </footer>
    </div>
  );
}
