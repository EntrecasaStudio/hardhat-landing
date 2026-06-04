import Link from "next/link";

const tools = [
  {
    name: "Hardhat Runner",
    desc: "The task runner that orchestrates your entire development workflow, from compiling to deploying.",
  },
  {
    name: "Hardhat Ignition",
    desc: "Declarative deployments that are reproducible, resumable, and easy to reason about.",
  },
  {
    name: "Hardhat Network",
    desc: "A local Ethereum network designed for development, with rich debugging and mainnet forking.",
  },
  {
    name: "Solidity Tests",
    desc: "Write your tests in Solidity and run them blazingly fast against the Hardhat Network.",
  },
];

const features = [
  {
    title: "Run Solidity locally",
    body: "Easily deploy your contracts, run tests and debug Solidity code without dealing with live environments.",
  },
  {
    title: "Debug like a pro",
    body: "Get Solidity stack traces, console.log statements, and clear, explicit error messages when transactions fail.",
  },
  {
    title: "Extend with plugins",
    body: "Use a rich ecosystem of plugins and tools, or write your own to fit Hardhat into your workflow.",
  },
  {
    title: "Fork mainnet",
    body: "Simulate the real network locally. Fork mainnet state and test against live protocols with zero setup.",
  },
  {
    title: "TypeScript first",
    body: "Fully typed configs, tasks, and tests. Catch mistakes before they reach the chain.",
  },
  {
    title: "Fast iteration",
    body: "Incremental compilation and a snappy local node keep your feedback loop tight.",
  },
];

const usedBy = ["Uniswap", "Aave", "Chainlink", "Optimism", "ENS", "Connext", "Yearn", "Decentraland"];

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Tools />
        <Features />
        <CodeSection />
        <UsedBy />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

function Logo() {
  return (
    <span className="flex items-center gap-2 font-semibold text-lg">
      <span className="grid h-7 w-7 place-items-center rounded-md bg-brand text-black font-bold">
        H
      </span>
      Hardhat
    </span>
  );
}

function Header() {
  const nav = ["Tools", "Plugins", "Docs", "Tutorial"];
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Logo />
        <nav className="hidden items-center gap-8 text-sm text-muted md:flex">
          {nav.map((n) => (
            <a key={n} href="#" className="transition-colors hover:text-foreground">
              {n}
            </a>
          ))}
        </nav>
        <a
          href="#get-started"
          className="rounded-full bg-black px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Get started
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, rgba(255,241,0,0.18) 0%, rgba(255,241,0,0) 70%)",
        }}
      />
      <div className="mx-auto max-w-6xl px-6 py-24 text-center md:py-32">
        <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-medium text-muted">
          <span className="h-2 w-2 rounded-full bg-brand-ink" />
          Hardhat 3 is here
        </span>
        <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
          Ethereum development environment for professionals
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
          Compile, deploy, test, and debug your smart contracts. Flexible, extensible, and fast —
          Hardhat is the tooling trusted by the best teams in web3.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#get-started"
            className="rounded-full bg-brand px-6 py-3 font-medium text-black shadow-sm transition-transform hover:-translate-y-0.5"
          >
            Get started
          </a>
          <code className="rounded-full border border-black/10 bg-black px-5 py-3 font-mono text-sm text-brand">
            npx hardhat --init
          </code>
        </div>
      </div>
    </section>
  );
}

function Tools() {
  return (
    <section id="tools" className="border-y border-black/5 bg-[#fafafa]">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-center text-3xl font-bold tracking-tight">
          One tool, every piece of the puzzle
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-muted">
          Hardhat is a suite of components designed to work together, and with the tools you already
          use.
        </p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {tools.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl border border-black/5 bg-white p-7 shadow-sm transition-shadow hover:shadow-md"
            >
              <h3 className="text-lg font-semibold">{t.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <h2 className="text-center text-3xl font-bold tracking-tight">Built for the way you work</h2>
      <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <div key={f.title}>
            <div className="mb-4 h-1 w-10 rounded-full bg-brand" />
            <h3 className="text-lg font-semibold">{f.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{f.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CodeSection() {
  return (
    <section id="get-started" className="border-y border-black/5 bg-black text-white">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-24 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Up and running in seconds</h2>
          <p className="mt-4 text-white/70">
            Initialize a project, write your first contract, and run your tests — no boilerplate, no
            friction. Hardhat gets out of your way so you can ship.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-white/80">
            {["Zero-config TypeScript setup", "Built-in local network", "Rich plugin ecosystem"].map(
              (i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-brand text-black text-xs font-bold">
                    ✓
                  </span>
                  {i}
                </li>
              ),
            )}
          </ul>
        </div>
        <pre className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0d0d0d] p-6 font-mono text-sm leading-relaxed">
          <code>
            <span className="text-white/40">$ </span>
            <span className="text-brand">npx hardhat --init</span>
            {"\n"}
            <span className="text-white/40">$ </span>
            <span className="text-brand">npx hardhat compile</span>
            {"\n"}
            <span className="text-white/40"># Compiled 3 Solidity files successfully</span>
            {"\n\n"}
            <span className="text-white/40">$ </span>
            <span className="text-brand">npx hardhat test</span>
            {"\n"}
            <span className="text-green-400">  ✓ Token deployment (212ms)</span>
            {"\n"}
            <span className="text-green-400">  ✓ Transfers update balances (98ms)</span>
            {"\n"}
            <span className="text-white/40">  2 passing</span>
          </code>
        </pre>
      </div>
    </section>
  );
}

function UsedBy() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 text-center">
      <p className="text-sm font-medium uppercase tracking-widest text-muted">
        Trusted by leading teams
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-lg font-semibold text-black/40">
        {usedBy.map((u) => (
          <span key={u}>{u}</span>
        ))}
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-24">
      <div className="rounded-3xl bg-brand px-8 py-16 text-center text-black">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Start building today</h2>
        <p className="mx-auto mt-3 max-w-xl text-black/70">
          Join thousands of developers shipping production smart contracts with Hardhat.
        </p>
        <a
          href="#"
          className="mt-8 inline-block rounded-full bg-black px-7 py-3 font-medium text-white transition-transform hover:-translate-y-0.5"
        >
          Read the docs
        </a>
      </div>
    </section>
  );
}

function Footer() {
  const cols = [
    { title: "Tools", links: ["Runner", "Ignition", "Network", "Solidity Tests"] },
    { title: "Learn", links: ["Docs", "Tutorial", "Guides", "Plugins"] },
    { title: "Community", links: ["Discord", "GitHub", "X", "Blog"] },
  ];
  return (
    <footer className="border-t border-black/5 bg-[#fafafa]">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-3 text-sm text-muted">
            Built by the Nomic Foundation. Open source and community driven.
          </p>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <h4 className="text-sm font-semibold">{c.title}</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              {c.links.map((l) => (
                <li key={l}>
                  <Link href="#" className="transition-colors hover:text-foreground">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-black/5 py-6 text-center text-xs text-muted">
        © {new Date().getFullYear()} Hardhat — prototype build. Not affiliated with the official
        site.
      </div>
    </footer>
  );
}
