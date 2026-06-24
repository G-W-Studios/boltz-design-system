import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  NavBar, NavLink, Button, TextButton, EyebrowLabel,
  PrimaryHero, SectionHeader, SplitSection, FeatureGrid,
  Section, StatBand, AboutNews, BlogThumbnail, CommunitySection, Footer,
  Blob, BLOB_COUNT,
} from '@boltz/ui';
import { Leaf, Community, Globe, Group, HeartSolid } from 'iconoir-react';
import { navItems, stats } from '../_data/boltz';

// About page — Boltz's story, values, traction, and open roles.
// Band rhythm: Hero(sage) → White → Sage-pale → White → Tierra-100 → White → Sage-pale(Community)

const meta = {
  title: '05-Screens/About',
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'white' },
    docs: {
      description: {
        component:
          'The Boltz About page: mission statement hero, our story + recent posts, impact stats, values, investors, open roles, and closing CTAs.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const sz  = { width: 14, height: 14, strokeWidth: 1.5 } as const;
const iSz = { width: 28, height: 28, strokeWidth: 1.5 } as const;
const PROTEIN = '/render-a.png';

// ── Hero media ────────────────────────────────────────────────────────────────
const HeroMedia = () => (
  <>
    <Blob shape={BLOB_COUNT - 3} aria-hidden className="absolute -top-[24%] right-0 h-auto w-[90%] translate-x-[14%] opacity-35 text-sage-medium" />
    <div className="absolute right-0 top-1/2 w-[800px] max-w-[62vw] -translate-y-1/2 laptop:translate-x-[10%]">
      <img src="/hero-protein.png" alt="Boltz molecular render" className="w-full h-auto select-none" />
    </div>
  </>
);

// ── Our story — AboutNews items ───────────────────────────────────────────────
const storyItems = [
  {
    id: 'n1',
    title: 'The future we are building at Boltz',
    category: 'Vision',
    date: 'Jan 2026',
    cover: <BlogThumbnail tone="tierra" align="center" titlePosition="center" title="The future we are building at Boltz" blobShape={5} />,
  },
  {
    id: 'n2',
    title: 'Announcing Boltz-prot-1.1: frontier protein structure prediction',
    category: 'Research',
    date: 'Mar 2026',
    cover: <BlogThumbnail tone="sage" category="new-research" title="BoltzProt 1.1" renderSrc={PROTEIN} blobShape={8} />,
  },
  {
    id: 'n3',
    title: 'One million scientists: a year of open biomolecular models',
    category: 'Community',
    date: 'Apr 2026',
    cover: <BlogThumbnail tone="blue" category="other" title="1M scientists" blobShape={11} />,
  },
];

// ── Values / principles ───────────────────────────────────────────────────────
const values = [
  {
    color: 'sage-pale' as const,
    heading: 'Open by default',
    body: 'Our foundation models are published with weights and benchmarks. Science advances faster when tools are shared freely.',
  },
  {
    color: 'blue-pale' as const,
    heading: 'Frontier accuracy',
    body: "We don't ship a model until it sets a new state-of-the-art. Benchmark performance is a prerequisite, not a goal.",
  },
  {
    color: 'tierra-50' as const,
    heading: 'Built for researchers',
    body: 'Every product decision is validated with working scientists. Speed, interpretability, and real-workflow fit always win.',
  },
];

// ── Investors ─────────────────────────────────────────────────────────────────
const investors = [
  { name: 'Andreessen Horowitz', note: 'Lead investor, Series A' },
  { name: 'Flagship Pioneering', note: 'Strategic partner' },
  { name: 'NVIDIA', note: 'Strategic investor' },
  { name: 'General Catalyst', note: 'Seed & Series A' },
];

// ── Closing CTAs ──────────────────────────────────────────────────────────────
const ctas = [
  {
    title: 'Partner with us',
    body: 'We partner with pioneering research teams to tackle the most challenging problems in drug discovery. Reach out to explore how we can accelerate your work.',
    cta: 'Get in touch',
  },
  {
    title: 'Join our team',
    body: "We're building a world-class team to push the boundaries of AI-driven drug discovery. See our open positions and help shape the future of medicine.",
    cta: 'View open roles',
  },
];

const footerColumns = [
  { links: [{ label: 'Github', href: '#' }, { label: 'LinkedIn', href: '#' }, { label: 'Slack', href: '#' }] },
  { links: [{ label: 'Career', href: '#' }, { label: 'News', href: '#' }, { label: 'Pricing', href: '#' }, { label: 'Legal', href: '#' }] },
];

// ── Story ─────────────────────────────────────────────────────────────────────
export const About: Story = {
  render: () => (
    <div className="bg-white">
      <NavBar>
        {navItems.map((n) => <NavLink key={n} href="#">{n}</NavLink>)}
      </NavBar>

      <main className="-mt-60">

        {/* 1 — Hero */}
        <PrimaryHero
          tone="sage"
          heading="We're building the tools that will change how medicines are discovered"
          body="Boltz is a frontier AI research lab. We build generative models for biology and chemistry, and put them in the hands of scientists everywhere."
          actions={<Button variant="black">Read our story</Button>}
          media={<HeroMedia />}
        />

        {/* 2 — Our story + recent writing (white) */}
        <AboutNews
          eyebrowIcon={<Leaf {...sz} />}
          eyebrow="About Boltz"
          heading="A frontier research lab building generative models for biology and chemistry."
          body={
            <div className="flex flex-col gap-md">
              <p>
                Our models are used by millions of scientists across biopharma, agriculture,
                and consumer products, and form the foundation of modern R&amp;D pipelines at
                some of the world's largest organizations.
              </p>
              <p>
                We founded Boltz PBC to advance the open frontier — publishing our weights,
                benchmarks, and methods so the entire field can build on what we create.
              </p>
            </div>
          }
          items={storyItems.map((item) => ({
            title: item.title,
            category: item.category,
            date: item.date,
            cover: item.cover,
          }))}
          cta="View all blog posts"
        />

        {/* 3 — Impact metrics (sage-pale) — white sections on both sides */}
        <StatBand
          className="bg-sage-pale"
          stats={stats}
        />

        {/* 4 — Values / principles (white) */}
        <Section innerClassName="flex flex-col gap-2xl">
          <SectionHeader
            eyebrow="Our values"
            eyebrowIcon={<Globe {...sz} />}
            title="What we believe"
            subtitle="Three principles guide every model we train, every product we ship, and every hire we make."
          />
          <FeatureGrid items={values} columns={3} />
        </Section>

        {/* 5 — Investors & backing (tierra-100) — white sections on both sides */}
        <SplitSection
          background="none"
          className="bg-tierra-100"
          gap="wide"
          align="start"
          content={
            <>
              <EyebrowLabel icon={<HeartSolid {...sz} />}>Backed by</EyebrowLabel>
              <h2 className="text-heading-md text-text-primary mt-sm">
                Supported by leading investors in science and technology
              </h2>
              <p className="text-body-md text-text-secondary mt-sm max-w-[48ch]">
                We've raised from investors who share our conviction that AI will
                fundamentally accelerate the discovery of life-saving medicines.
              </p>
              <div className="mt-lg">
                <TextButton arrow>Read our announcement</TextButton>
              </div>
            </>
          }
          media={
            <div className="flex flex-col gap-md w-full">
              {investors.map((inv) => (
                <div key={inv.name} className="flex items-center justify-between py-md border-b border-border-light last:border-0">
                  <span className="text-heading-sm text-text-primary">{inv.name}</span>
                  <span className="text-body-sm text-text-secondary">{inv.note}</span>
                </div>
              ))}
            </div>
          }
        />

        {/* 6 — Open roles teaser (white) */}
        <Section innerClassName="flex flex-col gap-2xl">
          <SplitSection
            background="none"
            gap="comfortable"
            align="center"
            content={
              <>
                <EyebrowLabel icon={<Group {...sz} />}>Careers</EyebrowLabel>
                <h2 className="text-heading-md text-text-primary mt-sm">
                  Join a team reimagining drug discovery
                </h2>
                <p className="text-body-md text-text-secondary mt-sm max-w-[48ch]">
                  We're hiring researchers, engineers, and builders who want to work on
                  problems that matter. Remote-friendly, well-funded, and moving fast.
                </p>
                <div className="flex gap-sm mt-lg">
                  <Button variant="black">View open roles</Button>
                  <TextButton arrow>Meet the team</TextButton>
                </div>
              </>
            }
            media={
              <img
                src="/brand/people-2.jpg"
                alt="Boltz team"
                className="w-full h-auto rounded-lg object-cover"
              />
            }
          />
        </Section>

        {/* 7 — Community proof (sage-pale, hardcoded in CommunitySection) — white before it */}
        <CommunitySection
          eyebrowIcon={<Community {...sz} />}
          eyebrow="Community"
          heading="Boltz models are used by over 1M scientists across pharma, biotech, agriculture, and academia."
          caseStudies={[
            {
              logo: <span className="text-body-lg text-text-on-dark italic font-semibold">Pfizer</span>,
              heading: 'How Pfizer scientists are using Boltz across large and small molecule discovery.',
              cta: 'Read more',
            },
          ]}
          stats={stats}
          ctas={ctas}
        />

      </main>

      <Footer columns={footerColumns} />
    </div>
  ),
};
