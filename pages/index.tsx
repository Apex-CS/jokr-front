import Head from 'next/head';
import styles from '../styles/Home.module.css';
import useSWR from 'swr';
import axios from 'axios';

type User = {
  name: string;
  email: string;
};

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

function Home() {
  const { data, error } = useSWR('http://localhost:8080/demo/all', fetcher);

  if (error) return 'An error has occurred.' + error;
  if (!data) return 'Loading...';
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <ul>
          {data?.map((usr: User) => (
            <li key={usr.name}>{usr.name}</li>
          ))}
        </ul>
        {/* <DetailTable products={products} /> */}
      </main>
    </div>
  );
}

/* 
export const getStaticProps = async () => {
  const res = await axios.get<User[]>('http://localhost:8080/demo/all');
  const data: User[] = res.data;
  console.log(data);
  return {
    props: { data },
  };
}; */

export default Home;
