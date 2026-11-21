"use client";

import Link from "next/link";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

const ChapterContext = createContext("intro");

export const ChapterLink = ({
  chapter,
  children,
}: {
  readonly chapter: string;
  readonly children: ReactNode;
}) => {
  const current = useContext(ChapterContext);
  return (
    <a
      aria-current={current === chapter ? "location" : undefined}
      href={`#${chapter}`}
    >
      {children}
    </a>
  );
};

export const LanguageNav = ({
  label,
  locale,
}: {
  readonly label: string;
  readonly locale: string;
}) => {
  const chapter = useContext(ChapterContext);

  return (
    <nav aria-label={label} className="language-nav">
      <Link
        aria-current={locale === "en" ? "page" : undefined}
        aria-label="English"
        href={`/en#${chapter}`}
        hrefLang="en"
        lang="en"
      >
        EN
      </Link>
      <Link
        aria-current={locale === "es" ? "page" : undefined}
        aria-label="Español"
        href={`/es#${chapter}`}
        hrefLang="es"
        lang="es"
      >
        ES
      </Link>
    </nav>
  );
};

const chapterReadingLine = 0.28;
const stepReadingLine = 0.48;

const observeReadingLine = (
  elements: readonly HTMLElement[],
  viewportHeight: number,
  readingLine: number,
  activate: (element: HTMLElement) => void
) => {
  const top = Math.round(viewportHeight * readingLine);
  const bottom = viewportHeight - top - 1;
  const observer = new IntersectionObserver(
    () => {
      const current = elements.findLast((element) => {
        const bounds = element.getBoundingClientRect();
        return bounds.top <= top && bounds.bottom > top;
      });
      if (current) {
        activate(current);
      }
    },
    { rootMargin: `-${top}px 0px -${bottom}px 0px` }
  );

  for (const element of elements) {
    observer.observe(element);
  }
  return observer;
};

const trackReading = (
  container: HTMLElement,
  onChapterChange: (id: string) => void
) => {
  const chapters = [
    ...container.querySelectorAll<HTMLElement>("[data-chapter]"),
  ];
  const steps = [
    ...container.querySelectorAll<HTMLElement>("[data-loop-step]"),
  ];
  const loopNodes = container.querySelectorAll<HTMLElement>("[data-loop-node]");
  let viewportHeight = 0;
  let chapterObserver: IntersectionObserver | undefined;
  let stepObserver: IntersectionObserver | undefined;

  const selectStep = (step: string | undefined) => {
    for (const node of loopNodes) {
      node.toggleAttribute("data-current", node.dataset.loopNode === step);
    }
  };

  const observeViewport = () => {
    const height = document.documentElement.clientHeight;
    if (height === viewportHeight) {
      return;
    }

    viewportHeight = height;
    chapterObserver?.disconnect();
    stepObserver?.disconnect();
    chapterObserver = observeReadingLine(
      chapters,
      height,
      chapterReadingLine,
      (chapter) => onChapterChange(chapter.id)
    );
    stepObserver = observeReadingLine(steps, height, stepReadingLine, (step) =>
      selectStep(step.dataset.loopStep)
    );
  };

  selectStep(steps[0]?.dataset.loopStep);
  observeViewport();

  const resizeObserver = new ResizeObserver(observeViewport);
  resizeObserver.observe(container);
  resizeObserver.observe(document.documentElement);

  return () => {
    resizeObserver.disconnect();
    chapterObserver?.disconnect();
    stepObserver?.disconnect();
  };
};

export const StoryNavigation = ({
  children,
}: {
  readonly children: ReactNode;
}) => {
  const [chapter, setChapter] = useState("intro");
  const storyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = storyRef.current;
    return container ? trackReading(container, setChapter) : undefined;
  }, []);

  return (
    <ChapterContext.Provider value={chapter}>
      <div ref={storyRef}>{children}</div>
    </ChapterContext.Provider>
  );
};
