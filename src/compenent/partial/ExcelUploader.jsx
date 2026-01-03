import { useEffect, useState } from "react";
import Button from "./Button";

export default function ExcelUploader({ onUpload, value=null, onRemoveFile }) {
  const [file, setFile] = useState(value);
  const [disable, setDisebled] = useState(false);

  useEffect(() => {
    if (value != null) {
      setDisebled(true)
    } else {
      setDisebled(false)
    }
    setFile(value)
  },[value])

  const handleSave = () => {
    onUpload(file)
    setDisebled(true)
  }

  // ketika pilih file
  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    // validasi hanya xlsx
    if (selected.type !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
      alert("Hanya file .xlsx yang diizinkan");
      return;
    }

    setFile(selected);
  };

  // hapus file
  const handleRemoveFile = () => {
    onUpload(null)
    onRemoveFile()
  };

  return (
    <div className="w-full p-4 border rounded-lg bg-white shadow">
      <label className="font-semibold mb-2 block">Upload File XLSX</label>

      {/* Input file */}
      <input
        type="file"
        accept=".xlsx"
        disabled={disable}
        onChange={handleFileChange}
        className="border p-2 rounded w-full"
      />

      {/* Preview file */}
      {file && (
        <div className="mt-4 p-3 bg-gray-100 rounded flex justify-between items-center">
          <span>{file.name}</span>

          <button
            onClick={handleRemoveFile}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Hapus
          </button>
        </div>
      )}

      {/* Tombol submit (opsional) */}
      <Button
        onClick={handleSave}
        disabled={disable}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        Upload
      </Button>
    </div>
  );
}
