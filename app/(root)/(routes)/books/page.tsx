"use client";
import React, { useState, useEffect } from "react";
import { Book, Category } from "@prisma/client";
import { fetchBooks } from "@/actions/books";
import { fetchCategories } from "@/actions/categories";
import BookFilter from "./_components/book-filter";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const HomeBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(10);
  const [totalBooks, setTotalBooks] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("Computer");

  useEffect(() => {
    const fetchAll = async () => {
      console.log("HELLO => ");
      const categoriesData = await fetchCategories();
      const { books, pagination } = await fetchBooks(currentPage, booksPerPage, selectedCategory);

      setCategories(categoriesData);
      setBooks(books);
      setTotalBooks(pagination.totalCount);
    };

    fetchAll();
  }, [currentPage, booksPerPage, selectedCategory]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when category changes
  };

  useEffect(() => {
    console.log("BOOKS => ", books);
  }, [books]);

  // Pagination Controls
  const totalPages = Math.ceil(totalBooks / booksPerPage);
  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="container mt-10">
      <BookFilter categories={categories} />
      <div className="books-list">
        {books &&
          books.map((book) => (
            <div key={book.id} className="book">
              <h3>{book.name}</h3>
              <p>{book.price}</p>
            </div>
          ))}
      </div>
      <Pagination>
        <PaginationContent>
          {currentPage > 1 && (
            <PaginationItem onClick={prevPage}>
              <PaginationPrevious href="#" />
            </PaginationItem>
          )}
          {[...Array.from({ length: totalPages }, (_, i) => i)].map((page) => (
            <PaginationItem key={page} onClick={() => setCurrentPage(page + 1)}>
              <PaginationLink href="#" isActive={currentPage === page + 1}>
                {page + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          {currentPage < totalPages && (
            <PaginationItem onClick={nextPage}>
              <PaginationNext href="#" />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default HomeBooks;
