import Link from "next/link";

export default function Home() {
  return (
    <>
      <div>
        <ul>
          <li>
            <h4>Home Page</h4>
          </li>
          <li>
            <Link href={`/dashboard`}>Dashboard</Link>
          </li>
        </ul>
      </div>
    </>
  );
}
