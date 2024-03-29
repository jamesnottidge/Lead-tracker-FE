"use client";

import React, { useState } from "react";
import { Item } from "../page";

type Props = {
  jsonData: Item[];
  setJsonData: (jsonData: Item[]) => void;
};

const CsvUpload = ({ jsonData, setJsonData }: Props) => {
  // Rest of the component logic

  const convertCSVToJson = (csvData: any) => {
    const lines = csvData.split("\n");
    const headers = lines[0].split(",");
    const result = [];

    for (let i = 1; i < lines.length; i++) {
      const obj = {};
      const currentLine = lines[i].split(",");

      for (let j = 0; j < headers.length; j++) {
        obj[headers[j].trim()] = currentLine[j].trim();
      }

      result.push(obj);
    }

    return result;
  };

  const handleCSVInputChange = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const csvData = e.target.result;
      const jsonData = convertCSVToJson(csvData);
      setJsonData(jsonData);
    };

    reader.readAsText(file);
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleCSVInputChange} />

      {jsonData ? (
        <div className="json-container">
          {/* <pre>{JSON.stringify(jsonData, null, 2)}</pre> */}
        </div>
      ) : (
        <p>Please select a CSV file.</p>
      )}
    </div>
  );
};

export default CsvUpload;
