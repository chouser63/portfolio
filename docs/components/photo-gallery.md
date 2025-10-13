# PhotoGallery Component

A responsive, interactive photo gallery component that displays a grid of images with optional descriptions.

## Usage

```tsx
import { PhotoGallery } from "@/components/ui/photo-gallery";

const photos = [
  { 
    src: "/images/photo1.jpg",
    description: "Optional description that appears on hover"
  },
  { 
    src: "/images/photo2.jpg"
  }
];

export default function Gallery() {
  return <PhotoGallery photos={photos} />;
}
```

## Props

| Prop | Type | Description |
|------|------|-------------|
| photos | `Photo[]` | Array of photo objects to display |

### Photo Object

```tsx
type Photo = {
  src: string;        // Path to the image file
  description?: string; // Optional description shown on hover
}
```

## Features

- Responsive grid layout (1-4 columns based on screen size)
- Loading skeletons (react-loading-skeleton) while images load
- Click to enlarge images in a modal view
- Hover effects with optional description overlay
- Image optimization using Next.js Image component
- Priority loading for first 4 images

## Dependencies

- next/image
- Skeleton from react-loading-skeleton
- Tailwind CSS

## Notes

- Make sure the images you use are < 1MB, otherwise slow load time (can compress using squoosh.app)
- Description is not shown on enlarged image, that requires impl. change