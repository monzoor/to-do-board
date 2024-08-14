"use client";

import { useState } from "react";
import { CategoryProps } from "./types";

export const CategoryCard: React.FC<CategoryProps> = ({
  header,
  children,
  onDrop,
  onDragOver,
  categoryId,
  draggingCategory,
}) => {
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingOver(false);
  };

  return (
    <div
      className="category item relative flex min-h-[300px] w-80 flex-col bg-white"
      onDrop={(e) => {
        onDrop(e, categoryId);
        setIsDraggingOver(false);
      }}
      onDragOver={(e) => {
        onDragOver(e);
        handleDragEnter(e);
      }}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      data-category={categoryId}
    >
      <div className="bg-blue-400 p-4 font-bold shadow-md">{header}</div>
      <div className="relative flex-grow">
        {isDraggingOver && draggingCategory !== categoryId && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-500 bg-opacity-50">
            <span className="text-lg text-white">
              Please drop here your ticket
            </span>
          </div>
        )}
        <div className="relative flex-grow">{children}</div>
      </div>
    </div>
  );
};
