import Image from "next/image";
import { locale as getLocale } from "next/root-params";
import { getTranslations } from "next-intl/server";
import cover from "@/public/learning/cover.webp";
import perform from "@/public/learning/perform.webp";
import practiceArt from "@/public/learning/practice.webp";
import rehearse from "@/public/learning/rehearse.webp";
import trapArt from "@/public/learning/trap.webp";
import { ChapterLink, LanguageNav, StoryNavigation } from "./story-navigation";

const chapters = [
  "trap",
  "recall",
  "practice",
  "simulation",
  "loop",
  "today",
] as const;
const navigationChapters = ["trap", "recall", "loop"] as const;
const learningActivities = [
  "read",
  "hear",
  "see",
  "watch",
  "discuss",
  "do",
] as const;
const habits = [
  "habitRead",
  "habitWatch",
  "habitHighlight",
  "habitCollect",
] as const;
const exercises = [
  "exerciseSummarize",
  "exerciseAnswer",
  "exerciseFlashcard",
  "exerciseRevisit",
] as const;
const practiceExamples = [
  "writing",
  "coding",
  "conversation",
  "business",
] as const;
const simulationExamples = [
  "languages",
  "speaking",
  "interviews",
  "business",
  "exams",
] as const;
const loopSteps = ["learn", "recall", "apply", "reflect"] as const;
const reflectionQuestions = ["first", "second", "third"] as const;
const halfWidthImage =
  "(max-width: 760px) 92vw, (max-width: 1440px) 48vw, 650px";

const LearningLoop = async () => {
  const t = await getTranslations("loop");

  return (
    <section
      aria-labelledby="loop-title"
      className="section section-loop"
      data-chapter
      id="loop"
    >
      <div className="shell">
        <div className="section-heading">
          <h2 id="loop-title">{t("title")}</h2>
          <p className="section-intro">{t("intro")}</p>
        </div>
        <div className="loop-grid">
          <div aria-hidden="true" className="loop-sticky">
            <div className="loop-diagram">
              <span className="loop-center">{t("diagramCenter")}</span>
              <ol>
                {loopSteps.map((step) => (
                  <li
                    className={`loop-node loop-node-${step}`}
                    data-loop-node={step}
                    key={step}
                  >
                    {t(`${step}Title`)}
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <ol className="loop-steps">
            {loopSteps.map((step) => (
              <li data-loop-step={step} key={step}>
                <h3>{t(`${step}Title`)}</h3>
                <p>{t(`${step}Text`)}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default async function LearningPage() {
  const [t, locale] = await Promise.all([getTranslations(), getLocale()]);

  return (
    <StoryNavigation>
      <a className="skip-link" href="#story">
        {t("navigation.skip")}
      </a>
      <header className="site-header">
        <div className="shell header-inner">
          <a className="brand" href="#intro">
            <span aria-hidden="true" className="brand-mark">
              ✳
            </span>
            {t("navigation.brand")}
          </a>
          <nav aria-label={t("navigation.chapters")} className="header-nav">
            {navigationChapters.map((chapter) => (
              <ChapterLink chapter={chapter} key={chapter}>
                {t(`navigation.${chapter}`)}
              </ChapterLink>
            ))}
          </nav>
          <LanguageNav label={t("navigation.language")} locale={locale} />
        </div>
      </header>

      <main id="story" tabIndex={-1}>
        <section
          aria-labelledby="intro-title"
          className="hero shell"
          data-chapter
          id="intro"
        >
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">{t("hero.label")}</p>
              <h1 id="intro-title">
                <span>{t("hero.titleStart")}</span>{" "}
                <span>{t("hero.titleMiddle")}</span>{" "}
                <em>{t("hero.titleEnd")}.</em>
              </h1>
              <p className="hero-intro">{t("hero.intro")}</p>
              <a className="primary-link" href="#trap">
                {t("hero.start")}
              </a>
            </div>
            <div className="hero-art">
              <Image
                alt={t("hero.alt")}
                className="illustration"
                preload
                sizes={halfWidthImage}
                src={cover}
              />
            </div>
          </div>

          <div className="activity-strip">
            <p className="activity-name">{t("hero.sequence")}</p>
            <ol className="activity-list">
              {learningActivities.map((activity) => (
                <li key={activity}>{t(`hero.${activity}`)}</li>
              ))}
            </ol>
          </div>
        </section>

        <section
          aria-labelledby="trap-title"
          className="section section-trap"
          data-chapter
          id="trap"
        >
          <div className="shell split">
            <div>
              <p className="eyebrow">{t("trap.label")}</p>
              <h2 id="trap-title">{t("trap.title")}</h2>
              <p className="section-intro">{t("trap.intro")}</p>
              <ul className="ruled-list">
                {habits.map((habit) => (
                  <li key={habit}>{t(`trap.${habit}`)}</li>
                ))}
              </ul>
              <p className="takeaway">{t("trap.takeaway")}</p>
            </div>
            <div className="framed-illustration">
              <div aria-hidden="true" className="paired-labels">
                <span>{t("trap.theory")}</span>
                <span>{t("trap.practice")}</span>
              </div>
              <Image
                alt={t("trap.alt")}
                className="illustration"
                sizes={halfWidthImage}
                src={trapArt}
              />
            </div>
          </div>
        </section>

        <section
          aria-labelledby="recall-title"
          className="section section-recall"
          data-chapter
          id="recall"
        >
          <div className="shell split">
            <div>
              <p className="eyebrow">{t("recall.label")}</p>
              <h2 id="recall-title">{t("recall.title")}</h2>
              <p className="section-intro">{t("recall.intro")}</p>
              <ul className="ruled-list">
                {exercises.map((exercise) => (
                  <li key={exercise}>{t(`recall.${exercise}`)}</li>
                ))}
              </ul>
            </div>
            <div className="flashcard">
              <p className="eyebrow">{t("recall.cardLabel")}</p>
              <p className="flashcard-prompt">{t("recall.prompt")}</p>
              <details className="flashcard-details">
                <summary>{t("recall.reveal")}</summary>
                <p>{t("recall.answer")}</p>
              </details>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="practice-title"
          className="section section-practice"
          data-chapter
          id="practice"
        >
          <div className="shell split practice-layout">
            <div className="practice-copy">
              <p className="eyebrow">{t("practice.label")}</p>
              <h2 id="practice-title">{t("practice.title")}</h2>
              <p className="section-intro">{t("practice.intro")}</p>
            </div>
            <div className="framed-illustration practice-art">
              <Image
                alt={t("practice.alt")}
                className="illustration"
                sizes={halfWidthImage}
                src={practiceArt}
              />
            </div>
            <div className="practice-examples">
              <dl className="practice-grid">
                {practiceExamples.map((example) => (
                  <div key={example}>
                    <dt>{t(`practice.${example}Title`)}</dt>
                    <dd>{t(`practice.${example}Text`)}</dd>
                  </div>
                ))}
              </dl>
              <p className="takeaway">{t("practice.takeaway")}</p>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="simulation-title"
          className="section section-simulation"
          data-chapter
          id="simulation"
        >
          <div className="shell">
            <div className="section-heading">
              <p className="eyebrow">{t("simulation.label")}</p>
              <h2 id="simulation-title">{t("simulation.title")}</h2>
              <p className="section-intro">{t("simulation.intro")}</p>
            </div>
            <div className="simulation-scenes">
              <figure className="simulation-scene">
                <figcaption>{t("simulation.rehearse")}</figcaption>
                <Image
                  alt={t("simulation.rehearseAlt")}
                  className="illustration"
                  sizes={halfWidthImage}
                  src={rehearse}
                />
              </figure>
              <span aria-hidden="true" className="simulation-arrow">
                →
              </span>
              <figure className="simulation-scene">
                <figcaption>{t("simulation.perform")}</figcaption>
                <Image
                  alt={t("simulation.performAlt")}
                  className="illustration"
                  sizes={halfWidthImage}
                  src={perform}
                />
              </figure>
            </div>
            <div className="simulation-examples">
              <p className="activity-name">{t("simulation.examples")}</p>
              <ul>
                {simulationExamples.map((example) => (
                  <li key={example}>{t(`simulation.${example}`)}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <LearningLoop />

        <section
          aria-labelledby="today-title"
          className="section section-today"
          data-chapter
          id="today"
        >
          <div className="shell split">
            <div>
              <h2 id="today-title">{t("today.title")}</h2>
              <p className="section-intro">{t("today.intro")}</p>
              <a className="primary-link" href="#loop">
                {t("today.repeat")}
              </a>
            </div>
            <ol className="reflection-list">
              {reflectionQuestions.map((question) => (
                <li key={question}>{t(`today.${question}`)}</li>
              ))}
            </ol>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="shell">
          <nav aria-label={t("navigation.chapters")}>
            {chapters.map((chapter) => (
              <ChapterLink chapter={chapter} key={chapter}>
                {t(`navigation.${chapter}`)}
              </ChapterLink>
            ))}
          </nav>
          <a href="#intro">{t("today.top")}</a>
        </div>
      </footer>
    </StoryNavigation>
  );
}
