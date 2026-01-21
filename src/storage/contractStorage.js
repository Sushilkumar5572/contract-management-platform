const CONTRACT_KEY = "cmp_contracts";

export function getContracts() {
  const data = localStorage.getItem(CONTRACT_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveContracts(contracts) {
  localStorage.setItem(CONTRACT_KEY, JSON.stringify(contracts));
}
