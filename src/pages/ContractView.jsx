import { useParams } from "react-router-dom";
import { useState } from "react";
import { getContracts, saveContracts } from "../storage/contractStorage";
import { CONTRACT_STATUSES } from "../utils/contractLifecycle";

function ContractView() {
    const { id } = useParams();

    const allContracts = getContracts();
    const initialContract = allContracts.find(
        (c) => c.id === Number(id)
    );

    const [contract, setContract] = useState(initialContract);

    if (!contract) {
        return <p>Contract not found</p>;
    }

    const isLocked =
        contract.status === CONTRACT_STATUSES.LOCKED ||
        contract.status === CONTRACT_STATUSES.REVOKED;

    function updateField(fieldId, value) {
        if (isLocked) return;

        const updatedContract = {
            ...contract,
            fields: contract.fields.map((f) =>
                f.id === fieldId ? { ...f, value } : f
            ),
        };

        setContract(updatedContract);

        const updatedContracts = allContracts.map((c) =>
            c.id === contract.id ? updatedContract : c
        );

        saveContracts(updatedContracts);
    }

    function statusStyle(status) {
  const colors = {
    Created: "#6c757d",
    Approved: "#0d6efd",
    Sent: "#0dcaf0",
    Signed: "#198754",
    Locked: "#212529",
    Revoked: "#dc3545",
  };

  return {
    backgroundColor: colors[status] || "#999",
    color: "#fff",
    padding: "4px 10px",
    borderRadius: "12px",
    fontSize: "12px",
    display: "inline-block",
    marginLeft: "8px",
  };
}


    return (
  <div
    style={{
      minHeight: "100vh",
      backgroundColor: "#f8f9fa",
      padding: "30px",
    }}
  >
    <div
      style={{
        maxWidth: "500px",
        margin: "0 auto",
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "6px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  }}
>
  <h2 style={{ margin: 0 }}>{contract.name}</h2>

  <span style={statusStyle(contract.status)}>
    {contract.status}
  </span>
</div>


<button
  onClick={() => window.history.back()}
  style={{ marginTop: "10px" }}
>
  ← Back
</button>


      <hr />

      <div>
        {contract.fields.map((field) => (
          <div
            key={field.id}
            style={{ marginBottom: "15px" }}
          >
            <label
              style={{
                display: "block",
                marginBottom: "4px",
                fontWeight: "bold",
              }}
            >
              {field.label}
            </label>

            {field.type === "Text" && (
              <input
                style={{ width: "100%" }}
                value={field.value}
                disabled={isLocked}
                onChange={(e) =>
                  updateField(field.id, e.target.value)
                }
              />
            )}

            {field.type === "Date" && (
              <input
                style={{ width: "100%" }}
                type="date"
                value={field.value}
                disabled={isLocked}
                onChange={(e) =>
                  updateField(field.id, e.target.value)
                }
              />
            )}

            {field.type === "Checkbox" && (
              <input
                type="checkbox"
                checked={field.value || false}
                disabled={isLocked}
                onChange={(e) =>
                  updateField(field.id, e.target.checked)
                }
              />
            )}

            {field.type === "Signature" && (
              <input
                style={{ width: "100%" }}
                placeholder="Type name as signature"
                value={field.value}
                disabled={isLocked}
                onChange={(e) =>
                  updateField(field.id, e.target.value)
                }
              />
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
);

}

export default ContractView;
