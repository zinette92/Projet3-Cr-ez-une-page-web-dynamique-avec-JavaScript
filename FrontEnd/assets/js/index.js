/**
 * This function retrieve all categories available.
 */

export async function getCategories() {
  const response = await fetch("http://localhost:5678/api/categories");
  const categories = await response.json();
  // console.log(categories);
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



/**
 * This function allows to remove visible works.
 */


export async function removeModalWork(target) {
  const res = await fetch(
    "http://localhost:5678/api/works/" + target,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  )
    .then((res) => {
      console.log(res);
      if (!res.ok) {
        throw new Error("Erreur lors de la suppression des données");
      } else {
        return 1;
      }
    })
    .catch((error) => {
      console.log("Erreur lors de la suppression des données:", error);
    });
}
