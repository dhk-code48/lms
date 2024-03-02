// Assuming this is in "@/actions/books"

export async function fetchBooks(page: number, limit: number, category: string) {
  const baseUrl = `/api/0a37800c-73bf-47e3-a79a-d2e1ddb84328/books`; // Adjust this URL as necessary
  //   const url = `${baseUrl}?page=${page}&limit=${limit}&category=${encodeURIComponent(category)}`;

  try {
    const response = await fetch(baseUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch books:", error);
    return { books: [], pagination: { page: 1, limit: 10, totalCount: 0 } };
  }
}
