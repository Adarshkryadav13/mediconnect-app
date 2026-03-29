import { useState } from "react";
import axios from "axios";
import api from "../api/axios";

export default function SymptomChecker() {
  const [symptoms, setSymptoms] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
 
  const handleSubmit = async () => {
    console.log("Button clicked");   // add this
    setLoading(true);
    try {
      const res = api.post("symptoms/", data);
      setResult(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    
    <div className="p-6 max-w-xl mx-auto">

  <h2 className="text-2xl font-bold mb-2">
    How are you feeling today?
  </h2>

  <p className="text-gray-500 mb-4">
    Describe your symptoms (e.g. fever, cough, headache)
  </p>

  <textarea
    placeholder="Tell us what you're feeling..."
    value={symptoms}
    onChange={(e) => setSymptoms(e.target.value)}
    className="border p-3 w-full mb-3 rounded"
  />

  <p className="text-sm text-gray-400 mb-4">
    Example: fever, cough, body pain
  </p>

  <button
    onClick={handleSubmit}
    className="bg-green-600 text-white px-4 py-2 rounded w-full"
  >
    {loading ? "Analyzing your symptoms..." : "Check Symptoms"}
  </button>

  {result && (
    <div className="mt-6 p-4 border rounded shadow">
      <h3 className="text-lg font-semibold">
        Possible Condition: {result.condition}
      </h3>
      <p>Urgency: {result.urgency}</p>
      <p>{result.advice}</p>

      <p className="text-xs text-gray-400 mt-3">
        This is not a medical diagnosis. Please consult a doctor.
      </p>
    </div>
  )}
</div>

  );
}