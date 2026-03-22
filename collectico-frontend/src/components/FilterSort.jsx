import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectItem } from "@/components/ui/select";

const CustomFilter = ({ options, onFilterChange, onSortChange }) => {
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleFilterToggle = (filter) => {
    let updatedFilters;
    if (selectedFilters.includes(filter)) {
      updatedFilters = selectedFilters.filter((f) => f !== filter);
    } else {
      updatedFilters = [...selectedFilters, filter];
    }
    setSelectedFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <Card className="p-4 w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4">Filter Options</h2>
      <CardContent className="grid grid-cols-2 gap-4 mb-4">
        {options.map((option, index) => (
          <Button
            key={index}
            className={`$ {
              selectedFilters.includes(option) ? "bg-blue-500 text-white" : "bg-gray-200"
            } px-4 py-2 rounded-xl shadow-md`}
            onClick={() => handleFilterToggle(option)}
          >
            {option}
          </Button>
        ))}
      </CardContent>
      <h2 className="text-xl font-semibold mb-2">Sort Options</h2>
      <Select onValueChange={(value) => onSortChange(value)} className="w-full">
        <SelectItem value="A-Z">A-Z</SelectItem>
        <SelectItem value="Price">Price</SelectItem>
      </Select>
    </Card>
  );
};

export default function Mate() {
  const [filteredItems, setFilteredItems] = useState([]);
  const [sortedItems, setSortedItems] = useState([]);
  const items = [
    { name: "Apple", price: 2 },
    { name: "Banana", price: 1 },
    { name: "Carrot", price: 3 },
    { name: "Date", price: 4 },
    { name: "Eggplant", price: 2 },
    { name: "Fig", price: 5 },
  ];
  const filters = ["Fruit", "Vegetable"];

  const handleFilterChange = (selectedFilters) => {
    if (selectedFilters.length === 0) {
      setFilteredItems(items);
    } else {
      const filterMap = {
        Fruit: ["Apple", "Banana", "Date", "Fig"],
        Vegetable: ["Carrot", "Eggplant"],
      };
      const updatedItems = items.filter((item) =>
        selectedFilters.some((filter) => filterMap[filter]?.includes(item.name))
      );
      setFilteredItems(updatedItems);
    }
  };

  const handleSortChange = (sortOption) => {
    let sorted;
    if (sortOption === "A-Z") {
      sorted = [...filteredItems].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === "Price") {
      sorted = [...filteredItems].sort((a, b) => a.price - b.price);
    }
    setSortedItems(sorted);
  };

  return (
    <div className="p-6">
      <CustomFilter
        options={filters}
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
      />
      <div className="mt-6">
        <h2 className="text-lg font-semibold">Filtered and Sorted Items:</h2>
        <ul className="mt-2 list-disc pl-6">
          {(sortedItems.length > 0 ? sortedItems : filteredItems).map((item, index) => (
            <li key={index}>{item.name} - ${item.price}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
