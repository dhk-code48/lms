"use client";
import React, { useState, useEffect } from "react";
import { Book, Category } from "@prisma/client";
import { fetchBooks } from "@/actions/books";
import { fetchCategories } from "@/actions/categories";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import BookCard from "@/components/book-card";
import Link from "next/link";
import BookFilter from "@/app/(root)/(routes)/books/_components/book-filter";

const BookSearch = ({ schoolId }: { schoolId: string }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(5);
  const [totalBooks, setTotalBooks] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [bookName, setBookName] = useState("");

  useEffect(() => {
    const fetchAll = async () => {
      console.log("HELLO => ");
      const categoriesData = await fetchCategories();
      const { books, pagination } = await fetchBooks(
        currentPage,
        booksPerPage,
        selectedCategory,
        bookName
      );

      setCategories(categoriesData);
      setBooks(books);
      setTotalBooks(pagination.totalCount);
    };

    fetchAll();
  }, [currentPage, bookName, booksPerPage, selectedCategory]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when category changes
  };
  const handleBookNameChange = (value: string) => {
    setBookName(value);
  };

  // Pagination Controls
  const totalPages = Math.ceil(totalBooks / booksPerPage);
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="container mt-10 space-y-10">
      <BookFilter
        handleBookNameChange={handleBookNameChange}
        handleCategoryChange={handleCategoryChange}
        categories={categories}
      />
      <div className="flex flex-wrap gap-10 items-center lg:justify-start justify-center">
        {books &&
          books.map((book) => (
            <Link
              href={`/${schoolId}/teacher/allBooks/${book.id}`}
              key={book.id + "bookfilter"}
            >
              <BookCard book={book} />
            </Link>
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

export default BookSearch;
