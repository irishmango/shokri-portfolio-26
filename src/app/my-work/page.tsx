"use client";

import { useState } from "react";
import Image from "next/image";
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

  return (
    <article className={featured ? styles.featuredCard : styles.projectCard}>
      <div className={styles.thumbnail}>
        {project.thumbnail ? (
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className={styles.thumbnailImage}
          />
        ) : (
          <span className={styles.thumbnailPlaceholder}>Thumbnail</span>
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
            {project.links.map((link) => (
              <a
                key={link.type}
                href={link.url}
                className={styles.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label || getLinkLabel(link.type)}
                <Image src="/arrow_open.svg" alt="" width={12} height={12} className={styles.linkIcon} />
              </a>
            ))}
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
