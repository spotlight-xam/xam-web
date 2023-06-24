interface Image {
  imageUrl: string;
  id: number;
}

interface Feed {
  title: String;
  writer: String;
  images: Image[];
  content: String;
}

interface getFeedRes {
  [index: number]: Feed;
}
