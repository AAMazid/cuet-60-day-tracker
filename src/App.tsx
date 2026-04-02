import { useState, useEffect, useCallback } from "react";
import { roadmapData, DayData, Subject } from "./data/roadmap";
import { getResourcesForTask, RESOURCE_TYPE_CONFIG, Resource } from "./data/resources";

const STORAGE_KEY = "cuet-tracker-completed";

function loadCompleted(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return new Set(JSON.parse(raw));
  } catch {}
  return new Set();
}

function saveCompleted(set: Set<string>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
}

const SUBJECT_CONFIG: Record<Subject, { label: string; color: string; bg: string; dot: string }> = {
  ai: {
    label: "AI Automation",
    color: "text-violet-600 dark:text-violet-400",
    bg: "bg-violet-50 dark:bg-violet-900/20",
    dot: "bg-violet-500",
  },
  mech: {
    label: "Mechanics",
    color: "text-sky-600 dark:text-sky-400",
    bg: "bg-sky-50 dark:bg-sky-900/20",
    dot: "bg-sky-500",
  },
  eng: {
    label: "English",
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
    dot: "bg-emerald-500",
  },
};

const PHASE_ORDER = [
  "Phase 1 — Foundation",
  "Phase 2 — Skill Building",
  "Phase 3 — Project Integration",
  "Phase 4 — Real-World Mastery",
];

function ProgressRing({ percent, size = 44 }: { percent: number; size?: number }) {
  const r = (size - 6) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (percent / 100) * circ;
  return (
    <svg width={size} height={size} className="rotate-[-90deg]">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="hsl(var(--border))" strokeWidth={4} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth={4}
        strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round"
        style={{ transition: "stroke-dasharray 0.4s ease" }}
      />
    </svg>
  );
}

function ResourcePanel({ resources, onClose }: { resources: Resource[]; onClose: () => void }) {
  if (resources.length === 0) {
    return (
      <div className="mt-3 rounded-xl border border-dashed border-border bg-muted/40 p-4 text-center">
        <p className="text-xs text-muted-foreground">No specific resources found for this task.</p>
        <a
          href="https://www.khanacademy.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-primary underline mt-1 block"
        >
          Browse Khan Academy →
        </a>
        <button onClick={onClose} className="text-xs text-muted-foreground mt-2 underline block mx-auto">Close</button>
      </div>
    );
  }

  return (
    <div className="mt-3 rounded-xl border border-primary/20 bg-accent/30 dark:bg-accent/10 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-primary/10">
        <div className="flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <span className="text-xs font-semibold text-primary">Learning Resources</span>
        </div>
        <button
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close resources"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="p-3 space-y-2">
        {resources.map((r, i) => {
          const cfg = RESOURCE_TYPE_CONFIG[r.type];
          return (
            <a
              key={i}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2.5 p-2.5 rounded-lg bg-card border border-border hover:border-primary/40 hover:shadow-sm transition-all group block"
            >
              <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md flex-shrink-0 mt-0.5 ${cfg.color}`}>
                {cfg.icon} {cfg.label}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-foreground group-hover:text-primary transition-colors leading-snug">
                  {r.title}
                </p>
                {r.note && (
                  <p className="text-[10px] text-muted-foreground mt-0.5">{r.note}</p>
                )}
              </div>
              <svg className="w-3 h-3 text-muted-foreground group-hover:text-primary flex-shrink-0 mt-0.5 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          );
        })}
      </div>
    </div>
  );
}

function TaskItem({
  task,
  isDone,
  onToggle,
}: {
  task: { id: string; text: string; subject: Subject };
  isDone: boolean;
  onToggle: (id: string) => void;
}) {
  const [showResources, setShowResources] = useState(false);
  const resources = getResourcesForTask(task.text);
  const hasResources = resources.length > 0;

  return (
    <div className="rounded-lg">
      <div className="flex items-start gap-2.5">
        {/* Checkbox */}
        <div className="relative flex-shrink-0 mt-0.5">
          <input
            type="checkbox"
            className="sr-only"
            checked={isDone}
            onChange={() => onToggle(task.id)}
          />
          <button
            onClick={(e) => { e.stopPropagation(); onToggle(task.id); }}
            className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${
              isDone
                ? "border-transparent bg-primary"
                : "border-border hover:border-primary/60"
            }`}
          >
            {isDone && (
              <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 12 12">
                <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        </div>

        {/* Task text — click to show resources */}
        <button
          className="flex-1 text-left group"
          onClick={(e) => { e.stopPropagation(); setShowResources((v) => !v); }}
          title={hasResources ? "Click to see learning resources" : "Click to check for resources"}
        >
          <span
            className={`text-xs leading-relaxed transition-colors ${
              isDone
                ? "line-through text-muted-foreground"
                : "text-foreground group-hover:text-primary"
            }`}
          >
            {task.text}
          </span>
          {hasResources && !showResources && (
            <span className="ml-1.5 inline-flex items-center gap-0.5 text-[9px] font-medium text-primary/70 bg-primary/10 px-1 py-0.5 rounded align-middle">
              <svg className="w-2 h-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              {resources.length} resources
            </span>
          )}
        </button>
      </div>

      {showResources && (
        <div className="ml-6" onClick={(e) => e.stopPropagation()}>
          <ResourcePanel resources={resources} onClose={() => setShowResources(false)} />
        </div>
      )}
    </div>
  );
}

function DayCard({
  day,
  completed,
  onToggle,
  isActive,
  onClick,
}: {
  day: DayData;
  completed: Set<string>;
  onToggle: (id: string) => void;
  isActive: boolean;
  onClick: () => void;
}) {
  const total = day.tasks.length;
  const done = day.tasks.filter((t) => completed.has(t.id)).length;
  const pct = total ? Math.round((done / total) * 100) : 0;
  const allDone = done === total;

  const dayBadgeClass = day.isGraduation
    ? "bg-yellow-400 text-yellow-900"
    : day.isCheckpoint
    ? "bg-orange-400 text-orange-900"
    : day.isReview
    ? "bg-purple-500 text-white"
    : "bg-primary text-primary-foreground";

  const subjects = (["ai", "mech", "eng"] as Subject[]).filter((s) =>
    day.tasks.some((t) => t.subject === s)
  );

  return (
    <div
      className={`rounded-xl border cursor-pointer transition-all duration-200 ${
        isActive
          ? "border-primary shadow-lg shadow-primary/10 ring-1 ring-primary"
          : "border-border hover:border-primary/40 hover:shadow-md"
      } ${allDone ? "opacity-80" : ""} bg-card`}
      onClick={onClick}
    >
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="relative flex-shrink-0">
              <ProgressRing percent={pct} size={44} />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[10px] font-bold text-foreground">{pct}%</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${dayBadgeClass}`}>
                  Day {day.day}
                </span>
                {day.isGraduation && <span className="text-xs">🎓</span>}
                {day.isCheckpoint && <span className="text-xs">🏁</span>}
                {day.isReview && <span className="text-xs">📋</span>}
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">{day.label}</p>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <span className="text-xs font-semibold text-foreground">{done}/{total}</span>
          </div>
        </div>

        <div className="mt-3 flex gap-1.5">
          {subjects.map((s) => (
            <span
              key={s}
              className={`text-[10px] font-medium px-1.5 py-0.5 rounded-md ${SUBJECT_CONFIG[s].bg} ${SUBJECT_CONFIG[s].color}`}
            >
              {s === "ai" ? "AI" : s === "mech" ? "Mech" : "Eng"}
            </span>
          ))}
        </div>

        {allDone && (
          <div className="mt-2 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
            </svg>
            Complete!
          </div>
        )}
      </div>

      {isActive && (
        <div className="border-t border-border px-4 pb-4">
          <p className="text-[10px] text-muted-foreground mt-3 mb-1 flex items-center gap-1">
            <svg className="w-3 h-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Click any task to see learning resources (videos, docs, courses)
          </p>

          {(["ai", "mech", "eng"] as Subject[]).map((subject) => {
            const subjectTasks = day.tasks.filter((t) => t.subject === subject);
            if (!subjectTasks.length) return null;
            const cfg = SUBJECT_CONFIG[subject];
            return (
              <div key={subject} className="mt-4">
                <div className="flex items-center gap-1.5 mb-2">
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${cfg.dot}`} />
                  <span className={`text-xs font-semibold ${cfg.color}`}>
                    {cfg.label}
                    {subject === "ai" ? " (5h/day)" : subject === "mech" ? " (3h/day)" : " (1h/day)"}
                  </span>
                </div>
                <div className="space-y-2">
                  {subjectTasks.map((task) => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      isDone={completed.has(task.id)}
                      onToggle={onToggle}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function PhaseSection({
  phase,
  days,
  completed,
  onToggle,
  activeDay,
  onDayClick,
}: {
  phase: string;
  days: DayData[];
  completed: Set<string>;
  onToggle: (id: string) => void;
  activeDay: number | null;
  onDayClick: (day: number) => void;
}) {
  const allTasks = days.flatMap((d) => d.tasks);
  const doneTasks = allTasks.filter((t) => completed.has(t.id));
  const pct = allTasks.length ? Math.round((doneTasks.length / allTasks.length) * 100) : 0;
  const weeks = [...new Set(days.map((d) => d.week))];

  return (
    <section className="mb-10">
      <div className="flex items-center gap-4 mb-5">
        <div>
          <h2 className="text-lg font-bold text-foreground">{phase}</h2>
          <p className="text-xs text-muted-foreground">
            Weeks {weeks[0]}–{weeks[weeks.length - 1]} · {doneTasks.length}/{allTasks.length} tasks · {pct}%
          </p>
        </div>
        <div className="flex-1 h-1.5 rounded-full bg-border overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {days.map((day) => (
          <DayCard
            key={day.day}
            day={day}
            completed={completed}
            onToggle={onToggle}
            isActive={activeDay === day.day}
            onClick={() => onDayClick(day.day)}
          />
        ))}
      </div>
    </section>
  );
}

export default function App() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const saved = localStorage.getItem("cuet-theme");
    if (saved === "dark" || saved === "light") return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });
  const [completed, setCompleted] = useState<Set<string>>(() => loadCompleted());
  const [activeDay, setActiveDay] = useState<number | null>(null);
  const [filterSubject, setFilterSubject] = useState<Subject | "all">("all");
  const [activePhase, setActivePhase] = useState<string>("all");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("cuet-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  const toggleTask = useCallback((id: string) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      saveCompleted(next);
      return next;
    });
  }, []);

  const handleDayClick = (day: number) => {
    setActiveDay((prev) => (prev === day ? null : day));
  };

  const allTasks = roadmapData.flatMap((d) => d.tasks);
  const totalDone = allTasks.filter((t) => completed.has(t.id)).length;
  const totalTasks = allTasks.length;
  const overallPct = Math.round((totalDone / totalTasks) * 100);

  const daysDone = roadmapData.filter((d) =>
    d.tasks.every((t) => completed.has(t.id))
  ).length;

  const filteredData = roadmapData.filter((d) => {
    if (activePhase !== "all" && d.phase !== activePhase) return false;
    if (filterSubject !== "all" && !d.tasks.some((t) => t.subject === filterSubject)) return false;
    return true;
  });

  const phaseGroups = PHASE_ORDER.filter(
    (p) => activePhase === "all" || p === activePhase
  ).map((phase) => ({
    phase,
    days: filteredData.filter((d) => d.phase === phase),
  })).filter((g) => g.days.length > 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <div>
                <h1 className="text-base font-bold text-foreground leading-tight">CUET Pre-Campus Tracker</h1>
                <p className="text-xs text-muted-foreground hidden sm:block">60-Day Master Roadmap · Mechanical Engineering</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-4">
                <div className="text-center">
                  <div className="text-xl font-black text-primary">{overallPct}%</div>
                  <div className="text-[10px] text-muted-foreground">Overall</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-black text-foreground">{daysDone}/60</div>
                  <div className="text-[10px] text-muted-foreground">Days Done</div>
                </div>
              </div>
              <button
                onClick={toggleTheme}
                className="w-9 h-9 rounded-lg border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-slate-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="mt-3">
            <div className="flex items-center gap-2 mb-1">
              <div className="flex-1 h-2 rounded-full bg-border overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-violet-500 to-primary rounded-full transition-all duration-700"
                  style={{ width: `${overallPct}%` }}
                />
              </div>
              <span className="text-xs font-bold text-foreground">{totalDone}/{totalTasks}</span>
            </div>
            <div className="flex gap-2 flex-wrap mt-2">
              {(["all", "ai", "mech", "eng"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setFilterSubject(s)}
                  className={`text-xs px-2.5 py-1 rounded-full border transition-all ${
                    filterSubject === s
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border text-muted-foreground hover:border-primary/40"
                  }`}
                >
                  {s === "all" ? "All" : s === "ai" ? "AI Automation" : s === "mech" ? "Mechanics" : "English"}
                </button>
              ))}
              <div className="w-px h-5 bg-border self-center mx-1" />
              {["all", ...PHASE_ORDER].map((p) => (
                <button
                  key={p}
                  onClick={() => setActivePhase(p)}
                  className={`text-xs px-2.5 py-1 rounded-full border transition-all ${
                    activePhase === p
                      ? "bg-secondary text-secondary-foreground border-primary/60"
                      : "border-border text-muted-foreground hover:border-primary/40"
                  }`}
                >
                  {p === "all" ? "All Phases" : p.split("—")[0].trim()}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          <StatCard label="Overall Progress" value={`${overallPct}%`} sub={`${totalDone} of ${totalTasks} tasks`} color="text-primary" />
          <StatCard label="Days Completed" value={`${daysDone}`} sub="out of 60 days" color="text-emerald-600 dark:text-emerald-400" />
          <StatCard
            label="AI Tasks Done"
            value={`${allTasks.filter(t => t.subject === "ai" && completed.has(t.id)).length}`}
            sub={`of ${allTasks.filter(t => t.subject === "ai").length} total`}
            color="text-violet-600 dark:text-violet-400"
          />
          <StatCard
            label="Mech Tasks Done"
            value={`${allTasks.filter(t => t.subject === "mech" && completed.has(t.id)).length}`}
            sub={`of ${allTasks.filter(t => t.subject === "mech").length} total`}
            color="text-sky-600 dark:text-sky-400"
          />
        </div>

        {phaseGroups.map(({ phase, days }) => (
          <PhaseSection
            key={phase}
            phase={phase}
            days={days}
            completed={completed}
            onToggle={toggleTask}
            activeDay={activeDay}
            onDayClick={handleDayClick}
          />
        ))}

        {phaseGroups.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-lg">No days match your current filters.</p>
            <button
              onClick={() => { setFilterSubject("all"); setActivePhase("all"); }}
              className="mt-3 text-sm text-primary underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </main>

      <footer className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        CUET Pre-Campus 60-Day Master Roadmap · Chittagong University of Engineering and Technology · Mechanical Engineering
      </footer>
    </div>
  );
}

function StatCard({ label, value, sub, color }: { label: string; value: string; sub: string; color: string }) {
  return (
    <div className="bg-card rounded-xl border border-border p-4">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className={`text-2xl font-black ${color}`}>{value}</p>
      <p className="text-[11px] text-muted-foreground mt-0.5">{sub}</p>
    </div>
  );
}

