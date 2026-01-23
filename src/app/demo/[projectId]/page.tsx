"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { projects } from "../../my-work/myWorkData";
import styles from "../DemoPage.module.css";

export default function DemoPage() {
  const params = useParams();
  const projectId = params.projectId as string;

  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return (
      <div className={styles.demoPage}>
        <Link href="/my-work" className={styles.backButton}>
          ← Back to My Work
        </Link>
        <div className={styles.notFound}>
          <h1>Demo not found</h1>
          <p>The requested demo could not be found.</p>
        </div>
      </div>
    );
  }

  const githubLink = project.links.find((l) => l.type === "github");

  return (
    <div className={styles.demoPage}>
      <Link href="/my-work" className={styles.backButton}>
        ← Back to My Work
      </Link>

      <header className={styles.header}>
        <h1 className={styles.title}>{project.title}</h1>
        {project.meta?.subtitle && (
          <span className={styles.subtitle}>{project.meta.subtitle}</span>
        )}
        <p className={styles.description}>{project.description}</p>
        <div className={styles.tags}>
          {project.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      </header>

      <div className={styles.appFrame}>
        {project.demoUrl ? (
          <iframe
            className={styles.appFrameIframe}
            src={project.demoUrl}
            title={`${project.title} App Preview`}
            allow="fullscreen"
          />
        ) : (
          <div className={styles.placeholder}>
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className={styles.placeholderImage}
            />
            <div className={styles.placeholderOverlay}>
              <p>Demo coming soon</p>
            </div>
          </div>
        )}
      </div>

      {githubLink && (
        <div className={styles.externalLinks}>
          <a
            href={githubLink.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.externalLink}
          >
            View on GitHub
            <Image src="/arrow_open.svg" alt="" width={12} height={12} className={styles.linkIcon} />
          </a>
        </div>
      )}

      {project.meta?.tools && project.meta.tools.length > 0 && (
        <div className={styles.metaSection}>
          <h2 className={styles.metaTitle}>Tools & Technologies</h2>
          <div className={styles.toolsTags}>
            {project.meta.tools.map((tool, index) => (
              <span key={index} className={styles.toolTag}>
                {tool}
              </span>
            ))}
          </div>
        </div>
      )}

      {(project.meta?.highlights || project.meta?.lessons) && (
        <div className={styles.twoColumnSection}>
          {project.meta?.highlights && project.meta.highlights.length > 0 && (
            <div className={styles.column}>
              <h2 className={styles.metaTitle}>Highlights</h2>
              <ul className={styles.metaList}>
                {project.meta.highlights.map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>
            </div>
          )}
          {project.meta?.highlights && project.meta?.lessons && (
            <div className={styles.columnSeparator} />
          )}
          {project.meta?.lessons && project.meta.lessons.length > 0 && (
            <div className={styles.column}>
              <h2 className={styles.metaTitle}>What I Learned</h2>
              <ul className={styles.metaList}>
                {project.meta.lessons.map((lesson, index) => (
                  <li key={index}>{lesson}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
