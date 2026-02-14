import Hero from "../components/Hero";
import CodeforcesCard from "../components/CodeforcesCard";

function Home() {
  return (
    <section className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center gap-12 px-6">

      {/* Hero + Card are in SAME viewport */}
      <Hero />
      <CodeforcesCard />

    </section>
  );
}

export default Home;
