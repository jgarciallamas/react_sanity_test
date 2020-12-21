import React, { useState, useEffect } from "react";
import sanityClient from "../client";

export default function Project() {
  const [projectData, setProjectData] = useState(null);
  console.log("projectData -->", projectData);
  useEffect(() => {
    try {
      async function getProjects() {
        const data = await sanityClient.fetch(
          `*[_type == "project"]{
          title,
          date,
          place,
          description,
          projecType,
          link,
          tags,
        }`
        );
        setProjectData(data);
      }
      getProjects();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <main className="bg-green-100 min-h-screen p-12">
      <section className="container mx-auto">
        <h1 className="text-5xl flex justify-center cursive">My Projects</h1>
        <h2 className="text-xl text-gray-600 flex justify-center mb-12">
          Welcome to my projects page!
        </h2>
        <section className="grid grid-cols-2 gap-8">
          {projectData &&
            projectData.map((project) => (
              <article
                className="relative rounded-lg shadow-xl bg-white p-16"
                key={project.title}
              >
                <h3 className="text-gray-800 text-3xl font-bod hover:text-red-700">
                  <a
                    href={project.link}
                    alt={project.title}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {project.title}
                  </a>
                </h3>
                <div className="text-gray-500 text-xs space-x-4">
                  <span>
                    <strong className="font-bold">Finished on</strong>:{" "}
                    {new Date(project.date).toLocaleDateString()}
                  </span>
                  <span>
                    <strong className="font-bold">Place</strong>:{" "}
                    {project.place}
                  </span>
                  <span>
                    <strong className="font-bold">Type</strong>:{" "}
                    {project.projectType}
                  </span>
                  <p className="my-6 text-lg text-gray-700 leading-relaxed">
                    {project.description}
                  </p>
                  <a
                    href={project.link}
                    alt={project.title}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-500 font-bold hover:underline hover:text-red-400 text-xl"
                  >
                    View The Project{" "}
                    <span role="img" aria-label="right pointer">
                      👉
                    </span>
                  </a>
                </div>
              </article>
            ))}
        </section>
      </section>
    </main>
  );
}
