import React from "react";
import "../../common/styles/gallery.css";
import { API } from "aws-amplify";
import CategoryGalleryBook from "./CategoryGalleryBook";
import { Book } from "../bestSellers/BestSellerProductRow";

interface CategoryGalleryProps {
  match: any;
}

interface CategoryGalleryState {
  isLoading: boolean;
  books: Book[];
}

export class CategoryGallery extends React.Component<CategoryGalleryProps, CategoryGalleryState> {
  constructor(props: CategoryGalleryProps) {
    super(props);

    this.state = {
      isLoading: true,
      books: []
    };
  }

  async componentDidMount() {
    try {
      const books = await this.listBooks();
      this.setState({ books });
    } catch (e) {
      alert(e);
    }

    this.setState({ isLoading: false });
  }

  listBooks() {
    return API.get("books", `/books?category=${this.props.match.params.id}`, null);
  }

  render() {
    return (
      this.state.isLoading ? <div className="loader" /> :
      <div>
        <div className="well-bs no-radius">
          <div className="container-category">
            <h3>{this.props.match.params.id}</h3>
            <div className="row">
              {this.state.books.map(book => <CategoryGalleryBook book={book} key={book.id} />)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CategoryGallery;