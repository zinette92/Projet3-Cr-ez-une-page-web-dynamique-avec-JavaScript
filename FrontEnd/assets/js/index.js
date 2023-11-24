/**
 * This function retrieve all categories available.
 */

export async function getCategories() {
  const response = await fetch("http://localhost:5678/api/categories");
  const categories = await response.json();
  return categories;
}

/**
 * This function retrieve all available works.
 */

export async function getWorks() {
  const response = await fetch("http://localhost:5678/api/works");
  const works = await response.json();
  return works;
}
