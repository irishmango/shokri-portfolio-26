"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import {
  Project,
  ProjectCategory,
  categories,
  getFeaturedProjects,
  getFilteredProjects,
} from "./myWorkData";

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    // Detect touch device
    const touchQuery = window.matchMedia("(hover: none), (pointer: coarse)");
    setIsTouchDevice(touchQuery.matches);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const getLinkLabel = (type: string): string => {
    switch (type) {
      case "live":
        return "View Site";
      case "demo":
        return "View Demo";
      case "case-study":
        return "Read Case Study";
      case "github":
        return "Github Repo";
      default:
        return type;
    }
  };

  const handleMouseEnter = () => {
    if (isTouchDevice) return;
    setIsHovered(true);
    if (videoRef.current && !prefersReducedMotion) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (isTouchDevice) return;
    setIsHovered(false);
    if (videoRef.current && !prefersReducedMotion) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <article
      className={featured ? styles.featuredCard : styles.projectCard}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.thumbnail}>
        {project.thumbnail ? (
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className={`${styles.thumbnailImage} ${isHovered && project.demoVideo ? styles.thumbnailHidden : ""}`}
          />
        ) : (
          <span className={styles.thumbnailPlaceholder}>Thumbnail</span>
        )}
        {project.demoVideo && !prefersReducedMotion && (
          <video
            ref={videoRef}
            src={project.demoVideo}
            className={`${styles.thumbnailVideo} ${isHovered ? styles.thumbnailVideoVisible : ""}`}
            muted
            loop
            playsInline
            preload="metadata"
          />
        )}
      </div>
      <div className={styles.cardContent}>
        <h3 className={styles.projectTitle}>{project.title}</h3>
        <p className={styles.projectDescription}>{project.description}</p>
        {project.bullets && project.bullets.length > 0 && (
          <ul className={styles.bullets}>
            {project.bullets.map((bullet, index) => (
              <li key={index}>{bullet}</li>
            ))}
          </ul>
        )}
        <div className={styles.tags}>
          {project.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
        {project.links.length > 0 && (
          <div className={styles.links}>
            {project.links.map((link) => {
              const isInternal = link.type === "demo" || link.type === "case-study";
              const linkContent = (
                <>
                  {link.label || getLinkLabel(link.type)}
                  <Image src="/arrow_open.svg" alt="" width={12} height={12} className={styles.linkIcon} />
                </>
              );

              return isInternal ? (
                <Link key={link.type} href={link.url} className={styles.link}>
                  {linkContent}
                </Link>
              ) : (
                <a
                  key={link.type}
                  href={link.url}
                  className={styles.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {linkContent}
                </a>
              );
            })}
          </div>
        )}
      </div>
    </article>
  );
}

export default function MyWork() {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("all");

  const featuredProjects = getFeaturedProjects();
  const filteredProjects = getFilteredProjects(activeFilter);

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h2 className={styles.title}>My Work</h2>
        <p className={styles.subtitle}>
          A selection of shipped projects and products
        </p>
      </header>

      <nav className={styles.filters} aria-label="Project filters">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`${styles.filterButton} ${activeFilter === category.id ? styles.filterButtonActive : ""
              }`}
            onClick={() => setActiveFilter(category.id)}
            aria-pressed={activeFilter === category.id}
          >
            {category.label}
          </button>
        ))}
      </nav>

      {activeFilter === "all" && featuredProjects.length > 0 && (
        <section className={styles.featuredSection}>
          <h3 className={styles.sectionTitle}>Featured</h3>
          <div className={styles.featuredGrid}>
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} featured />
            ))}
          </div>
        </section>
      )}

      <section className={styles.projectsSection}>
        {activeFilter !== "all" && (
          <h3 className={styles.sectionTitle}>
            {categories.find((c) => c.id === activeFilter)?.label}
          </h3>
        )}
        {activeFilter === "all" && (
          <h3 className={styles.sectionTitle}>All Projects</h3>
        )}
        <div className={styles.projectsGrid}>
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))
          ) : (
            <div className={styles.emptyState}>
              <p className={styles.emptyText}>
                No projects in this category yet.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
