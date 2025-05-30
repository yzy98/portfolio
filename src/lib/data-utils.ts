import { getCollection } from "astro:content";

export async function getBlogs() {
  return (await getCollection("blog"))
    .filter(post => !post.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getProjects() {
  return (await getCollection("projects"))
    .filter(project => !project.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getWorks() {
  return (await getCollection("work"))
    .sort((a, b) => new Date(b.data.dateStart).valueOf() - new Date(a.data.dateStart).valueOf());
}
