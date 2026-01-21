import { useEffect, useState } from "react";
import { getBlueprints } from "../storage/blueprintStorage";
import { getContracts, saveContracts } from "../storage/contractStorage";
import { CONTRACT_STATUSES } from "../utils/contractLifecycle";

function Contracts() {
  const [blueprints, setBlueprints] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [selectedBlueprint, setSelectedBlueprint] = useState("");
  const [contractName, setContractName] = useState("");

  useEffect(() => {
    setBlueprints(getBlueprints());
    setContracts(getContracts());
  }, []);

  function createContract() {
    if (!selectedBlueprint || !contractName) return;

    const blueprint = blueprints.find((b) => b.id === Number(selectedBlueprint));

    const newContract = {
      id: Date.now(),
      name: contractName,
      blueprintId: blueprint.id,
      blueprintName: blueprint.name,
      status: CONTRACT_STATUSES.CREATED,
      createdAt: new Date().toISOString(),
      fields: blueprint.fields.map((f) => ({
        ...f,
        value: "",
      })),
    };

    const updated = [...contracts, newContract];
    setContracts(updated);
    saveContracts(updated);
    setContractName("");
  }

  return (
    <div>
      <h2>Contracts</h2>

      <h4>Create Contract</h4>

      <input
        placeholder="Contract Name"
        value={contractName}
        onChange={(e) => setContractName(e.target.value)}
      />

      <select
        value={selectedBlueprint}
        onChange={(e) => setSelectedBlueprint(e.target.value)}
      >
        <option value="">Select Blueprint</option>
        {blueprints.map((b) => (
          <option key={b.id} value={b.id}>
            {b.name}
          </option>
        ))}
      </select>

      <button onClick={createContract}>Create Contract</button>

      <h4>Existing Contracts</h4>

      <ul>
        {contracts.map((c) => (
          <li key={c.id}>
            {c.name} — {c.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Contracts;
