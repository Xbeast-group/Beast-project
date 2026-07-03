import { useState, useEffect, useCallback } from "react";
import {
  Github, Linkedin, ExternalLink, Star, GitFork,
  Mail, Download, MapPin, Briefcase, GraduationCap,
  Terminal, Trophy, Target, Zap, Code2, ChevronRight,
  Activity, Hash, Layers, Sun, Moon, Menu, X,
  Eye, EyeOff, Lock, User, ArrowRight, Sparkles,
} from "lucide-react";

// ─── CONFIG — update these with your own details ─────────────────────────────
const CONFIG = {
  github: "sindresorhus",
  leetcode: "neal_wu",
  linkedinUrl: "https://linkedin.com/in/your-handle",
  leetcodeUrl: "https://leetcode.com/your-handle",
  name: "Alex Chen",
  title: "Software Engineer",
  bio: "I build reliable systems at scale and solve hard algorithmic problems. Open source contributor. Previously Stripe, Cloudflare.",
  email: "alex@example.com",
  location: "San Francisco, CA",
  resumeUrl: "#",
};

// ─── RESUME DATA ─────────────────────────────────────────────────────────────
const RESUME = {
  experience: [
    {
      role: "Senior Software Engineer",
      company: "Stripe",
      period: "2022 – Present",
      tech: ["Go", "TypeScript", "gRPC"],
      desc: "Led payment infrastructure team. Reduced API latency by 40% across critical payment flows.",
    },
    {
      role: "Software Engineer",
      company: "Cloudflare",
      period: "2020 – 2022",
      tech: ["Rust", "JavaScript", "Workers"],
      desc: "Built edge computing primitives used by 1M+ developers on the Workers platform.",
    },
    {
      role: "Software Engineering Intern",
      company: "Jane Street",
      period: "Summer 2019",
      tech: ["OCaml", "Python"],
      desc: "Developed trading infrastructure tooling for the options desk.",
    },
  ],
  education: [
    {
      degree: "B.S. Computer Science",
      school: "MIT",
      period: "2016 – 2020",
      note: "GPA 3.9 · Dean's List · ACM ICPC Regional Finalist",
    },
  ],
  skills: [
    { name: "TypeScript / JS", level: 95, color: "#10b981" },
    { name: "Go", level: 88, color: "#10b981" },
    { name: "Python", level: 84, color: "#6366f1" },
    { name: "Rust", level: 71, color: "#6366f1" },
    { name: "System Design", level: 92, color: "#10b981" },
    { name: "Distributed Systems", level: 86, color: "#6366f1" },
  ],
};

// ─── TYPES ───────────────────────────────────────────────────────────────────
type GHUser = {
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
  bio: string | null;
};

type GHRepo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
};

type LCStats = {
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  ranking: number;
  acceptanceRate: number;
};

// ─── HOOKS ───────────────────────────────────────────────────────────────────
function useGitHub(username: string) {
  const [user, setUser] = useState<GHUser | null>(null);
  const [repos, setRepos] = useState<GHRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!username) return;
    setLoading(true);
    Promise.all([
      fetch(`https://api.github.com/users/${username}`).then((r) => r.json()),
      fetch(
        `https://api.github.com/users/${username}/repos?sort=stars&per_page=6`
      ).then((r) => r.json()),
    ])
      .then(([u, r]) => {
        if (u && !u.message) setUser(u);
        if (Array.isArray(r)) setRepos(r);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [username]);

  return { user, repos, loading };
}

function useLeetCode(username: string) {
  const [stats, setStats] = useState<LCStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!username) return;
    setLoading(true);
    fetch(`https://leetcode-stats-api.herokuapp.com/${username}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.status === "success") setStats(d);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [username]);

  return { stats, loading };
}

// ─── LANGUAGE COLOR MAP ───────────────────────────────────────────────────────
const LANG_COLOR: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572a5",
  Go: "#00add8",
  Rust: "#dea584",
  "C++": "#f34b7d",
  Java: "#b07219",
  OCaml: "#3be133",
  CSS: "#563d7c",
  HTML: "#e34c26",
};

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function NavBar({
  activeSection,
  onNav,
}: {
  activeSection: string;
  onNav: (s: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const links = ["About", "GitHub", "LeetCode", "Resume", "Contact"];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <span
          className="font-mono text-sm text-primary tracking-widest cursor-pointer select-none"
          onClick={() => onNav("hero")}
        >
          &gt;_ {CONFIG.github}
        </span>

        {/* desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <button
              key={l}
              onClick={() => onNav(l.toLowerCase())}
              className={`text-sm font-mono transition-colors ${
                activeSection === l.toLowerCase()
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {l}
            </button>
          ))}
        </div>

        {/* mobile menu */}
        <button
          className="md:hidden text-muted-foreground hover:text-foreground"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background/95 px-6 py-4 flex flex-col gap-3">
          {links.map((l) => (
            <button
              key={l}
              onClick={() => {
                onNav(l.toLowerCase());
                setOpen(false);
              }}
              className="text-left text-sm font-mono text-muted-foreground hover:text-foreground"
            >
              {l}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

function StatPill({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string | number;
  icon: React.ElementType;
}) {
  return (
    <div className="flex items-center gap-2 bg-secondary border border-border rounded-full px-4 py-1.5">
      <Icon size={13} className="text-primary" />
      <span className="font-mono text-xs text-muted-foreground">{label}</span>
      <span className="font-mono text-xs text-foreground font-medium">{value}</span>
    </div>
  );
}

function HeroSection({ ghUser }: { ghUser: GHUser | null }) {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center pt-24 pb-16 max-w-6xl mx-auto px-6"
    >
      <div className="grid md:grid-cols-[1fr_auto] gap-12 items-center">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <span className="block w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="font-mono text-xs text-primary tracking-widest uppercase">
              Available for work
            </span>
          </div>

          <h1
            className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-4"
            style={{ fontFamily: "'Fraunces', serif", fontWeight: 700 }}
          >
            {CONFIG.name}
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {CONFIG.title}
          </p>

          <p
            className="text-base text-muted-foreground max-w-xl mb-8 leading-relaxed"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {CONFIG.bio}
          </p>

          <div className="flex flex-wrap items-center gap-2 mb-10">
            <MapPin size={13} className="text-muted-foreground" />
            <span className="font-mono text-xs text-muted-foreground">{CONFIG.location}</span>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3 mb-10">
            <a
              href={`https://github.com/${CONFIG.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 bg-foreground text-background rounded-lg text-sm font-medium hover:bg-foreground/90 transition-colors"
            >
              <Github size={16} />
              GitHub
            </a>
            <a
              href={CONFIG.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 border border-border rounded-lg text-sm font-medium hover:border-primary/50 hover:text-primary transition-colors"
            >
              <Linkedin size={16} />
              LinkedIn
            </a>
            <a
              href={CONFIG.leetcodeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 border border-border rounded-lg text-sm font-medium hover:border-primary/50 hover:text-primary transition-colors"
            >
              <Code2 size={16} />
              LeetCode
            </a>
            <a
              href={CONFIG.resumeUrl}
              className="flex items-center gap-2 px-5 py-2.5 border border-primary/40 text-primary rounded-lg text-sm font-medium hover:bg-primary/10 transition-colors"
            >
              <Download size={16} />
              Resume
            </a>
          </div>

          {/* live stat pills */}
          {ghUser && (
            <div className="flex flex-wrap gap-2">
              <StatPill label="repos" value={ghUser.public_repos} icon={Layers} />
              <StatPill label="followers" value={ghUser.followers} icon={Activity} />
              <StatPill label="following" value={ghUser.following} icon={Hash} />
            </div>
          )}
        </div>

        {/* avatar */}
        {ghUser && (
          <div className="hidden md:block relative shrink-0">
            <div className="w-48 h-48 rounded-2xl overflow-hidden border border-border shadow-2xl">
              <img
                src={ghUser.avatar_url}
                alt={CONFIG.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <Terminal size={22} className="text-primary-foreground" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function SectionHeader({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="mb-10">
      <p className="font-mono text-xs text-primary tracking-widest uppercase mb-2">{sub}</p>
      <h2
        className="text-3xl md:text-4xl font-bold text-foreground"
        style={{ fontFamily: "'Fraunces', serif" }}
      >
        {title}
      </h2>
    </div>
  );
}

function GitHubSection({
  user,
  repos,
  loading,
}: {
  user: GHUser | null;
  repos: GHRepo[];
  loading: boolean;
}) {
  return (
    <section id="github" className="py-20 border-t border-border">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader title="Open Source" sub="GitHub Activity" />

        {loading && (
          <div className="grid md:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-36 rounded-xl bg-secondary animate-pulse" />
            ))}
          </div>
        )}

        {!loading && repos.length === 0 && (
          <p className="text-muted-foreground font-mono text-sm">
            Could not load GitHub data. Check username in CONFIG.
          </p>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {repos.map((repo) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-card border border-border rounded-xl p-5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-mono text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate pr-2">
                  {repo.name}
                </h3>
                <ExternalLink
                  size={13}
                  className="text-muted-foreground shrink-0 group-hover:text-primary transition-colors mt-0.5"
                />
              </div>

              <p className="text-xs text-muted-foreground mb-4 leading-relaxed line-clamp-2">
                {repo.description ?? "No description"}
              </p>

              <div className="flex flex-wrap gap-1 mb-4">
                {repo.topics.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground border border-border"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4 mt-auto">
                {repo.language && (
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{
                        background: LANG_COLOR[repo.language] ?? "#888",
                      }}
                    />
                    <span className="font-mono text-[11px] text-muted-foreground">
                      {repo.language}
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Star size={11} />
                  <span className="font-mono text-[11px]">
                    {repo.stargazers_count.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <GitFork size={11} />
                  <span className="font-mono text-[11px]">
                    {repo.forks_count.toLocaleString()}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* GitHub profile link */}
        <div className="mt-8 flex justify-center">
          <a
            href={`https://github.com/${CONFIG.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-primary transition-colors"
          >
            View all repositories on GitHub
            <ChevronRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}

function RingChart({
  value,
  max,
  color,
  label,
  sublabel,
}: {
  value: number;
  max: number;
  color: string;
  label: string;
  sublabel: string;
}) {
  const pct = Math.min(value / max, 1);
  const r = 36;
  const circ = 2 * Math.PI * r;
  const dash = circ * pct;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-24 h-24">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 96 96">
          <circle cx="48" cy="48" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
          <circle
            cx="48"
            cy="48"
            r={r}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeDasharray={`${dash} ${circ}`}
            strokeLinecap="round"
            style={{ transition: "stroke-dasharray 1s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono text-lg font-bold text-foreground">{value}</span>
        </div>
      </div>
      <span className="font-mono text-xs font-medium" style={{ color }}>
        {label}
      </span>
      <span className="font-mono text-[10px] text-muted-foreground">{sublabel}</span>
    </div>
  );
}

function LeetCodeSection({
  stats,
  loading,
}: {
  stats: LCStats | null;
  loading: boolean;
}) {
  return (
    <section id="leetcode" className="py-20 border-t border-border bg-secondary/20">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader title="Problem Solving" sub="LeetCode Stats" />

        {loading && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-40 rounded-xl bg-secondary animate-pulse" />
            ))}
          </div>
        )}

        {!loading && !stats && (
          <p className="text-muted-foreground font-mono text-sm">
            Could not load LeetCode data. Check username in CONFIG.
          </p>
        )}

        {stats && (
          <div className="grid md:grid-cols-[1fr_auto] gap-10 items-start">
            {/* left: ring charts */}
            <div className="bg-card border border-border rounded-2xl p-8">
              <div className="flex flex-wrap items-center justify-around gap-8">
                <RingChart
                  value={stats.totalSolved}
                  max={stats.totalQuestions}
                  color="#10b981"
                  label="Total"
                  sublabel={`/ ${stats.totalQuestions}`}
                />
                <RingChart
                  value={stats.easySolved}
                  max={800}
                  color="#22c55e"
                  label="Easy"
                  sublabel="solved"
                />
                <RingChart
                  value={stats.mediumSolved}
                  max={1700}
                  color="#f59e0b"
                  label="Medium"
                  sublabel="solved"
                />
                <RingChart
                  value={stats.hardSolved}
                  max={700}
                  color="#ef4444"
                  label="Hard"
                  sublabel="solved"
                />
              </div>
            </div>

            {/* right: key metrics */}
            <div className="flex flex-col gap-4 min-w-[200px]">
              <div className="bg-card border border-border rounded-xl p-5">
                <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-1">
                  Global Ranking
                </p>
                <p className="font-mono text-2xl font-bold text-foreground">
                  #{stats.ranking.toLocaleString()}
                </p>
              </div>
              <div className="bg-card border border-border rounded-xl p-5">
                <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-1">
                  Acceptance Rate
                </p>
                <p className="font-mono text-2xl font-bold text-primary">
                  {stats.acceptanceRate?.toFixed(1) ?? "—"}%
                </p>
              </div>
              <a
                href={CONFIG.leetcodeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-primary/10 border border-primary/30 text-primary rounded-xl p-4 text-sm font-mono hover:bg-primary/20 transition-colors"
              >
                <Code2 size={15} />
                View Profile
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function SkillBar({
  name,
  level,
  color,
}: {
  name: string;
  level: number;
  color: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <span className="font-mono text-xs text-muted-foreground w-40 shrink-0">{name}</span>
      <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{ width: `${level}%`, background: color }}
        />
      </div>
      <span className="font-mono text-xs text-muted-foreground w-8 text-right">{level}%</span>
    </div>
  );
}

function ResumeSection() {
  return (
    <section id="resume" className="py-20 border-t border-border">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-start justify-between mb-10">
          <SectionHeader title="Experience" sub="Résumé" />
          <a
            href={CONFIG.resumeUrl}
            className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-xs font-mono text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
          >
            <Download size={13} />
            Download PDF
          </a>
        </div>

        <div className="grid lg:grid-cols-[3fr_2fr] gap-12">
          {/* experience */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Briefcase size={14} className="text-primary" />
              <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
                Work Experience
              </h3>
            </div>

            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />
              <div className="space-y-8 pl-8">
                {RESUME.experience.map((exp, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-[33px] top-1 w-2 h-2 rounded-full bg-primary ring-4 ring-background" />
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                      <div>
                        <h4 className="text-sm font-semibold text-foreground">{exp.role}</h4>
                        <p className="font-mono text-xs text-primary">{exp.company}</p>
                      </div>
                      <span className="font-mono text-[11px] text-muted-foreground bg-secondary px-2 py-1 rounded-full border border-border">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                      {exp.desc}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {exp.tech.map((t) => (
                        <span
                          key={t}
                          className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-secondary text-muted-foreground border border-border"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 mt-10 mb-6">
              <GraduationCap size={14} className="text-primary" />
              <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
                Education
              </h3>
            </div>

            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />
              <div className="pl-8">
                {RESUME.education.map((edu, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-[33px] top-1 w-2 h-2 rounded-full bg-accent ring-4 ring-background" />
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                      <div>
                        <h4 className="text-sm font-semibold text-foreground">{edu.degree}</h4>
                        <p className="font-mono text-xs text-primary">{edu.school}</p>
                      </div>
                      <span className="font-mono text-[11px] text-muted-foreground bg-secondary px-2 py-1 rounded-full border border-border">
                        {edu.period}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{edu.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* skills */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Zap size={14} className="text-primary" />
              <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
                Core Skills
              </h3>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 space-y-5">
              {RESUME.skills.map((s) => (
                <SkillBar key={s.name} name={s.name} level={s.level} color={s.color} />
              ))}
            </div>

            {/* quick-fact grid */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              {[
                { label: "Years Exp.", value: "5+" },
                { label: "Projects", value: "40+" },
                { label: "OSS Stars", value: "12k+" },
                { label: "PRs Merged", value: "200+" },
              ].map((f) => (
                <div key={f.label} className="bg-card border border-border rounded-xl p-4">
                  <p className="font-mono text-2xl font-bold text-foreground">{f.value}</p>
                  <p className="font-mono text-[11px] text-muted-foreground mt-1">{f.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [copied, setCopied] = useState(false);

  const copyEmail = useCallback(() => {
    navigator.clipboard.writeText(CONFIG.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }, []);

  return (
    <section id="contact" className="py-20 border-t border-border bg-secondary/20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-xl">
          <SectionHeader title="Get in Touch" sub="Contact" />
          <p className="text-muted-foreground text-sm mb-8 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Open to interesting problems. Whether it's a full-time role, contract work, or a side project worth building — send a message.
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={copyEmail}
              className="flex items-center gap-2 px-5 py-3 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              <Mail size={15} />
              {copied ? "Copied!" : CONFIG.email}
            </button>
            <a
              href={CONFIG.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 border border-border rounded-xl text-sm font-medium hover:border-primary/40 hover:text-primary transition-colors"
            >
              <Linkedin size={15} />
              LinkedIn
            </a>
            <a
              href={`https://github.com/${CONFIG.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 border border-border rounded-xl text-sm font-medium hover:border-primary/40 hover:text-primary transition-colors"
            >
              <Github size={15} />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-mono text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} {CONFIG.name}
        </span>
        <div className="flex items-center gap-6">
          <a
            href={`https://github.com/${CONFIG.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github size={16} />
          </a>
          <a
            href={CONFIG.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Linkedin size={16} />
          </a>
          <a
            href={CONFIG.leetcodeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Code2 size={16} />
          </a>
        </div>
        <span className="font-mono text-[11px] text-muted-foreground">
          Built with React · Live API data
        </span>
      </div>
    </footer>
  );
}

// ─── LOGIN PAGE ──────────────────────────────────────────────────────────────
function LoginPage({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [focused, setFocused] = useState<"email" | "pw" | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 1200);
  };

  const handleGuest = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 600);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #04050f 0%, #0a0620 35%, #0d0a2e 60%, #05040e 100%)",
      }}
    >
      {/* animated orbs */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(99,60,219,0.22) 0%, transparent 70%)",
          top: "-120px",
          left: "-160px",
          animation: "orb1 12s ease-in-out infinite alternate",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(29,78,216,0.20) 0%, transparent 70%)",
          bottom: "-100px",
          right: "-120px",
          animation: "orb2 15s ease-in-out infinite alternate",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          width: 300,
          height: 300,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)",
          top: "55%",
          left: "20%",
          animation: "orb1 18s ease-in-out infinite alternate-reverse",
        }}
      />

      {/* grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(148,130,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(148,130,255,1) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <style>{`
        @keyframes orb1 { from { transform: translate(0,0) scale(1); } to { transform: translate(40px, 30px) scale(1.1); } }
        @keyframes orb2 { from { transform: translate(0,0) scale(1); } to { transform: translate(-30px, -40px) scale(1.08); } }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes fade-up { from { opacity:0; transform: translateY(24px); } to { opacity:1; transform: translateY(0); } }
        .fade-up { animation: fade-up 0.55s cubic-bezier(.22,1,.36,1) both; }
        .fade-up-d1 { animation-delay: 0.08s; }
        .fade-up-d2 { animation-delay: 0.16s; }
        .fade-up-d3 { animation-delay: 0.24s; }
        .fade-up-d4 { animation-delay: 0.32s; }
        .fade-up-d5 { animation-delay: 0.40s; }
      `}</style>

      {/* card */}
      <div
        className="relative z-10 w-full max-w-md mx-4"
        style={{
          background:
            "linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
          border: "1px solid rgba(148,130,255,0.18)",
          borderRadius: "24px",
          backdropFilter: "blur(24px)",
          boxShadow:
            "0 0 0 1px rgba(148,130,255,0.08), 0 32px 64px rgba(0,0,0,0.6), 0 0 80px rgba(99,60,219,0.12)",
          padding: "48px 40px",
        }}
      >
        {/* logo mark */}
        <div className="fade-up flex justify-center mb-8">
          <div
            className="relative w-14 h-14 flex items-center justify-center rounded-2xl"
            style={{
              background:
                "linear-gradient(135deg, #4f35c7 0%, #1d4ed8 100%)",
              boxShadow: "0 8px 32px rgba(99,60,219,0.5)",
            }}
          >
            <Terminal size={26} className="text-white" />
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                border: "1px solid rgba(255,255,255,0.2)",
                animation: "spin-slow 8s linear infinite",
                borderTopColor: "rgba(148,130,255,0.7)",
                borderRightColor: "transparent",
                borderBottomColor: "transparent",
                borderLeftColor: "transparent",
              }}
            />
          </div>
        </div>

        <div className="fade-up fade-up-d1 text-center mb-8">
          <h1
            className="text-2xl font-bold mb-2"
            style={{
              fontFamily: "'Fraunces', serif",
              background: "linear-gradient(135deg, #c4b5fd 0%, #93c5fd 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Welcome Back
          </h1>
          <p
            className="text-sm"
            style={{ color: "rgba(148,163,184,0.8)", fontFamily: "'DM Sans', sans-serif" }}
          >
            Sign in to view the full portfolio
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* email */}
          <div className="fade-up fade-up-d2">
            <label
              className="block font-mono text-[11px] tracking-widest uppercase mb-2"
              style={{ color: focused === "email" ? "#a78bfa" : "rgba(148,163,184,0.6)" }}
            >
              Email
            </label>
            <div
              className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: `1px solid ${focused === "email" ? "rgba(167,139,250,0.5)" : "rgba(255,255,255,0.08)"}`,
                boxShadow: focused === "email" ? "0 0 0 3px rgba(167,139,250,0.1)" : "none",
              }}
            >
              <User size={15} style={{ color: focused === "email" ? "#a78bfa" : "rgba(148,163,184,0.4)" }} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused(null)}
                placeholder="you@example.com"
                className="flex-1 bg-transparent outline-none text-sm"
                style={{
                  color: "#e2e8f0",
                  fontFamily: "'DM Mono', monospace",
                }}
              />
            </div>
          </div>

          {/* password */}
          <div className="fade-up fade-up-d3">
            <div className="flex items-center justify-between mb-2">
              <label
                className="font-mono text-[11px] tracking-widest uppercase"
                style={{ color: focused === "pw" ? "#a78bfa" : "rgba(148,163,184,0.6)" }}
              >
                Password
              </label>
              <button
                type="button"
                className="font-mono text-[11px] transition-colors"
                style={{ color: "rgba(148,163,184,0.5)" }}
              >
                Forgot?
              </button>
            </div>
            <div
              className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: `1px solid ${focused === "pw" ? "rgba(167,139,250,0.5)" : "rgba(255,255,255,0.08)"}`,
                boxShadow: focused === "pw" ? "0 0 0 3px rgba(167,139,250,0.1)" : "none",
              }}
            >
              <Lock size={15} style={{ color: focused === "pw" ? "#a78bfa" : "rgba(148,163,184,0.4)" }} />
              <input
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocused("pw")}
                onBlur={() => setFocused(null)}
                placeholder="••••••••"
                className="flex-1 bg-transparent outline-none text-sm"
                style={{
                  color: "#e2e8f0",
                  fontFamily: "'DM Mono', monospace",
                  letterSpacing: showPw ? "normal" : "0.15em",
                }}
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="transition-colors"
                style={{ color: "rgba(148,163,184,0.4)" }}
              >
                {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>

          {/* error */}
          {error && (
            <p className="font-mono text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          {/* sign in button */}
          <div className="fade-up fade-up-d4 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-[0.98]"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                background: loading
                  ? "rgba(99,60,219,0.5)"
                  : "linear-gradient(135deg, #4f35c7 0%, #1d4ed8 100%)",
                color: "white",
                boxShadow: loading ? "none" : "0 8px 24px rgba(79,53,199,0.45)",
              }}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle cx="7" cy="7" r="6" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                    <path d="M7 1a6 6 0 0 1 6 6" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  Signing in…
                </span>
              ) : (
                <>
                  Sign In
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </div>
        </form>

        {/* divider */}
        <div className="fade-up fade-up-d4 flex items-center gap-3 my-5">
          <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.07)" }} />
          <span className="font-mono text-[11px]" style={{ color: "rgba(148,163,184,0.4)" }}>
            or continue as
          </span>
          <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.07)" }} />
        </div>

        {/* social + guest */}
        <div className="fade-up fade-up-d5 grid grid-cols-3 gap-2">
          {[
            { icon: Github, label: "GitHub" },
            { icon: Linkedin, label: "LinkedIn" },
            { icon: Sparkles, label: "Guest" },
          ].map(({ icon: Icon, label }) => (
            <button
              key={label}
              onClick={label === "Guest" ? handleGuest : undefined}
              className="flex flex-col items-center gap-1.5 py-3 rounded-xl text-xs font-mono transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                color: "rgba(148,163,184,0.7)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(167,139,250,0.35)";
                (e.currentTarget as HTMLButtonElement).style.color = "#c4b5fd";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.07)";
                (e.currentTarget as HTMLButtonElement).style.color = "rgba(148,163,184,0.7)";
              }}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>

        {/* footer note */}
        <p
          className="text-center font-mono text-[11px] mt-6"
          style={{ color: "rgba(148,163,184,0.35)" }}
        >
          Don&apos;t have an account?{" "}
          <span
            className="cursor-pointer transition-colors"
            style={{ color: "rgba(167,139,250,0.7)" }}
          >
            Request access
          </span>
        </p>
      </div>
    </div>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const { user: ghUser, repos, loading: ghLoading } = useGitHub(CONFIG.github);
  const { stats: lcStats, loading: lcLoading } = useLeetCode(CONFIG.leetcode);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id === "about" ? "hero" : id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveSection(id);
  }, []);

  useEffect(() => {
    const sections = ["hero", "github", "leetcode", "resume", "contact"];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  if (!loggedIn) return <LoginPage onLogin={() => setLoggedIn(true)} />;

  return (
    <div
      className="min-h-screen bg-background text-foreground"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <NavBar activeSection={activeSection} onNav={scrollTo} />

      <main>
        <HeroSection ghUser={ghUser} />
        <GitHubSection user={ghUser} repos={repos} loading={ghLoading} />
        <LeetCodeSection stats={lcStats} loading={lcLoading} />
        <ResumeSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
