import { useMemo, useState } from "react";

type GradeStage = "小学" | "初中" | "高中" | "竞赛";
type Goal = "提分" | "培优" | "竞赛" | "查漏补缺";

type SignupForm = {
  name: string;
  phone: string;
  stage: GradeStage;
  grade: string;
  goal: Goal;
  city: string;
  note: string;
};

const defaultForm: SignupForm = {
  name: "",
  phone: "",
  stage: "初中",
  grade: "八年级",
  goal: "提分",
  city: "",
  note: "",
};

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function isValidPhone(phone: string) {
  const normalized = phone.replace(/\s|-/g, "");
  return /^1\d{10}$/.test(normalized);
}

function Badge({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center rounded-full bg-white/8 px-3 py-1 text-xs font-medium text-white/90 ring-1 ring-white/10">
      {children}
    </span>
  );
}

function Card({
  title,
  desc,
  icon,
}: {
  title: string;
  desc: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-white/6 p-6 ring-1 ring-white/10 shadow-soft">
      <div className="flex items-start gap-4">
        <div className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 ring-1 ring-white/10">
          {icon}
        </div>
        <div>
          <div className="text-base font-semibold text-white">{title}</div>
          <div className="mt-1 text-sm leading-6 text-white/70">{desc}</div>
        </div>
      </div>
    </div>
  );
}

function SectionTitle({
  kicker,
  title,
  desc,
}: {
  kicker: string;
  title: string;
  desc?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <div className="text-xs font-semibold tracking-widest text-indigo-200/80">
        {kicker}
      </div>
      <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
        {title}
      </h2>
      {desc ? (
        <p className="mt-3 text-sm leading-6 text-white/70 sm:text-base">
          {desc}
        </p>
      ) : null}
    </div>
  );
}

function Icon({
  name,
  className,
}: {
  name:
    | "bolt"
    | "target"
    | "shield"
    | "spark"
    | "check"
    | "calendar"
    | "phone"
    | "map";
  className?: string;
}) {
  const common = "h-5 w-5 text-white/85";
  const cls = cn(common, className);
  switch (name) {
    case "bolt":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none">
          <path
            d="M13 2L3 14h8l-1 8 10-12h-8l1-8Z"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "target":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none">
          <path
            d="M12 22a10 10 0 1 0-10-10 10 10 0 0 0 10 10Z"
            stroke="currentColor"
            strokeWidth="1.7"
          />
          <path
            d="M12 18a6 6 0 1 0-6-6 6 6 0 0 0 6 6Z"
            stroke="currentColor"
            strokeWidth="1.7"
          />
          <path
            d="M12 14a2 2 0 1 0-2-2 2 2 0 0 0 2 2Z"
            stroke="currentColor"
            strokeWidth="1.7"
          />
        </svg>
      );
    case "shield":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2 20 6v6c0 5-3.4 9.4-8 10-4.6-.6-8-5-8-10V6l8-4Z"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
          <path
            d="m9 12 2 2 4-5"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "spark":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2l1.2 5.2L18 9l-4.8 1.8L12 16l-1.2-5.2L6 9l4.8-1.8L12 2Z"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
          <path
            d="M4 14l.7 2.8L7.5 18l-2.8.7L4 21l-.7-2.3L.5 18l2.8-1.2L4 14Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "check":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none">
          <path
            d="m20 6-11 11-5-5"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "calendar":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none">
          <path
            d="M7 3v3M17 3v3M4 8h16M6 6h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "phone":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none">
          <path
            d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.3 19.3 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.8.3 1.7.6 2.5a2 2 0 0 1-.5 2.1L8 9.5a16 16 0 0 0 6.5 6.5l1.2-1.2a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.5.6A2 2 0 0 1 22 16.9Z"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "map":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none">
          <path
            d="M21 10c0 6-9 12-9 12S3 16 3 10a9 9 0 0 1 18 0Z"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
          <path
            d="M12 13a3 3 0 1 0-3-3 3 3 0 0 0 3 3Z"
            stroke="currentColor"
            strokeWidth="1.7"
          />
        </svg>
      );
  }
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      className="text-sm text-white/70 hover:text-white transition"
      href={href}
    >
      {label}
    </a>
  );
}

export default function App() {
  const [form, setForm] = useState<SignupForm>(defaultForm);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  const errors = useMemo(() => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "请填写学生姓名";
    if (!isValidPhone(form.phone)) e.phone = "请填写正确的手机号（11位）";
    if (!form.city.trim()) e.city = "请填写所在城市/校区";
    return e;
  }, [form]);

  const canSubmit = Object.keys(errors).length === 0;

  function update<K extends keyof SignupForm>(key: K, value: SignupForm[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({
      name: true,
      phone: true,
      city: true,
    });
    if (!canSubmit) return;

    const payload = {
      ...form,
      phone: form.phone.replace(/\s|-/g, ""),
      submittedAt: new Date().toISOString(),
    };

    const text = `【数学培训报名】\n姓名：${payload.name}\n手机：${payload.phone}\n学段：${payload.stage}\n年级：${payload.grade}\n目标：${payload.goal}\n城市/校区：${payload.city}\n备注：${payload.note || "无"}\n时间：${payload.submittedAt}`;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // ignore clipboard errors (e.g. insecure context)
    }

    setSubmitted(true);
  }

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-ink-950/60 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <a href="#top" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 ring-1 ring-white/10">
              <span className="text-sm font-semibold">∑</span>
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold text-white">数学提分训练营</div>
              <div className="text-[11px] text-white/60">分层 · 体系 · 闭环</div>
            </div>
          </a>

          <nav className="hidden items-center gap-6 md:flex">
            <NavLink href="#courses" label="课程体系" />
            <NavLink href="#teachers" label="师资与成果" />
            <NavLink href="#schedule" label="上课安排" />
            <NavLink href="#pricing" label="价格与优惠" />
            <NavLink href="#faq" label="常见问题" />
          </nav>

          <a
            href="#signup"
            className="inline-flex items-center rounded-xl bg-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-soft hover:bg-indigo-400 transition"
          >
            预约试听
          </a>
        </div>
      </header>

      <main id="top">
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 opacity-60">
            <div className="absolute -left-16 top-10 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
            <div className="absolute -right-20 top-24 h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl" />
          </div>

          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-12 sm:py-16 lg:grid-cols-[1.2fr,0.8fr] lg:gap-12">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge>小班 6-10 人</Badge>
                <Badge>入学测评</Badge>
                <Badge>错题闭环</Badge>
                <Badge>每周反馈</Badge>
              </div>

              <h1 className="mt-5 text-3xl font-semibold leading-tight text-white sm:text-4xl">
                用“体系化训练”把数学提分做稳
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
                针对不同年级与基础，给出可执行的训练路径：概念夯实 → 题型归纳 →
                解题策略 → 限时训练 → 错题复盘。把会做变成稳定得分。
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="#signup"
                  className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-ink-950 hover:bg-white/90 transition"
                >
                  免费测评 + 学习方案
                </a>
                <a
                  href="#pricing"
                  className="inline-flex items-center justify-center rounded-xl bg-white/10 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/15 hover:bg-white/12 transition"
                >
                  查看班型与价格
                </a>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                  { k: "3 次", v: "阶段测评/学期" },
                  { k: "48 小时", v: "作业反馈" },
                  { k: "1 对 1", v: "错题面批" },
                  { k: "100+", v: "核心题型库" },
                ].map((it) => (
                  <div
                    key={it.v}
                    className="rounded-2xl bg-white/6 p-4 ring-1 ring-white/10"
                  >
                    <div className="text-xl font-semibold text-white">{it.k}</div>
                    <div className="mt-1 text-xs text-white/65">{it.v}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-white/6 p-6 ring-1 ring-white/10 shadow-soft">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-base font-semibold">本周试听名额</div>
                  <div className="mt-1 text-sm text-white/70">
                    线上/线下均可，先测评再排班
                  </div>
                </div>
                <div className="rounded-2xl bg-indigo-500/15 px-3 py-2 ring-1 ring-indigo-400/20">
                  <div className="text-xs text-white/70">剩余</div>
                  <div className="text-lg font-semibold text-white">12</div>
                </div>
              </div>

              <ul className="mt-5 space-y-3 text-sm text-white/75">
                {[
                  "入学诊断：知识点 + 题型 + 习惯",
                  "分层进班：夯基 / 提分 / 培优 / 竞赛",
                  "每周学习报告：薄弱点与行动建议",
                  "不适配可换班：开课前 1 次免费调整",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <span className="mt-0.5">
                      <Icon name="check" className="h-4 w-4 text-emerald-200" />
                    </span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#signup"
                className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-indigo-500 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-400 transition"
              >
                现在预约（自动复制报名信息）
              </a>

              <div className="mt-3 text-center text-xs text-white/60">
                提交后会自动复制内容，你可粘贴发送到微信/客服
              </div>
            </div>
          </div>
        </section>

        <section id="courses" className="mx-auto max-w-6xl px-4 py-14">
          <SectionTitle
            kicker="COURSE SYSTEM"
            title="四条训练路径，覆盖提分与竞赛"
            desc="用同一套标准做诊断与训练：先补短板，再提速度与正确率。"
          />

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
            <Card
              icon={<Icon name="target" />}
              title="夯基提分（小学/初中）"
              desc="概念理解 + 基础题型 + 易错点训练，重点解决“会做但不稳”。"
            />
            <Card
              icon={<Icon name="bolt" />}
              title="中考/高考冲刺（初三/高三）"
              desc="压轴拆解 + 限时训练 + 试卷复盘，把得分点做成固定套路。"
            />
            <Card
              icon={<Icon name="shield" />}
              title="培优进阶（小升初/中升高）"
              desc="题型模型 + 方法迁移 + 思维训练，提升综合与探究题得分。"
            />
            <Card
              icon={<Icon name="spark" />}
              title="竞赛方向（AMC/奥数/校队）"
              desc="高频专题 + 证明思路 + 强化训练，形成清晰的解题框架。"
            />
          </div>

          <div className="mt-10 rounded-3xl bg-white/6 p-6 ring-1 ring-white/10">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {[
                {
                  t: "1) 入学测评",
                  d: "基础、能力、习惯三维诊断，输出可执行清单。",
                },
                {
                  t: "2) 分层训练",
                  d: "按错因拆解：概念/题型/策略/计算/审题。",
                },
                {
                  t: "3) 错题闭环",
                  d: "复盘模板 + 二次训练 + 复测，直到稳定得分。",
                },
              ].map((s) => (
                <div key={s.t} className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
                  <div className="text-sm font-semibold text-white">{s.t}</div>
                  <div className="mt-2 text-sm leading-6 text-white/70">{s.d}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="teachers" className="mx-auto max-w-6xl px-4 py-14">
          <SectionTitle
            kicker="TEACHERS & RESULTS"
            title="严格教研 + 清晰反馈，让进步看得见"
            desc="我们更重视“可复用的方法”和“稳定的得分能力”。"
          />

          <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
            {[
              {
                name: "主讲老师 A",
                tag: "8 年教学 / 中高考冲刺",
                items: ["压轴题拆解清晰", "课堂节奏强", "作业反馈细致"],
              },
              {
                name: "主讲老师 B",
                tag: "竞赛方向 / 专题教研",
                items: ["专题体系完整", "证明思路训练", "方法迁移能力提升"],
              },
              {
                name: "班主任教务",
                tag: "跟踪学习 / 家校沟通",
                items: ["每周学习报告", "薄弱点提醒", "阶段目标管理"],
              },
            ].map((p) => (
              <div
                key={p.name}
                className="rounded-3xl bg-white/6 p-6 ring-1 ring-white/10 shadow-soft"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-base font-semibold text-white">{p.name}</div>
                    <div className="mt-1 text-sm text-white/65">{p.tag}</div>
                  </div>
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-400/25 to-fuchsia-400/20 ring-1 ring-white/10" />
                </div>
                <ul className="mt-5 space-y-3 text-sm text-white/75">
                  {p.items.map((t) => (
                    <li key={t} className="flex items-start gap-2">
                      <span className="mt-0.5">
                        <Icon name="check" className="h-4 w-4 text-emerald-200" />
                      </span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              { k: "平均提分", v: "8–18 分 / 8 周" },
              { k: "作业达标率", v: "85%+（按周统计）" },
              { k: "复测通过率", v: "80%+（关键题型）" },
            ].map((s) => (
              <div
                key={s.k}
                className="rounded-3xl bg-white/6 p-6 text-center ring-1 ring-white/10"
              >
                <div className="text-sm text-white/70">{s.k}</div>
                <div className="mt-2 text-2xl font-semibold text-white">{s.v}</div>
                <div className="mt-2 text-xs text-white/55">不同基础会有差异，以测评方案为准</div>
              </div>
            ))}
          </div>
        </section>

        <section id="schedule" className="mx-auto max-w-6xl px-4 py-14">
          <SectionTitle
            kicker="SCHEDULE"
            title="固定节奏：讲解 → 训练 → 复盘 → 复测"
            desc="每节课都产出明确的训练清单与错题闭环任务。"
          />

          <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-2">
            <div className="rounded-3xl bg-white/6 p-6 ring-1 ring-white/10">
              <div className="flex items-center gap-2 text-sm font-semibold text-white">
                <Icon name="calendar" />
                <span>班课安排（示例）</span>
              </div>
              <div className="mt-4 grid grid-cols-1 gap-3">
                {[
                  {
                    t: "周二/周四（晚）",
                    d: "专题讲解 + 课堂训练（90 分钟）",
                  },
                  {
                    t: "周六（午后）",
                    d: "限时训练 + 试卷复盘（120 分钟）",
                  },
                  {
                    t: "周日（晚）",
                    d: "错题面批/答疑（60 分钟）",
                  },
                ].map((row) => (
                  <div
                    key={row.t}
                    className="flex items-start justify-between gap-4 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10"
                  >
                    <div className="text-sm font-semibold text-white">{row.t}</div>
                    <div className="text-sm text-white/70">{row.d}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-xs text-white/55">
                注：可根据年级与校区进行微调；冲刺阶段会增加周测与讲评。
              </div>
            </div>

            <div className="rounded-3xl bg-white/6 p-6 ring-1 ring-white/10">
              <div className="text-sm font-semibold text-white">你会得到什么</div>
              <div className="mt-4 grid grid-cols-1 gap-3">
                {[
                  "每周学习报告：本周掌握/薄弱点/下周计划",
                  "错题本模板：错因分类 + 标准解 + 变式训练",
                  "阶段测评：定位薄弱模块，动态调整训练强度",
                  "家长沟通：关键节点提醒与学习习惯建议",
                ].map((t) => (
                  <div
                    key={t}
                    className="flex items-start gap-3 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10"
                  >
                    <span className="mt-0.5">
                      <Icon name="check" className="h-4 w-4 text-emerald-200" />
                    </span>
                    <div className="text-sm text-white/75">{t}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="mx-auto max-w-6xl px-4 py-14">
          <SectionTitle
            kicker="PRICING"
            title="班型清晰，按阶段与目标选择"
            desc="下方为展示用示例价格。你可以告诉我你的真实班型与报价，我会替你改成正式版。"
          />

          <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
            {[
              {
                name: "基础提分班",
                price: "¥ 2,980",
                tag: "8 周 · 16 次课",
                good: false,
                items: ["入学测评 + 方案", "核心题型训练", "每周反馈报告", "群答疑"],
              },
              {
                name: "系统提升班",
                price: "¥ 4,680",
                tag: "8 周 · 24 次课",
                good: true,
                items: [
                  "含基础班全部内容",
                  "限时训练 + 复盘",
                  "错题面批 1 对 1",
                  "阶段复测与调班",
                ],
              },
              {
                name: "冲刺强化班",
                price: "¥ 6,980",
                tag: "8 周 · 32 次课",
                good: false,
                items: ["高频压轴专题", "周测 + 讲评", "个性化训练包", "专属教务跟踪"],
              },
            ].map((p) => (
              <div
                key={p.name}
                className={cn(
                  "rounded-3xl p-6 ring-1 shadow-soft",
                  p.good
                    ? "bg-gradient-to-b from-indigo-500/18 to-white/6 ring-indigo-400/30"
                    : "bg-white/6 ring-white/10",
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="text-base font-semibold text-white">{p.name}</div>
                  {p.good ? <Badge>推荐</Badge> : null}
                </div>
                <div className="mt-2 text-sm text-white/70">{p.tag}</div>
                <div className="mt-6 text-3xl font-semibold text-white">{p.price}</div>
                <ul className="mt-5 space-y-3 text-sm text-white/75">
                  {p.items.map((t) => (
                    <li key={t} className="flex items-start gap-2">
                      <span className="mt-0.5">
                        <Icon name="check" className="h-4 w-4 text-emerald-200" />
                      </span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#signup"
                  className={cn(
                    "mt-6 inline-flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold transition",
                    p.good
                      ? "bg-indigo-500 text-white hover:bg-indigo-400"
                      : "bg-white/10 text-white ring-1 ring-white/15 hover:bg-white/12",
                  )}
                >
                  预约测评与排班
                </a>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-3xl bg-white/6 p-6 ring-1 ring-white/10">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-sm font-semibold text-white">限时福利（示例）</div>
                <div className="mt-1 text-sm text-white/70">
                  预约试听即可领取「测评报告 + 训练清单」；报名系统提升班赠送 2 次面批。
                </div>
              </div>
              <a
                href="#signup"
                className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-ink-950 hover:bg-white/90 transition"
              >
                领取福利
              </a>
            </div>
          </div>
        </section>

        <section id="signup" className="mx-auto max-w-6xl px-4 py-14">
          <SectionTitle
            kicker="SIGN UP"
            title="预约试听 / 测评"
            desc="填写信息后会自动复制报名文本，你可直接粘贴发送给客服/微信。若你有后端接口，我也可以帮你对接真实提交。"
          />

          <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-[1.1fr,0.9fr]">
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl bg-white/6 p-6 ring-1 ring-white/10 shadow-soft"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="block">
                  <div className="text-xs font-semibold text-white/80">学生姓名</div>
                  <input
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    onBlur={() => setTouched((p) => ({ ...p, name: true }))}
                    className={cn(
                      "mt-2 w-full rounded-xl bg-ink-900/50 px-4 py-3 text-sm text-white placeholder:text-white/30 ring-1 outline-none",
                      touched.name && errors.name
                        ? "ring-rose-400/60"
                        : "ring-white/10 focus:ring-indigo-400/50",
                    )}
                    placeholder="例如：王同学"
                  />
                  {touched.name && errors.name ? (
                    <div className="mt-1 text-xs text-rose-200">{errors.name}</div>
                  ) : null}
                </label>

                <label className="block">
                  <div className="text-xs font-semibold text-white/80">手机号</div>
                  <input
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    onBlur={() => setTouched((p) => ({ ...p, phone: true }))}
                    inputMode="numeric"
                    className={cn(
                      "mt-2 w-full rounded-xl bg-ink-900/50 px-4 py-3 text-sm text-white placeholder:text-white/30 ring-1 outline-none",
                      touched.phone && errors.phone
                        ? "ring-rose-400/60"
                        : "ring-white/10 focus:ring-indigo-400/50",
                    )}
                    placeholder="11位手机号"
                  />
                  {touched.phone && errors.phone ? (
                    <div className="mt-1 text-xs text-rose-200">{errors.phone}</div>
                  ) : null}
                </label>

                <label className="block">
                  <div className="text-xs font-semibold text-white/80">学段</div>
                  <select
                    value={form.stage}
                    onChange={(e) => update("stage", e.target.value as GradeStage)}
                    className="mt-2 w-full rounded-xl bg-ink-900/50 px-4 py-3 text-sm text-white ring-1 ring-white/10 outline-none focus:ring-indigo-400/50"
                  >
                    {(["小学", "初中", "高中", "竞赛"] as const).map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <div className="text-xs font-semibold text-white/80">年级</div>
                  <input
                    value={form.grade}
                    onChange={(e) => update("grade", e.target.value)}
                    className="mt-2 w-full rounded-xl bg-ink-900/50 px-4 py-3 text-sm text-white placeholder:text-white/30 ring-1 ring-white/10 outline-none focus:ring-indigo-400/50"
                    placeholder="例如：八年级"
                  />
                </label>

                <label className="block">
                  <div className="text-xs font-semibold text-white/80">目标</div>
                  <select
                    value={form.goal}
                    onChange={(e) => update("goal", e.target.value as Goal)}
                    className="mt-2 w-full rounded-xl bg-ink-900/50 px-4 py-3 text-sm text-white ring-1 ring-white/10 outline-none focus:ring-indigo-400/50"
                  >
                    {(["提分", "培优", "竞赛", "查漏补缺"] as const).map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <div className="text-xs font-semibold text-white/80">城市/校区</div>
                  <input
                    value={form.city}
                    onChange={(e) => update("city", e.target.value)}
                    onBlur={() => setTouched((p) => ({ ...p, city: true }))}
                    className={cn(
                      "mt-2 w-full rounded-xl bg-ink-900/50 px-4 py-3 text-sm text-white placeholder:text-white/30 ring-1 outline-none",
                      touched.city && errors.city
                        ? "ring-rose-400/60"
                        : "ring-white/10 focus:ring-indigo-400/50",
                    )}
                    placeholder="例如：上海·浦东"
                  />
                  {touched.city && errors.city ? (
                    <div className="mt-1 text-xs text-rose-200">{errors.city}</div>
                  ) : null}
                </label>
              </div>

              <label className="mt-4 block">
                <div className="text-xs font-semibold text-white/80">备注（可选）</div>
                <textarea
                  value={form.note}
                  onChange={(e) => update("note", e.target.value)}
                  className="mt-2 min-h-28 w-full resize-y rounded-xl bg-ink-900/50 px-4 py-3 text-sm text-white placeholder:text-white/30 ring-1 ring-white/10 outline-none focus:ring-indigo-400/50"
                  placeholder="例如：最近一次考试分数、薄弱模块、希望上课时间等"
                />
              </label>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  type="submit"
                  className={cn(
                    "inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition",
                    canSubmit
                      ? "bg-indigo-500 text-white hover:bg-indigo-400"
                      : "bg-white/10 text-white/60 ring-1 ring-white/10 cursor-not-allowed",
                  )}
                >
                  提交并复制报名信息
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setForm(defaultForm);
                    setTouched({});
                    setSubmitted(false);
                  }}
                  className="inline-flex items-center justify-center rounded-xl bg-white/10 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/15 hover:bg-white/12 transition"
                >
                  重置
                </button>
              </div>

              {submitted ? (
                <div className="mt-4 rounded-2xl bg-emerald-400/10 p-4 text-sm text-emerald-100 ring-1 ring-emerald-300/20">
                  已提交。报名信息已尝试复制到剪贴板（若浏览器限制，请手动复制表单内容）。
                </div>
              ) : null}
            </form>

            <div className="rounded-3xl bg-white/6 p-6 ring-1 ring-white/10">
              <div className="text-sm font-semibold text-white">联系方式（示例）</div>
              <div className="mt-4 space-y-3 text-sm text-white/75">
                <div className="flex items-start gap-3 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                  <span className="mt-0.5">
                    <Icon name="phone" className="h-4 w-4 text-indigo-200" />
                  </span>
                  <div>
                    <div className="font-semibold text-white">咨询电话</div>
                    <div className="mt-1 text-white/70">13453127841</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                  <span className="mt-0.5">
                    <Icon name="map" className="h-4 w-4 text-indigo-200" />
                  </span>
                  <div>
                    <div className="font-semibold text-white">校区地址</div>
                    <div className="mt-1 text-white/70">
                      山西省太原市小店区
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                <div className="text-sm font-semibold text-white">你接下来会收到</div>
                <ul className="mt-3 space-y-2 text-sm text-white/75">
                  {[
                    "测评链接/线下测评安排",
                    "学习方案（目标 + 训练节奏）",
                    "推荐班型与开班时间",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-2">
                      <span className="mt-0.5">
                        <Icon name="check" className="h-4 w-4 text-emerald-200" />
                      </span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="mx-auto max-w-6xl px-4 py-14">
          <SectionTitle
            kicker="FAQ"
            title="常见问题"
            desc="如果你希望更贴合你机构实际情况（校区、班型、课程亮点），把信息发我我就能一键替换成正式版。"
          />

          <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-2">
            {[
              {
                q: "孩子基础一般，能跟上吗？",
                a: "会先测评并分层进班；课堂训练会按“必做/选做”分级，保证能跟上且有提升空间。",
              },
              {
                q: "作业和错题怎么管？",
                a: "作业按错因分类反馈；错题需要用模板完成复盘，再做变式训练与复测，形成闭环。",
              },
              {
                q: "线上上课效果如何？",
                a: "线上同样有课堂训练与提交反馈；关键模块可安排面批/答疑，保证训练强度。",
              },
              {
                q: "多久能看到效果？",
                a: "一般 2–3 周能看到正确率与速度变化，8 周一轮能完成明显的薄弱点修复与稳定提分。",
              },
            ].map((f) => (
              <div
                key={f.q}
                className="rounded-3xl bg-white/6 p-6 ring-1 ring-white/10"
              >
                <div className="text-base font-semibold text-white">{f.q}</div>
                <div className="mt-2 text-sm leading-7 text-white/70">{f.a}</div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-10 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-white/70">
            © {new Date().getFullYear()} 数学提分训练营 · 仅示例站点
          </div>
          <div className="flex items-center gap-4 text-sm">
            <a className="text-white/60 hover:text-white transition" href="#top">
              回到顶部
            </a>
            <a className="text-white/60 hover:text-white transition" href="#signup">
              预约试听
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

