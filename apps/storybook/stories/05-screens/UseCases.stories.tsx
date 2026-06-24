import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  NavBar, NavLink, Button, TextButton, EyebrowLabel,
  PrimaryHero, SectionHeader, SplitSection,
  Section, TabBar, CodeBlock, CardMedium, CardGroup,
  CommunitySection, CTABand, Footer,
  Blob, BLOB_COUNT,
} from '@boltz/ui';
import {
  Leaf, Code, Community, Atom, Flask, Dna,
  TestTube, Cpu, GitFork, Building, Packages, ShieldCheck,
} from 'iconoir-react';
import { navItems, stats } from '../_data/boltz';

// Use cases marketing page — three audience segments (Scientists, Developers,
// Enterprise) each with a persona-specific layout. Assembled from @boltz/ui
// section components following the same pattern as Landing and Platform.

const meta = {
  title: '05-Screens/Use cases',
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'white' },
    docs: {
      description: {
        component:
          'The Boltz Use Cases page: hero, three persona sections (Scientists / Developers / Enterprise), a tabbed code demo, case study stats, and closing CTAs.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const sz  = { width: 14, height: 14, strokeWidth: 1.5 } as const;
const iSz = { width: 28, height: 28, strokeWidth: 1.5 } as const;

// ── Hero media ───────────────────────────────────────────────────────────────
const HeroMedia = () => (
  <>
    <Blob shape={BLOB_COUNT - 2} aria-hidden className="absolute -top-[28%] right-0 h-auto w-[92%] translate-x-[16%] opacity-40 text-sage-medium" />
    <div className="absolute right-0 top-1/2 w-[820px] max-w-[64vw] -translate-y-1/2 laptop:translate-x-[8%]">
      <img src="/hero-protein.png" alt="Boltz molecular render" className="w-full h-auto select-none" />
    </div>
  </>
);

// ── Persona tab section ───────────────────────────────────────────────────────
type Persona = {
  value: string;
  label: string;
  color: 'sage' | 'blue' | 'tierra';
  desc: string;
  tabs: { label: string; code: string }[];
};

const personas: Persona[] = [
  {
    value: 'scientists',
    label: 'Scientists',
    color: 'sage',
    desc: 'Run frontier structure prediction and small-molecule screening directly from your Python notebook — no infrastructure required.',
    tabs: [
      {
        label: 'Python',
        code: `from boltz import Client\n\nclient = Client(api_key="bz_...")\n\nresult = client.predict(\n    model="boltz-prot-1.1",\n    sequence="MKTAYIAKQR...",\n)\nprint(result.structure.pdb)`,
      },
      {
        label: 'REST API',
        code: `curl https://api.boltz.bio/v1/predict \\\n  -H "Authorization: Bearer bz_..." \\\n  -d '{"model":"boltz-prot-1.1","sequence":"MKTAYIAKQR..."}'`,
      },
      {
        label: 'Agentic SDK',
        code: `from boltz.agent import BoltzTool\n\ntools = [BoltzTool(api_key="bz_...")]\nagent.run("Fold this sequence and rank pockets.", tools=tools)`,
      },
    ],
  },
  {
    value: 'developers',
    label: 'Developers',
    color: 'blue',
    desc: 'Typed SDKs and a predictable REST API that integrate directly into your product or data pipeline with sub-100ms latency.',
    tabs: [
      {
        label: 'Python',
        code: `from boltz import Client\n\nclient = Client()\nfor job in client.batch(sequences):\n    store(job.result)`,
      },
      {
        label: 'REST API',
        code: `POST /v1/batch\n{\n  "model": "boltz-prot-1.1",\n  "sequences": ["...", "..."],\n  "webhook": "https://app/api/boltz"\n}`,
      },
      {
        label: 'Agentic SDK',
        code: `import { Boltz } from '@boltz/sdk'\n\nconst boltz = new Boltz()\nconst { pdb } = await boltz.predict({ sequence })`,
      },
    ],
  },
  {
    value: 'enterprise',
    label: 'Enterprise',
    color: 'tierra',
    desc: 'Deploy Boltz models in your own VPC with full data residency, SOC 2 compliance, and enterprise SLAs — or run fully on-premise.',
    tabs: [
      {
        label: 'Python',
        code: `from boltz import Client\n\n# Point to your private VPC endpoint\nclient = Client(\n    api_key="bz_...",\n    base_url="https://boltz.internal.co",\n)\nresult = client.predict(model="boltz-prot-1.1", sequence="...")`,
      },
      {
        label: 'REST API',
        code: `# All API calls route to your private endpoint\ncurl https://boltz.internal.co/v1/predict \\\n  -H "Authorization: Bearer bz_..." \\\n  -d '{"model":"boltz-prot-1.1","sequence":"..."}'`,
      },
      {
        label: 'Terraform',
        code: `module "boltz_vpc" {\n  source  = "boltz-ai/vpc-deployment/aws"\n  version = "~> 2.0"\n\n  instance_type = "p4d.24xlarge"\n  region        = "us-east-1"\n  api_key       = var.boltz_api_key\n}`,
      },
    ],
  },
];

function PersonaSection() {
  const [active, setActive] = React.useState('scientists');
  const persona = personas.find((p) => p.value === active) ?? personas[0];

  return (
    <Section innerClassName="flex flex-col items-center gap-xl">
      <SectionHeader
        eyebrow="How you can use Boltz"
        eyebrowIcon={<Code {...sz} />}
        title="Built for every stage of discovery"
        titleClassName="text-center max-w-[22ch] mx-auto"
      />
      <TabBar
        items={personas.map((p) => ({ value: p.value, label: p.label }))}
        value={active}
        onValueChange={setActive}
      />
      <p className="max-w-[54ch] text-body-lg text-text-secondary text-center">{persona.desc}</p>
      <div className="w-full pt-md">
        <CodeBlock color={persona.color} contained tabs={persona.tabs} />
      </div>
    </Section>
  );
}

// ── Feature grids per use case ────────────────────────────────────────────────
const scientistFeatures = [
  { icon: <Atom {...iSz} />,  color: 'sage-pale' as const, heading: 'Protein structure prediction', body: 'State-of-the-art accuracy on novel folds — exceeding AlphaFold2 GDT_TS benchmarks.' },
  { icon: <Flask {...iSz} />, color: 'sage-pale' as const, heading: 'Small-molecule screening',      body: '10× faster than the previous SOTA at 100× lower cost per prediction.' },
  { icon: <Dna {...iSz} />,   color: 'sage-pale' as const, heading: 'Multi-molecular design',        body: 'Co-fold proteins, ligands, DNA, and RNA in a single end-to-end prediction run.' },
];

const developerFeatures = [
  { icon: <Code {...iSz} />,    color: 'blue-dark'   as const, heading: 'REST API & typed SDKs',   body: 'Python and TypeScript clients with full type coverage, async support, and retries built in.' },
  { icon: <Cpu {...iSz} />,     color: 'blue-light'  as const, heading: 'Batch inference at scale', body: 'Submit thousands of sequences in a single job. Webhooks notify you on completion.' },
  { icon: <GitFork {...iSz} />, color: 'blue-medium' as const, heading: 'Fine-tuning on your data', body: 'Adapt any Boltz model to your proprietary compound library or protein family.' },
];

const enterpriseFeatures = [
  { icon: <Building {...iSz} />,    color: 'tierra-50' as const, heading: 'VPC & on-premise deployment', body: 'All compute stays inside your infrastructure. No data leaves your perimeter.' },
  { icon: <ShieldCheck {...iSz} />, color: 'tierra-50' as const, heading: 'SOC 2 Type II certified',      body: 'Full audit trail, role-based access control, and end-to-end encryption at rest and in transit.' },
  { icon: <Community {...iSz} />,   color: 'tierra-50' as const, heading: 'Dedicated success team',       body: 'Onboarding, model integration support, and quarterly business reviews included.' },
];

// ── CTA rows ──────────────────────────────────────────────────────────────────
const ctas = [
  {
    title: 'Start for free',
    body: 'Run your first structure prediction in minutes. No credit card required.',
    cta: 'Get API access',
  },
  {
    title: 'Talk to us',
    body: "Exploring enterprise deployment or a large-scale research partnership? We'd love to hear from you.",
    cta: 'Get in touch',
  },
];

const footerColumns = [
  { links: [{ label: 'Github', href: '#' }, { label: 'LinkedIn', href: '#' }, { label: 'Slack', href: '#' }] },
  { links: [{ label: 'Career', href: '#' }, { label: 'News', href: '#' }, { label: 'Pricing', href: '#' }, { label: 'Legal', href: '#' }] },
];

// ── Story ─────────────────────────────────────────────────────────────────────
export const UseCases: Story = {
  render: () => (
    <div className="bg-white">
      <NavBar>
        {navItems.map((n) => <NavLink key={n} href="#">{n}</NavLink>)}
      </NavBar>

      <main className="-mt-60">

        {/* 1 — Hero */}
        <PrimaryHero
          tone="sage"
          heading="From notebook to production — at any scale"
          body="Frontier models for protein structure, small-molecule screening, and multi-molecular design. Built for scientists, engineers, and enterprise teams."
          actions={<Button variant="black">Start building with Boltz</Button>}
          media={<HeroMedia />}
        />

        {/* 2 — Scientists */}
        <Section innerClassName="flex flex-col gap-2xl">
          <SectionHeader
            eyebrow="For scientists"
            eyebrowIcon={<Leaf {...sz} />}
            title="The fastest path from sequence to structure"
            subtitle="Boltz models are designed to fit into existing research workflows — no DevOps, no infrastructure, just results."
            action={<Button variant="black">Try Boltz Lab</Button>}
          />
          <CardGroup className="grid grid-cols-1 mobile:grid-cols-2 tablet:grid-cols-3">
            {scientistFeatures.map((f) => (
              <CardMedium key={f.heading} color={f.color} heading={f.heading} body={f.body} />
            ))}
          </CardGroup>
        </Section>

        {/* 3 — Developers */}
        <SplitSection
          background="none"
          className="bg-blue-pale"
          mediaPosition="right"
          align="start"
          content={
            <>
              <EyebrowLabel icon={<Code {...sz} />}>For developers</EyebrowLabel>
              <h2 className="text-heading-md text-text-primary">
                An API that treats molecular biology as a first-class primitive
              </h2>
              <p className="text-body-md text-text-secondary mt-sm">
                Typed SDKs, predictable REST endpoints, and prebuilt pipeline connectors — so you can ship faster without building infrastructure from scratch.
              </p>
              <div className="flex gap-sm mt-lg">
                <Button variant="black">View API docs</Button>
                <TextButton arrow>See all integrations</TextButton>
              </div>
            </>
          }
          media={
            <CardGroup className="flex-col gap-lg">
              {developerFeatures.map((f) => (
                <CardMedium
                  key={f.heading}
                  color={f.color}
                  heading={f.heading}
                  body={f.body}
                />
              ))}
            </CardGroup>
          }
        />

        {/* 4 — Persona code switcher */}
        <PersonaSection />

        {/* 5 — Enterprise */}
        <Section innerClassName="flex flex-col gap-2xl">
          <SectionHeader
            eyebrow="For enterprise"
            eyebrowIcon={<Building {...sz} />}
            title="Frontier models inside your perimeter"
            subtitle="Deploy Boltz in your own VPC or fully on-premise. Complete data residency, SOC 2 compliance, and dedicated capacity — shaped for the most regulated workloads in the world."
            action={<TextButton arrow>Contact enterprise sales</TextButton>}
          />
          <CardGroup className="grid grid-cols-1 mobile:grid-cols-2 tablet:grid-cols-3">
            {enterpriseFeatures.map((f) => (
              <CardMedium key={f.heading} color={f.color} heading={f.heading} body={f.body} />
            ))}
          </CardGroup>
        </Section>

        {/* 6 — Community proof */}
        <CommunitySection
          eyebrowIcon={<Community {...sz} />}
          eyebrow="Community"
          heading="Used by over 1M scientists across pharma, biotech, agriculture, and academia"
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
