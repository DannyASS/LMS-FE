import Button from "@/compenent/partial/Button";
import Card, { CardContent } from "@/compenent/partial/Cards";
import { useState } from "react";

export default function CardKelas({ nama, jumlahSiswa, progress, onUpdate, onOpen }) {
    const [openMenu, setOpenMenu] = useState(false);
  return (
      <Card className="w-full max-w-sm shadow-md rounded-xl relative">
        <CardContent className="p-5 space-y-3">

            {/* Three Dots Menu */}
            <div className="absolute top-3 right-3">
            <button
                onClick={() => setOpenMenu(!openMenu)}
                className="p-1 rounded hover:bg-gray-100"
            >
                <span className="text-xl font-bold">⋮</span>
            </button>

            {/* Dropdown */}
            {openMenu && (
                <div className="absolute right-0 mt-2 bg-white shadow-md border rounded-lg w-32 z-10">
                <button
                    onClick={onUpdate}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                >
                    Update
                </button>
                </div>
            )}
            </div>

            <div>
            <h2 className="text-xl font-bold">{nama}</h2>
            <p className="text-gray-600 text-sm">Jumlah siswa: {jumlahSiswa}</p>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
            <div
                className="bg-green-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
            ></div>
            </div>

            <p className="text-sm text-gray-700">{progress}% modul selesai</p>

            <Button onClick={onOpen} className="mt-2 w-full">Open</Button>

        </CardContent>
        </Card>
  );
}
