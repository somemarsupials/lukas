const setItem = (text, id) => {
  const element = document.getElementById(id);
  if (element) element.innerHTML = text;
};

const setDLC = (url, id) => {
  const element = document.getElementById(id);

  if (element && url) {
    element.style.display = "block";
    element.src = url;
  } else {
    element.style.display = "none";
  };
}

export const setProject = (project) => {
  if (!project) return;

  const root = document.getElementById('project-information');
  root.style.display = "block";

  const items = [
    [project.title, 'project-title'],
    [project.description, 'project-description']
  ];

  const dlc = [
    [project.photo_url, 'project-image'],
    [project.embed_url, 'project-embed']
  ];

  items.forEach(([text, id]) => setItem(text, id));
  dlc.forEach(([url, id]) => setDLC(url, id));
};
