const BLUEPRINT_KEY = "cmp_blueprints";

export function getBlueprints() {
  const data = localStorage.getItem(BLUEPRINT_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveBlueprints(blueprints) {
  localStorage.setItem(BLUEPRINT_KEY, JSON.stringify(blueprints));
}
