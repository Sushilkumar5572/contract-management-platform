import { useState } from "react";
import { getBlueprints, saveBlueprints } from "../storage/blueprintStorage";

function Blueprints() {
  const [name, setName] = useState("");
  const [fields, setFields] = useState([]);
  const [label, setLabel] = useState("");
  const [type, setType] = useState("Text");

  function addField() {
    if (!label) return;

    setFields([
      ...fields,
      {
        id: Date.now(),
        label,
        type,
        position: { x: 0, y: 0 },
      },
    ]);

    setLabel("");
  }

  function saveBlueprint() {
    if (!name || fields.length === 0) return;

    const existing = getBlueprints();

    existing.push({
      id: Date.now(),
      name,
      fields,
    });

    saveBlueprints(existing);
    setName("");
    setFields([]);
  }

  return (
    <div>
      <h2>Blueprint Builder</h2>

      <input
        placeholder="Blueprint Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <h4>Add Field</h4>
      <input
        placeholder="Field Label"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
      />

      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option>Text</option>
        <option>Date</option>
        <option>Signature</option>
        <option>Checkbox</option>
      </select>

      <button onClick={addField}>Add Field</button>

      <ul>
        {fields.map((f) => (
          <li key={f.id}>
            {f.label} ({f.type})
          </li>
        ))}
      </ul>

      <button onClick={saveBlueprint}>Save Blueprint</button>
    </div>
  );
}

export default Blueprints;
