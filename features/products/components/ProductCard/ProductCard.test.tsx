import { render, screen } from "@testing-library/react";
import { ProductCard } from "./ProductCard";
import { Product } from "../../types";

const mockProduct: Product = {
  id: 1,
  title: "Test Smartwatch",
  description: "A great smartwatch with many features.",
  price: 199.99,
  discountPercentage: 10,
  rating: 4.8,
  stock: 50,
  brand: "TechBrand",
  category: "electronics",
  thumbnail: "https://via.placeholder.com/150",
  images: ["https://via.placeholder.com/150"],
};

describe("ProductCard", () => {
  it("renders the product title and description", () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText("Test Smartwatch")).toBeInTheDocument();
    expect(
      screen.getByText("A great smartwatch with many features."),
    ).toBeInTheDocument();
    expect(screen.getByText("electronics")).toBeInTheDocument();
  });

  it("calculates and displays original price when discounted", () => {
    render(<ProductCard product={mockProduct} />);

    // Original price = price / (1 - discountPercentage / 100)
    // 199.99 / 0.9 = 222.21
    expect(screen.getByText("$222.21")).toBeInTheDocument();
    expect(screen.getByText("$199.99")).toBeInTheDocument();
  });

  it("does not show discounted price if discountPercentage is 0", () => {
    const noDiscountProduct = { ...mockProduct, discountPercentage: 0 };
    render(<ProductCard product={noDiscountProduct} />);

    // Should only have one price
    const originalPriceElements = screen.queryByText("$222.21");
    expect(originalPriceElements).not.toBeInTheDocument();
    expect(screen.getByText("$199.99")).toBeInTheDocument();
  });

  it("displays correct rating", () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText("4.8")).toBeInTheDocument();
  });
});
